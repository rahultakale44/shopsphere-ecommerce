import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import api from "../api/axiosConfig.js";
import { useApp } from "../context/AppContext.jsx";
import { FALLBACK_PRODUCTS } from "../utils/products.js";

function Products() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const { refreshCartCount } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products");
        setProducts(res.data.content || res.data);
      } catch {
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = query
    ? products.filter(
        (p) =>
          p.name?.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query)
      )
    : products;

  const addToCart = async (productId) => {
    try {
      await api.post(`/cart/add/${productId}`);
      await refreshCartCount();
      alert("Added to cart");
    } catch {
      alert("Please login first");
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await api.post(`/wishlist/add/${productId}`);
      alert("Added to wishlist");
    } catch {
      alert("Please login first");
    }
  };

  return (
    <>
      <Navbar />

      <div className="products-page">
        <h1>{query ? `Results for "${query}"` : "All Products"}</h1>

        {loading ? (
          <p className="page-message">Loading products...</p>
        ) : filtered.length === 0 ? (
          <p className="page-message">No products found.</p>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                showAddButton
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Products;
