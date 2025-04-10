import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function NavBar() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand animate-fade-in" href="/">
          <span>Agro</span>Guide
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item animate-fade-in animate-delay-1">
              <Link className="nav-link" to="/">{t("home")}</Link>
            </li>
            <li className="nav-item animate-fade-in animate-delay-2">
              <Link className="nav-link" to="/market">{t("supplements")}</Link>
            </li>
            <li className="nav-item animate-fade-in animate-delay-3">
              <Link className="nav-link" to="/disease/predict">{t("ai_engine")}</Link>
            </li>
            <li className="nav-item animate-fade-in animate-delay-4">
              <Link className="nav-link" to="/crop/predict">{t("crop_suggestion")}</Link>
            </li>
            <li className="nav-item animate-fade-in animate-delay-4">
              <Link className="nav-link" to="/yield/predict">{t("yield_prediction")}</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-3 animate-fade-in animate-delay-5">
              <select
                className="form-select"
                value={language}
                onChange={handleLanguageChange}
                style={{ width: "140px", fontSize: "0.9rem" }}
              >
                <option value="en">🌐 English</option>
                <option value="te">తెలుగు</option>
                <option value="hi">हिंदी</option>
                <option value="or">ଓଡ଼ିଆ</option>
              </select>
            </li>
            <li className="nav-item animate-fade-in animate-delay-5">
              <Link className="nav-link contact-btn" to="/contact">{t("contact_us")}</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
