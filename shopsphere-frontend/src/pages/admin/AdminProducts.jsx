import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import api from "../../api/axiosConfig.js";
import { formatPrice, getProductImage, resolveProducts } from "../../utils/products.js";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/products");
        setProducts(resolveProducts(res.data.content || res.data));
      } catch {
        setProducts(resolveProducts([]));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.brand?.toLowerCase().includes(search.toLowerCase())
  );

  const getStockClass = (stock) => {
    if (stock == null) return "stock-ok";
    if (stock <= 10) return "stock-low";
    return "stock-ok";
  };

  return (
    <div className="admin-products-page">
      <div className="admin-page-header">
        <div>
          <h1>Products</h1>
          <p>{products.length} total</p>
        </div>
        <div className="admin-toolbar">
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button" className="admin-primary-btn">
            + New product
          </button>
        </div>
      </div>

      {loading ? (
        <p className="page-message">Loading products...</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-cell">
                      <img src={getProductImage(product)} alt={product.name} />
                      <div>
                        <b>{product.name}</b>
                        <span>{product.brand}</span>
                      </div>
                    </div>
                  </td>
                  <td>{product.category?.name || "General"}</td>
                  <td>{formatPrice(product.discountPrice || product.price)}</td>
                  <td>
                    <span className={`stock-badge ${getStockClass(product.stockQuantity)}`}>
                      {product.stockQuantity ?? 50}
                    </span>
                  </td>
                  <td>
                    {product.rating ?? 4.5} ★
                  </td>
                  <td>
                    <div className="table-actions">
                      <button type="button" aria-label="Edit">
                        <Pencil size={16} />
                      </button>
                      <button type="button" aria-label="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
