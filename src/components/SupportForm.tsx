import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SupportFormProps {
  onClose: () => void;
}

const SupportForm: React.FC<SupportFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    startDate: '',
    endDate: '',
    remark: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Thank you!</h2>
            <p className="text-gray-600 mb-6">The support manager will contact you soon.</p>
            <button
              onClick={onClose}
              className="bg-primary-900 text-white px-6 py-2 rounded hover:bg-primary-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Contact Support</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-1">
                Client ID
              </label>
              <input
                type="text"
                id="clientId"
                name="clientId"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.clientId}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="remark" className="block text-sm font-medium text-gray-700 mb-1">
                Remark
              </label>
              <textarea
                id="remark"
                name="remark"
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={formData.remark}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-800 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportForm;