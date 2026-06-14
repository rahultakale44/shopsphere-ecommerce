import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Circle, Package, Truck } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import api from "../api/axiosConfig.js";
import { formatPrice, getProductImage } from "../utils/products.js";

const TRACKING_STEPS = [
  { key: "PENDING", label: "Order placed" },
  { key: "CONFIRMED", label: "Confirmed" },
  { key: "SHIPPED", label: "Shipped" },
  { key: "DELIVERED", label: "Delivered" },
];

function getStepIndex(status) {
  if (status === "CANCELLED") return -1;
  const idx = TRACKING_STEPS.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 0;
}

function OrderTracker({ status }) {
  if (status === "CANCELLED") {
    return <p className="order-cancelled">This order was cancelled.</p>;
  }

  const current = getStepIndex(status);

  return (
    <div className="order-tracker">
      {TRACKING_STEPS.map((step, index) => {
        const done = index <= current;
        const active = index === current;
        return (
          <div className={`tracker-step ${done ? "done" : ""} ${active ? "active" : ""}`} key={step.key}>
            <div className="tracker-icon">
              {done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </div>
            <span>{step.label}</span>
            {index < TRACKING_STEPS.length - 1 && <div className="tracker-line" />}
          </div>
        );
      })}
    </div>
  );
}

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch {
      alert("Please login to view orders");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <Navbar />

      <div className="orders-page">
        <h1>My Orders</h1>
        <p className="orders-subtitle">Track and manage your purchases</p>

        {loading ? (
          <p className="page-message">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <p>No orders found.</p>
            <button type="button" onClick={() => navigate("/products")}>
              Start shopping
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order.orderId}>
              <div className="order-header">
                <div>
                  <h3>Order #{order.orderId}</h3>
                  <p>{formatDate(order.createdAt)}</p>
                </div>
                <span className={`status ${order.status?.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <OrderTracker status={order.status} />

              <div className="order-status-icons">
                <span>
                  <Package size={16} /> {order.items?.length ?? 0} item(s)
                </span>
                {order.status === "SHIPPED" || order.status === "DELIVERED" ? (
                  <span>
                    <Truck size={16} /> Out for delivery
                  </span>
                ) : null}
              </div>

              {order.items?.map((item) => (
                <div className="order-item" key={`${order.orderId}-${item.productId}`}>
                  <img src={getProductImage(item)} alt={item.productName} />
                  <div>
                    <h4>{item.productName}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <b>{formatPrice(item.price)}</b>
                  </div>
                </div>
              ))}

              <div className="order-total">
                Total: {formatPrice(order.totalAmount)}
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default Orders;
