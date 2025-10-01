"""
Booking Routes - Handles flight and hotel searches
"""

from flask import Blueprint, request, jsonify
from services.scraper_service import ScraperService

booking_bp = Blueprint('booking', __name__)
scraper_service = ScraperService()

@booking_bp.route('/flights', methods=['GET'])
def search_flights():
    """
    Search for flights
    
    Query params:
    - origin: Departure airport code
    - destination: Arrival airport code
    - departure_date: Departure date (YYYY-MM-DD)
    - return_date: Return date (optional)
    - passengers: Number of passengers (default: 1)
    """
    try:
        origin = request.args.get('origin')
        destination = request.args.get('destination')
        departure_date = request.args.get('departure_date')
        return_date = request.args.get('return_date')
        passengers = int(request.args.get('passengers', 1))
        
        # Validate required parameters
        if not all([origin, destination, departure_date]):
            return jsonify({
                'error': 'Missing required parameters: origin, destination, departure_date'
            }), 400
        
        # Search flights
        flights = scraper_service.search_flights(
            origin=origin,
            destination=destination,
            departure_date=departure_date,
            return_date=return_date,
            passengers=passengers
        )
        
        return jsonify({
            'success': True,
            'count': len(flights),
            'flights': flights,
            'search_params': {
                'origin': origin,
                'destination': destination,
                'departure_date': departure_date,
                'return_date': return_date,
                'passengers': passengers
            }
        }), 200
        
    except ValueError:
        return jsonify({'error': 'Invalid passenger count'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@booking_bp.route('/hotels', methods=['GET'])
def search_hotels():
    """
    Search for hotels
    
    Query params:
    - destination: Destination city
    - check_in: Check-in date (YYYY-MM-DD)
    - check_out: Check-out date (YYYY-MM-DD)
    - guests: Number of guests (default: 2)
    - rooms: Number of rooms (default: 1)
    """
    try:
        destination = request.args.get('destination')
        check_in = request.args.get('check_in')
        check_out = request.args.get('check_out')
        guests = int(request.args.get('guests', 2))
        rooms = int(request.args.get('rooms', 1))
        
        # Validate required parameters
        if not all([destination, check_in, check_out]):
            return jsonify({
                'error': 'Missing required parameters: destination, check_in, check_out'
            }), 400
        
        # Search hotels
        hotels = scraper_service.search_hotels(
            destination=destination,
            check_in=check_in,
            check_out=check_out,
            guests=guests,
            rooms=rooms
        )
        
        return jsonify({
            'success': True,
            'count': len(hotels),
            'hotels': hotels,
            'search_params': {
                'destination': destination,
                'check_in': check_in,
                'check_out': check_out,
                'guests': guests,
                'rooms': rooms
            }
        }), 200
        
    except ValueError:
        return jsonify({'error': 'Invalid guests or rooms count'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@booking_bp.route('/activities', methods=['GET'])
def search_activities():
    """
    Search for local activities and experiences
    
    Query params:
    - destination: Destination city
    """
    try:
        destination = request.args.get('destination')
        
        if not destination:
            return jsonify({'error': 'Destination parameter required'}), 400
        
        activities = scraper_service.get_activity_deals(destination)
        
        return jsonify({
            'success': True,
            'count': len(activities),
            'activities': activities,
            'destination': destination
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


