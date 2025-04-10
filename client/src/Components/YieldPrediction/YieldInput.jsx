import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { yieldPrediction } from "../../API/api";

function YieldInput() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Convert string values to appropriate types
    const numericData = {
      ...data,
      pesticides: parseFloat(data.pesticides),
      land_size: parseFloat(data.land_size),
      latitude: parseFloat(data.latitude),
      longitude: parseFloat(data.longitude)
    };

    try {
      const response = await yieldPrediction(numericData);
      navigate("/yield/result", { state: response.data });
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
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
            <b>Yield Prediction</b>
          </h1>
          <p
            className="lead animate-fade-in animate-delay-1"
            style={{ color: "var(--secondary-color)", marginTop: "10px" }}
          >
            Enter your land size and farming details to estimate total crop yield
          </p>
        </div>
      </div>

      {error && (
        <div className="row justify-content-center animate-fade-in">
          <div className="col-lg-8">
            <div className="alert alert-danger">
              {error}
            </div>
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
                Enter Farming Parameters
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
                        Pesticides Used (tonnes)
                      </label>
                    </div>
                    <div className="form-text">
                      Enter total pesticides used in tonnes
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
                          Select Crop
                        </option>
                        <option value="Maize">Maize</option>
                        <option value="Potatoes">Potatoes</option>
                        <option value="Rice, paddy">Rice, paddy</option>
                        <option value="Sorghum">Sorghum</option>
                        <option value="Soybeans">Soybeans</option>
                        <option value="Sweet potatoes">Sweet potatoes</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Cassava">Cassava</option>

                      </select>
                      <label htmlFor="crop_name">Select Crop</label>
                    </div>
                    <div className="form-text">
                      Choose the crop you're growing
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
                  Land Details
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
                      <label htmlFor="land_size">Land Size</label>
                    </div>
                    <div className="form-text">
                      Enter your land area (minimum 0.1)
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
                        <option value="hectares">Hectares</option>
                        <option value="acres">Acres</option>
                      </select>
                      <label htmlFor="land_unit">Select Unit</label>
                    </div>
                    <div className="form-text">
                      Select hectares or acres
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
                  Location Information
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
                      <label htmlFor="latitude">Latitude</label>
                    </div>
                    <div className="form-text">
                      Value must be between -90 and 90
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
                      <label htmlFor="longitude">Longitude</label>
                    </div>
                    <div className="form-text">
                      Value must be between -180 and 180
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
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-seedling me-2"></i> Predict Yield
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