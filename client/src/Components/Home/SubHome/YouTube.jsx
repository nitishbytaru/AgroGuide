import React from "react";
import { useTranslation } from "react-i18next";

function YouTube() {
  const { t } = useTranslation();

  const videos = [
    { url: "https://www.youtube.com/embed/wuC9h-xnYi8", title: "youtube.1" },
    { url: "https://www.youtube.com/embed/UUZX1D1KBhI", title: "youtube.2" },
    { url: "https://www.youtube.com/embed/35PqZRbL1uw", title: "youtube.3" },
  ];

  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className="card-dark animate-fade-in animate-delay-7">
          <div className="card-body p-4">
            <h3 className="text-center mb-4" style={{ color: "var(--primary-color)" }}>
              {t("youtube.title")}
            </h3>
            <p className="text-center mb-4" style={{ color: "var(--secondary-color)" }}>
              {t("youtube.desc")}
            </p>

            <div className="row">
              {videos.map((video, index) => (
                <div key={index} className="col-md-4 mb-4">
                  <div className="video-card animate-float">
                    <iframe width="100%" height="215" src={video.url} frameBorder="0" allowFullScreen></iframe>
                    <div className="p-3 text-center" style={{ backgroundColor: "var(--card-bg)" }}>
                      <h6 className="mb-0">{t(video.title)}</h6>
                    </div>
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

export default YouTube;
