import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>{t("footer.about.title")}</h5>
            <p>{t("footer.about.desc")}</p>
          </div>
          <div className="col-md-4">
            <h5>{t("footer.quickLinks.title")}</h5>
            <ul className="footer-links">
              <li>
                <a href="/">{t("footer.quickLinks.home")}</a>
              </li>
              <li>
                <a href="/market">{t("footer.quickLinks.supplements")}</a>
              </li>
              <li>
                <a href="/disease/predict">{t("footer.quickLinks.aiEngine")}</a>
              </li>
              <li>
                <a href="/crop/predict">
                  {t("footer.quickLinks.cropPrediction")}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>{t("footer.connect.title")}</h5>
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
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
