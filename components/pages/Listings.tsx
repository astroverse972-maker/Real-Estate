
import React, { useState, useMemo } from 'react';
import PropertyCard from '../PropertyCard';
import { PROPERTIES } from '../../constants';

const Listings: React.FC = () => {
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(property => {
      const { city, minPrice, maxPrice, bedrooms } = filters;
      if (city && property.city.toLowerCase() !== city.toLowerCase()) return false;
      if (minPrice && property.price < parseInt(minPrice)) return false;
      if (maxPrice && property.price > parseInt(maxPrice)) return false;
      if (bedrooms && property.bedrooms < parseInt(bedrooms)) return false;
      return true;
    });
  }, [filters]);

  const uniqueCities = [...new Set(PROPERTIES.map(p => p.city))];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Explore Our Listings</h1>

      {/* Filters */}
      <div className="bg-brand-secondary p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <select name="city" value={filters.city} onChange={handleFilterChange} className="w-full p-2 rounded bg-brand-accent text-white border-brand-light focus:ring-yellow-400 focus:border-yellow-400">
          <option value="">All Cities</option>
          {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
        <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} className="w-full p-2 rounded bg-brand-accent text-white placeholder-brand-light border-brand-light focus:ring-yellow-400 focus:border-yellow-400" />
        <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange} className="w-full p-2 rounded bg-brand-accent text-white placeholder-brand-light border-brand-light focus:ring-yellow-400 focus:border-yellow-400" />
        <input type="number" name="bedrooms" placeholder="Min Bedrooms" value={filters.bedrooms} onChange={handleFilterChange} className="w-full p-2 rounded bg-brand-accent text-white placeholder-brand-light border-brand-light focus:ring-yellow-400 focus:border-yellow-400" />
      </div>

      {/* Property Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold">No properties match your criteria.</h3>
          <p className="text-brand-light mt-2">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default Listings;
