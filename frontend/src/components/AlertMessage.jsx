import React from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

const AlertMessage = ({ type, message, onClose }) => {
  if (!message) return null;

  const alertConfig = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <AlertCircle className="w-5 h-5 text-blue-500" />,
    },
  };

  const config = alertConfig[type] || alertConfig.info;

  return (
    <div className={`mb-6 p-4 rounded-lg border ${config.bg} ${config.border} ${config.text} flex items-start justify-between animate-fadeIn`}>
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">{config.icon}</div>
        <div className="font-medium">{message}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default AlertMessage;