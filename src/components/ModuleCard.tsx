import React from 'react';

interface ModuleCardProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ id, label, icon, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center bg-white rounded-lg border border-gray-200 
                 shadow-sm hover:shadow-md transition-shadow p-4 w-full group"
    >
      <div className="mb-2 w-14 h-14 rounded-full border border-purple-200 flex items-center 
                     justify-center bg-white group-hover:bg-purple-50 transition-colors">
        <div className="text-purple-800">
          {icon}
        </div>
      </div>
      <span className="text-sm font-medium text-center text-gray-800">{label}</span>
    </button>
  );
};

export default ModuleCard;