import React, { useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MARKET_DATA } from '../../constants';
import { SparkleIcon } from '../../constants';
import { generateMarketSummary } from '../../services/geminiService';
import Spinner from '../Spinner';
import type { GroundingChunk } from "@google/genai";

const MarketInsights: React.FC = () => {
    const [city, setCity] = useState('New York');
    const [summary, setSummary] = useState('');
    const [sources, setSources] = useState<GroundingChunk[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateSummary = useCallback(async () => {
        if (!city) return;
        setIsLoading(true);
        setSummary('');
        setSources([]);
        const result = await generateMarketSummary(city);
        setSummary(result.summary);
        setSources(result.sources);
        setIsLoading(false);
    }, [city]);

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Real Estate Market Insights</h1>
        <p className="text-brand-light mt-2">Analyze market trends and get AI-powered summaries.</p>
      </div>

      {/* Chart */}
      <div className="bg-brand-secondary p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-white">Median Property Prices</h2>
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <BarChart data={MARKET_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-accent)" />
                    <XAxis dataKey="name" stroke="var(--color-text)" />
                    <YAxis stroke="var(--color-text)" tickFormatter={(value) => `$${(Number(value) / 1000000).toFixed(1)}M`} />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'var(--color-primary)', border: '1px solid var(--color-accent)' }}
                        labelStyle={{ color: 'var(--color-text)' }}
                    />
                    <Legend wrapperStyle={{color: 'var(--color-text)'}}/>
                    <Bar dataKey="Median Price" fill="var(--color-highlight)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
      
      {/* AI Summary Generator */}
      <div className="bg-brand-secondary p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <SparkleIcon className="w-6 h-6 text-brand-highlight" />
            AI Market Summary
        </h2>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input 
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter a city (e.g., San Francisco)"
                className="flex-grow p-3 rounded bg-brand-accent text-white placeholder-brand-light border border-brand-light focus:ring-brand-highlight focus:border-brand-highlight"
            />
            <button
                onClick={handleGenerateSummary}
                disabled={isLoading || !city}
                className="bg-brand-highlight-hover text-brand-highlight-text font-bold py-3 px-6 rounded-lg hover:bg-brand-highlight transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Generating...' : 'Generate Summary'}
            </button>
        </div>

        {isLoading && <Spinner />}
        {summary && (
            <div className="mt-4 bg-brand-primary p-4 rounded-md">
                <p className="text-brand-text leading-relaxed">{summary}</p>
                {sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-brand-accent">
                        <h4 className="font-semibold text-sm text-brand-light">Sources:</h4>
                        <ul className="list-disc list-inside mt-1 text-sm">
                           {sources.map((source, index) => (
                                source.web ? (
                                    <li key={index}>
                                        <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-brand-highlight hover:underline">
                                            {source.web.title || source.web.uri}
                                        </a>
                                    </li>
                                ) : null
                           ))}
                        </ul>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default MarketInsights;