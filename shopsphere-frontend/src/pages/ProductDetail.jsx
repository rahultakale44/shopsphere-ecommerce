import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Heart, Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import api from "../api/axiosConfig.js";
import { useApp } from "../context/AppContext.jsx";
import {
  enrichProduct,
  FALLBACK_PRODUCTS,
  formatPrice,
  getDiscount,
  getProductImage,
} from "../utils/products.js";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshCartCount } = useApp();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(enrichProduct(res.data));
      } catch {
        const fallback = FALLBACK_PRODUCTS.find((p) => p.id === Number(id));
        setProduct(fallback ? enrichProduct(fallback) : null);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const adjustQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const addToCart = async (redirectToCheckout = false) => {
    setActionLoading(true);
    try {
      await api.post(`/cart/add/${product.id}?quantity=${quantity}`);
      await refreshCartCount();
      if (redirectToCheckout) {
        navigate("/checkout");
      } else {
        alert(`Added ${quantity} item(s) to cart`);
      }
    } catch {
      alert("Please login first to order");
      navigate("/login");
    } finally {
      setActionLoading(false);
    }
  };

  const addToWishlist = async () => {
    try {
      await api.post(`/wishlist/add/${product.id}`);
      alert("Added to wishlist");
    } catch {
      alert("Please login first");
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="product-detail-page">
          <p className="page-message">Loading product...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="product-detail-page">
          <div className="empty-state">
            <p>Product not found.</p>
            <button type="button" onClick={() => navigate("/products")}>
              Back to products
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const discount = getDiscount(product);
  const displayPrice = product.discountPrice || product.price;
  const lineTotal = Number(displayPrice) * quantity;

  return (
    <>
      <Navbar />

      <div className="product-detail-page">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-detail-layout">
          <div className="product-detail-image">
            {discount > 0 && <div className="discount">-{discount}%</div>}
            <img src={getProductImage(product)} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <p className="brand">{product.brand}</p>
            <h1>{product.name}</h1>

            {product.rating != null && (
              <div className="rating">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}{" "}
                <span>
                  ({product.reviewCount?.toLocaleString("en-IN") ?? product.rating}{" "}
                  reviews)
                </span>
              </div>
            )}

            <div className="price-row detail-price">
              <b>{formatPrice(displayPrice)}</b>
              {product.discountPrice && product.discountPrice < product.price && (
                <del>{formatPrice(product.price)}</del>
              )}
            </div>

            <p className="delivery">FREE delivery tomorrow</p>

            {product.description && (
              <p className="product-description">{product.description}</p>
            )}

            <div className="quantity-section">
              <label>Quantity</label>
              <div className="quantity-controls">
                <button type="button" onClick={() => adjustQuantity(-1)} aria-label="Decrease">
                  <Minus size={18} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button type="button" onClick={() => adjustQuantity(1)} aria-label="Increase">
                  <Plus size={18} />
                </button>
              </div>
              <div className="quantity-presets">
                {[1, 2, 3, 4, 5].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    className={quantity === qty ? "active" : ""}
                    onClick={() => setQuantity(qty)}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>

            <p className="line-total">
              Subtotal ({quantity} item{quantity > 1 ? "s" : ""}):{" "}
              <b>{formatPrice(lineTotal)}</b>
            </p>

            <div className="product-detail-actions">
              <button
                type="button"
                className="btn-primary detail-btn"
                disabled={actionLoading}
                onClick={() => addToCart(false)}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button
                type="button"
                className="btn-buy-now"
                disabled={actionLoading}
                onClick={() => addToCart(true)}
              >
                <Zap size={18} /> Buy Now
              </button>
              <button
                type="button"
                className="wishlist-btn"
                onClick={addToWishlist}
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetail;
