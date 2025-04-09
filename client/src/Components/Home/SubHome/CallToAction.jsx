import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <div className="row mb-5">
      <div className="col-12">
        <div
          className="card-dark animate-fade-in animate-delay-9"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 125, 59, 0.2), rgba(255, 80, 80, 0.2))",
          }}
        >
          <div className="card-body p-5 text-center">
            <h2
              style={{
                color: "var(--primary-color)",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              Ready to Transform Your Farming?
            </h2>
            <p
              className="mb-4"
              style={{
                color: "var(--text-color)",
                fontSize: "18px",
              }}
            >
              Join thousands of farmers who are already using AgroGuide to
              improve their yields and farming practices
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link
                to="/contact"
                className="btn-primary-gradient animate-pulse"
              >
                <i className="fas fa-envelope me-2"></i> Contact Us
              </Link>
              <Link
                to="/register"
                className="btn btn-outline-light animate-pulse"
              >
                <i className="fas fa-user-plus me-2"></i> Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
