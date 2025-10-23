import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SparkleIcon } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'bg-brand-accent text-white'
        : 'text-brand-light hover:bg-brand-secondary hover:text-white'
    }`;
    
  return (
    <nav className="bg-brand-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 text-white font-bold text-xl">
              <SparkleIcon className="h-6 w-6 text-brand-highlight" />
              Dream Escape
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <NavLink to="/" className={linkClass}>Home</NavLink>
              <NavLink to="/listings" className={linkClass}>Listings</NavLink>
              <NavLink to="/market-insights" className={linkClass}>Market Insights</NavLink>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-brand-secondary inline-flex items-center justify-center p-2 rounded-md text-brand-light hover:text-white hover:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-primary focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/listings" className={linkClass} onClick={() => setIsOpen(false)}>Listings</NavLink>
            <NavLink to="/market-insights" className={linkClass} onClick={() => setIsOpen(false)}>Market Insights</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;