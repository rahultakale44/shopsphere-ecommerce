import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import api from "../api/axiosConfig.js";
import { useApp } from "../context/AppContext.jsx";
import {
  CATEGORIES,
  DEALS_PRODUCTS,
  FEATURED_SPOTLIGHT,
  HERO_IMAGE,
  TOP_PICKS_PRODUCTS,
} from "../utils/products.js";

function Home() {
  const { refreshCartCount } = useApp();
  const deals = DEALS_PRODUCTS;
  const topPicks = TOP_PICKS_PRODUCTS;

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
    <div className="app">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <span className="tag">NEW SEASON DEALS</span>
          <h1>
            Everything you love, <br />
            <span>delivered tomorrow.</span>
          </h1>
          <p>
            From the latest tech to everyday essentials — millions of products
            with fast, free delivery and easy returns.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn-primary">
              Shop deals
            </Link>
            <Link to="/register" className="btn-outline">
              Create account
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img src={HERO_IMAGE} alt="Shopping bags" />
          <div className="deal-card">
            <small>Today&apos;s flash deal</small>
            <b>Up to 60% off</b>
            <span className="countdown">Ends in 02:14:33</span>
          </div>
        </div>
      </section>

      <section className="features">
        <div>
          🚚 <b>Free shipping</b>
          <span>On orders over ₹499</span>
        </div>
        <div>
          ↩️ <b>30-day returns</b>
          <span>No questions asked</span>
        </div>
        <div>
          🛡️ <b>Secure payments</b>
          <span>Encrypted checkout</span>
        </div>
        <div>
          🎧 <b>24/7 support</b>
          <span>We&apos;re here for you</span>
        </div>
      </section>

      <section className="spotlight-section">
        <div className="spotlight-grid">
          {FEATURED_SPOTLIGHT.map((item) => (
            <Link to="/products" className="spotlight-card" key={item.id}>
              <img src={item.imageUrl} alt={item.title} />
              <div className="spotlight-overlay">
                <small>{item.subtitle}</small>
                <b>{item.title}</b>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="category-section">
        <div className="section-head">
          <h2>Shop by category</h2>
          <Link to="/products">View all</Link>
        </div>

        <div className="categories">
          {CATEGORIES.map((cat) => (
            <Link to="/products" className="category" key={cat.name}>
              <div className="category-circle">
                <img src={cat.imageUrl} alt={cat.name} loading="lazy" />
              </div>
              <b>{cat.name}</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="products-section">
        <div className="section-head">
          <div>
            <h2>Deals of the day</h2>
            <p>Limited-time offers — while stocks last</p>
          </div>
          <Link to="/products">See all deals</Link>
        </div>

        <div className="product-grid home-product-grid">
          {deals.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
            />
          ))}
        </div>
      </section>

      <section className="products-section">
        <div className="section-head">
          <h2>Top picks for you</h2>
          <Link to="/products">Browse all</Link>
        </div>

        <div className="product-grid home-product-grid">
          {topPicks.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
