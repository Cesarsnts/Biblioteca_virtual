import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-biblioteca-100 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-biblioteca-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-biblioteca-700 font-medium">Carregando sua biblioteca...</p>
    </div>
  );
};

export default LoadingSpinner;