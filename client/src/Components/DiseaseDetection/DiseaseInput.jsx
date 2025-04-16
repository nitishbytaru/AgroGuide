import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { diseaseDetection } from "../../API/api";
import { useTranslation } from "react-i18next";

function DiseaseInput() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!selectedFile) {
      setError(t("disease.error_no_file"));
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await diseaseDetection(formData);
      navigate("/disease/result", { state: response.data });
    } catch (err) {
      setError(err.response?.data?.message || t("disease.error_general"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row mb-5 text-center">
        <div className="col-lg-10 mx-auto">
          <h1
            className="display-4 animate-fade-in"
            style={{
              marginTop: "30px",
              fontWeight: 600,
              color: "var(--primary-color)",
            }}
          >
            <b>{t("disease.title")}</b>
          </h1>
          <p
            className="lead animate-fade-in animate-delay-2"
            style={{ fontWeight: 500, marginTop: "15px" }}
          >
            {t("disease.subtitle")}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card-dark animate-fade-in-right animate-glow">
            <div className="card-body">
              <h4
                className="text-center"
                style={{ color: "var(--primary-color)", marginBottom: "30px" }}
              >
                {t("disease.upload_title")}
              </h4>
              <p
                className="text-center mb-4"
                style={{ color: "var(--secondary-color)" }}
              >
                {t("disease.upload_sub")}
              </p>

              <form onSubmit={handleSubmit} className="text-center">
                <div className="custom-file overflow-hidden mb-4">
                  <input
                    type="file"
                    id="actual-btn"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="actual-btn" className="animate-pulse">
                    <i className="fas fa-upload me-2"></i>{" "}
                    {t("disease.choose_file")}
                  </label>
                  <span
                    id="file-chosen"
                    style={{
                      color: selectedFile ? "var(--primary-color)" : "inherit",
                      display: "block",
                      marginTop: "8px",
                    }}
                  >
                    {selectedFile ? selectedFile.name : t("disease.no_file")}
                  </span>
                </div>

                {error && (
                  <div
                    className="alert alert-danger py-1 px-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary-gradient animate-pulse"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      {t("disease.processing")}
                    </>
                  ) : (
                    <>
                      <i className="fas fa-search me-2"></i>{" "}
                      {t("disease.analyze")}
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                  <i className="fas fa-info-circle me-2"></i>{" "}
                  {t("disease.supported_formats")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card-dark animate-fade-in-left">
            <div className="card-body">
              <h4
                style={{ color: "var(--primary-color)", marginBottom: "20px" }}
              >
                {t("disease.why_detect_title")}
              </h4>
              <ul
                style={{
                  color: "var(--secondary-color)",
                  marginBottom: "20px",
                }}
              >
                {t("disease.why_detect_points", { returnObjects: true }).map(
                  (point, index) => (
                    <li key={index}>{point}</li>
                  )
                )}
              </ul>
              <p>{t("disease.why_detect_desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseInput;
