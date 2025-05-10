import React, { useState } from 'react';
import { Triangle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      if (clientId === 'DL11257' && password === 'Skb@2820') {
        onLogin();
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-center">
              <Triangle fill="#2D0A42" size={24} />
              <div className="w-1 h-1 bg-[#2D0A42] rounded-full mt-0.5" />
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-2xl text-[#2D0A42]">JAINAM</div>
              <div className="text-xs text-gray-600">Prosperity with Security</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
              Client ID
            </label>
            <input
              type="text"
              id="clientId"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D0A42]"
              required
              autoComplete="off"
              disabled={isLoading}
              placeholder="Enter your client ID"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D0A42]"
              required
              autoComplete="off"
              disabled={isLoading}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2D0A42] text-white py-2 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;