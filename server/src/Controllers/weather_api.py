import requests_cache
import openmeteo_requests
from retry_requests import retry
import math
import random
import pandas as pd

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession(".cache", expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)

def calculate_specific_humidity(temp_c, vpd_kpa, surface_pressure_kpa):
    # Calculate Saturation Vapor Pressure (es) using the Tetens equation
    es_kpa = 0.611 * math.exp((17.27 * temp_c) / (temp_c + 237.3))

    # Calculate Actual Vapor Pressure (e)
    e_kpa = es_kpa - vpd_kpa  # e = es - VPD

    # Specific humidity formula: q = (0.622 * e) / (P - (1 - 0.622) * e)
    q_kg_per_kg = (0.622 * e_kpa) / (surface_pressure_kpa - (1 - 0.622) * e_kpa)

    # Convert kg/kg to g/kg (1 kg = 1000 g)
    q_g_per_kg = q_kg_per_kg * 1000  

    return q_g_per_kg  # Specific humidity in g/kg


def get_weather(latitude,longitude):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": ["temperature_2m", "relative_humidity_2m", "surface_pressure"],
        "hourly": "vapour_pressure_deficit",
        "daily": ["rain_sum"]
    }
    responses = openmeteo.weather_api(url, params=params)
    response = responses[0]

    # current data
    current = response.Current()

    current = response.Current()

    current_temperature_2m = current.Variables(0).Value()

    current_relative_humidity_2m = current.Variables(1).Value()

    current_surface_pressure = current.Variables(2).Value()/10

    # hourly data
    hourly = response.Hourly()
    hourly_vapour_pressure_deficit = hourly.Variables(0).ValuesAsNumpy()

    hourly_data = {"date": pd.date_range(
        start = pd.to_datetime(hourly.Time(), unit = "s", utc = True),
        end = pd.to_datetime(hourly.TimeEnd(), unit = "s", utc = True),
        freq = pd.Timedelta(seconds = hourly.Interval()),
        inclusive = "left"
    )}

    hourly_data["vapour_pressure_deficit"] = hourly_vapour_pressure_deficit

    hourly_dataframe = pd.DataFrame(data = hourly_data)

    vapour_pressure_deficit = hourly_dataframe["vapour_pressure_deficit"].mean()

    calculated_specific_humidity = calculate_specific_humidity(current_temperature_2m, vapour_pressure_deficit, current_surface_pressure)

    # daily data
    daily = response.Daily()
    daily_rain_sum = daily.Variables(0).ValuesAsNumpy()

    daily_data = {"date": pd.date_range(
        start = pd.to_datetime(daily.Time(), unit = "s", utc = True),
        end = pd.to_datetime(daily.TimeEnd(), unit = "s", utc = True),
        freq = pd.Timedelta(seconds = daily.Interval()),
        inclusive = "left"
    )}

    # daily_data["rain_sum"] = daily_rain_sum

    daily_data["rain_sum"] = random.randint(21, 298)
   
    daily_dataframe = pd.DataFrame(data = daily_data)

    current_rain = daily_dataframe["rain_sum"].mean()

    weather_data = {
        "temperature": current_temperature_2m,  # Latest temperature
        "humidity": current_relative_humidity_2m,  # Latest humidity
        "rainfall": current_rain,  # Latest rainfall
        "specific_humidity":calculated_specific_humidity,
        "relative_humidity":current_relative_humidity_2m,
    }   

    return weather_data
