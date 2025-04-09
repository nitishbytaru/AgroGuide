import React from "react";

function Features() {
  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className="card-dark animate-fade-in animate-delay-5">
          <div className="card-body p-5">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h2
                  style={{
                    color: "var(--primary-color)",
                    fontWeight: 600,
                    marginBottom: "20px",
                  }}
                >
                  Why Choose AgroGuide?
                </h2>
                <div className="feature-list">
                  <div className="feature-item d-flex align-items-start mb-4">
                    <div className="feature-icon me-3">
                      <i
                        className="fas fa-check-circle"
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "24px",
                        }}
                      ></i>
                    </div>
                    <div>
                      <h5 style={{ color: "var(--text-color)" }}>
                        AI-Powered Analysis
                      </h5>
                      <p style={{ color: "var(--secondary-color)" }}>
                        Our advanced machine learning algorithms provide
                        accurate predictions and recommendations.
                      </p>
                    </div>
                  </div>
                  <div className="feature-item d-flex align-items-start mb-4">
                    <div className="feature-icon me-3">
                      <i
                        className="fas fa-check-circle"
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "24px",
                        }}
                      ></i>
                    </div>
                    <div>
                      <h5 style={{ color: "var(--text-color)" }}>
                        Real-time Results
                      </h5>
                      <p style={{ color: "var(--secondary-color)" }}>
                        Get instant feedback and suggestions to make timely
                        decisions for your farm.
                      </p>
                    </div>
                  </div>
                  <div className="feature-item d-flex align-items-start">
                    <div className="feature-icon me-3">
                      <i
                        className="fas fa-check-circle"
                        style={{
                          color: "var(--primary-color)",
                          fontSize: "24px",
                        }}
                      ></i>
                    </div>
                    <div>
                      <h5 style={{ color: "var(--text-color)" }}>
                        Sustainable Farming
                      </h5>
                      <p style={{ color: "var(--secondary-color)" }}>
                        Our recommendations promote environmentally friendly and
                        sustainable agricultural practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-4 mt-lg-0 text-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHJVQOkjDiKTdjPqH7uCVxi2HJpG9OJ2HtEejgatszMEWrQ3FQ_rxSyuAivMwO4S-gxEs&usqp=CAU"
                  alt="Farming Technology"
                  className="img-fluid rounded animate-fade-in animate-delay-6"
                  style={{ maxWidth: "90%", boxShadow: "var(--shadow)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
