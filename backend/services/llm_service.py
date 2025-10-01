"""
LLM Service - Integration with Ollama (Llama3:8b) using LangChain
Handles AI-powered itinerary generation and recommendations
"""

import os
from typing import Dict, List, Optional
import ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.llms import Ollama

class LLMService:
    """
    Service class for interacting with Llama3:8b via Ollama
    """
    
    def __init__(self):
        """Initialize LLM service with Ollama configuration"""
        self.base_url = os.getenv('OLLAMA_BASE_URL', 'http://localhost:11434')
        self.model = os.getenv('OLLAMA_MODEL', 'llama3:8b')
        
        # Initialize LangChain Ollama wrapper
        try:
            self.llm = Ollama(
                base_url=self.base_url,
                model=self.model,
                temperature=0.7,
                timeout=90  # 90 second timeout for LLM
            )
            print(f"✅ LLM Service initialized with model: {self.model}")
        except Exception as e:
            print(f"⚠️ Warning: Could not initialize Ollama: {e}")
            print(f"Will use fallback responses")
            self.llm = None
    
    def generate_itinerary(self, trip_data: Dict) -> Dict:
        """
        Generate personalized itinerary based on user preferences
        
        Args:
            trip_data: Dictionary containing destination, dates, preferences, budget, etc.
        
        Returns:
            Dictionary with generated itinerary including activities, timing, and recommendations
        """
        
        # Create prompt template for itinerary generation
        itinerary_template = PromptTemplate(
            input_variables=["destination", "duration", "budget", "interests", "travel_style"],
            template="""
            You are an expert travel planner. Create a detailed day-by-day itinerary for a trip with the following details:
            
            Destination: {destination}
            Duration: {duration} days
            Budget: ${budget}
            Interests: {interests}
            Travel Style: {travel_style}
            
            Provide a structured JSON response with the following format:
            {{
                "itinerary": [
                    {{
                        "day": 1,
                        "title": "Day title",
                        "morning": "Activity description with timing",
                        "afternoon": "Activity description with timing",
                        "evening": "Activity description with timing",
                        "estimated_cost": 150,
                        "tips": "Helpful tips for the day"
                    }}
                ],
                "overview": "Brief trip overview",
                "total_estimated_cost": 1500,
                "packing_suggestions": ["item1", "item2"],
                "cultural_tips": ["tip1", "tip2"]
            }}
            
            Make it specific, practical, and tailored to the user's interests.
            """
        )
        
        # Create chain
        chain = LLMChain(llm=self.llm, prompt=itinerary_template)
        
        # Prepare inputs
        inputs = {
            "destination": trip_data.get("destination", ""),
            "duration": trip_data.get("duration", 5),
            "budget": trip_data.get("budget", 2000),
            "interests": ", ".join(trip_data.get("interests", [])),
            "travel_style": trip_data.get("travel_style", "balanced")
        }
        
        # Generate itinerary
        try:
            # Check if LLM is available
            if self.llm is None:
                print("⚠️ LLM not available, using fallback itinerary")
                return self._generate_fallback_itinerary(trip_data)
            
            print(f"🤖 Generating itinerary with AI for {inputs['destination']}...")
            result = chain.run(**inputs)
            print(f"✅ AI itinerary generated successfully")
            return self._parse_llm_response(result, trip_data)
        except Exception as e:
            print(f"⚠️ Error generating itinerary: {str(e)}")
            print(f"📋 Using fallback itinerary instead")
            return self._generate_fallback_itinerary(trip_data)
    
    def get_activity_recommendations(self, location: str, preferences: List[str], weather: Optional[str] = None) -> List[Dict]:
        """
        Get activity recommendations based on location, preferences, and weather
        
        Args:
            location: Current or target location
            preferences: List of user interests
            weather: Current weather condition (optional)
        
        Returns:
            List of recommended activities
        """
        
        weather_context = f" considering the weather is {weather}" if weather else ""
        
        prompt = PromptTemplate(
            input_variables=["location", "preferences", "weather_context"],
            template="""
            Recommend 5-7 activities in {location} for someone interested in {preferences}{weather_context}.
            
            Provide response as JSON array:
            [
                {{
                    "name": "Activity name",
                    "description": "Brief description",
                    "duration": "2-3 hours",
                    "cost_estimate": "$$",
                    "best_time": "Morning/Afternoon/Evening",
                    "indoor": true/false
                }}
            ]
            
            Make recommendations specific and practical.
            """
        )
        
        chain = LLMChain(llm=self.llm, prompt=prompt)
        
        try:
            result = chain.run(
                location=location,
                preferences=", ".join(preferences),
                weather_context=weather_context
            )
            return self._parse_activities_response(result)
        except Exception as e:
            print(f"Error getting recommendations: {str(e)}")
            return []
    
    def generate_cultural_insights(self, destination: str) -> Dict:
        """
        Generate cultural insights and travel tips for destination
        
        Args:
            destination: Target destination
        
        Returns:
            Dictionary with cultural tips, customs, and local information
        """
        
        prompt = PromptTemplate(
            input_variables=["destination"],
            template="""
            Provide cultural insights and practical travel tips for {destination}.
            
            Return as JSON:
            {{
                "customs": ["custom1", "custom2"],
                "etiquette": ["etiquette1", "etiquette2"],
                "basic_phrases": {{"hello": "translation", "thank_you": "translation"}},
                "tipping_guide": "Tipping expectations",
                "safety_tips": ["tip1", "tip2"],
                "local_insights": ["insight1", "insight2"]
            }}
            """
        )
        
        chain = LLMChain(llm=self.llm, prompt=prompt)
        
        try:
            result = chain.run(destination=destination)
            return self._parse_cultural_response(result)
        except Exception as e:
            print(f"Error generating cultural insights: {str(e)}")
            return {}
    
    def chat_with_assistant(self, message: str, trip_context: Dict, current_itinerary: Dict, conversation_history: List[Dict]) -> Dict:
        """
        Chat with AI assistant about the trip
        
        Args:
            message: User's message
            trip_context: Context about the trip (destination, dates, etc.)
            current_itinerary: Current itinerary state
            conversation_history: Previous conversation messages
        
        Returns:
            Dictionary with response and optional itinerary updates
        """
        
        # Build conversation context
        history_text = "\n".join([
            f"{msg.get('role', 'user')}: {msg.get('content', '')}"
            for msg in conversation_history[-5:]  # Last 5 messages
        ])
        
        prompt = PromptTemplate(
            input_variables=["message", "destination", "itinerary", "history"],
            template="""
            You are a helpful AI travel assistant for a trip to {destination}.
            
            Current Itinerary Summary:
            {itinerary}
            
            Previous conversation:
            {history}
            
            User's question: {message}
            
            Provide a helpful, conversational response. If the user wants to modify the itinerary (add, remove, or change activities), respond with:
            1. A friendly acknowledgment and explanation
            2. A JSON object with the updated itinerary in this EXACT format at the end:
            
            ITINERARY_UPDATE:
            {{
                "itinerary": [
                    {{
                        "day": 1,
                        "title": "Day title",
                        "morning": "Activity description",
                        "afternoon": "Activity description",
                        "evening": "Activity description",
                        "estimated_cost": 150,
                        "tips": "Tips"
                    }}
                ],
                "overview": "Trip overview",
                "total_estimated_cost": 1500,
                "packing_suggestions": ["item1", "item2"],
                "cultural_tips": ["tip1", "tip2"]
            }}
            
            If no itinerary modification is needed, just provide a helpful conversational response.
            Be specific, friendly, and knowledgeable about travel.
            """
        )
        
        try:
            if self.llm is None:
                return self._generate_fallback_chat_response(message, trip_context, current_itinerary)
            
            chain = LLMChain(llm=self.llm, prompt=prompt)
            
            # Prepare itinerary summary
            itinerary_summary = self._summarize_itinerary(current_itinerary)
            
            result = chain.run(
                message=message,
                destination=trip_context.get('destination', 'your destination'),
                itinerary=itinerary_summary,
                history=history_text
            )
            
            # Check if response contains itinerary update
            itinerary_update = None
            response_text = result
            
            if "ITINERARY_UPDATE:" in result:
                parts = result.split("ITINERARY_UPDATE:")
                response_text = parts[0].strip()
                
                # Parse JSON update
                import json
                try:
                    json_str = parts[1].strip()
                    start_idx = json_str.find('{')
                    end_idx = json_str.rfind('}') + 1
                    if start_idx != -1 and end_idx > start_idx:
                        itinerary_update = json.loads(json_str[start_idx:end_idx])
                except Exception as e:
                    print(f"Error parsing itinerary update: {e}")
            
            return {
                'response': response_text,
                'itinerary_update': itinerary_update
            }
            
        except Exception as e:
            print(f"Error in chat assistant: {str(e)}")
            return self._generate_fallback_chat_response(message, trip_context, current_itinerary)
    
    def _summarize_itinerary(self, itinerary: Dict) -> str:
        """Create a brief summary of the itinerary for context"""
        if not itinerary or 'itinerary' not in itinerary:
            return "No itinerary available yet."
        
        summary_lines = []
        for day in itinerary.get('itinerary', []):
            summary_lines.append(
                f"Day {day.get('day')}: {day.get('title')} - "
                f"Morning: {day.get('morning', '')[:50]}..., "
                f"Afternoon: {day.get('afternoon', '')[:50]}..., "
                f"Evening: {day.get('evening', '')[:50]}..."
            )
        
        return "\n".join(summary_lines)
    
    def _generate_fallback_chat_response(self, message: str, trip_context: Dict, current_itinerary: Dict) -> Dict:
        """Generate fallback response when LLM is unavailable"""
        message_lower = message.lower()
        destination = trip_context.get('destination', 'your destination')
        
        # Simple pattern matching for common queries
        if any(word in message_lower for word in ['restaurant', 'food', 'eat', 'dining']):
            response = f"I'd be happy to help with restaurant recommendations in {destination}! Based on local cuisine and popular spots, I suggest trying local specialties and asking your hotel for current recommendations. Would you like me to suggest specific areas or types of cuisine?"
        
        elif any(word in message_lower for word in ['add', 'include', 'visit']):
            response = f"I understand you'd like to add something to your itinerary. While I'm currently unable to modify the itinerary automatically, I recommend considering the timing and location when adding new activities. What specific activity would you like to add and on which day?"
        
        elif any(word in message_lower for word in ['remove', 'cancel', 'delete', 'skip']):
            response = f"I can help you adjust your plans. Which day and activity would you like to remove? This will free up time for other experiences or simply allow for more flexibility."
        
        elif any(word in message_lower for word in ['weather', 'temperature', 'climate']):
            response = f"For up-to-date weather information in {destination}, I recommend checking a weather service. Generally, it's good to pack layers and be prepared for changes. Would you like suggestions on what to pack?"
        
        elif any(word in message_lower for word in ['budget', 'cost', 'expensive', 'cheap', 'price']):
            response = f"I can help you optimize your budget. The current itinerary estimates ${current_itinerary.get('total_estimated_cost', 'N/A')} total. Would you like suggestions for budget-friendly alternatives?"
        
        else:
            response = f"I'm here to help with your trip to {destination}! I can assist with restaurant recommendations, activity suggestions, itinerary modifications, local tips, and budget planning. What would you like to know more about?"
        
        return {
            'response': response,
            'itinerary_update': None
        }
    
    def optimize_budget(self, itinerary: Dict, target_budget: float) -> Dict:
        """
        Optimize itinerary to fit within budget constraints
        
        Args:
            itinerary: Current itinerary
            target_budget: Target budget amount
        
        Returns:
            Optimized itinerary with budget suggestions
        """
        
        prompt = PromptTemplate(
            input_variables=["current_itinerary", "budget"],
            template="""
            Optimize this travel itinerary to fit a budget of ${budget}:
            {current_itinerary}
            
            Provide budget optimization suggestions as JSON:
            {{
                "optimizations": [
                    {{
                        "category": "accommodation/food/transport/activities",
                        "current_cost": 500,
                        "suggested_cost": 350,
                        "suggestions": ["suggestion1", "suggestion2"]
                    }}
                ],
                "estimated_savings": 300,
                "revised_total": 1700
            }}
            """
        )
        
        chain = LLMChain(llm=self.llm, prompt=prompt)
        
        try:
            result = chain.run(
                current_itinerary=str(itinerary),
                budget=target_budget
            )
            return self._parse_budget_response(result)
        except Exception as e:
            print(f"Error optimizing budget: {str(e)}")
            return {}
    
    # Helper methods for parsing LLM responses
    
    def _parse_llm_response(self, response: str, original_data: Dict) -> Dict:
        """Parse and structure LLM response into itinerary format"""
        import json
        try:
            # Try to extract JSON from response
            start_idx = response.find('{')
            end_idx = response.rfind('}') + 1
            if start_idx != -1 and end_idx > start_idx:
                json_str = response[start_idx:end_idx]
                return json.loads(json_str)
        except:
            pass
        
        return self._generate_fallback_itinerary(original_data)
    
    def _parse_activities_response(self, response: str) -> List[Dict]:
        """Parse activities recommendations response"""
        import json
        try:
            start_idx = response.find('[')
            end_idx = response.rfind(']') + 1
            if start_idx != -1 and end_idx > start_idx:
                json_str = response[start_idx:end_idx]
                return json.loads(json_str)
        except:
            pass
        
        return []
    
    def _parse_cultural_response(self, response: str) -> Dict:
        """Parse cultural insights response"""
        import json
        try:
            start_idx = response.find('{')
            end_idx = response.rfind('}') + 1
            if start_idx != -1 and end_idx > start_idx:
                json_str = response[start_idx:end_idx]
                return json.loads(json_str)
        except:
            pass
        
        return {}
    
    def _parse_budget_response(self, response: str) -> Dict:
        """Parse budget optimization response"""
        import json
        try:
            start_idx = response.find('{')
            end_idx = response.rfind('}') + 1
            if start_idx != -1 and end_idx > start_idx:
                json_str = response[start_idx:end_idx]
                return json.loads(json_str)
        except:
            pass
        
        return {}
    
    def _generate_fallback_itinerary(self, trip_data: Dict) -> Dict:
        """Generate basic fallback itinerary if LLM fails"""
        from datetime import datetime, timedelta
        
        duration = trip_data.get("duration", 5)
        destination = trip_data.get("destination", "your destination")
        interests = trip_data.get("interests", [])
        budget = trip_data.get("budget", 2000)
        
        # Calculate per-day budget
        daily_budget = budget / duration if duration > 0 else 100
        
        # Create more detailed fallback itinerary
        itinerary_days = []
        for i in range(duration):
            day_num = i + 1
            
            # Customize based on interests
            morning_activity = "Visit popular landmarks and attractions"
            afternoon_activity = "Explore local neighborhoods and markets"
            evening_activity = "Dinner at a recommended local restaurant"
            
            if "culture" in str(interests).lower() or "history" in str(interests).lower():
                morning_activity = "Tour historical sites and museums"
            if "food" in str(interests).lower():
                evening_activity = "Food tour and culinary experience"
            if "adventure" in str(interests).lower():
                afternoon_activity = "Outdoor adventure activities"
            if "nature" in str(interests).lower():
                morning_activity = "Explore natural parks and scenic areas"
            
            itinerary_days.append({
                "day": day_num,
                "title": f"Day {day_num}: Discovering {destination}",
                "morning": morning_activity,
                "afternoon": afternoon_activity,
                "evening": evening_activity,
                "estimated_cost": int(daily_budget * 0.8),
                "tips": f"Book tickets in advance to avoid queues. Best to start early to make the most of your day!"
            })
        
        return {
            "itinerary": itinerary_days,
            "overview": f"An exciting {duration}-day journey through {destination}, tailored to your interests and budget.",
            "total_estimated_cost": budget,
            "packing_suggestions": [
                "Comfortable walking shoes",
                "Weather-appropriate clothing",
                "Camera or smartphone",
                "Sunscreen and hat",
                "Reusable water bottle",
                "Travel adapter",
                "First aid kit"
            ],
            "cultural_tips": [
                "Research local customs and etiquette before traveling",
                "Learn a few basic phrases in the local language",
                "Be respectful of local traditions and dress codes",
                "Try local cuisine and support local businesses"
            ]
        }

