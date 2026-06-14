import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, MapPin, Package } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import api from "../api/axiosConfig.js";
import { useApp } from "../context/AppContext.jsx";
import { formatPrice, getProductImage } from "../utils/products.js";

function Checkout() {
  const navigate = useNavigate();
  const { refreshCartCount } = useApp();
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    line1: "123 Main Street",
    city: "New York",
    pincode: "10001",
  });

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch {
      alert("Please login to checkout");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const placeOrder = async () => {
    if (!address.name.trim() || !address.phone.trim()) {
      alert("Please enter your name and phone number");
      return;
    }

    setPlacing(true);
    try {
      const res = await api.post("/orders/place");
      await refreshCartCount();
      setPlacedOrder(res.data);
    } catch {
      alert("Order failed. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="checkout-page">
          <p className="page-message">Loading checkout...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (placedOrder) {
    return (
      <>
        <Navbar />
        <div className="checkout-page">
          <div className="checkout-success">
            <CheckCircle2 size={64} color="#10b981" />
            <h1>Order placed successfully!</h1>
            <p>
              Your order <b>#{placedOrder.orderId}</b> has been confirmed and is
              being processed.
            </p>
            <p className="success-total">
              Total paid: {formatPrice(placedOrder.totalAmount)}
            </p>
            <div className="success-actions">
              <button type="button" onClick={() => navigate("/orders")}>
                Track order
              </button>
              <button type="button" className="secondary" onClick={() => navigate("/products")}>
                Continue shopping
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!cart.items?.length) {
    return (
      <>
        <Navbar />
        <div className="checkout-page">
          <div className="empty-state">
            <p>Your cart is empty.</p>
            <button type="button" onClick={() => navigate("/products")}>
              Continue shopping
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar />

      <div className="checkout-page">
        <h1>Checkout</h1>
        <p className="checkout-subtitle">Review your order and complete purchase</p>

        <div className="checkout-layout">
          <div className="checkout-main">
            <section className="checkout-card">
              <h2>
                <MapPin size={20} /> Delivery address
              </h2>
              <div className="checkout-form">
                <input
                  placeholder="Full name"
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                />
                <input
                  placeholder="Phone number"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                />
                <input
                  placeholder="Address line"
                  value={address.line1}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                />
                <div className="form-row">
                  <input
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                  <input
                    placeholder="Pincode"
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  />
                </div>
              </div>
            </section>

            <section className="checkout-card">
              <h2>
                <Package size={20} /> Order items ({itemCount})
              </h2>
              {cart.items.map((item) => (
                <div className="checkout-item" key={item.cartItemId}>
                  <img
                    src={getProductImage(item)}
                    alt={item.productName}
                  />
                  <div>
                    <h4>{item.productName}</h4>
                    <p>{item.brand}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <b>{formatPrice(item.totalPrice || item.price * item.quantity)}</b>
                </div>
              ))}
            </section>
          </div>

          <aside className="checkout-summary">
            <h3>Order summary</h3>
            <div className="summary-row">
              <span>Items ({itemCount})</span>
              <span>{formatPrice(cart.totalAmount)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>{formatPrice(cart.totalAmount)}</span>
            </div>
            <button type="button" disabled={placing} onClick={placeOrder}>
              {placing ? "Placing order..." : "Place order"}
            </button>
            <button type="button" className="secondary" onClick={() => navigate("/cart")}>
              Back to cart
            </button>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
