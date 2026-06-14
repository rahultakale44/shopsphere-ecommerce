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

const img = (file) => `/images/${file}`;

const IMAGE_BY_KEY = {
  headphones: img("headphones.jpg"),
  macbook: img("macbook.jpg"),
  nike: img("nike.jpg"),
  jeans: img("jeans.jpg"),
  instantPot: img("instantpot.jpg"),
  vacuum: img("vacuum.jpg"),
  kindle: img("kindle.jpg"),
  serum: img("serum.jpg"),
  smartBulb: img("smart-bulb.jpg"),
  fashion: img("fashion-spotlight.jpg"),
  electronics: img("cat-electronics.jpg"),
  fashionCat: img("cat-fashion.jpg"),
  home: img("cat-home.jpg"),
  beauty: img("cat-beauty.jpg"),
  sports: img("cat-sports.jpg"),
  books: img("cat-books.jpg"),
  toys: img("cat-toys.jpg"),
  grocery: img("cat-grocery.jpg"),
  hero: img("hero.jpg"),
  default: img("default.jpg"),
};

export const HERO_IMAGE = IMAGE_BY_KEY.hero;

export const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    price: 39999,
    discountPrice: 32999,
    rating: 4.7,
    reviewCount: 2341,
    imageUrl: IMAGE_BY_KEY.headphones,
  },
  {
    id: 2,
    name: "Apple MacBook Air M3 13-inch",
    brand: "Apple",
    price: 119900,
    discountPrice: 109900,
    rating: 4.8,
    reviewCount: 1502,
    imageUrl: IMAGE_BY_KEY.macbook,
  },
  {
    id: 3,
    name: "Nike Air Zoom Pegasus 40 Running Shoes",
    brand: "Nike",
    price: 15000,
    discountPrice: 12999,
    rating: 4.5,
    reviewCount: 884,
    imageUrl: IMAGE_BY_KEY.nike,
  },
  {
    id: 4,
    name: "Levi's 511 Slim Fit Jeans",
    brand: "Levi's",
    price: 6999,
    discountPrice: 5999,
    rating: 4.3,
    reviewCount: 5310,
    imageUrl: IMAGE_BY_KEY.jeans,
  },
  {
    id: 5,
    name: "Instant Pot Duo 7-in-1 Pressure Cooker",
    brand: "Instant Pot",
    price: 11999,
    discountPrice: 8999,
    rating: 4.6,
    reviewCount: 12230,
    imageUrl: IMAGE_BY_KEY.instantPot,
  },
  {
    id: 6,
    name: "Dyson V15 Detect Cordless Vacuum",
    brand: "Dyson",
    price: 74999,
    discountPrice: 64999,
    rating: 4.6,
    reviewCount: 932,
    imageUrl: IMAGE_BY_KEY.vacuum,
  },
  {
    id: 7,
    name: "Nike Air Zoom Pegasus 40 Running Shoes",
    brand: "Nike",
    price: 15000,
    discountPrice: 12999,
    rating: 4.5,
    reviewCount: 884,
    imageUrl: IMAGE_BY_KEY.nike,
  },
  {
    id: 8,
    name: "Levi's 511 Slim Fit Jeans",
    brand: "Levi's",
    price: 6999,
    discountPrice: 5999,
    rating: 4.3,
    reviewCount: 5310,
    imageUrl: IMAGE_BY_KEY.jeans,
  },
  {
    id: 9,
    name: "Instant Pot Duo 7-in-1 Pressure Cooker",
    brand: "Instant Pot",
    price: 11999,
    discountPrice: 8999,
    rating: 4.6,
    reviewCount: 12230,
    imageUrl: IMAGE_BY_KEY.instantPot,
  },
  {
    id: 10,
    name: "Dyson V15 Detect Cordless Vacuum",
    brand: "Dyson",
    price: 74999,
    discountPrice: 64999,
    rating: 4.6,
    reviewCount: 932,
    imageUrl: IMAGE_BY_KEY.vacuum,
  },
  {
    id: 11,
    name: "Kindle Paperwhite (16 GB)",
    brand: "Amazon",
    price: 14999,
    discountPrice: 12999,
    rating: 4.4,
    reviewCount: 6712,
    imageUrl: IMAGE_BY_KEY.kindle,
  },
  {
    id: 12,
    name: "L'Oréal Hyaluronic Acid Serum",
    brand: "L'Oréal",
    price: 2499,
    discountPrice: 1899,
    rating: 4.2,
    reviewCount: 4012,
    imageUrl: IMAGE_BY_KEY.serum,
  },
];

export const DEALS_PRODUCTS = FALLBACK_PRODUCTS.slice(0, 6);
export const TOP_PICKS_PRODUCTS = FALLBACK_PRODUCTS.slice(6, 12);

export const FEATURED_SPOTLIGHT = [
  {
    id: "hue",
    title: "Philips Hue Smart Bulb Starter Kit",
    subtitle: "Smart home lighting",
    imageUrl: IMAGE_BY_KEY.smartBulb,
  },
  {
    id: "fashion",
    title: "Trending fashion picks",
    subtitle: "Nike & Levi's bestsellers",
    imageUrl: IMAGE_BY_KEY.fashion,
  },
];

export const CATEGORIES = [
  { name: "Electronics", imageUrl: IMAGE_BY_KEY.electronics },
  { name: "Fashion", imageUrl: IMAGE_BY_KEY.fashionCat },
  { name: "Home", imageUrl: IMAGE_BY_KEY.home },
  { name: "Beauty", imageUrl: IMAGE_BY_KEY.beauty },
  { name: "Sports", imageUrl: IMAGE_BY_KEY.sports },
  { name: "Books", imageUrl: IMAGE_BY_KEY.books },
  { name: "Toys", imageUrl: IMAGE_BY_KEY.toys },
  { name: "Grocery", imageUrl: IMAGE_BY_KEY.grocery },
];

function hasValidImage(product) {
  const url = product?.imageUrl;
  return Boolean(url?.startsWith("http") || url?.startsWith("/images/"));
}

export function getProductImage(product) {
  if (hasValidImage(product)) return product.imageUrl;

  const name = `${product?.brand || ""} ${product?.name || product?.productName || ""}`.toLowerCase();
  if (name.includes("sony") || name.includes("headphone")) return IMAGE_BY_KEY.headphones;
  if (name.includes("macbook") || name.includes("iphone") || name.includes("apple"))
    return IMAGE_BY_KEY.macbook;
  if (name.includes("nike") || name.includes("shoe")) return IMAGE_BY_KEY.nike;
  if (name.includes("levi") || name.includes("jean")) return IMAGE_BY_KEY.jeans;
  if (name.includes("instant pot") || name.includes("cooker")) return IMAGE_BY_KEY.instantPot;
  if (name.includes("dyson") || name.includes("vacuum")) return IMAGE_BY_KEY.vacuum;
  if (name.includes("kindle") || name.includes("book")) return IMAGE_BY_KEY.kindle;
  if (name.includes("l'oréal") || name.includes("serum") || name.includes("beauty"))
    return IMAGE_BY_KEY.serum;

  return IMAGE_BY_KEY.default;
}

export function enrichProduct(product) {
  return {
    ...product,
    imageUrl: getProductImage(product),
    rating: product.rating ?? 4.5,
    reviewCount: product.reviewCount ?? 500,
  };
}

export function resolveProducts(apiProducts) {
  const list = Array.isArray(apiProducts) ? apiProducts : [];
  const validCount = list.filter(hasValidImage).length;

  if (list.length >= 6 && validCount >= 6) {
    return list.map(enrichProduct);
  }

  return FALLBACK_PRODUCTS;
}
