import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

function NavBar() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");
  const navbarCollapseRef = useRef(null);

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const closeNavbar = () => {
    // Use Bootstrap's collapse API to hide the navbar
    if (navbarCollapseRef.current) {
      const bsCollapse = new window.bootstrap.Collapse(
        navbarCollapseRef.current,
        {
          toggle: false,
        }
      );
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link
          className="navbar-brand animate-fade-in"
          to="/"
          onClick={closeNavbar}
        >
          <span>Agro</span>Guide
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          ref={navbarCollapseRef}
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item animate-fade-in animate-delay-1">
              <Link className="nav-link" to="/" onClick={closeNavbar}>
                {t("home")}
              </Link>
            </li>
            <li className="nav-item animate-fade-in animate-delay-2">
              <Link className="nav-link" to="/market" onClick={closeNavbar}>
                {t("supplements")}
              </Link>
            </li>
            <li className="nav-item animate-fade-in animate-delay-3">
              <Link
                className="nav-link"
                to="/disease/predict"
                onClick={closeNavbar}
              >
                {t("ai_engine")}
              </Link>
            </li>
            <li className="nav-item animate-fade-in animate-delay-4">
              <Link
                className="nav-link"
                to="/crop/predict"
                onClick={closeNavbar}
              >
                {t("crop_suggestion")}
              </Link>
            </li>
            <li className="nav-item animate-fade-in animate-delay-4">
              <Link
                className="nav-link"
                to="/yield/predict"
                onClick={closeNavbar}
              >
                {t("yield_prediction")}
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center ms-lg-3">
            <div className="nav-item me-3 animate-fade-in animate-delay-5">
              <div className="language-selector input-group">
                <select
                  className="form-select"
                  value={language}
                  onChange={handleLanguageChange}
                >
                  <option value="en">English</option>
                  <option value="te">తెలుగు</option>
                  <option value="hi">हिंदी</option>
                  <option value="or">ଓଡ଼ିଆ</option>
                </select>
              </div>
            </div>
            <Link
              className="contact-btn nav-link animate-fade-in animate-delay-5"
              to="/contact"
              onClick={closeNavbar}
            >
              {t("contact_us")}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
