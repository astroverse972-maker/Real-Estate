import React from 'react';
import { Link } from 'react-router-dom';
import type { Property } from '../types';
import { BedIcon, BathIcon, SqftIcon } from '../constants';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="block group">
      <div className="bg-brand-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <img className="w-full h-56 object-cover" src={property.imageUrl} alt={property.title} />
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-brand-light">{property.city}</p>
                <h3 className="font-bold text-xl text-brand-text mb-2 group-hover:text-brand-highlight transition-colors">{property.title}</h3>
            </div>
            <p className="font-semibold text-lg text-brand-highlight whitespace-nowrap">
                ${property.price.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center text-brand-light mt-4 space-x-4">
              <div className="flex items-center">
                  <BedIcon className="h-5 w-5 mr-2" />
                  <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                  <BathIcon className="h-5 w-5 mr-2" />
                  <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center">
                  <SqftIcon className="h-5 w-5 mr-2" />
                  <span>{property.sqft.toLocaleString()} sqft</span>
              </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;