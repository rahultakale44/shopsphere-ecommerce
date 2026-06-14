import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag } from "lucide-react";
import Navbar from "./Navbar.jsx";

function AdminLayout() {
  return (
    <>
      <Navbar />
      <div className="admin-shell">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <b>ShopSphere</b>
            <span>Admin Console</span>
          </div>
          <nav>
            <NavLink to="/admin" end>
              <LayoutDashboard size={18} /> Dashboard
            </NavLink>
            <NavLink to="/admin/products">
              <Package size={18} /> Products
            </NavLink>
            <NavLink to="/admin/orders">
              <ShoppingBag size={18} /> Orders
            </NavLink>
          </nav>
        </aside>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
