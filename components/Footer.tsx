import React from 'react';
import { SparkleIcon } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-secondary">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center text-center text-brand-light">
          <SparkleIcon className="h-5 w-5 mr-2 text-brand-highlight"/>
          <p>&copy; {new Date().getFullYear()} Dream Escape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;