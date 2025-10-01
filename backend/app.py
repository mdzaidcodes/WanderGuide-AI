"""
WanderGuide AI - Backend API
Main Flask application entry point
"""

from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Import routes
from routes.itinerary_routes import itinerary_bp
from routes.booking_routes import booking_bp
from routes.recommendation_routes import recommendation_bp
from routes.weather_routes import weather_bp

def create_app():
    """
    Application factory pattern for creating Flask app
    """
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    app.config['JSON_SORT_KEYS'] = False
    
    # CORS configuration
    cors_origins = os.getenv('CORS_ORIGINS', 'http://localhost:3000').split(',')
    CORS(app, resources={r"/api/*": {"origins": cors_origins}})
    
    # Register blueprints
    app.register_blueprint(itinerary_bp, url_prefix='/api/itinerary')
    app.register_blueprint(booking_bp, url_prefix='/api/bookings')
    app.register_blueprint(recommendation_bp, url_prefix='/api/recommendations')
    app.register_blueprint(weather_bp, url_prefix='/api/weather')
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        """Check if the API is running"""
        return jsonify({
            'status': 'healthy',
            'message': 'WanderGuide AI Backend is running'
        }), 200
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Resource not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    return app

# Create app instance
app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)

