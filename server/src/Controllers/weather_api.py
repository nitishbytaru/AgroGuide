from requests_cache import CachedSession
from openmeteo_requests import Client
from retry_requests import retry
from math import exp
from random import randint
from pandas import date_range, to_datetime, Timedelta, DataFrame
from functools import lru_cache

@lru_cache()
def get_openmeteo_client():
    cache_session = CachedSession(".cache", expire_after=3600)
    retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
    return Client(session=retry_session)

def calculate_specific_humidity(temp_c, vpd_kpa, surface_pressure_kpa):
    es_kpa = 0.611 * exp((17.27 * temp_c) / (temp_c + 237.3))
    e_kpa = es_kpa - vpd_kpa
    q_kg_per_kg = (0.622 * e_kpa) / (surface_pressure_kpa - (1 - 0.622) * e_kpa)
    return q_kg_per_kg * 1000

def get_weather(latitude, longitude):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": ["temperature_2m", "relative_humidity_2m", "surface_pressure"],
        "hourly": "vapour_pressure_deficit",
        "daily": ["rain_sum"]
    }

    openmeteo = get_openmeteo_client()
    responses = openmeteo.weather_api(url, params=params)
    response = responses[0]

    # current data
    current = response.Current()
    current_temperature_2m = current.Variables(0).Value()
    current_relative_humidity_2m = current.Variables(1).Value()
    current_surface_pressure = current.Variables(2).Value() / 10

    # hourly data
    hourly = response.Hourly()
    hourly_vpd = hourly.Variables(0).ValuesAsNumpy()
    hourly_data = {
        "date": date_range(
            start=to_datetime(hourly.Time(), unit="s", utc=True),
            end=to_datetime(hourly.TimeEnd(), unit="s", utc=True),
            freq=Timedelta(seconds=hourly.Interval()),
            inclusive="left"
        ),
        "vapour_pressure_deficit": hourly_vpd
    }
    vapour_pressure_deficit = DataFrame(data=hourly_data)["vapour_pressure_deficit"].mean()

    calculated_specific_humidity = calculate_specific_humidity(
        current_temperature_2m,
        vapour_pressure_deficit,
        current_surface_pressure
    )

    # daily data
    daily = response.Daily()
    daily_data = {
        "date": date_range(
            start=to_datetime(daily.Time(), unit="s", utc=True),
            end=to_datetime(daily.TimeEnd(), unit="s", utc=True),
            freq=Timedelta(seconds=daily.Interval()),
            inclusive="left"
        ),
        "rain_sum": randint(21, 298)  # or use actual data: daily.Variables(0).ValuesAsNumpy()
    }
    current_rain = DataFrame(data=daily_data)["rain_sum"].mean()

    return {
        "temperature": current_temperature_2m,
        "humidity": current_relative_humidity_2m,
        "rainfall": current_rain,
        "specific_humidity": calculated_specific_humidity,
        "relative_humidity": current_relative_humidity_2m
    }
