import React, { useState } from 'react';
import { X } from 'lucide-react';

interface HelpProps {
  onBack: () => void;
}

interface TicketFormData {
  accountId: string;
  issue: string;
  details: string;
}

const Help: React.FC<HelpProps> = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<TicketFormData>({
    accountId: '',
    issue: '',
    details: ''
  });

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

  const TicketForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {isSubmitted ? (
          <div className="text-center py-8">
            <h3 className="text-2xl font-semibold text-[#2D0A42] mb-4">Thank you!</h3>
            <p className="text-gray-600 mb-6">Your ticket has been received. Our support team will contact you soon.</p>
            <button
              onClick={() => {
                setShowForm(false);
                setIsSubmitted(false);
              }}
              className="bg-[#2D0A42] text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#2D0A42]">Create Support Ticket</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="accountId" className="block text-sm font-medium text-gray-700 mb-1">
                  Account ID
                </label>
                <input
                  type="text"
                  id="accountId"
                  name="accountId"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D0A42]"
                  value={formData.accountId}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="issue" className="block text-sm font-medium text-gray-700 mb-1">
                  Issue
                </label>
                <input
                  type="text"
                  id="issue"
                  name="issue"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D0A42]"
                  value={formData.issue}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                  Details of the issue
                </label>
                <textarea
                  id="details"
                  name="details"
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D0A42]"
                  value={formData.details}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2D0A42] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                Submit Ticket
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 to-primary-100/30 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-[#2D9B8E] mb-2">
          Do you still feel stuck?
        </h1>
        <h2 className="text-3xl font-semibold text-gray-900">
          Have you tried looking for an answer?
        </h2>
        
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-[#2D0A42] text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Create a Ticket
          </button>
        </div>
      </div>

      {showForm && <TicketForm />}
    </div>
  );
};

export default Help;