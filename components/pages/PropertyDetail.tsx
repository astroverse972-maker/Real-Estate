import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import type { Property } from '../../types';
import { PROPERTIES, BedIcon, BathIcon, SqftIcon, SparkleIcon } from '../../constants';
import { generateVibeDescription } from '../../services/geminiService';
import Spinner from '../Spinner';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [vibe, setVibe] = useState<string>('');
  const [isLoadingVibe, setIsLoadingVibe] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const foundProperty = PROPERTIES.find(p => p.id === parseInt(id || ''));
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      setError('Property not found.');
    }
  }, [id]);

  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result.split(',')[1]);
        }
      };
      reader.readAsDataURL(file);
    });
    return {
      base64: await base64EncodedDataPromise,
      mimeType: file.type,
    };
  };

  const handleGenerateVibe = useCallback(async () => {
    if (!property) return;
    setIsLoadingVibe(true);
    setVibe('');
    try {
        // We'll fetch the image from picsum and convert it to a blob/file to simulate an upload for the Gemini API
        const response = await fetch(property.imageUrl);
        const blob = await response.blob();
        const file = new File([blob], "property_image.jpg", { type: blob.type });

        const { base64, mimeType } = await fileToGenerativePart(file);
        const description = await generateVibeDescription(property.features, base64, mimeType);
        setVibe(description);
    } catch (e) {
        setVibe('Error generating the vibe. Please try again.');
    } finally {
        setIsLoadingVibe(false);
    }
  }, [property]);

  if (error) {
    return <div className="text-center text-red-500 text-2xl">{error}</div>;
  }

  if (!property) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>;
  }

  return (
    <div className="bg-brand-secondary shadow-2xl rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover min-h-[400px]" />
        </div>
        <div className="lg:col-span-2 p-8 space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white">{property.title}</h1>
            <p className="text-brand-light text-lg mt-1">{property.address}</p>
          </div>
          <p className="text-4xl font-bold text-brand-highlight">${property.price.toLocaleString()}</p>
          
          <div className="flex items-center text-brand-light text-lg space-x-6">
              <div className="flex items-center"><BedIcon className="h-6 w-6 mr-2" /><span>{property.bedrooms} Beds</span></div>
              <div className="flex items-center"><BathIcon className="h-6 w-6 mr-2" /><span>{property.bathrooms} Baths</span></div>
              <div className="flex items-center"><SqftIcon className="h-6 w-6 mr-2" /><span>{property.sqft.toLocaleString()} sqft</span></div>
          </div>

          <p className="text-brand-text leading-relaxed">{property.description}</p>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Key Features</h3>
            <ul className="list-disc list-inside space-y-1 text-brand-light">
              {property.features.map(feature => <li key={feature}>{feature}</li>)}
            </ul>
          </div>

          <div className="bg-brand-primary p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <SparkleIcon className="text-brand-highlight w-6 h-6"/>
                AI Generated Vibe
            </h3>
            {isLoadingVibe ? (
                <Spinner />
            ) : vibe ? (
                <p className="text-brand-light italic">"{vibe}"</p>
            ) : (
                <button
                    onClick={handleGenerateVibe}
                    className="w-full bg-brand-highlight-hover text-brand-highlight-text font-bold py-2 px-4 rounded-lg hover:bg-brand-highlight transition-colors duration-300"
                >
                    Describe the Vibe
                </button>
            )}
          </div>

          <div className="flex items-center pt-4 border-t border-brand-accent">
            <img src={property.agent.avatarUrl} alt={property.agent.name} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <p className="font-semibold text-white">{property.agent.name}</p>
              <p className="text-brand-light">Listing Agent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;