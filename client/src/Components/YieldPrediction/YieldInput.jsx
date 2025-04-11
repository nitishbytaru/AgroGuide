import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { yieldPrediction } from "../../API/api";
import { useTranslation } from "react-i18next";

function YieldInput() {
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
      pesticides: parseFloat(data.pesticides),
      land_size: parseFloat(data.land_size),
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude),
    };

    try {
      const response = await yieldPrediction(numericData);
      navigate("/yield/result", { state: response.data });
    } catch (error) {
      setError(error.response?.data?.message || t("yield_input.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row mb-4 text-center">
        <div className="col-lg-10 mx-auto">
          <h1
            className="display-4 animate-fade-in"
            style={{
              marginTop: "30px",
              fontWeight: 600,
              color: "var(--primary-color)",
            }}
          >
            <b>{t("yield_input.title")}</b>
          </h1>
          <p
            className="lead animate-fade-in animate-delay-1"
            style={{ color: "var(--secondary-color)", marginTop: "10px" }}
          >
            {t("yield_input.description")}
          </p>
        </div>
      </div>

      {error && (
        <div className="row justify-content-center animate-fade-in">
          <div className="col-lg-8">
            <div className="alert alert-danger">{error}</div>
          </div>
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card-dark animate-fade-in animate-delay-2">
            <div className="card-body p-4">
              <h4
                style={{ color: "var(--primary-color)", marginBottom: "25px" }}
              >
                {t("yield_input.form.heading_farming")}
              </h4>
              <form onSubmit={handleSubmit} className="yield-form">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="pesticides"
                        name="pesticides"
                        min="0"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="pesticides">
                        {t("yield_input.form.pesticides_label")}
                      </label>
                    </div>
                    <div className="form-text">
                      {t("yield_input.form.pesticides_help")}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="form-floating">
                      <select
                        className="form-control"
                        id="crop_name"
                        name="crop_name"
                        required
                      >
                        <option value="">
                          {t("yield_input.form.crop_label")}
                        </option>
                        {[
                          "maize",
                          "potatoes",
                          "rice",
                          "sorghum",
                          "soybeans",
                          "sweet_potatoes",
                          "wheat",
                          "cassava",
                        ].map((crop) => (
                          <option key={crop} value={crop}>
                            {t(`yield_input.form.crops.${crop}`)}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="crop_name">
                        {t("yield_input.form.crop_label")}
                      </label>
                    </div>
                    <div className="form-text">
                      {t("yield_input.form.crop_help")}
                    </div>
                  </div>
                </div>

                <h4
                  style={{
                    color: "var(--primary-color)",
                    marginBottom: "25px",
                    marginTop: "20px",
                  }}
                >
                  {t("yield_input.form.heading_land")}
                </h4>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-floating">
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="land_size"
                        name="land_size"
                        min="0.1"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="land_size">
                        {t("yield_input.form.land_size_label")}
                      </label>
                    </div>
                    <div className="form-text">
                      {t("yield_input.form.land_size_help")}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="form-floating">
                      <select
                        className="form-control"
                        id="land_unit"
                        name="land_unit"
                        required
                      >
                        <option value="hectares">
                          {t("yield_input.form.units.hectares")}
                        </option>
                        <option value="acres">
                          {t("yield_input.form.units.acres")}
                        </option>
                      </select>
                      <label htmlFor="land_unit">
                        {t("yield_input.form.land_unit_label")}
                      </label>
                    </div>
                    <div className="form-text">
                      {t("yield_input.form.land_unit_help")}
                    </div>
                  </div>
                </div>

                <h4
                  style={{
                    color: "var(--primary-color)",
                    marginBottom: "25px",
                    marginTop: "20px",
                  }}
                >
                  {t("yield_input.form.heading_location")}
                </h4>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-floating">
                      <input
                        type="number"
                        step="0.0001"
                        className="form-control"
                        id="latitude"
                        name="latitude"
                        min="-90"
                        max="90"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="latitude">
                        {t("yield_input.form.latitude_label")}
                      </label>
                    </div>
                    <div className="form-text">
                      {t("yield_input.form.latitude_help")}
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <div className="form-floating">
                      <input
                        type="number"
                        step="0.0001"
                        className="form-control"
                        id="longitude"
                        name="longitude"
                        min="-180"
                        max="180"
                        required
                        placeholder=" "
                      />
                      <label htmlFor="longitude">
                        {t("yield_input.form.longitude_label")}
                      </label>
                    </div>
                    <div className="form-text">
                      {t("yield_input.form.longitude_help")}
                    </div>
                  </div>
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
                        {t("yield_input.form.loading")}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-seedling me-2"></i>{" "}
                        {t("yield_input.form.submit")}
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

export default YieldInput;
