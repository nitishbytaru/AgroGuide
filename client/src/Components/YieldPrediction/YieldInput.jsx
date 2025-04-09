import { useNavigate } from "react-router-dom";
import { yieldPrediction } from "../../API/api";

function YieldInput() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await yieldPrediction(data);
      navigate("/yield/result", { state: response.data });
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
          <h1
            className="display-4"
            style={{
              marginTop: "30px",
              fontWeight: 600,
              color: "var(--primary-color)",
            }}
          >
            <b>Yield Prediction</b>
          </h1>
          <p
            className="lead"
            style={{ color: "var(--secondary-color)", marginTop: "10px" }}
          >
            Enter your land size and farming details to estimate total crop
            yield
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card-dark">
            <div className="card-body p-4">
              <h4
                style={{ color: "var(--primary-color)", marginBottom: "25px" }}
              >
                Enter Farming Parameters
              </h4>
              <form onSubmit={handleSubmit} className="yield-form">
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control"
                        id="pesticides"
                        name="pesticides"
                        min="0"
                        required
                        defaultValue="75000"
                      />
                      <label htmlFor="pesticides">
                        Pesticides Used (tonnes)
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-floating">
                      <select
                        className="form-control"
                        id="crop_name"
                        name="crop_name"
                        required
                      >
                        <option value="" disabled>
                          Select Crop
                        </option>
                        <option value="Cassava">Cassava</option>
                        <option value="Maize">Maize</option>
                        <option value="Potatoes">Potatoes</option>
                        <option value="Rice, paddy">Rice, paddy</option>
                        <option value="Sorghum">Sorghum</option>
                        <option value="Soybeans">Soybeans</option>
                        <option value="Sweet potatoes">Sweet potatoes</option>
                        <option value="Wheat">Wheat</option>
                      </select>
                      <label htmlFor="crop_name">Select Crop</label>
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
                  <div className="col-md-6 mb-4">
                    <div className="form-floating">
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="land_size"
                        name="land_size"
                        min="0.1"
                        required
                        defaultValue="0"
                      />
                      <label htmlFor="land_size">Land Size</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
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
                  <div className="col-md-6 mb-4">
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
                        defaultValue="20"
                      />
                      <label htmlFor="latitude">Latitude</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
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
                        defaultValue="78"
                      />
                      <label htmlFor="longitude">Longitude</label>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn-primary-gradient">
                    <i className="fas fa-seedling me-2"></i> Predict Yield
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
