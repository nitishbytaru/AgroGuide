from joblib import load
from numpy import array
from pandas import read_csv
from flask import Blueprint, request, jsonify
from functools import lru_cache
from src.Controllers.weather_api import get_weather

@lru_cache()
def get_model():
    return load("./trained_models/crop_predection/crop_prediction_model.pkl")

@lru_cache()
def get_label_encoder():
    return load("./trained_models/crop_predection/label_encoder.pkl")

@lru_cache()
def get_scaler():
    return load("./trained_models/crop_predection/scaler.pkl")

@lru_cache()
def get_crop_info():
    return read_csv("src/CSV/crop_suggestion_images.csv", encoding="cp1252")

features = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
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
    input_array = array([[N, P, K, response["temperature"], response["humidity"], ph, response["rainfall"]]])
    input_scaled = get_scaler().transform(input_array)

    prediction = get_model().predict(input_scaled)[0]
    crop_name = get_label_encoder().inverse_transform([prediction])[0]
    crop_data = get_crop_info()[get_crop_info()["crop"].str.lower() == crop_name.lower()].iloc[0]

    return jsonify({
        "crop_name": crop_name,
        "image_url": crop_data["image_url"],
        "description": crop_data["description"]
    })
