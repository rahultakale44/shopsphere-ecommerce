import { useEffect, useState } from "react";
import api from "../../api/axiosConfig.js";
import { formatPrice, getProductImage } from "../../utils/products.js";

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/orders/admin");
        setOrders(res.data);
      } catch {
        alert("Please login to view admin orders");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const res = await api.put(`/orders/admin/${orderId}/status?status=${status}`);
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? res.data : o))
      );
    } catch {
      alert("Failed to update status");
    }
  };

  if (loading) return <p className="page-message">Loading orders...</p>;

  return (
    <div className="admin-orders-page">
      <div className="admin-page-header">
        <div>
          <h1>Orders</h1>
          <p>{orders.length} total orders</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state admin-empty">
          <p>No orders placed yet.</p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order) => (
            <div className="admin-order-card" key={order.orderId}>
              <div className="admin-order-head">
                <div>
                  <h3>ORD-{order.orderId}</h3>
                  <p>
                    {order.customerName} · {order.customerEmail}
                  </p>
                  <p className="order-date">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : ""}
                  </p>
                </div>
                <div className="admin-order-meta">
                  <b>{formatPrice(order.totalAmount)}</b>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.orderId, e.target.value)}
                    className={`status-select ${order.status?.toLowerCase()}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="view-details-btn"
                    onClick={() =>
                      setExpanded(expanded === order.orderId ? null : order.orderId)
                    }
                  >
                    {expanded === order.orderId ? "Hide" : "View"} details
                  </button>
                </div>
              </div>

              {expanded === order.orderId && (
                <div className="admin-order-items">
                  {order.items?.map((item) => (
                    <div className="admin-order-item" key={item.productId}>
                      <img src={getProductImage(item)} alt={item.productName} />
                      <div>
                        <b>{item.productName}</b>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
