import { useNavigate } from "react-router-dom";
import { cropSuggestions } from "../../API/api";

function CropPrediction() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await cropSuggestions(data);

      navigate("/crop/result", { state: response.data });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
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
                    { label: "Nitrogen (N)", name: "N", min: 0, max: 200 },
                    { label: "Phosphorus (P)", name: "P", min: 0, max: 150 },
                    { label: "Potassium (K)", name: "K", min: 0, max: 200 },
                    {
                      label: "Soil pH Level",
                      name: "ph",
                      min: 3,
                      max: 9,
                      step: 0.01,
                    },
                  ].map(({ label, name, min, max, step }) => (
                    <div className="col-md-6 mb-4" key={name}>
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
                          placeholder={label}
                        />
                        <label htmlFor={name}>{label}</label>
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
                    },
                    {
                      label: "Longitude",
                      name: "longitude",
                      min: -180,
                      max: 180,
                      step: 0.0001,
                    },
                  ].map(({ label, name, min, max, step }) => (
                    <div className="col-md-6 mb-4" key={name}>
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id={name}
                          name={name}
                          min={min}
                          max={max}
                          step={step}
                          required
                          placeholder={label}
                        />
                        <label htmlFor={name}>{label}</label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn-primary-gradient animate-pulse"
                  >
                    <i className="fas fa-seedling me-2"></i> Get Crop Suggestion
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
