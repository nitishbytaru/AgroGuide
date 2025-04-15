from os import path, remove
from pandas import read_csv
from flask import Blueprint, request, jsonify
from functools import lru_cache
from src.Controllers.predect_disease import predict

@lru_cache()
def get_disease_info():
    return read_csv("src/CSV/disease_info.csv", encoding="cp1252")

@lru_cache()
def get_supplement_info():
    return read_csv("src/CSV/supplement_info.csv", encoding="cp1252")

disease_routes = Blueprint("disease_routes", __name__)

@disease_routes.route("/disease/result", methods=["POST"])
def submit():
    file_path = None
    try:
        image = request.files["image"]
        filename = image.filename
        file_path = path.join("static/uploads", filename)
        image.save(file_path)

        pred = predict(file_path)
        if isinstance(pred, dict):
            return jsonify(pred), 400

        disease_info = get_disease_info()
        supplement_info = get_supplement_info()

        response_data = {
            "title": disease_info["disease_name"][pred],
            "desc": disease_info["description"][pred],
            "prevent": disease_info["Possible Steps"][pred],
            "image_url": disease_info["image_url"][pred],
            "pred": pred,
            "sname": supplement_info["supplement name"][pred],
            "simage": supplement_info["supplement image"][pred],
            "buy_link": supplement_info["buy link"][pred],
        }

    except Exception as e:
        response_data = {"error": str(e)}
    finally:
        if file_path and path.exists(file_path):
            remove(file_path)
    return jsonify(response_data)
