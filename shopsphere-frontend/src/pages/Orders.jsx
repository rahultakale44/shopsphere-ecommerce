import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import api from "../api/axiosConfig.js";
import { formatPrice } from "../utils/products.js";

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

              {order.items?.map((item) => (
                <div className="order-item" key={`${order.orderId}-${item.productId}`}>
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/120"}
                    alt={item.productName}
                  />
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
