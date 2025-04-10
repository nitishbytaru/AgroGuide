import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cropSuggestions } from "../../API/api";

function CropPrediction() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Convert string values to numbers
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
          <h2
            className="display-5 animate-fade-in"
            style={{
              marginTop: "30px",
              fontWeight: 600,
              color: "var(--primary-color)",
            }}
          >
            <b>Crop Prediction</b>
          </h2>
          <p
            className="lead animate-fade-in animate-delay-1"
            style={{ color: "var(--secondary-color)", marginTop: "10px" }}
          >
            Enter your soil and location data to get personalized crop
            recommendations
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card-dark animate-fade-in animate-delay-2">
            <div className="card-body p-4">
              <h4
                style={{ color: "var(--primary-color)", marginBottom: "25px" }}
              >
                Enter Your Soil Parameters
              </h4>
              <form onSubmit={handleSubmit} className="crop-form">
                <div className="row">
                  {[
                    {
                      label: "Nitrogen (N)",
                      name: "N",
                      min: 0,
                      max: 200,
                      placeholder: "this value must be from 0 to 200",
                    },
                    {
                      label: "Phosphorus (P)",
                      name: "P",
                      min: 0,
                      max: 150,
                      placeholder: "ethis value must be from 0 to 150",
                    },
                    {
                      label: "Potassium (K)",
                      name: "K",
                      min: 0,
                      max: 200,
                      placeholder: "this value must be from 0 to 200",
                    },
                    {
                      label: "Soil pH Level",
                      name: "ph",
                      min: 3,
                      max: 9,
                      step: 0.01,
                      placeholder: "this value must be from 3 to 9",
                    },
                  ].map(({ label, name, min, max, step, placeholder }) => (
                    <div className="col-md-6 mb-3" key={name}>
                      {" "}
                      {/* Changed mb-4 to mb-3 */}
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
                          placeholder=" " // Need a space here for floating labels to work
                        />
                        <label htmlFor={name}>{label}</label>
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
                        {placeholder}
                      </div>
                    </div>
                  ))}
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
                  {[
                    {
                      label: "Latitude",
                      name: "latitude",
                      min: -90,
                      max: 90,
                      step: 0.0001,
                      placeholder: "this value must be from -90 to 90",
                    },
                    {
                      label: "Longitude",
                      name: "longitude",
                      min: -180,
                      max: 180,
                      step: 0.0001,
                      placeholder: "this value must be from -180 to 180",
                    },
                  ].map(({ label, name, min, max, step, placeholder }) => (
                    <div className="col-md-6 mb-3" key={name}>
                    {" "}
                    {/* Changed mb-4 to mb-3 */}
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
                        placeholder=" " // Need a space here for floating labels to work
                      />
                      <label htmlFor={name}>{label}</label>
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
                      {placeholder}
                    </div>
                  </div>
                  ))}
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
                        <i className="fas fa-seedling me-2"></i> Get Crop
                        Suggestion
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

export default CropPrediction;
