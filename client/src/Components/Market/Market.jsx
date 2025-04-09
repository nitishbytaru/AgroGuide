import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { suppliments } from "../../API/api";

function Market() {
  const [supplements, setSupplements] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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
            <b>Plant Supplements</b>
          </h1>
          <p className="lead" style={{ marginTop: 15, marginBottom: 30 }}>
            High-quality fertilizers and supplements for all your plant health
            needs
          </p>
        </div>
      </div>

      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <ul
            className="nav nav-pills"
            style={{
              backgroundColor: "var(--card-bg)",
              padding: 10,
              borderRadius: 50,
            }}
          >
            {["all", "fertilizer", "supplements"].map((filter) => (
              <li className="nav-item" key={filter}>
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
                  {filter === "all"
                    ? "All Products"
                    : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4 mb-4">
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
              placeholder="Search products..."
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 mb-4 product-item"
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
                    {product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)}
                  </span>
                </h5>
                <div style={{ minHeight: 60 }}>
                  <h6>For {product.disease}</h6>
                  <p style={{ fontSize: 14 }}>{product.name}</p>
                </div>
                <Link
                  to={product.buy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-gradient btn-sm mt-2"
                >
                  <i className="fas fa-shopping-cart me-2"></i> Buy Product
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Market;
