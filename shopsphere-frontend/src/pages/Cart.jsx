import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import api from "../api/axiosConfig.js";
import { useApp } from "../context/AppContext.jsx";
import { formatPrice, getProductImage } from "../utils/products.js";

function Cart() {
  const navigate = useNavigate();
  const { refreshCartCount } = useApp();
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch {
      alert("Please login to view your cart");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await api.delete(`/cart/remove/${cartItemId}`);
      await fetchCart();
      await refreshCartCount();
    } catch {
      alert("Failed to remove item");
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const res = await api.put(`/cart/item/${cartItemId}?quantity=${quantity}`);
      setCart(res.data);
      await refreshCartCount();
    } catch {
      alert("Failed to update quantity");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const itemCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <h1>Shopping Cart</h1>

        {loading ? (
          <p className="page-message">Loading cart...</p>
        ) : cart.items.length === 0 ? (
          <div className="empty-state">
            <p>Your cart is empty.</p>
            <button type="button" onClick={() => navigate("/products")}>
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-panel">
              <div className="cart-items-header">
                <span>Shopping Cart</span>
                <span>Price</span>
              </div>

              {cart.items.map((item) => (
                <div className="cart-item" key={item.cartItemId}>
                  <img
                    src={getProductImage(item)}
                    alt={item.productName}
                  />

                  <div className="cart-item-info">
                    <h3>{item.productName}</h3>
                    <p>{item.brand}</p>
                    <p className="in-stock">In Stock — Eligible for FREE shipping</p>

                    <div className="quantity-controls cart-qty">
                      <span>Qty:</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeItem(item.cartItemId)}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>

                  <div className="cart-item-price">
                    <b>{formatPrice(item.totalPrice || item.price * item.quantity)}</b>
                  </div>
                </div>
              ))}

              <div className="cart-subtotal">
                Subtotal ({itemCount} items):{" "}
                <b>{formatPrice(cart.totalAmount)}</b>
              </div>
            </div>

            <div className="cart-summary">
              <p className="free-shipping">
                ✓ Your order qualifies for FREE shipping over ₹499.
              </p>
              <p>
                Subtotal: <b>{formatPrice(cart.totalAmount)}</b>
              </p>
              <p>Shipping: FREE</p>
              <h3>
                Order total <span>{formatPrice(cart.totalAmount)}</span>
              </h3>
              <button type="button" onClick={() => navigate("/checkout")}>
                Proceed to checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;
