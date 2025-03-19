import { Link } from "react-router-dom";

function Service() {
  return (
    <div className="row mb-5">
      {/* Plant Disease Detection */}
      <div className="col-lg-4 mb-4">
        <div className="card-dark animate-fade-in animate-delay-2 animate-float h-100">
          <div className="card-body p-4 text-center">
            <div className="icon-circle mb-4 mx-auto">
              <i
                className="fas fa-leaf fa-2x"
                style={{ color: "var(--primary-color)" }}
              ></i>
            </div>

            <h3
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                marginBottom: "15px",
              }}
            >
              Plant Disease Detection
            </h3>
            <p
              style={{
                color: "var(--secondary-color)",
                marginBottom: "25px",
              }}
            >
              This AI Engine helps detect diseases from various fruits and
              vegetables, including tomatoes, potatoes, apples, and grapes.
              Simply upload an image to get an instant diagnosis.
            </p>
            <Link
              to="/disease/predict"
              className="btn-primary-gradient animate-pulse"
            >
              <span style={{ fontSize: "16px" }}>Start Now</span>
              <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Best Crop Suggestion */}
      <div className="col-lg-4 mb-4">
        <div className="card-dark animate-fade-in animate-delay-3 animate-float h-100">
          <div className="card-body p-4 text-center">
            <div className="icon-circle mb-4 mx-auto">
              <i
                className="fas fa-seedling fa-2x"
                style={{ color: "var(--primary-color)" }}
              ></i>
            </div>
            <h3
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                marginBottom: "15px",
              }}
            >
              Best Crop Suggestion
            </h3>
            <p
              style={{
                color: "var(--secondary-color)",
                marginBottom: "25px",
              }}
            >
              Our system analyzes your soil composition, weather conditions, and
              regional factors to suggest the most suitable crops for optimal
              yield and sustainability.
            </p>
            <Link
              to="/crop/predict"
              className="btn-primary-gradient animate-pulse"
            >
              <span style={{ fontSize: "16px" }}>Start Now</span>
              <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Yield Prediction */}
      <div className="col-lg-4 mb-4">
        <div className="card-dark animate-fade-in animate-delay-4 animate-float h-100">
          <div className="card-body p-4 text-center">
            <div className="icon-circle mb-4 mx-auto">
              <i
                className="fas fa-chart-line fa-2x"
                style={{ color: "var(--primary-color)" }}
              ></i>
            </div>
            <h3
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                marginBottom: "15px",
              }}
            >
              Yield Prediction
            </h3>
            <p
              style={{
                color: "var(--secondary-color)",
                marginBottom: "25px",
              }}
            >
              Predict your crop yield based on pesticide usage, soil fertility,
              weather patterns, and geographical location to optimize farming
              efficiency.
            </p>
            <Link
              to="/yield/predict"
              className="btn-primary-gradient animate-pulse"
            >
              <span style={{ fontSize: "16px" }}>Start Now</span>
              <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
