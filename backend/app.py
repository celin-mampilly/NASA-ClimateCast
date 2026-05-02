from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import math

# Initialize the Flask app
app = Flask(__name__)
CORS(app) # Enable CORS for your app

def generate_mock_data(lat, lon, day):
    """
    Generates mock weather data based on location and time of year.
    This is a simplified model for demonstration purposes.
    """
    # Simulate seasonal temperature variation (colder in Jan/Dec, warmer in Jun/Jul)
    # This simulates the Northern Hemisphere seasons
    seasonal_factor = -math.cos(day * (2 * math.pi / 365)) * 10  # Varies from -10 to +10

    # Simulate latitude-based temperature (warmer near equator, colder near poles)
    latitude_factor = (90 - abs(lat)) / 90 * 30  # Varies from 0 (poles) to 30 (equator)

    # Combine factors to get a base average temperature
    base_avg_temp = latitude_factor + seasonal_factor

    # Add some random daily variation
    avg_temp = round(base_avg_temp + random.uniform(-2, 2), 1)
    min_temp = round(avg_temp - random.uniform(3, 6), 1)
    max_temp = round(avg_temp + random.uniform(3, 6), 1)

    # Simulate rain chance (higher chance in spring/fall)
    rain_chance_factor = math.sin(day * (2 * math.pi / 365))**2 * 50 # 0 to 50
    rain_chance = int(rain_chance_factor + random.uniform(0, 20))


    return {
        "avg_temp": avg_temp,
        "min_temp": min_temp,
        "max_temp": max_temp,
        "rain_chance": min(rain_chance, 100), # Ensure it doesn't exceed 100
    }

@app.route("/api/get-weather")
def get_weather():
    # Get parameters from the request URL, with default values
    try:
        lat = float(request.args.get('lat', 0))
        lon = float(request.args.get('lon', 0))
        day = int(request.args.get('day', 1))
    except (ValueError, TypeError):
        # Handle cases where parameters are not valid numbers
        return jsonify({"error": "Invalid input parameters"}), 400

    # Generate the mock data using our function
    weather_data = generate_mock_data(lat, lon, day)

    # Return the data as a JSON response
    return jsonify(weather_data)


# A simple test route to make sure the server is up
@app.route("/api/test")
def test_endpoint():
    return {"message": "Backend is connected!"}

# Run the app
if __name__ == "__main__":
    app.run(debug=True)