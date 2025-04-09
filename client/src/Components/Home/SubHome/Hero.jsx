import React from "react";

function HeroSection() {
  return (
    <div className="row mb-5 text-center">
      <div className="col-lg-10 mx-auto">
        <h1
          className="display-4 animate-fade-in"
          style={{
            marginTop: "30px",
            fontWeight: 700,
            color: "var(--primary-color)",
          }}
        >
          <b>Agricultural AI Solutions</b>
        </h1>
        <p
          className="lead animate-fade-in animate-delay-1"
          style={{
            color: "var(--secondary-color)",
            marginTop: "15px",
            fontSize: "20px",
          }}
        >
          Empowering farmers with cutting-edge technology for smarter farming
          decisions
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
