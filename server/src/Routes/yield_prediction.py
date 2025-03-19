import joblib
import pandas as pd
from flask import Blueprint, render_template, request, jsonify
from src.Controllers.weather_api import get_weather

# Load the trained model
model = joblib.load("./trained_models/yield_prediction/crop_yield_model.pkl")
features = [
    "average_rain_fall_mm_per_year", "pesticides_tonnes", "avg_temp", 
    "Item_Maize", "Item_Potatoes", "Item_Rice, paddy", "Item_Sorghum", 
    "Item_Soybeans", "Item_Sweet potatoes", "Item_Wheat"
]

# Define Blueprint
crop_yield_routes = Blueprint("crop_yield_routes", __name__)

@crop_yield_routes.route("/yield/result", methods=["GET", "POST"])
def predict_crop_yield():
    # Get form data from request

    
    if request.is_json:
        data = request.get_json()
    else:
        data = request.form 

    pesticides = float(data.get("pesticides", 0))
    latitude = float(data.get("latitude",0))
    longitude = float(data.get("longitude",0))
    crop_name = data.get("crop_name")
    land_size = float(data.get("land_size", 0)) 
    land_unit = data.get("land_unit")  
    
    # Ensure land_size is provided
    if land_size is None:
        return jsonify({"error": "Land size is required"}), 400
    
    response = get_weather(latitude, longitude)

    # Use weather API response for temperature
    input_values = {
        "average_rain_fall_mm_per_year": response["rainfall"],
        "pesticides_tonnes": pesticides,
        "avg_temp": response["temperature"],
    }
    
    # One-hot encode the selected crop
    for feature in features:
        if "Item_" in feature:
            input_values[feature] = 1 if feature == f"Item_{crop_name}" else 0
    
    # Convert input values to a DataFrame
    input_df = pd.DataFrame([input_values])

    # Make a prediction
    predicted_yield_per_hectare = model.predict(input_df)[0]  # in hectogram/hectare
    
    # Convert to total yield in tons
    if land_unit == "acres":
        land_size = land_size * 0.404686  # Convert acres to hectares
    
    total_yield_kg = (predicted_yield_per_hectare * land_size) / 10  # Convert hectograms to kg
    total_yield_tons = round(total_yield_kg / 1000, 2)  # Convert kg to tons and round to 2 decimals
    
    # Calculate number of bags (assuming 50 kg per bag)
    bags_of_yield = total_yield_kg / 50
    
    # Estimate how many people can be fed (assuming 0.5 kg per meal per person per day for a year)
    people_fed = total_yield_kg / (0.5 * 365)

    return jsonify({
        "predicted_yield":total_yield_tons,
        "bags_of_yield":int(bags_of_yield),
        "people_fed":int(people_fed)
    })
    
    
