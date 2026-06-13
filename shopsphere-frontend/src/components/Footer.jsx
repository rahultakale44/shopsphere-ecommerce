function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer>
      <button type="button" className="back-top" onClick={scrollToTop}>
        Back to top
      </button>

      <div className="footer-links">
        <div>
          <h4>Get to Know Us</h4>
          <p>About ShopSphere</p>
          <p>Careers</p>
          <p>Press Releases</p>
          <p>Sustainability</p>
        </div>

        <div>
          <h4>Make Money with Us</h4>
          <p>Sell on ShopSphere</p>
          <p>Affiliate Program</p>
          <p>Advertise</p>
          <p>Self-Publish</p>
        </div>

        <div>
          <h4>Payment Products</h4>
          <p>Business Card</p>
          <p>Reload Balance</p>
          <p>Currency Converter</p>
          <p>Gift Cards</p>
        </div>

        <div>
          <h4>Let Us Help You</h4>
          <p>Your Account</p>
          <p>Your Orders</p>
          <p>Shipping Rates</p>
          <p>Returns</p>
        </div>
      </div>

      <div className="footer-bottom">
        Shop<span>Sphere</span>
        <p>© 2026 ShopSphere, Inc. — Conditions of Use · Privacy Notice</p>
      </div>
    </footer>
  );
}

export default Footer;
