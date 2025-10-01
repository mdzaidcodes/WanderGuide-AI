"""
Recommendation Routes - Handles activity and restaurant recommendations
"""

from flask import Blueprint, request, jsonify
from services.llm_service import LLMService

recommendation_bp = Blueprint('recommendation', __name__)
llm_service = LLMService()

@recommendation_bp.route('/activities', methods=['POST'])
def get_activity_recommendations():
    """
    Get activity recommendations based on location and preferences
    
    Expected JSON body:
    {
        "location": "Paris",
        "preferences": ["museums", "food", "culture"],
        "weather": "rainy" (optional)
    }
    """
    try:
        data = request.get_json()
        
        location = data.get('location')
        preferences = data.get('preferences', [])
        weather = data.get('weather')
        
        if not location:
            return jsonify({'error': 'Location is required'}), 400
        
        recommendations = llm_service.get_activity_recommendations(
            location=location,
            preferences=preferences,
            weather=weather
        )
        
        return jsonify({
            'success': True,
            'location': location,
            'count': len(recommendations),
            'recommendations': recommendations
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@recommendation_bp.route('/restaurants', methods=['GET'])
def get_restaurant_recommendations():
    """
    Get restaurant recommendations
    
    Query params:
    - location: City/area
    - cuisine: Cuisine type (optional)
    - budget: Budget level (optional)
    """
    try:
        location = request.args.get('location')
        cuisine = request.args.get('cuisine', 'any')
        budget = request.args.get('budget', 'medium')
        
        if not location:
            return jsonify({'error': 'Location parameter required'}), 400
        
        # Use LLM to generate restaurant recommendations
        preferences = [cuisine, f"{budget} budget"]
        recommendations = llm_service.get_activity_recommendations(
            location=location,
            preferences=preferences
        )
        
        return jsonify({
            'success': True,
            'location': location,
            'restaurants': recommendations
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

