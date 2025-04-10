import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function CallToAction() {
  const { t } = useTranslation();

  return (
    <div className="row mb-5">
      <div className="col-12">
        <div
          className="card-dark animate-fade-in animate-delay-9"
          style={{
            background: "linear-gradient(to right, rgba(255, 125, 59, 0.2), rgba(255, 80, 80, 0.2))",
          }}
        >
          <div className="card-body p-5 text-center">
            <h2 style={{ color: "var(--primary-color)", fontWeight: 700, marginBottom: "20px" }}>
              {t("cta.title")}
            </h2>
           
            <div className="d-flex justify-content-center gap-3">
              <Link to="/contact" className="btn-primary-gradient animate-pulse">
                <i className="fas fa-envelope me-2"></i> {t("cta.contact")}
              </Link>
              <Link to="/register" className="btn btn-outline-light animate-pulse">
                <i className="fas fa-user-plus me-2"></i> {t("cta.register")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
