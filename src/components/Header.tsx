import React from 'react';
import { Triangle } from 'lucide-react';

interface HeaderProps {
  username: string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="bg-[#2D0A42] text-white h-16 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col items-center">
            <Triangle fill="white" size={20} />
            <div className="w-1 h-1 bg-white rounded-full mt-0.5" />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-xl">JAINAM</div>
            <div className="text-[10px] text-gray-300">Prosperity with Security</div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm font-medium">{username}</div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm font-medium">eWebOffice</div>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-[#2D0A42] rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;