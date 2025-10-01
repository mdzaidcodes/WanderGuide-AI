# Contributing to WanderGuide AI

Thank you for your interest in contributing to WanderGuide AI! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, browser, versions)

### Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing feature requests** first
- **Describe the feature** in detail
- **Explain the use case** and benefits
- **Consider implementation** complexity

### Pull Requests

1. **Fork the repository** and create a new branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Follow code style guidelines:**
   - Frontend: Use TypeScript with proper types
   - Backend: Follow PEP 8 for Python code
   - Add comments for complex logic
   - Use meaningful variable/function names

3. **Write clean, production-ready code:**
   - No console.logs in production code
   - Handle errors gracefully
   - Add proper error messages
   - Validate user inputs

4. **Test your changes:**
   - Test frontend on multiple screen sizes
   - Test API endpoints with various inputs
   - Check for edge cases and error scenarios

5. **Commit with clear messages:**
   ```bash
   git commit -m "feat: add weather-based activity filtering"
   ```
   
   Use conventional commits:
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `style:` Code style changes
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

6. **Push and create Pull Request:**
   ```bash
   git push origin feature/your-feature-name
   ```

## Development Setup

### Prerequisites
- Node.js 18+
- Python 3.9+
- Ollama with Llama3:8b

### Setup Steps

1. **Clone and install:**
   ```bash
   git clone <your-fork>
   cd wanderguide-ai
   
   # Backend
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   
   # Frontend
   cd ../frontend
   npm install
   ```

2. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend
   python app.py
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## Code Style

### Frontend (TypeScript/React)

```typescript
// Use TypeScript types
interface Props {
  title: string
  count: number
}

// Use functional components with hooks
export default function Component({ title, count }: Props) {
  const [state, setState] = useState(0)
  
  // Clear function names
  const handleClick = () => {
    setState(prev => prev + 1)
  }
  
  return <div>{title}: {count}</div>
}
```

### Backend (Python/Flask)

```python
def search_flights(origin: str, destination: str) -> List[Dict]:
    """
    Search for flights between two airports.
    
    Args:
        origin: Departure airport code
        destination: Arrival airport code
    
    Returns:
        List of flight options with details
    """
    # Implementation
    pass
```

## Testing

### Frontend Testing
```bash
cd frontend
npm run lint
npm run build  # Ensure build succeeds
```

### Backend Testing
```bash
cd backend
python -m pytest  # If tests exist
python app.py     # Manual testing
```

## Documentation

- Update README.md if adding features
- Add code comments for complex logic
- Update API documentation for new endpoints
- Include JSDoc/docstrings for functions

## Questions?

Feel free to open an issue for:
- Questions about the codebase
- Help with setup
- Feature discussions
- General inquiries

## Recognition

Contributors will be added to the README.md acknowledgments section.

Thank you for contributing to WanderGuide AI! 🌍✈️


