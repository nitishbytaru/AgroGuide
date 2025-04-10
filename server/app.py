from os import environ, getpid
from psutil import Process
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from src.Routes.disease_routes import disease_routes
from src.Routes.crop_suggestion import crop_prediction_routes
from src.Routes.market import market_routes
from src.Routes.yield_prediction import crop_yield_routes

# Load environment variables from .env file
load_dotenv()

# Get frontend URL from environment variables (fallback to localhost if not set)
frontend_url = environ.get("frontend_url", "http://localhost:3000")

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(disease_routes)
app.register_blueprint(crop_prediction_routes)
app.register_blueprint(market_routes)
app.register_blueprint(crop_yield_routes)

# Enable CORS
CORS(
    app,
    resources={r"/*": {"origins": frontend_url}},
    supports_credentials=True,
)


@app.route("/memory")
def memory_usage():
    process = Process(getpid())
    mem_info = process.memory_info()
    return {
        "rss_memory_MB": mem_info.rss / 1024 / 1024,
        "vms_memory_MB": mem_info.vms / 1024 / 1024,
    }


@app.route("/", methods=["GET"])
def home():
    return "This website is working"


@app.route("/test")
def test():
    return jsonify("it is working")


if __name__ == "__main__":
    app.run(debug=True)
