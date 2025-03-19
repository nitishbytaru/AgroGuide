import pandas as pd
from flask import Blueprint, jsonify

# Load data
disease_info = pd.read_csv("src/CSV/disease_info.csv", encoding="cp1252")
supplement_info = pd.read_csv("src/CSV/supplement_info.csv", encoding="cp1252")

# Define Blueprint
market_routes = Blueprint("market_routes", __name__)

@market_routes.route("/market", methods=["GET", "POST"])
def market():
    # Convert NaN to None (null in JSON)
    supplement_image = supplement_info["supplement image"].fillna("").tolist()
    supplement_name = supplement_info["supplement name"].fillna("").tolist()
    disease = disease_info["disease_name"].fillna("").tolist()
    buy = supplement_info["buy link"].fillna("").tolist()

    return jsonify({
        "supplement_image": supplement_image,
        "supplement_name": supplement_name,
        "disease": disease,
        "buy": buy,
    })
