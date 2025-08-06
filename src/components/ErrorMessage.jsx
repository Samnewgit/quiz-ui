import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-r-lg" role="alert">
    <div className="flex items-center">
      <FiAlertTriangle className="mr-3" />
      <div>
        <p className="font-bold">An error occurred</p>
        <p>{message}</p>
      </div>
    </div>
  </div>
);

export default ErrorMessage;
