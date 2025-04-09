
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>AgroGuide</h5>
            <p>Empowering farmers with innovative solutions and technology.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/market">Supplements</a>
              </li>
              <li>
                <a href="/disease/predict">AI Engine</a>
              </li>
              <li>
                <a href="/crop/predict">Crop Prediction</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Connect With Us</h5>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2025 AgroGuide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
