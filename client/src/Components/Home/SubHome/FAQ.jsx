import React from "react";

function FAQ() {
  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className="card-dark animate-fade-in animate-delay-8">
          <div className="card-body p-4">
            <h3
              className="text-center mb-4"
              style={{ color: "var(--primary-color)" }}
            >
              Frequently Asked Questions
            </h3>

            <div className="accordion" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                  >
                    How can I prevent plant diseases naturally?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Use crop rotation, organic compost, and maintain proper
                    spacing between plants to reduce the spread of diseases.
                    Regular pruning and removing infected parts can also help
                    maintain plant health. Introducing beneficial insects and
                    maintaining soil health are excellent preventive measures.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                  >
                    What are common signs of plant diseases?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Common signs include yellowing leaves, black spots, wilting,
                    and unusual growths on leaves or stems. Other indicators
                    include stunted growth, mildew, rust, rot, or an unusual
                    pattern of leaf loss. Early detection is crucial for
                    effective treatment and prevention of spread.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                  >
                    What is the best way to control pests in farming?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Integrated Pest Management (IPM), using natural predators,
                    and applying neem oil can help control pests effectively.
                    This approach combines biological, cultural, physical, and
                    chemical tools in a way that minimizes economic, health, and
                    environmental risks while maintaining crop productivity.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                  >
                    How can I improve soil fertility naturally?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Adding organic matter such as compost, manure, and cover
                    crops can improve soil fertility. Practicing crop rotation
                    and avoiding excessive chemical fertilizers also help
                    maintain soil health.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                  >
                    What are the benefits of organic farming?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Organic farming enhances soil health, reduces chemical
                    exposure, promotes biodiversity, and produces healthier
                    crops. It is also environmentally friendly and supports
                    sustainable agriculture.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSix">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSix"
                  >
                    How does climate change affect crop production?
                  </button>
                </h2>
                <div
                  id="collapseSix"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Climate change impacts rainfall patterns, temperature, and
                    soil conditions, leading to unpredictable crop yields.
                    Farmers need to adopt climate-resilient crops and modern
                    farming techniques to mitigate its effects.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingSeven">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSeven"
                  >
                    What are the most common mistakes farmers make in crop
                    production?
                  </button>
                </h2>
                <div
                  id="collapseSeven"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingSeven"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Common mistakes include overuse of chemical fertilizers,
                    improper irrigation, neglecting soil testing, and poor pest
                    management. Farmers should focus on sustainable practices
                    and continuous learning to improve yields.
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

export default FAQ;
