import { useLocation } from "react-router-dom";

function YieldOutput() {
  const location = useLocation();
  const data = location.state;

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
            <b>Yield Prediction Results</b>
          </h2>
          <p
            className="lead animate-fade-in animate-delay-1"
            style={{ color: "var(--secondary-color)", marginTop: 10 }}
          >
            Based on your input, here is the estimated total crop yield
          </p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-lg-8 mx-auto">
          <div className="card-dark animate-fade-in animate-delay-2 animate-glow">
            <div className="card-body p-4">
              <div className="row text-center">
                {[
                  {
                    label: "Total Yield (tons)",
                    value: data.predicted_yield,
                    icon: "fas fa-balance-scale",
                  },
                  {
                    label: "Bags (50kg each)",
                    value: data.bags_of_yield,
                    icon: "fas fa-shopping-bag",
                  },
                  {
                    label: "People Fed",
                    value: data.people_fed,
                    icon: "fas fa-users",
                  },
                ].map((item, index) => (
                  <div key={index} className="col-md-4 mb-4 mb-md-0">
                    <div
                      className="p-4 rounded"
                      style={{ backgroundColor: "rgba(255, 125, 59, 0.1)" }}
                    >
                      <div className="icon-circle mx-auto mb-3">
                        <i
                          className={`${item.icon} fa-2x`}
                          style={{ color: "var(--primary-color)" }}
                        ></i>
                      </div>
                      <h3
                        className="mb-2"
                        style={{
                          color: "var(--primary-color)",
                          fontWeight: 700,
                        }}
                      >
                        {item.value}
                      </h3>
                      <p style={{ color: "var(--secondary-color)" }}>
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <a href="/yield/predict" className="btn-primary-gradient">
          <i className="fas fa-redo me-2"></i> Predict Again
        </a>
      </div>
    </div>
  );
}
export default YieldOutput;
