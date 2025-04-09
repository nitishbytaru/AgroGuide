import React from "react";

function YouTube() {
  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className="card-dark animate-fade-in animate-delay-7">
          <div className="card-body p-4">
            <h3
              className="text-center mb-4 "
              style={{ color: "var(--primary-color)" }}
            >
              Educational Resources
            </h3>
            <p
              className="text-center mb-4"
              style={{ color: "var(--secondary-color)" }}
            >
              Watch these insightful videos about modern farming techniques and
              best practices
            </p>

            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="video-card animate-float">
                  <iframe
                    width="100%"
                    height="215"
                    src="https://www.youtube.com/embed/wuC9h-xnYi8"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <div
                    className="p-3 text-center"
                    style={{ backgroundColor: "var(--card-bg)" }}
                  >
                    <h6 className="mb-0">Plant Health Management</h6>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="video-card animate-float">
                  <iframe
                    width="100%"
                    height="215"
                    src="https://www.youtube.com/embed/UUZX1D1KBhI"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <div
                    className="p-3 text-center"
                    style={{ backgroundColor: "var(--card-bg)" }}
                  >
                    <h6 className="mb-0">Disease Detection Methods</h6>
                  </div>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <div className="video-card animate-float">
                  <iframe
                    width="100%"
                    height="215"
                    src="https://www.youtube.com/embed/35PqZRbL1uw"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                  <div
                    className="p-3 text-center"
                    style={{ backgroundColor: "var(--card-bg)" }}
                  >
                    <h6 className="mb-0">Organic Farming Practices</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YouTube;
