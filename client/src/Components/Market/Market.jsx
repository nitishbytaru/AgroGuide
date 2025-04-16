import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { suppliments } from "../../API/api";

function Market() {
  const { t } = useTranslation();
  const [supplements, setSupplements] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await suppliments();
        if (response?.data) {
          const { supplement_name, supplement_image, buy, disease } =
            response.data;

          const formattedData = supplement_name.map((name, index) => ({
            name,
            image: supplement_image[index] || "",
            buy: buy[index] || "#",
            disease: disease[index] || "Unknown",
            category: [3, 5, 7, 11, 15, 18, 20, 23, 24, 25, 28, 38].includes(
              index
            )
              ? "fertilizer"
              : "supplements",
          }));

          setSupplements(formattedData);
          setFilteredProducts(formattedData);
        }
      } catch (error) {
        console.error("Error fetching supplements:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = supplements.filter((item) => {
      const matchesCategory =
        activeFilter === "all" || item.category === activeFilter;
      const matchesSearch =
        !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.disease.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [activeFilter, searchTerm, supplements]);

  return (
    <div className="container">
      <div className="row mb-4 text-center">
        <div className="col-lg-12">
          <h1
            className="display-4"
            style={{
              marginTop: 30,
              fontWeight: 600,
              color: "var(--primary-color)",
            }}
          >
            <b>{t("market.title")}</b>
          </h1>
          <p className="lead" style={{ marginTop: 15, marginBottom: 30 }}>
            {t("market.description")}
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 mb-3">
          <ul
            className="nav nav-pills justify-content-center flex-wrap"
            style={{
              backgroundColor: "var(--card-bg)",
              padding: 10,
              borderRadius: 50,
            }}
          >
            {["all", "fertilizer", "supplements"].map((filter) => (
              <li className="nav-item m-1" key={filter}>
                <button
                  className={`nav-link filter-btn ${
                    activeFilter === filter ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    borderRadius: 50,
                    color: "var(--text-color)",
                    padding: "8px 20px",
                  }}
                >
                  {t(`market.filters.${filter}`)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-12">
          <div className="input-group">
            <span
              className="input-group-text"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "rgba(255, 255, 255, 0.05)",
                color: "var(--text-muted)",
              }}
            >
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder={t("market.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "rgba(255, 255, 255, 0.05)",
                color: "var(--text-color)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="row product-container">
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">{t("market.loading")}</span>
            </div>
            <p className="mt-3">{t("market.loading")}</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 col-sm-12 mb-4 product-item"
              data-category={product.category}
            >
              <div className="product-card text-center">
                <div className="product-image">
                  <img
                    src={product.image}
                    className="img-fluid"
                    alt={product.name}
                    style={{
                      height: 180,
                      objectFit: "contain",
                      marginBottom: 20,
                    }}
                  />
                </div>
                <h5 style={{ marginBottom: 5, minHeight: 48 }}>
                  <span
                    style={{
                      color:
                        product.category === "fertilizer"
                          ? "#4caf50"
                          : "#f27474",
                    }}
                  >
                    <i
                      className={`fas ${
                        product.category === "fertilizer"
                          ? "fa-leaf"
                          : "fa-prescription-bottle-alt"
                      } me-2`}
                    ></i>
                    {t(`market.filters.${product.category}`)}
                  </span>
                </h5>
                <div style={{ minHeight: 60 }}>
                  <h6>
                    {t("market.for")} {product.disease}
                  </h6>
                  <p style={{ fontSize: 14 }}>{product.name}</p>
                </div>
                <Link
                  to={product.buy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-gradient btn-sm mt-2"
                >
                  <i className="fas fa-shopping-cart me-2"></i>{" "}
                  {t("market.buyButton")}
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">{t("market.noProducts")}</p>
        )}
      </div>
    </div>
  );
}

export default Market;
