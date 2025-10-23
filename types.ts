
export interface Property {
  id: number;
  title: string;
  price: number;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  features: string[];
  imageUrl: string;
  agent: {
    name: string;
    avatarUrl: string;
  };
}

export interface MarketData {
    name: string;
    'Median Price': number;
    'Avg. Days on Market': number;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
