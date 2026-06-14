import { useEffect, useState } from "react";
import { Users, Package, ShoppingBag, IndianRupee } from "lucide-react";
import api from "../../api/axiosConfig.js";

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

const formatPrice = (amount) => {
  if (amount === null || amount === undefined) return "₹0";
  return `₹${Number(amount).toLocaleString("en-IN")}`;
};

function AdminDashboardHome() {
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [analyticsRes, ordersRes] = await Promise.all([
          api.get("/admin/analytics/dashboard"),
          api.get("/orders/admin"),
        ]);

        setAnalytics(analyticsRes.data);
        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data.slice(0, 5) : []);
      } catch (err) {
        console.log(err);
        setError("Unable to load dashboard. Please login as admin.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/admin/${orderId}/status?status=${status}`);

      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.log(err);
      alert("Failed to update order status");
    }
  };

  const cards = analytics
    ? [
        {
          label: "Total Users",
          value: analytics.totalUsers,
          icon: Users,
          color: "#3b82f6",
          growth: "+12.4%",
        },
        {
          label: "Total Products",
          value: analytics.totalProducts,
          icon: Package,
          color: "#8b5cf6",
          growth: "+3.1%",
        },
        {
          label: "Total Orders",
          value: analytics.totalOrders,
          icon: ShoppingBag,
          color: "#ff7a00",
          growth: "+8.7%",
        },
        {
          label: "Revenue",
          value: formatPrice(analytics.totalRevenue),
          icon: IndianRupee,
          color: "#10b981",
          growth: "+18.2%",
        },
      ]
    : [];

  if (loading) return <p className="page-message">Loading dashboard...</p>;

  if (error) {
    return (
      <div className="empty-state admin-empty">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-home">
      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back. Here&apos;s how your store is performing.</p>
        </div>
        <span className="admin-updated">Last updated just now</span>
      </div>

      <div className="analytics-grid admin-metrics">
        {cards.map(({ label, value, icon: Icon, color, growth }) => (
          <div className="analytics-card" key={label}>
            <div className="analytics-icon" style={{ background: color }}>
              <Icon size={24} color="#fff" />
            </div>

            <div>
              <p>{label}</p>
              <h2>{typeof value === "number" ? value.toLocaleString("en-IN") : value}</h2>
              <span className="metric-growth">{growth}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-panels">
        <section className="admin-panel chart-panel">
          <h2>Sales last 6 months</h2>

          <div className="sales-chart">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, index) => (
              <div className="chart-bar-wrap" key={month}>
                <div
                  className="chart-bar"
                  style={{ height: `${40 + index * 12}%` }}
                />
                <span>{month}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <h2>Recent orders</h2>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No orders yet</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.orderId}>
                      <td>ORD-{order.orderId}</td>
                      <td>{order.customerName || order.customerEmail || "Customer"}</td>
                      <td>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>{formatPrice(order.totalAmount)}</td>
                      <td>
                        <select
                          value={order.status || "PENDING"}
                          onChange={(e) =>
                            updateStatus(order.orderId, e.target.value)
                          }
                          className={`status-select ${
                            order.status ? order.status.toLowerCase() : "pending"
                          }`}
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboardHome;
