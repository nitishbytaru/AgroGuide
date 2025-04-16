import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DiseaseOutput() {
  const { t } = useTranslation();
  const location = useLocation();
  const { title, pred, image_url, desc, prevent, simage, sname, buy_link } =
    location.state;

  const isHealthy = [3, 5, 7, 11, 15, 18, 20, 23, 24, 25, 28, 38].includes(
    pred
  );

  return (
    <div className="container">
      <div className="row mb-4 text-center">
        <div className="col-lg-8 mx-auto">
          <h2
            className="display-5 animate-fade-in"
            style={{
              marginTop: "30px",
              fontWeight: 600,
              color: "var(--primary-color)",
            }}
          >
            <b>{title}</b>
          </h2>
          <p
            className="lead animate-fade-in animate-delay-1"
            style={{ color: "var(--secondary-color)", marginTop: "10px" }}
          >
            {isHealthy
              ? t("disease.result_healthy")
              : t("disease.result_diseased")}
          </p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-lg-5 mx-auto">
          <div
            className="card-dark animate-fade-in animate-glow"
            style={{ overflow: "hidden" }}
          >
            <div className="card-body p-3 text-center">
              <img
                src={image_url}
                className="img-fluid animate-zoom-in"
                style={{ borderRadius: "10px", maxHeight: "350px" }}
                alt="Plant"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card-dark animate-fade-in animate-delay-2">
            <div className="card-body p-4">
              <h4
                style={{ color: "var(--primary-color)", marginBottom: "20px" }}
              >
                {isHealthy
                  ? t("disease.desc_title_healthy")
                  : t("disease.desc_title_diseased")}
              </h4>
              <p id="content" style={{ lineHeight: "1.8" }}>
                {desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card-dark animate-fade-in-left animate-delay-3">
            <div className="card-body p-4">
              <h4
                style={{ color: "var(--primary-color)", marginBottom: "20px" }}
              >
                {isHealthy
                  ? t("disease.prevent_title_healthy")
                  : t("disease.prevent_title_diseased")}
              </h4>
              <div style={{ lineHeight: "1.8" }}>{prevent}</div>
            </div>
          </div>
        </div>

        {pred !== 4 && (
          <div className="col-md-6 mb-4">
            <div className="card-dark animate-fade-in-right animate-delay-4 text-center">
              <div className="card-body p-4">
                <h4
                  style={{
                    color: "var(--primary-color)",
                    marginBottom: "25px",
                  }}
                >
                  {isHealthy
                    ? t("disease.recommend_title_healthy")
                    : t("disease.recommend_title_diseased")}
                </h4>
                <div
                  className="product-image animate-float"
                  style={{ marginBottom: "20px" }}
                >
                  <img
                    src={simage}
                    style={{
                      maxHeight: "200px",
                      borderRadius: "8px",
                      boxShadow: "var(--shadow)",
                    }}
                    alt="Product"
                  />
                </div>
                <h5 id="content" style={{ marginBottom: "25px" }}>
                  {sname}
                </h5>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={buy_link}
                  className="btn-primary-gradient animate-pulse"
                >
                  <i className="fas fa-shopping-cart me-2"></i>{" "}
                  {t("disease.buy")}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="row mb-5">
        <div className="col-12">
          <div className="card-dark animate-fade-in animate-delay-5">
            <div className="card-body p-4 text-center">
              <h4
                style={{ color: "var(--primary-color)", marginBottom: "20px" }}
              >
                {t("disease.more_help_title")}
              </h4>
              <p className="mb-4">{t("disease.more_help_text")}</p>
              <div className="d-flex justify-content-center gap-3">
                <a href="/contact" className="btn-primary-gradient">
                  <i className="fas fa-envelope me-2"></i>{" "}
                  {t("disease.contact_us")}
                </a>
                <a href="/market" className="btn btn-outline-light">
                  <i className="fas fa-leaf me-2"></i>{" "}
                  {t("disease.view_products")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseOutput;
