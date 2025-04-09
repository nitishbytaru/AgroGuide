from joblib import load
from pandas import DataFrame
from flask import Blueprint, request, jsonify
from src.Controllers.weather_api import get_weather
from functools import lru_cache

@lru_cache()
def get_model():
    return load("./trained_models/yield_prediction/crop_yield_model.pkl")

features = [
    "average_rain_fall_mm_per_year", "pesticides_tonnes", "avg_temp", 
    "Item_Maize", "Item_Potatoes", "Item_Rice, paddy", "Item_Sorghum", 
    "Item_Soybeans", "Item_Sweet potatoes", "Item_Wheat"
]

crop_yield_routes = Blueprint("crop_yield_routes", __name__)

@crop_yield_routes.route("/yield/result", methods=["GET", "POST"])
def predict_crop_yield():
    data = request.get_json() if request.is_json else request.form
    pesticides = float(data.get("pesticides", 0))
    latitude = float(data.get("latitude", 0))
    longitude = float(data.get("longitude", 0))
    crop_name = data.get("crop_name")
    land_size = float(data.get("land_size", 0)) 
    land_unit = data.get("land_unit")  

    if land_size is None:
        return jsonify({"error": "Land size is required"}), 400
    
    response = get_weather(latitude, longitude)

    input_values = {
        "average_rain_fall_mm_per_year": response["rainfall"],
        "pesticides_tonnes": pesticides,
        "avg_temp": response["temperature"],
    }

    for feature in features:
        input_values[feature] = 1 if f"Item_{crop_name}" == feature else 0

    if land_unit == "acres":
        land_size *= 0.404686

    predicted_yield_per_hectare = get_model().predict(DataFrame([input_values]))[0]
    total_yield_kg = (predicted_yield_per_hectare * land_size) / 10
    total_yield_tons = round(total_yield_kg / 1000, 2)

    return jsonify({
        "predicted_yield": total_yield_tons,
        "bags_of_yield": int(total_yield_kg / 50),
        "people_fed": int(total_yield_kg / (0.5 * 365))
    })
