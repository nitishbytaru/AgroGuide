import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { diseaseDetection } from "../../API/api";

function DiseaseInput() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!selectedFile) {
      setError("Please select a file to upload.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await diseaseDetection(formData);
      navigate("/disease/result", { state: response.data });
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      console.error("Error:", err.response ? err.response.data : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row mb-5 text-center">
        <div className="col-lg-10 mx-auto">
          <h1
            className="display-4 animate-fade-in"
            style={{
              marginTop: "30px",
              fontWeight: 600,
              color: "var(--primary-color)",
            }}
          >
            <b>Detect Disease</b>
          </h1>
          <p
            className="lead animate-fade-in animate-delay-2"
            style={{ fontWeight: 500, marginTop: "15px" }}
          >
            Upload your plant's leaf image to identify diseases and get
            treatment recommendations
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card-dark animate-fade-in-left">
            <div className="card-body">
              <h4
                style={{ color: "var(--primary-color)", marginBottom: "20px" }}
              >
                Why is it necessary to detect plant disease?
              </h4>
              <p>
                Plant diseases affect the growth and yield of crops
                significantly. Early detection is crucial because:
              </p>
              <ul
                style={{
                  color: "var(--secondary-color)",
                  marginBottom: "20px",
                }}
              >
                <li>It prevents spreading to healthy plants</li>
                <li>Reduces economic losses for farmers</li>
                <li>Minimizes the use of pesticides when caught early</li>
                <li>
                  Helps maintain food security and agricultural sustainability
                </li>
              </ul>
              <p>
                Without proper identification of the disease and the
                disease-causing agent, control measures can be ineffective,
                wasting time and money while leading to further plant losses.
                Our AI-powered solution helps detect diseases even before
                symptoms appear clearly, providing timely interventions.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card-dark animate-fade-in-right animate-glow">
            <div className="card-body">
              <h4
                className="text-center"
                style={{ color: "var(--primary-color)", marginBottom: "30px" }}
              >
                Upload Plant Image
              </h4>
              <p
                className="text-center mb-4"
                style={{ color: "var(--secondary-color)" }}
              >
                Simply upload your plant's leaf image and our AI will analyze it
                instantly
              </p>

              <form onSubmit={handleSubmit} className="text-center">
                <div className="custom-file overflow-hidden mb-4">
                  <input
                    type="file"
                    id="actual-btn"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="actual-btn" className="animate-pulse">
                    <i className="fas fa-upload me-2"></i> Choose File
                  </label>
                  <span
                    id="file-chosen"
                    style={{
                      color: selectedFile ? "var(--primary-color)" : "inherit",
                      display: "block",
                      marginTop: "8px",
                    }}
                  >
                    {selectedFile ? selectedFile.name : "No file chosen"}
                  </span>
                </div>

                {error && (
                  <div
                    className="alert alert-danger py-1 px-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

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
                      <i className="fas fa-search me-2"></i> Analyze Plant
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                  <i className="fas fa-info-circle me-2"></i> Supported formats:
                  JPG, PNG, JPEG
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiseaseInput;
