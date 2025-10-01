# WanderGuide AI - Backend

Flask-based backend API for WanderGuide AI travel planning application.

## Features

- AI-powered itinerary generation using Ollama (Llama3:8b)
- Flight and hotel search with web scraping
- Activity and restaurant recommendations
- Weather-based planning
- Cultural insights and travel tips

## Setup

1. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Install and setup Ollama:**
```bash
# Install Ollama from https://ollama.ai/
ollama pull llama3:8b
```

4. **Configure environment:**
```bash
# Create .env file with:
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3:8b
CORS_ORIGINS=http://localhost:3000
```

5. **Run the server:**
```bash
python app.py
```

Server will start on `http://localhost:5000`

## API Documentation

### Health Check
- `GET /api/health` - Check API status

### Itinerary
- `POST /api/itinerary/generate` - Generate itinerary
- `POST /api/itinerary/optimize-budget` - Optimize budget
- `GET /api/itinerary/cultural-insights` - Get cultural insights

### Bookings
- `GET /api/bookings/flights` - Search flights
- `GET /api/bookings/hotels` - Search hotels
- `GET /api/bookings/activities` - Search activities

### Recommendations
- `POST /api/recommendations/activities` - Get activities
- `GET /api/recommendations/restaurants` - Get restaurants

### Weather
- `GET /api/weather/forecast` - Get weather forecast

## Project Structure

```
backend/
├── routes/          # API route handlers
├── services/        # Business logic services
├── app.py          # Application entry point
└── requirements.txt # Python dependencies
```

## Production

For production deployment, use Gunicorn:

```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```


