"""
Web Scraper Service - Flight and Hotel Data Scraping
Handles scraping of flight and accommodation information from various sources
"""

from typing import Dict, List, Optional
from datetime import datetime, timedelta
import requests
from bs4 import BeautifulSoup
import json
import random

class ScraperService:
    """
    Service for web scraping flight and hotel information
    Note: This uses simulated data for demo purposes. 
    In production, integrate with actual booking APIs or implement proper scraping.
    """
    
    def __init__(self):
        """Initialize scraper service"""
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    
    def search_flights(self, origin: str, destination: str, 
                      departure_date: str, return_date: Optional[str] = None,
                      passengers: int = 1) -> List[Dict]:
        """
        Search for flights between origin and destination
        
        Args:
            origin: Departure airport/city code
            destination: Arrival airport/city code
            departure_date: Departure date (YYYY-MM-DD)
            return_date: Return date for round trips (optional)
            passengers: Number of passengers
        
        Returns:
            List of flight options with pricing and details
        """
        
        # In production, this would scrape actual flight booking sites
        # For now, generating realistic mock data
        
        flight_options = []
        airlines = [
            {"name": "SkyLine Airways", "code": "SKY"},
            {"name": "Global Wings", "code": "GLW"},
            {"name": "Pacific Air", "code": "PAC"},
            {"name": "Euro Express", "code": "EEX"},
            {"name": "Continental Flights", "code": "CON"}
        ]
        
        base_price = self._calculate_base_price(origin, destination)
        
        for i, airline in enumerate(airlines):
            # Generate outbound flight
            outbound_departure = self._generate_time()
            outbound_arrival = self._add_flight_duration(outbound_departure, 
                                                         self._estimate_duration(origin, destination))
            
            flight_option = {
                "id": f"flight_{i+1}",
                "type": "round_trip" if return_date else "one_way",
                "airline": airline["name"],
                "airline_code": airline["code"],
                "outbound": {
                    "departure": {
                        "airport": origin,
                        "time": f"{departure_date}T{outbound_departure}",
                        "terminal": f"Terminal {random.randint(1, 4)}"
                    },
                    "arrival": {
                        "airport": destination,
                        "time": f"{departure_date}T{outbound_arrival}",
                        "terminal": f"Terminal {random.randint(1, 4)}"
                    },
                    "duration": self._estimate_duration(origin, destination),
                    "stops": random.choice([0, 0, 0, 1]),  # Mostly direct flights
                    "flight_number": f"{airline['code']}{random.randint(100, 999)}"
                },
                "price": {
                    "amount": base_price + random.randint(-100, 300) + (i * 50),
                    "currency": "USD",
                    "per_person": True
                },
                "amenities": {
                    "wifi": random.choice([True, False]),
                    "meals": random.choice([True, True, False]),
                    "entertainment": random.choice([True, True, False]),
                    "power_outlets": random.choice([True, False])
                },
                "baggage": {
                    "carry_on": "1 bag included",
                    "checked": f"{random.randint(1, 2)} bag(s) included" if i < 3 else "Additional fee"
                },
                "class": random.choice(["Economy", "Economy", "Premium Economy"]),
                "rating": round(random.uniform(3.5, 5.0), 1),
                "reviews": random.randint(100, 5000)
            }
            
            # Add return flight if round trip
            if return_date:
                return_departure = self._generate_time()
                return_arrival = self._add_flight_duration(return_departure,
                                                          self._estimate_duration(destination, origin))
                
                flight_option["return"] = {
                    "departure": {
                        "airport": destination,
                        "time": f"{return_date}T{return_departure}",
                        "terminal": f"Terminal {random.randint(1, 4)}"
                    },
                    "arrival": {
                        "airport": origin,
                        "time": f"{return_date}T{return_arrival}",
                        "terminal": f"Terminal {random.randint(1, 4)}"
                    },
                    "duration": self._estimate_duration(destination, origin),
                    "stops": random.choice([0, 0, 0, 1]),
                    "flight_number": f"{airline['code']}{random.randint(100, 999)}"
                }
            
            flight_options.append(flight_option)
        
        # Sort by price
        flight_options.sort(key=lambda x: x["price"]["amount"])
        
        return flight_options
    
    def search_hotels(self, destination: str, check_in: str, check_out: str,
                     guests: int = 2, rooms: int = 1) -> List[Dict]:
        """
        Search for hotel accommodations
        
        Args:
            destination: Destination city
            check_in: Check-in date (YYYY-MM-DD)
            check_out: Check-out date (YYYY-MM-DD)
            guests: Number of guests
            rooms: Number of rooms
        
        Returns:
            List of hotel options with pricing and amenities
        """
        
        # Calculate number of nights
        check_in_date = datetime.strptime(check_in, "%Y-%m-%d")
        check_out_date = datetime.strptime(check_out, "%Y-%m-%d")
        nights = (check_out_date - check_in_date).days
        
        hotel_types = [
            {"type": "Luxury Hotel", "base_rate": 300, "stars": 5},
            {"type": "Boutique Hotel", "base_rate": 200, "stars": 4},
            {"type": "Business Hotel", "base_rate": 150, "stars": 4},
            {"type": "Budget Hotel", "base_rate": 80, "stars": 3},
            {"type": "Resort", "base_rate": 250, "stars": 4},
            {"type": "Apartment", "base_rate": 120, "stars": 4}
        ]
        
        hotel_options = []
        
        for i, hotel_type in enumerate(hotel_types):
            nightly_rate = hotel_type["base_rate"] + random.randint(-30, 50)
            total_price = nightly_rate * nights * rooms
            
            # Generate amenities based on hotel type
            amenities = self._generate_hotel_amenities(hotel_type["stars"])
            
            hotel_option = {
                "id": f"hotel_{i+1}",
                "name": self._generate_hotel_name(destination, hotel_type["type"]),
                "type": hotel_type["type"],
                "rating": hotel_type["stars"],
                "review_score": round(random.uniform(7.0, 9.5), 1),
                "review_count": random.randint(200, 5000),
                "location": {
                    "address": f"{random.randint(1, 999)} {destination} Street",
                    "district": random.choice(["Downtown", "City Center", "Waterfront", "Historic District"]),
                    "distance_to_center": f"{random.uniform(0.5, 3.5):.1f} km"
                },
                "images": [
                    f"https://placeholder.com/hotel{i+1}_1.jpg",
                    f"https://placeholder.com/hotel{i+1}_2.jpg",
                    f"https://placeholder.com/hotel{i+1}_3.jpg"
                ],
                "price": {
                    "nightly_rate": nightly_rate,
                    "total": total_price,
                    "currency": "USD",
                    "taxes_included": False,
                    "breakdown": {
                        "base_price": total_price * 0.85,
                        "taxes": total_price * 0.15
                    }
                },
                "rooms_available": random.randint(1, 10),
                "amenities": amenities,
                "room_details": {
                    "type": random.choice(["Standard Room", "Deluxe Room", "Suite"]),
                    "size": f"{random.randint(20, 50)} m²",
                    "bed_type": random.choice(["King Bed", "Queen Bed", "2 Twin Beds"]),
                    "max_guests": guests
                },
                "policies": {
                    "check_in": "3:00 PM",
                    "check_out": "11:00 AM",
                    "cancellation": "Free cancellation until 24 hours before check-in" if i < 4 else "Non-refundable",
                    "pets": random.choice([True, False])
                },
                "highlights": self._generate_hotel_highlights(hotel_type["stars"])
            }
            
            hotel_options.append(hotel_option)
        
        # Sort by rating and price
        hotel_options.sort(key=lambda x: (-x["rating"], x["price"]["total"]))
        
        return hotel_options
    
    def get_activity_deals(self, destination: str) -> List[Dict]:
        """
        Get local activities and experiences
        
        Args:
            destination: Destination city
        
        Returns:
            List of activities and experiences
        """
        
        activity_types = [
            "City Tour", "Food Tour", "Museum Visit", "Adventure Activity",
            "Cultural Experience", "Water Sports", "Day Trip", "Nightlife Experience"
        ]
        
        activities = []
        
        for i, activity_type in enumerate(activity_types):
            activity = {
                "id": f"activity_{i+1}",
                "name": f"{destination} {activity_type}",
                "type": activity_type,
                "description": f"Experience the best of {destination} with this {activity_type.lower()}",
                "duration": f"{random.randint(2, 8)} hours",
                "price": random.randint(30, 200),
                "currency": "USD",
                "rating": round(random.uniform(4.0, 5.0), 1),
                "reviews": random.randint(50, 1000),
                "includes": [
                    "Professional guide",
                    "Transportation" if random.choice([True, False]) else None,
                    "Meals" if random.choice([True, False]) else None,
                    "Entry tickets"
                ],
                "availability": "Daily",
                "group_size": f"Up to {random.randint(10, 30)} people",
                "languages": ["English", random.choice(["Spanish", "French", "German", "Italian"])]
            }
            
            # Remove None values from includes
            activity["includes"] = [x for x in activity["includes"] if x]
            
            activities.append(activity)
        
        return activities
    
    # Helper methods
    
    def _calculate_base_price(self, origin: str, destination: str) -> int:
        """Calculate base flight price based on distance approximation"""
        # Simple logic for demo - in production, would use actual distance/pricing
        return random.randint(200, 800)
    
    def _estimate_duration(self, origin: str, destination: str) -> str:
        """Estimate flight duration"""
        hours = random.randint(2, 12)
        minutes = random.choice([0, 15, 30, 45])
        return f"{hours}h {minutes}m" if minutes > 0 else f"{hours}h"
    
    def _generate_time(self) -> str:
        """Generate random flight time"""
        hour = random.randint(0, 23)
        minute = random.choice([0, 15, 30, 45])
        return f"{hour:02d}:{minute:02d}"
    
    def _add_flight_duration(self, departure_time: str, duration: str) -> str:
        """Calculate arrival time"""
        # Simple calculation - parse and add
        dep_hour, dep_min = map(int, departure_time.split(':'))
        
        # Parse duration
        hours = int(duration.split('h')[0])
        minutes_str = duration.split('h')[1].strip().replace('m', '')
        minutes = int(minutes_str) if minutes_str else 0
        
        total_minutes = (dep_hour * 60 + dep_min) + (hours * 60 + minutes)
        arr_hour = (total_minutes // 60) % 24
        arr_min = total_minutes % 60
        
        return f"{arr_hour:02d}:{arr_min:02d}"
    
    def _generate_hotel_amenities(self, stars: int) -> List[str]:
        """Generate amenities based on hotel star rating"""
        base_amenities = ["Free WiFi", "Air Conditioning", "24-hour Front Desk"]
        
        if stars >= 3:
            base_amenities.extend(["Restaurant", "Room Service", "Parking"])
        
        if stars >= 4:
            base_amenities.extend(["Fitness Center", "Pool", "Bar", "Concierge"])
        
        if stars >= 5:
            base_amenities.extend(["Spa", "Airport Shuttle", "Business Center", "Valet Parking"])
        
        return base_amenities
    
    def _generate_hotel_name(self, destination: str, hotel_type: str) -> str:
        """Generate hotel name"""
        prefixes = ["The", "Grand", "Royal", "Plaza", "Sunset", "Harbor", "Garden"]
        suffixes = ["Hotel", "Resort", "Inn", "Suites", "Lodge"]
        
        if "Apartment" in hotel_type:
            return f"{destination} City Apartments"
        elif "Boutique" in hotel_type:
            return f"{random.choice(prefixes)} {destination} Boutique"
        else:
            return f"{random.choice(prefixes)} {destination} {random.choice(suffixes)}"
    
    def _generate_hotel_highlights(self, stars: int) -> List[str]:
        """Generate hotel highlights"""
        highlights = ["Recently renovated", "Great location"]
        
        if stars >= 4:
            highlights.extend(["Excellent breakfast", "Rooftop terrace"])
        
        if stars >= 5:
            highlights.extend(["Award-winning restaurant", "Luxury amenities"])
        
        return random.sample(highlights, min(3, len(highlights)))

