import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Service() {
  const { t } = useTranslation();

  return (
    <div className="row mb-5">
      {["disease", "crop", "yield"].map((item, index) => (
        <div key={item} className="col-lg-4 mb-4">
          <div className={`card-dark animate-fade-in animate-delay-${index + 2} animate-float h-100`}>
            <div className="card-body p-4 text-center">
              <div className="icon-circle mb-4 mx-auto">
                <i className={`fas fa-${t(`services.${item}.icon`)} fa-2x`} style={{ color: "var(--primary-color)" }}></i>
              </div>
              <h3 style={{ color: "var(--primary-color)", fontWeight: 600, marginBottom: "15px" }}>
                {t(`services.${item}.title`)}
              </h3>
              <p style={{ color: "var(--secondary-color)", marginBottom: "25px" }}>
                {t(`services.${item}.desc`)}
              </p>
              <Link to={`/${item}/predict`} className="btn-primary-gradient animate-pulse">
                <span style={{ fontSize: "16px" }}>{t("services.startNow")}</span>
                <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Service;
