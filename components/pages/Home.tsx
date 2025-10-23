import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../PropertyCard';
import { PROPERTIES } from '../../constants';
import { SparkleIcon } from '../../constants';

const Home: React.FC = () => {
  const featuredProperties = PROPERTIES.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center py-20 px-4 bg-brand-secondary rounded-lg shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Your Dream Home Awaits
        </h1>
        <p className="mt-4 text-lg md:text-xl text-brand-light max-w-3xl mx-auto">
          Explore exclusive listings and get real-time market insights to make your next move your best move.
        </p>
        <Link
          to="/listings"
          className="mt-8 inline-flex items-center gap-2 bg-brand-highlight-hover text-brand-highlight-text font-bold py-3 px-8 rounded-full hover:bg-brand-highlight transition-transform transform hover:scale-105 duration-300"
        >
          <SparkleIcon className="w-5 h-5"/>
          Explore Listings
        </Link>
      </div>

      {/* Featured Properties */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;