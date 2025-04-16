import requests
from os import environ


def get_average_annual_rainfall(lat, lon):
    url = (
        f"https://power.larc.nasa.gov/api/temporal/climatology/point?"
        f"parameters=PRECTOTCORR&community=AG&longitude={lon}&latitude={lat}&format=JSON"
    )

    response = requests.get(url)

    try:
        data = response.json()
    except Exception as e:
        print("Error parsing JSON:", e)
        return None

    if (
        "properties" not in data
        or "parameter" not in data["properties"]
        or "PRECTOTCORR" not in data["properties"]["parameter"]
    ):
        print("Unexpected response structure:", data)
        return None

    monthly_rainfall = data["properties"]["parameter"]["PRECTOTCORR"]  # mm/day
    annual_total_mm = 0

    for month, daily_mm in monthly_rainfall.items():
        if month == "ANN":  # skip annual average if present
            continue
        days_in_month = 30 if month in ["APR", "JUN", "SEP", "NOV"] else 31
        if month == "FEB":
            days_in_month = 28  # not handling leap years
        monthly_total = float(daily_mm) * days_in_month
        annual_total_mm += monthly_total

    return annual_total_mm


def get_weather(latitude, longitude):
    average_rainfall = get_average_annual_rainfall(latitude, longitude)

    url = f"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={environ.get('weather_api_key')}&units=metric"

    response = requests.get(url)
    data = response.json()

    temperature = data["main"]["temp"]
    humidity = data["main"]["humidity"]

    return {
        "temperature": temperature,
        "humidity": humidity,
        "rainfall": average_rainfall,
    }
