import React from "react";
import { useTranslation } from "react-i18next";

function FAQ() {
  const { t } = useTranslation();
  const questions = t("faq.questions", { returnObjects: true });

  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className="card-dark animate-fade-in animate-delay-8">
          <div className="card-body p-4">
            <h3
              className="text-center mb-4"
              style={{ color: "var(--primary-color)" }}
            >
              {t("faq.title")}
            </h3>

            <div className="accordion" id="faqAccordion">
              {questions.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${
                        index !== 0 ? "collapsed" : ""
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index}`}
                    >
                      {item.q}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${
                      index === 0 ? "show" : ""
                    }`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
