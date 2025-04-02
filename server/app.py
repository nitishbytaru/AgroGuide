import os
import psutil
from flask import Flask, jsonify
from flask_cors import CORS
from src.Routes.disease_routes import disease_routes
from src.Routes.crop_suggestion import crop_prediction_routes
from src.Routes.market import market_routes
from src.Routes.yield_prediction import crop_yield_routes
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


# Get frontend URL from environment variables (fallback to localhost if not set)
frontend_url = os.environ.get("frontend_url")

app = Flask(__name__)

# Register Blueprints
app.register_blueprint(disease_routes)  # disease predection routes
app.register_blueprint(crop_prediction_routes)  # crop suggestions routes
app.register_blueprint(market_routes)  # market routes
app.register_blueprint(crop_yield_routes)  # market routes

# Enable CORS
CORS(
    app,
    resources={r"/*": {"origins": frontend_url}},
    supports_credentials=True,
)


@app.route("/memory")
def memory_usage():
    process = psutil.Process(os.getpid())  # Get current process
    mem_info = process.memory_info()  # Get memory usage
    return {
        "rss_memory_MB": mem_info.rss / 1024 / 1024,  # Resident memory
        "vms_memory_MB": mem_info.vms / 1024 / 1024,  # Virtual memory
    }


@app.route("/test")
def test():
    return jsonify("it is working")


if __name__ == "__main__":
    app.run(debug=True)
