import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Package, ShoppingBag, IndianRupee } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import api from "../api/axiosConfig.js";
import { formatPrice } from "../utils/products.js";

function AdminDashboard() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/admin/analytics/dashboard");
        setAnalytics(res.data);
      } catch {
        setError("Unable to load analytics. Please login as admin.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const cards = analytics
    ? [
        {
          label: "Total Users",
          value: analytics.totalUsers?.toLocaleString(),
          icon: Users,
          color: "#3b82f6",
        },
        {
          label: "Total Products",
          value: analytics.totalProducts?.toLocaleString(),
          icon: Package,
          color: "#8b5cf6",
        },
        {
          label: "Total Orders",
          value: analytics.totalOrders?.toLocaleString(),
          icon: ShoppingBag,
          color: "#ff7a00",
        },
        {
          label: "Total Revenue",
          value: formatPrice(analytics.totalRevenue),
          icon: IndianRupee,
          color: "#10b981",
        },
      ]
    : [];

  return (
    <>
      <Navbar />

      <div className="admin-page">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>ShopSphere analytics overview</p>
          </div>
          <button type="button" onClick={() => navigate("/products")}>
            View storefront
          </button>
        </div>

        {loading ? (
          <p className="page-message">Loading analytics...</p>
        ) : error ? (
          <div className="empty-state">
            <p>{error}</p>
            <button type="button" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </div>
        ) : (
          <div className="analytics-grid">
            {cards.map(({ label, value, icon: Icon, color }) => (
              <div className="analytics-card" key={label}>
                <div className="analytics-icon" style={{ background: color }}>
                  <Icon size={28} color="#fff" />
                </div>
                <div>
                  <p>{label}</p>
                  <h2>{value}</h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default AdminDashboard;
