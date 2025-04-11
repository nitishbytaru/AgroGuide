import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <div className="contact-header animate-fade-in mb-2">
        <h1>{t("contact.title")}</h1>
        <p>{t("contact.description")}</p>
      </div>

      <div className="contact-container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="contact-info animate-fade-in-left">
              <div className="info-item">
                <div className="icon animate-pulse">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="details">
                  <h5>{t("contact.info.location.title")}</h5>
                  <p>{t("contact.info.location.text")}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon animate-pulse">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="details">
                  <h5>{t("contact.info.email.title")}</h5>
                  <p>{t("contact.info.email.text")}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon animate-pulse">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="details">
                  <h5>{t("contact.info.phone.title")}</h5>
                  <p>{t("contact.info.phone.text")}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon animate-pulse">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="details">
                  <h5>{t("contact.info.hours.title")}</h5>
                  <p>{t("contact.info.hours.text")}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 offset-lg-1">
            <div className="contact-form-container animate-fade-in-right">
              <h3>{t("contact.form.title")}</h3>
              <form id="contactForm" className="contact-form">
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder={t("contact.form.name.placeholder")}
                  />
                  <label htmlFor="name">{t("contact.form.name.label")}</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder={t("contact.form.email.placeholder")}
                  />
                  <label htmlFor="email">{t("contact.form.email.label")}</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder={t("contact.form.subject.placeholder")}
                  />
                  <label htmlFor="subject">
                    {t("contact.form.subject.label")}
                  </label>
                </div>

                <div className="form-floating mb-4">
                  <textarea
                    className="form-control"
                    id="message"
                    placeholder={t("contact.form.message.placeholder")}
                  ></textarea>
                  <label htmlFor="message">
                    {t("contact.form.message.label")}
                  </label>
                </div>

                <button type="submit" className="btn-submit animate-pulse">
                  <span>{t("contact.form.submit")}</span>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
