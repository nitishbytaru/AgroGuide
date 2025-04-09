from joblib import load
from numpy import array
from pandas import read_csv
from flask import Blueprint, request, jsonify
from src.Controllers.weather_api import get_weather

# Load model and preprocessors
model = load("./trained_models/crop_predection/crop_prediction_model.pkl")
label_encoder = load("./trained_models/crop_predection/label_encoder.pkl")
scaler = load("./trained_models/crop_predection/scaler.pkl")

# Feature names expected by the model
features = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]

# Load crop info for the frontend
crop_info = read_csv("src/CSV/crop_suggestion_images.csv", encoding="cp1252")

# Define Blueprint
crop_prediction_routes = Blueprint("crop_prediction_routes", __name__)

@crop_prediction_routes.route("/crop/result", methods=["GET", "POST"])
def predict_crop():
    data = request.get_json() if request.is_json else request.form 

    N = float(data.get("N", 0))
    P = float(data.get("P", 0))
    K = float(data.get("K", 0))
    ph = float(data.get("ph", 0))
    latitude = float(data.get("latitude", 0))
    longitude = float(data.get("longitude", 0))

    response = get_weather(latitude, longitude)

    input_values = {
        "N": N,
        "P": P,
        "K": K,
        "temperature": response["temperature"],
        "humidity": response["humidity"],
        "ph": ph,
        "rainfall": response["rainfall"],
    }

    input_array = array([[input_values[feature] for feature in features]])
    input_scaled = scaler.transform(input_array)

    prediction = model.predict(input_scaled)[0]
    crop_name = label_encoder.inverse_transform([prediction])[0]

    crop_data = crop_info[crop_info["crop"].str.lower() == crop_name.lower()].iloc[0]
    image_url = crop_data["image_url"]
    description = crop_data["description"]

    return jsonify({
        "crop_name": crop_name,
        "image_url": image_url,
        "description": description
    })
