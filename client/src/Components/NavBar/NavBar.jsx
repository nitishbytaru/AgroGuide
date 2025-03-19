import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand animate-fade-in" href="/">
          <span>Agro</span>Guide
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item animate-fade-in animate-delay-1">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item animate-fade-in animate-delay-2">
              <a className="nav-link" href="/market">
                Supplements
              </a>
            </li>
            <li className="nav-item animate-fade-in animate-delay-3">
              <a className="nav-link" href="/disease/predict">
                AI Engine
              </a>
            </li>
            <li className="nav-item animate-fade-in animate-delay-4">
              <a className="nav-link" href="/crop/predict">
                Crop Suggestion
              </a>
            </li>
            <li className="nav-item animate-fade-in animate-delay-4">
              <a className="nav-link" href="/yield/predict">
                Yield Prediction
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item animate-fade-in animate-delay-5">
              <Link className="nav-link contact-btn" to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
