from requests_cache import CachedSession
from openmeteo_requests import Client
from retry_requests import retry
from math import exp
from random import randint
from pandas import date_range, to_datetime, Timedelta, DataFrame

# Setup the Open-Meteo API client with cache and retry on error
cache_session = CachedSession(".cache", expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = Client(session=retry_session)

def calculate_specific_humidity(temp_c, vpd_kpa, surface_pressure_kpa):
    # Calculate Saturation Vapor Pressure (es) using the Tetens equation
    es_kpa = 0.611 * exp((17.27 * temp_c) / (temp_c + 237.3))

    # Calculate Actual Vapor Pressure (e)
    e_kpa = es_kpa - vpd_kpa  # e = es - VPD

    # Specific humidity formula: q = (0.622 * e) / (P - (1 - 0.622) * e)
    q_kg_per_kg = (0.622 * e_kpa) / (surface_pressure_kpa - (1 - 0.622) * e_kpa)

    # Convert kg/kg to g/kg (1 kg = 1000 g)
    q_g_per_kg = q_kg_per_kg * 1000  

    return q_g_per_kg  # Specific humidity in g/kg


def get_weather(latitude, longitude):
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
    current_temperature_2m = current.Variables(0).Value()
    current_relative_humidity_2m = current.Variables(1).Value()
    current_surface_pressure = current.Variables(2).Value() / 10

    # hourly data
    hourly = response.Hourly()
    hourly_vapour_pressure_deficit = hourly.Variables(0).ValuesAsNumpy()

    hourly_data = {
        "date": date_range(
            start=to_datetime(hourly.Time(), unit="s", utc=True),
            end=to_datetime(hourly.TimeEnd(), unit="s", utc=True),
            freq=Timedelta(seconds=hourly.Interval()),
            inclusive="left"
        ),
        "vapour_pressure_deficit": hourly_vapour_pressure_deficit
    }

    hourly_dataframe = DataFrame(data=hourly_data)
    vapour_pressure_deficit = hourly_dataframe["vapour_pressure_deficit"].mean()

    calculated_specific_humidity = calculate_specific_humidity(
        current_temperature_2m,
        vapour_pressure_deficit,
        current_surface_pressure
    )

    # daily data
    daily = response.Daily()
    # Optionally replace real rain data with a random value
    daily_data = {
        "date": date_range(
            start=to_datetime(daily.Time(), unit="s", utc=True),
            end=to_datetime(daily.TimeEnd(), unit="s", utc=True),
            freq=Timedelta(seconds=daily.Interval()),
            inclusive="left"
        ),
        "rain_sum": randint(21, 298)
    }

    daily_dataframe = DataFrame(data=daily_data)
    current_rain = daily_dataframe["rain_sum"].mean()

    weather_data = {
        "temperature": current_temperature_2m,
        "humidity": current_relative_humidity_2m,
        "rainfall": current_rain,
        "specific_humidity": calculated_specific_humidity,
        "relative_humidity": current_relative_humidity_2m
    }

    return weather_data
