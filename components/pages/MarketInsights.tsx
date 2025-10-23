import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MARKET_DATA } from '../../constants';

const MarketInsights: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Real Estate Market Insights</h1>
        <p className="text-brand-light mt-2">Analyze market trends across key locations.</p>
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
    </div>
  );
};

export default MarketInsights;