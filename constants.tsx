import React from 'react';
import type { Property, MarketData } from './types';

export const PROPERTIES: Property[] = [
  {
    id: 1,
    title: 'Modern Villa with Ocean View',
    price: 3500000,
    address: '123 Ocean Drive',
    city: 'Malibu',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 5500,
    description: 'Breathtaking modern villa with panoramic ocean views, an infinity pool, and state-of-the-art amenities. Experience luxury living at its finest.',
    features: ['Infinity Pool', 'Home Theater', 'Ocean View', 'Smart Home System', 'Gourmet Kitchen'],
    imageUrl: 'https://picsum.photos/seed/villa1/800/600',
    agent: {
      name: 'Jane Doe',
      avatarUrl: 'https://picsum.photos/seed/agent1/100/100',
    },
  },
  {
    id: 2,
    title: 'Cozy Downtown Loft',
    price: 850000,
    address: '456 Main Street, Apt 7B',
    city: 'New York',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    description: 'Chic and stylish loft in the heart of the city. Features exposed brick, high ceilings, and large windows with amazing city views.',
    features: ['Exposed Brick', 'High Ceilings', 'City View', 'Modern Appliances'],
    imageUrl: 'https://picsum.photos/seed/loft2/800/600',
    agent: {
      name: 'John Smith',
      avatarUrl: 'https://picsum.photos/seed/agent2/100/100',
    },
  },
  {
    id: 3,
    title: 'Suburban Family Home',
    price: 1200000,
    address: '789 Oak Lane',
    city: 'Westchester',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    description: 'Spacious and welcoming family home in a quiet suburban neighborhood. Large backyard, great school district, and a two-car garage.',
    features: ['Large Backyard', 'Two-Car Garage', 'Fireplace', 'Hardwood Floors'],
    imageUrl: 'https://picsum.photos/seed/suburban3/800/600',
    agent: {
      name: 'Emily Jones',
      avatarUrl: 'https://picsum.photos/seed/agent3/100/100',
    },
  },
  {
    id: 4,
    title: 'Rustic Mountain Cabin',
    price: 650000,
    address: '101 Pine Cone Trail',
    city: 'Aspen',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    description: 'Charming and rustic cabin nestled in the mountains. Perfect for a ski getaway or a peaceful retreat. Features a stone fireplace and wrap-around deck.',
    features: ['Mountain View', 'Stone Fireplace', 'Wrap-around Deck', 'Secluded'],
    imageUrl: 'https://picsum.photos/seed/cabin4/800/600',
    agent: {
      name: 'Michael Brown',
      avatarUrl: 'https://picsum.photos/seed/agent4/100/100',
    },
  },
  {
    id: 5,
    title: 'Luxury Penthouse Suite',
    price: 7800000,
    address: '200 Skyview Terrace',
    city: 'Miami',
    bedrooms: 4,
    bathrooms: 5,
    sqft: 6000,
    description: 'An exquisite penthouse offering unparalleled luxury and 360-degree views of the city and ocean. Private rooftop pool and terrace.',
    features: ['Rookie Pool', '360° Views', 'Private Elevator', 'Concierge Service'],
    imageUrl: 'https://picsum.photos/seed/penthouse5/800/600',
    agent: {
      name: 'Sophia Williams',
      avatarUrl: 'https://picsum.photos/seed/agent5/100/100',
    },
  },
  {
    id: 6,
    title: 'Historic Brownstone',
    price: 2100000,
    address: '333 Heritage Row',
    city: 'Boston',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4100,
    description: 'A beautifully preserved historic brownstone in a prestigious neighborhood. Original details meet modern convenience.',
    features: ['Historic Charm', 'Original Woodwork', 'Gourmet Kitchen', 'Landscaped Garden'],
    imageUrl: 'https://picsum.photos/seed/brownstone6/800/600',
    agent: {
      name: 'David Miller',
      avatarUrl: 'https://picsum.photos/seed/agent6/100/100',
    },
  },
];

export const MARKET_DATA: MarketData[] = [
  { name: 'Malibu', 'Median Price': 3200000, 'Avg. Days on Market': 75 },
  { name: 'New York', 'Median Price': 780000, 'Avg. Days on Market': 60 },
  { name: 'Westchester', 'Median Price': 1100000, 'Avg. Days on Market': 45 },
  { name: 'Aspen', 'Median Price': 590000, 'Avg. Days on Market': 90 },
  { name: 'Miami', 'Median Price': 650000, 'Avg. Days on Market': 55 },
  { name: 'Boston', 'Median Price': 950000, 'Avg. Days on Market': 50 },
];

export const BedIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
);

export const BathIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12V3h14v9m-4-6h-6m-2 6h10a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2a2 2 0 012-2z" />
    </svg>
);

export const SqftIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4M9 9l6 6m0-6l-6 6" />
    </svg>
);

export const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M19 3v4M17 5h4M12 21l-2-4-4-2 4-2 2-4 2 4 4 2-4 2-2 4zM12 3v2" />
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);