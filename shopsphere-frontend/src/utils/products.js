export function formatPrice(price) {
  if (price == null) return "₹0";
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export function getDiscount(product) {
  const price = Number(product.price);
  const discountPrice = Number(product.discountPrice);
  if (price > 0 && discountPrice > 0 && discountPrice < price) {
    return Math.round(((price - discountPrice) / price) * 100);
  }
  return 0;
}

export const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    price: 39999,
    discountPrice: 32999,
    rating: 4.7,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Nike Air Zoom Pegasus 40 Running Shoes",
    brand: "Nike",
    price: 15000,
    discountPrice: 12999,
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Apple MacBook Air M3 13-inch",
    brand: "Apple",
    price: 119900,
    discountPrice: 109900,
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Levi's 511 Slim Fit Jeans",
    brand: "Levi's",
    price: 6999,
    discountPrice: 5999,
    rating: 4.3,
    imageUrl:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Dyson V15 Detect Cordless Vacuum",
    brand: "Dyson",
    price: 74999,
    discountPrice: 64999,
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Kindle Paperwhite (16 GB)",
    brand: "Amazon",
    price: 14999,
    discountPrice: 12999,
    rating: 4.4,
    imageUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
  },
];

export const CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Books",
];
