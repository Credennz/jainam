import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Help from './components/Help';
import Login from './components/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header 
        username="DI11257-Sonup Bhuyan"
        toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activePage={activePage}
          setActivePage={setActivePage}
          collapsed={sidebarCollapsed}
        />
        
        <main className="flex-1 overflow-y-auto p-0">
          {activePage === 'Help' ? (
            <Help onBack={() => setActivePage('Home')} />
          ) : (
            <Dashboard activePage={activePage} setActivePage={setActivePage} />
          )}
        </main>
      </div>
      
      <Footer 
        version="3.2"
        companyName="Jainam Broking Private Limited"
        copyrightYear="2013-2023"
      />
    </div>
  );
};

export default App;