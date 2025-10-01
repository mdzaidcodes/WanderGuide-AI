"""
Weather Routes - Handles weather-based recommendations
"""

from flask import Blueprint, request, jsonify
import random
from datetime import datetime, timedelta

weather_bp = Blueprint('weather', __name__)

@weather_bp.route('/forecast', methods=['GET'])
def get_weather_forecast():
    """
    Get weather forecast for destination
    
    Query params:
    - destination: City name
    - days: Number of days (default: 7, max: 14)
    
    Note: This is mock data. In production, integrate with weather API like OpenWeatherMap
    """
    try:
        destination = request.args.get('destination')
        days = min(int(request.args.get('days', 7)), 14)
        
        if not destination:
            return jsonify({'error': 'Destination parameter required'}), 400
        
        # Generate mock weather data
        weather_conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Clear']
        forecast = []
        
        for i in range(days):
            date = (datetime.now() + timedelta(days=i)).strftime('%Y-%m-%d')
            condition = random.choice(weather_conditions)
            
            forecast.append({
                'date': date,
                'condition': condition,
                'temperature': {
                    'high': random.randint(20, 30),
                    'low': random.randint(10, 20),
                    'unit': 'C'
                },
                'precipitation': random.randint(0, 80) if 'Rain' in condition else random.randint(0, 20),
                'humidity': random.randint(40, 80),
                'wind_speed': random.randint(5, 25),
                'icon': self._get_weather_icon(condition)
            })
        
        return jsonify({
            'success': True,
            'destination': destination,
            'forecast': forecast
        }), 200
        
    except ValueError:
        return jsonify({'error': 'Invalid days parameter'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def _get_weather_icon(condition: str) -> str:
    """Map weather condition to icon identifier"""
    icons = {
        'Sunny': '☀️',
        'Partly Cloudy': '⛅',
        'Cloudy': '☁️',
        'Rainy': '🌧️',
        'Clear': '🌤️'
    }
    return icons.get(condition, '🌤️')

