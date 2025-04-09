function Contact() {
  return (
    <>
      <div className="contact-header animate-fade-in mb-2">
        <h1>Contact Us</h1>
        <p>
          Have questions or suggestions? We're here to help. Reach out to us and
          we'll respond as soon as possible.
        </p>
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
                  <h5>Our Location</h5>
                  <p>123 Innovation Drive, Tech Valley, CA 94103</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon animate-pulse">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="details">
                  <h5>Email Us</h5>
                  <p>support@agroguide.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon animate-pulse">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="details">
                  <h5>Call Us</h5>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon animate-pulse">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="details">
                  <h5>Working Hours</h5>
                  <p>Monday - Friday: 9AM to 5PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 offset-lg-1">
            <div className="contact-form-container animate-fade-in-right">
              <h3>Send us a message</h3>
              <form id="contactForm" className="contact-form">
                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                  />
                  <label htmlFor="name">Your Name</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Your Email"
                  />
                  <label htmlFor="email">Your Email</label>
                </div>

                <div className="form-floating mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Subject"
                  />
                  <label htmlFor="subject">Subject</label>
                </div>

                <div className="form-floating mb-4">
                  <textarea
                    className="form-control"
                    id="message"
                    placeholder="Your Message"
                  ></textarea>
                  <label htmlFor="message">Your Message</label>
                </div>

                <button type="submit" className="btn-submit animate-pulse">
                  <span>Send Message</span>
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
