import React from 'react';
import { FiLoader } from 'react-icons/fi';

const LoadingSpinner = ({ text }) => (
  <div className="flex flex-col items-center justify-center p-12">
    <FiLoader className="animate-spin text-5xl text-blue-500" />
    <p className="text-lg text-gray-600 mt-4">{text || 'Loading...'}</p>
  </div>
);

export default LoadingSpinner;
