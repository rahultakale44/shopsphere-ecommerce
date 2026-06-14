import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import api from "../api/axiosConfig.js";
import { useApp } from "../context/AppContext.jsx";
import { resolveProducts } from "../utils/products.js";

function Products() {
  const navigate = useNavigate();
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
        setProducts(resolveProducts(res.data.content || res.data));
      } catch (error) {
        console.log(error);
        setProducts(resolveProducts([]));
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
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await api.post(`/cart/add/${productId}?quantity=1`);
      await refreshCartCount();
      alert("Added to cart");
    } catch (error) {
      console.log("Add to cart error:", error.response?.data || error.message);

      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      alert("Unable to add product to cart");
    }
  };

  const addToWishlist = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await api.post(`/wishlist/add/${productId}`);
      alert("Added to wishlist");
    } catch (error) {
      console.log("Wishlist error:", error.response?.data || error.message);

      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Session expired. Please login again.");
        navigate("/login");
        return;
      }

      alert("Unable to add product to wishlist");
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
