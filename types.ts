export interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  type: 'sightseeing' | 'food' | 'adventure' | 'relax';
}

export interface DayPlan {
  day: number;
  activities: ItineraryItem[];
}

export interface DestinationDetails {
  description: string;
  weather: string;
  bestTime: string;
  visaRequirements: string;
  culturalTips: string[];
  imageUrl?: string;
}

export interface TourPackage {
  id: string;
  name: string;
  destination: string;
  price: number;
  duration: number;
  image: string;
  bookings: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Expense {
  id: string;
  payer: string;
  amount: number;
  description: string;
  date: string;
}

export enum AppMode {
  TOURIST = 'TOURIST',
  VENDOR = 'VENDOR'
}