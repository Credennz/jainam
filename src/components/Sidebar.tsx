import React from 'react';
import { Home, HelpCircle } from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  collapsed: boolean;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'help', label: 'Help', icon: <HelpCircle size={20} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, collapsed }) => {
  return (
    <aside 
      className={`bg-[#2D0A42] text-white transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-48'
      }`}
    >
      <nav className="h-full">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActivePage(item.label)}
                className={`w-full flex items-center px-4 py-3 hover:bg-purple-800 transition-colors ${
                  activePage === item.label ? 'bg-purple-900' : ''
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                
                {!collapsed && (
                  <div className="flex flex-1 items-center justify-between ml-3">
                    <span className="font-medium">{item.label}</span>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {!collapsed && (
        <div className="absolute bottom-24 left-0 w-full px-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mb-2">
              <div className="w-6 h-6 bg-[#2D0A42] rounded-full border-2 border-white"></div>
            </div>
            <div className="text-sm font-medium">eWebOffice</div>
            <div className="text-xs">Ver 3.2</div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;