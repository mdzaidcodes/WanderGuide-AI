# WanderGuide AI

> Your AI-Powered Intelligent Travel Companion

WanderGuide AI is a full-stack travel planning application that leverages artificial intelligence to create personalized itineraries, provide real-time flight and hotel booking assistance, and offer smart travel recommendations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.9+-blue.svg)
![Node](https://img.shields.io/badge/node-18+-green.svg)

## 🌟 Features

- **Personalized Itinerary Generation** - AI-powered day-by-day travel plans based on your interests and preferences
- **Real-Time Flight Search** - Compare flights with live pricing and availability
- **Hotel Booking Assistance** - Find and compare accommodations with detailed information
- **Local Recommendations** - Discover activities, restaurants, and hidden gems
- **Budget Optimization** - Smart budget tracking and optimization suggestions
- **Weather-Based Planning** - Activity suggestions adapted to weather conditions
- **Cultural Insights** - Local customs, etiquette, and useful phrases
- **Multi-Destination Trips** - Plan complex itineraries across multiple locations

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom blue theme
- **State Management**: React Hooks
- **API Client**: Axios

### Backend
- **Framework**: Flask (Python)
- **AI Engine**: Ollama (Llama3:8b)
- **AI Framework**: LangChain
- **Web Scraping**: BeautifulSoup4 + Selenium
- **CORS**: Flask-CORS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download](https://www.python.org/)
- **Ollama** - [Install Ollama](https://ollama.ai/)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/wanderguide-ai.git
cd wanderguide-ai
```

### 2. Install Ollama and Pull Llama3 Model

Ollama is required for running the AI model locally.

```bash
# Install Ollama (visit https://ollama.ai/ for your platform)

# Pull the Llama3:8b model
ollama pull llama3:8b

# Verify the model is installed
ollama list
```

Make sure Ollama is running on `http://localhost:11434` (default).

### 3. Backend Setup

#### Step 1: Navigate to Backend Directory

```bash
cd backend
```

#### Step 2: Create Python Virtual Environment

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### Step 3: Install Python Dependencies

**You must install dependencies first before running the server:**

```bash
pip install -r requirements.txt
```

Wait for all packages to install. This may take a few minutes.

#### Step 4: Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here-change-in-production
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3:8b
CORS_ORIGINS=http://localhost:3000
PORT=5000
```

You can copy from `.env.example` or create it manually.

#### Step 5: Run the Backend Server

```bash
python app.py
```

The backend server will start on `http://localhost:5000`

You should see:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

**Keep this terminal open and running.**

Test the API health endpoint in a new terminal:
```bash
curl http://localhost:5000/api/health
```

### 4. Frontend Setup

**Open a NEW terminal window** (keep the backend running in the first terminal).

#### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

#### Step 2: Install Node Dependencies

**You must install dependencies first before running the dev server:**

```bash
npm install
```

Wait for all packages to install. This may take a few minutes.

#### Step 3: Configure Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Step 4: Run the Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

You should see:
```
- Local:        http://localhost:3000
- Ready in 2.3s
```

**Keep this terminal open and running.**

### 5. Access the Application

With both terminals running (backend and frontend), open your browser and navigate to:

```
http://localhost:3000
```

**Summary of Running Services:**
- Backend API: `http://localhost:5000` (Terminal 1)
- Frontend App: `http://localhost:3000` (Terminal 2)
- Ollama: `http://localhost:11434` (Running in background)

## 📁 Project Structure

```
wanderguide-ai/
├── backend/
│   ├── routes/
│   │   ├── itinerary_routes.py      # Itinerary generation endpoints
│   │   ├── booking_routes.py        # Flight/hotel search endpoints
│   │   ├── recommendation_routes.py # Recommendation endpoints
│   │   └── weather_routes.py        # Weather forecast endpoints
│   ├── services/
│   │   ├── llm_service.py          # LLM integration with Ollama
│   │   └── scraper_service.py      # Web scraping service
│   ├── app.py                       # Flask application entry point
│   ├── requirements.txt             # Python dependencies
│   └── .env.example                 # Environment variables template
├── frontend/
│   ├── app/
│   │   ├── layout.tsx              # Root layout component
│   │   ├── page.tsx                # Home page
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Navigation header
│   │   │   └── Footer.tsx          # Footer component
│   │   ├── home/
│   │   │   ├── Hero.tsx            # Hero section
│   │   │   └── Features.tsx        # Features showcase
│   │   ├── trip/
│   │   │   ├── TripPlanner.tsx     # Main trip planning form
│   │   │   ├── FlightResults.tsx   # Flight display component
│   │   │   ├── HotelResults.tsx    # Hotel display component
│   │   │   └── ItineraryDisplay.tsx # Itinerary view
│   │   └── ui/
│   │       └── LoadingSpinner.tsx  # Loading component
│   ├── utils/
│   │   └── api.ts                  # API client utilities
│   ├── package.json                # Node dependencies
│   ├── tsconfig.json               # TypeScript configuration
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   └── next.config.js              # Next.js configuration
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

## 🔧 API Endpoints

### Itinerary
- `POST /api/itinerary/generate` - Generate personalized itinerary
- `POST /api/itinerary/optimize-budget` - Optimize itinerary for budget
- `GET /api/itinerary/cultural-insights` - Get cultural insights

### Bookings
- `GET /api/bookings/flights` - Search flights
- `GET /api/bookings/hotels` - Search hotels
- `GET /api/bookings/activities` - Search activities

### Recommendations
- `POST /api/recommendations/activities` - Get activity recommendations
- `GET /api/recommendations/restaurants` - Get restaurant suggestions

### Weather
- `GET /api/weather/forecast` - Get weather forecast

## 🎨 Design System

The application uses a comprehensive blue color palette:

- **Primary Blue**: For main actions and branding
- **Secondary Blue**: For supporting elements
- **Accent Blue**: For highlights and CTAs
- **Gradients**: Smooth transitions between shades

### UI/UX Principles
- Mobile-first responsive design
- Card-based information architecture
- Progressive disclosure for complex data
- Consistent iconography throughout
- Accessible color contrasts (WCAG AA compliant)

## 🧪 Development

### Frontend Development

```bash
cd frontend

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Backend Development

```bash
cd backend

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Run Flask development server
python app.py

# Run with specific port
PORT=8000 python app.py
```

## 🐛 Troubleshooting

### Ollama Connection Issues

**Problem**: "Connection refused to Ollama"

**Solution**:
1. Ensure Ollama is installed and running: `ollama serve`
2. Verify the model is pulled: `ollama pull llama3:8b`
3. Check the URL in `.env`: `OLLAMA_BASE_URL=http://localhost:11434`

### CORS Errors

**Problem**: "CORS policy blocked"

**Solution**:
1. Ensure backend `.env` has correct frontend URL: `CORS_ORIGINS=http://localhost:3000`
2. Restart the Flask server after changing `.env`

### Module Import Errors (Backend)

**Problem**: "ModuleNotFoundError"

**Solution**:
1. Ensure virtual environment is activated
2. Reinstall dependencies: `pip install -r requirements.txt`
3. Check Python version: `python --version` (should be 3.9+)

### Next.js Build Errors

**Problem**: TypeScript or build errors

**Solution**:
1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check Node version: `node --version` (should be 18+)

## 🚢 Production Deployment

### Backend Deployment

1. Use `gunicorn` for production WSGI server:
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

2. Set environment variables:
```bash
export FLASK_ENV=production
export SECRET_KEY=your-secure-secret-key
```

### Frontend Deployment

1. Build the production bundle:
```bash
npm run build
```

2. Deploy to Vercel (recommended for Next.js):
```bash
npm install -g vercel
vercel
```

Or deploy to other platforms like Netlify, AWS Amplify, etc.

## 📝 Environment Variables

### Backend (.env)
```env
FLASK_APP=app.py
FLASK_ENV=development|production
SECRET_KEY=<secure-random-key>
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3:8b
CORS_ORIGINS=<frontend-url>
PORT=5000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=<backend-api-url>
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Ollama for local LLM inference
- LangChain for AI framework
- Next.js team for the amazing React framework
- Tailwind CSS for the utility-first CSS framework

## 📧 Support

For support, email support@wanderguide.ai or open an issue on GitHub.

---

Built with ❤️ using Next.js, Flask, and Ollama
