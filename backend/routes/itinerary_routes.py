"""
Itinerary Routes - Handles trip planning and itinerary generation
"""

from flask import Blueprint, request, jsonify
from services.llm_service import LLMService

itinerary_bp = Blueprint('itinerary', __name__)
llm_service = LLMService()

@itinerary_bp.route('/generate', methods=['POST'])
def generate_itinerary():
    """
    Generate personalized itinerary based on user preferences
    
    Expected JSON body:
    {
        "destination": "Paris, France",
        "duration": 5,
        "budget": 2000,
        "interests": ["culture", "food", "history"],
        "travel_style": "balanced",
        "travelers": 2
    }
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['destination', 'duration', 'budget']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Generate itinerary using LLM
        itinerary = llm_service.generate_itinerary(data)
        
        return jsonify({
            'success': True,
            'itinerary': itinerary,
            'metadata': {
                'generated_at': data,
                'destination': data['destination'],
                'duration': data['duration']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@itinerary_bp.route('/optimize-budget', methods=['POST'])
def optimize_budget():
    """
    Optimize itinerary to fit within budget
    
    Expected JSON body:
    {
        "itinerary": {...},
        "target_budget": 1500
    }
    """
    try:
        data = request.get_json()
        
        if 'itinerary' not in data or 'target_budget' not in data:
            return jsonify({'error': 'Missing itinerary or target_budget'}), 400
        
        optimizations = llm_service.optimize_budget(
            data['itinerary'],
            data['target_budget']
        )
        
        return jsonify({
            'success': True,
            'optimizations': optimizations
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@itinerary_bp.route('/cultural-insights', methods=['GET'])
def get_cultural_insights():
    """
    Get cultural insights for a destination
    
    Query params: destination
    """
    try:
        destination = request.args.get('destination')
        
        if not destination:
            return jsonify({'error': 'Destination parameter required'}), 400
        
        insights = llm_service.generate_cultural_insights(destination)
        
        return jsonify({
            'success': True,
            'destination': destination,
            'insights': insights
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

