import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingCart, Package, Grid2X2 } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { cartCount, isLoggedIn } = useApp();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    navigate(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
  };

  return (
    <>
      <nav className="top-navbar">
        <Link to="/" className="logo">
          Shop<span>Sphere</span>
        </Link>

        <div className="location">
          <small>Deliver to</small>
          <b>New York 10001</b>
        </div>

        <form className="search-bar" onSubmit={handleSearch}>
          <select defaultValue="All">
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
          </select>
          <input
            placeholder="Search ShopSphere"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <Search size={22} />
          </button>
        </form>

        <Link to={isLoggedIn ? "/" : "/login"} className="nav-item">
          <small>{isLoggedIn ? "Hello" : "Hello, sign in"}</small>
          <b>Account & Lists</b>
        </Link>

        <Link to="/orders" className="nav-item">
          <small>Returns</small>
          <b>& Orders</b>
        </Link>

        <Link to="/wishlist" className="icon-link" aria-label="Wishlist">
          <Heart />
        </Link>

        <Link to="/cart" className="cart-link">
          <ShoppingCart />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          <b>Cart</b>
        </Link>
      </nav>

      <div className="sub-navbar">
        <Link to="/products">
          <Grid2X2 size={18} /> All
        </Link>
        <Link to="/products">Today&apos;s Deals</Link>
        <Link to="/products">Electronics</Link>
        <Link to="/products">Fashion</Link>
        <Link to="/products">Home</Link>
        <Link to="/products">Beauty</Link>
        <Link to="/products">Sports</Link>

        <div className="sub-right">
          <Link to="/admin">Admin</Link>
          <Link to="/orders">
            <Package size={17} /> Orders
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
