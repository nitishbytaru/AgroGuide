import joblib
import numpy as np
import pandas as pd
from flask import Blueprint, request, jsonify
from src.Controllers.weather_api import get_weather


model = joblib.load("./trained_models/crop_predection/crop_prediction_model.pkl")
label_encoder = joblib.load("./trained_models/crop_predection/label_encoder.pkl")
scaler = joblib.load("./trained_models/crop_predection/scaler.pkl")
features = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]

crop_info = pd.read_csv("src/CSV/crop_suggestion_images.csv", encoding="cp1252")

# Define Blueprint
crop_prediction_routes = Blueprint("crop_prediction_routes", __name__)


@crop_prediction_routes.route("/crop/result", methods=["GET", "POST"])
def predict_crop():

    if request.is_json:
        data = request.get_json()
    else:
        data = request.form 

    # Get form data from 
    N = float(data.get("N", 0))
    P = float(data.get("P", 0))
    K = float(data.get("K", 0))
    ph = float(data.get("ph", 0))
    latitude = float(data.get("latitude", 0))
    longitude = float(data.get("longitude", 0))


    response = get_weather(latitude, longitude)

    # Use weather API response for temp, humidity, and rainfall
    input_values = {
        "N": N,
        "P": P,
        "K": K,
        "temperature": response["temperature"],
        "humidity": response["humidity"],
        "ph": ph,
        "rainfall": response["rainfall"],
    }

    # Convert input values to a NumPy array (2D array required for model.predict)
    input_array = np.array([[input_values[feature] for feature in features]])

    # Apply scaling using the loaded scaler
    input_scaled = scaler.transform(input_array)

    # Make a prediction
    prediction = model.predict(input_scaled)[0]

    # Convert predicted class (number) back to crop name
    crop_name = label_encoder.inverse_transform([prediction])[0]

    # Get the crop info
    crop_data = crop_info[crop_info["crop"].str.lower() == crop_name.lower()].iloc[0]
    image_url = crop_data["image_url"]
    description = crop_data["description"]

    return jsonify({
        "crop_name": crop_name,
        "image_url": image_url,
        "description": description
    })
