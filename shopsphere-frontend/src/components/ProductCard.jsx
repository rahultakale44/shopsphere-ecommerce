import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { formatPrice, getDiscount, getProductImage } from "../utils/products.js";

function ProductCard({ product, onAddToCart, onAddToWishlist, showAddButton = false }) {
  const discount = getDiscount(product);
  const displayPrice = product.discountPrice || product.price;

  return (
    <div className="product-card">
      <button
        className="wish-btn"
        type="button"
        aria-label="Add to wishlist"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onAddToWishlist?.(product.id);
        }}
      >
        <Heart size={20} />
      </button>

      {discount > 0 && <div className="discount">-{discount}%</div>}

      <Link to={`/products/${product.id}`} className="product-card-link">
        <img src={getProductImage(product)} alt={product.name} loading="lazy" />

        <p className="brand">{product.brand}</p>
        <h3>{product.name}</h3>

        {product.rating != null && (
          <div className="rating">
            {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))}{" "}
            <span>
              ({product.reviewCount?.toLocaleString("en-IN") ?? product.rating})
            </span>
          </div>
        )}

        <div className="price-row">
          <b>{formatPrice(displayPrice)}</b>
          {product.discountPrice && product.discountPrice < product.price && (
            <del>{formatPrice(product.price)}</del>
          )}
        </div>

        <p className="delivery">FREE delivery tomorrow</p>
      </Link>

      {showAddButton && (
        <button
          className="add-cart-btn"
          type="button"
          onClick={() => onAddToCart?.(product.id)}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
