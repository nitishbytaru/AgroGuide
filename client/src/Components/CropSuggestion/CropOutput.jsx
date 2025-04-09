import { useLocation } from "react-router-dom";

const CropRecommendation = () => {
  const location = useLocation();
  const data = location.state; // Retrieve passed data

  if (!data) {
    return <h2>No data received!</h2>;
  }

  return (
    <div className="container">
      <div className="row mb-4 text-center">
        <div className="col-lg-8 mx-auto">
          <h2
            className="display-5 animate-fade-in"
            style={{
              marginTop: 30,
              fontWeight: 600,
              color: "var(--primary-color)",
            }}
          >
            <b>Crop Recommendation</b>
          </h2>
          <p
            className="lead animate-fade-in animate-delay-1"
            style={{ color: "var(--secondary-color)", marginTop: 10 }}
          >
            Based on your soil parameters and location
          </p>
        </div>
      </div>

      {data.crop_name ? (
        <>
          <div className="row mb-5">
            <div className="col-lg-6 mx-auto">
              <div
                className="card-dark animate-fade-in animate-delay-2 animate-glow"
                style={{ overflow: "hidden" }}
              >
                <div className="card-body p-4 text-center">
                  <img
                    src={data.image_url}
                    className="img-fluid animate-zoom-in"
                    style={{ borderRadius: 10, maxHeight: 350 }}
                    alt={data.crop_name}
                  />
                  <div className="mt-4">
                    <span
                      className="badge"
                      style={{
                        backgroundColor: "var(--primary-color)",
                        fontSize: 16,
                        padding: "8px 15px",
                        borderRadius: 30,
                      }}
                    >
                      <i className="fas fa-check-circle me-2"></i> Recommended
                      Crop
                    </span>
                  </div>
                  <h3
                    style={{
                      color: "var(--primary-color)",
                      marginTop: 20,
                      fontWeight: 600,
                    }}
                  >
                    {data.crop_name}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-8 mx-auto">
              <div className="card-dark animate-fade-in animate-delay-3">
                <div className="card-body p-4">
                  <h4
                    style={{ color: "var(--primary-color)", marginBottom: 20 }}
                  >
                    About This Crop
                  </h4>
                  <p
                    style={{ lineHeight: 1.8, color: "var(--secondary-color)" }}
                  >
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div className="card-dark animate-fade-in animate-delay-2">
              <div className="card-body p-5 text-center">
                <i
                  className="fas fa-exclamation-circle"
                  style={{
                    fontSize: 48,
                    color: "var(--primary-color)",
                    marginBottom: 20,
                  }}
                ></i>
                <h4 style={{ color: "var(--text-color)", marginBottom: 20 }}>
                  No Crop Prediction Available
                </h4>
                <p className="mb-4">
                  Please provide the necessary soil and location inputs to get a
                  crop recommendation.
                </p>
                <a
                  href="/crop/predict"
                  className="btn-primary-gradient animate-pulse"
                >
                  <i className="fas fa-arrow-left me-2"></i> Go to Crop
                  Prediction
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropRecommendation;
