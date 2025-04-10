import React from "react";
import { useTranslation } from "react-i18next";

function HeroSection() {
  const { t } = useTranslation();

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
          <b>{t("hero.title")}</b>
        </h1>
        <p
          className="lead animate-fade-in animate-delay-1"
          style={{
            color: "var(--secondary-color)",
            marginTop: "15px",
            fontSize: "20px",
          }}
        >
          {t("hero.description")}
        </p>
      </div>
    </div>
  );
}

export default HeroSection;
