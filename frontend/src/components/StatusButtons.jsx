import React from 'react';
import { BookOpen, Archive, CheckCircle } from 'lucide-react';

const StatusButtons = ({ currentStatus, onStatusChange }) => {
  const statusOptions = [
    { value: 'ativo', label: 'Ativo', icon: BookOpen, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { value: 'lido', label: 'Lido', icon: CheckCircle, color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
    { value: 'arquivado', label: 'Arquivado', icon: Archive, color: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statusOptions.map((status) => {
        const Icon = status.icon;
        const isActive = currentStatus === status.value;
        
        return (
          <button
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 font-medium ${
              isActive 
                ? status.color.replace('hover:', '').replace('100', '500').replace('700', 'white') + ' shadow-md' 
                : status.color + ' shadow-sm'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {status.label}
          </button>
        );
      })}
    </div>
  );
};

export default StatusButtons;