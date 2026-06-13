import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import api from "../api/axiosConfig.js";
import { useApp } from "../context/AppContext.jsx";
import { formatPrice } from "../utils/products.js";

function Wishlist() {
  const navigate = useNavigate();
  const { refreshCartCount } = useApp();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await api.get("/wishlist");
      setWishlist(res.data);
    } catch {
      alert("Please login to view your wishlist");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await api.delete(`/wishlist/remove/${productId}`);
      fetchWishlist();
    } catch {
      alert("Remove failed");
    }
  };

  const addToCart = async (productId) => {
    try {
      await api.post(`/cart/add/${productId}`);
      await refreshCartCount();
      alert("Added to cart");
    } catch {
      alert("Please login first");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <>
      <Navbar />

      <div className="products-page">
        <h1>My Wishlist</h1>

        {loading ? (
          <p className="page-message">Loading wishlist...</p>
        ) : wishlist.length === 0 ? (
          <div className="empty-state">
            <p>No products in wishlist.</p>
            <button type="button" onClick={() => navigate("/products")}>
              Browse products
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {wishlist.map((item) => {
              const product = item.product;
              return (
                <div className="product-card" key={item.id}>
                  <img
                    src={product.imageUrl || "https://via.placeholder.com/400"}
                    alt={product.name}
                  />
                  <p className="brand">{product.brand}</p>
                  <h3>{product.name}</h3>
                  <div className="price-row">
                    <b>{formatPrice(product.discountPrice || product.price)}</b>
                    {product.discountPrice && (
                      <del>{formatPrice(product.price)}</del>
                    )}
                  </div>
                  <p className="delivery">Saved for later</p>
                  <button
                    className="add-cart-btn"
                    type="button"
                    onClick={() => addToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="remove-outline-btn"
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Wishlist;
