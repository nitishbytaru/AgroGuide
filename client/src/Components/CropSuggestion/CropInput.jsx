import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cropSuggestions } from "../../API/api";

function crop_prediction() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const numericData = {
      ...data,
      N: parseFloat(data.N),
      P: parseFloat(data.P),
      K: parseFloat(data.K),
      ph: parseFloat(data.ph),
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
    };

    try {
      const response = await cropSuggestions(numericData);
      navigate("/crop/result", { state: response.data });
    } catch (error) {
      setError(error.response?.data?.message || "Some error occured");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row mb-4 text-center">
        <div className="col-lg-10 mx-auto">
          <h2
            className="display-5 animate-fade-in"
            style={{
              marginTop: 30,
              fontWeight: 600,
              color: "var(--primary-color)",
            }}
          >
            <b>{t("crop_prediction.title")}</b>
          </h2>
          <p
            className="lead animate-fade-in animate-delay-1"
            style={{ color: "var(--secondary-color)", marginTop: 10 }}
          >
            {t("crop_prediction.subtitle")}
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card-dark animate-fade-in animate-delay-2">
            <div className="card-body p-4">
              <h4 style={{ color: "var(--primary-color)", marginBottom: 25 }}>
                {t("crop_prediction.enter_soil_params")}
              </h4>
              <form onSubmit={handleSubmit} className="crop-form">
                <div className="row">
                  {[
                    {
                      key: "nitrogen",
                      placeholder: "n_hint",
                      name: "N",
                      min: 0,
                      max: 200,
                    },
                    {
                      key: "phosphorus",
                      placeholder: "p_hint",
                      name: "P",
                      min: 0,
                      max: 150,
                    },
                    {
                      key: "potassium",
                      placeholder: "k_hint",
                      name: "K",
                      min: 0,
                      max: 200,
                    },
                    {
                      key: "ph",
                      placeholder: "ph_hint",
                      name: "ph",
                      min: 3,
                      max: 9,
                      step: 0.01,
                    },
                  ].map(({ key, name, min, max, step, placeholder }) => (
                    <div className="col-md-6 mb-3" key={name}>
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id={name}
                          name={name}
                          min={min}
                          max={max}
                          step={step || 1}
                          required
                          placeholder=" "
                        />
                        <label htmlFor={name}>
                          {t(`crop_prediction.${key}`)}
                        </label>
                      </div>
                      <div
                        className="form-text"
                        style={{
                          color: "var(--text-muted)",
                          fontSize: "0.75rem",
                          marginTop: "0.25rem",
                          paddingLeft: "0.5rem",
                        }}
                      >
                        {t(`crop_prediction.${placeholder}`)}
                      </div>
                    </div>
                  ))}
                </div>

                <h4
                  style={{
                    color: "var(--primary-color)",
                    margin: "20px 0 25px",
                  }}
                >
                  {t("crop_prediction.location_info")}
                </h4>
                <div className="row">
                  {[
                    { key: "latitude", placeholder: "lat_hint" },
                    { key: "longitude", placeholder: "long_hint" },
                  ].map(({ key, placeholder }) => {
                    const min = key === "latitude" ? -90 : -180;
                    const max = key === "latitude" ? 90 : 180;
                    return (
                      <div className="col-md-6 mb-3" key={key}>
                        <div className="form-floating">
                          <input
                            type="number"
                            className="form-control"
                            id={key}
                            name={key}
                            min={min}
                            max={max}
                            step={0.0001}
                            required
                            placeholder=" "
                          />
                          <label htmlFor={key}>
                            {t(`crop_prediction.${key}`)}
                          </label>
                        </div>
                        <div
                          className="form-text"
                          style={{
                            color: "var(--text-muted)",
                            fontSize: "0.75rem",
                            marginTop: "0.25rem",
                            paddingLeft: "0.5rem",
                          }}
                        >
                          {t(`crop_prediction.${placeholder}`)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-center mt-4">
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
                        {t("crop_prediction.processing")}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-seedling me-2"></i>
                        {t("crop_prediction.submit")}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default crop_prediction;
