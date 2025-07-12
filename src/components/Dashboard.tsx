import React, { useState } from 'react';
import { 
  BarChart4, 
  FileText, 
  CheckSquare, 
  BookOpen, 
  Wallet, 
  Percent,
  MessageCircle,
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import ModuleCard from './ModuleCard';
import SupportForm from './SupportForm';

interface Trade {
  scriptName: string;
  orderId: string;
  date: string;
  action: 'BUY' | 'SELL';
  type: string;
  quantity: number;
  price: number;
}

interface Charge {
  month: string;
  clientId: string;
  clientName: string;
  panelCharges: number;
  status: string;
}

interface Outstanding {
  month: string;
  clientId: string;
  clientName: string;
  outstandingAmount: number;
  dateOfIntimation: string;
  tentativeDueDate: string;
  status: string;
}

interface LedgerTransaction {
  type: 'credit' | 'debit';
  label: string;
  amount: number;
}

interface MarginData {
  month: string;
  accountId: string;
  marginProvided: string;
  marginUsed: string;
}

interface InterestData {
  month: string;
  accountId: string;
  marginInterest: string;
}

interface DashboardProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const modules = [
  /* { id: 'trades', label: 'Trades', icon: <BarChart4 size={24} /> },  */
  { id: 'bills', label: 'Bills', icon: <FileText size={24} /> },
  { id: 'outstanding', label: 'Outstanding', icon: <CheckSquare size={24} /> },
  { id: 'ledger', label: 'Ledger', icon: <BookOpen size={24} /> },
  { id: 'margin', label: 'Margin', icon: <Wallet size={24} /> },
  { id: 'interest', label: 'Interest', icon: <Percent size={24} /> },
];

const mockTradeData: Trade[] = [
  { scriptName: "NIFTY May 8 2025 24300 PE", orderId: "130000045738596", date: "08 May 2025", action: "SELL", type: "INTRADAY", quantity: 1200, price: 3.70 },
  { scriptName: "NIFTY May 15 2025 24500 CE", orderId: "130000045738597", date: "08 May 2025", action: "BUY", type: "INTRADAY", quantity: 2000, price: 12.15 },
  { scriptName: "NIFTY May 22 2025 24000 PE", orderId: "130000045738598", date: "08 May 2025", action: "SELL", type: "INTRADAY", quantity: 200, price: 6.45 },
  { scriptName: "NIFTY May 29 2025 25000 CE", orderId: "130000045738599", date: "08 May 2025", action: "BUY", type: "INTRADAY", quantity: 2000, price: 4.80 },
  { scriptName: "NIFTY May 29 2025 24100 PE", orderId: "130000045738600", date: "08 May 2025", action: "SELL", type: "INTRADAY", quantity: 1800, price: 5.10 },
  { scriptName: "NIFTY May 15 2025 24700 CE", orderId: "130000045738601", date: "08 May 2025", action: "SELL", type: "INTRADAY", quantity: 1400, price: 3.20 },
  { scriptName: "NIFTY May 8 2025 23900 PE", orderId: "130000045738602", date: "08 May 2025", action: "BUY", type: "INTRADAY", quantity: 1000, price: 2.90 },
  { scriptName: "NIFTY May 29 2025 25300 CE", orderId: "130000045738603", date: "08 May 2025", action: "SELL", type: "INTRADAY", quantity: 800, price: 7.35 },
  { scriptName: "NIFTY May 22 2025 24000 CE", orderId: "130000045738604", date: "08 May 2025", action: "BUY", type: "INTRADAY", quantity: 100, price: 6.10 },
  { scriptName: "NIFTY May 15 2025 23800 PE", orderId: "130000045738605", date: "08 May 2025", action: "SELL", type: "INTRADAY", quantity: 3150, price: 3.85 },
  { scriptName: "NIFTY May 29 2025 25200 CE", orderId: "130000045738606", date: "08 May 2025", action: "SELL", type: "INTRADAY", quantity: 2625, price: 5.55 },
  { scriptName: "NIFTY May 15 2025 24600 PE", orderId: "130000045738607", date: "08 May 2025", action: "BUY", type: "INTRADAY", quantity: 1875, price: 4.20 },
  { scriptName: "NIFTY May 8 2025 24400 CE", orderId: "130000045738608", date: "08 May 2025", action: "SELL", type: "INTRADAY", quantity: 3525, price: 3.65 },
  { scriptName: "NIFTY May 22 2025 24100 PE", orderId: "130000045738609", date: "08 May 2025", action: "BUY", type: "INTRADAY", quantity: 3150, price: 2.75 },
  { scriptName: "NIFTY May 8 2025 24600 CE", orderId: "130000045738610", date: "08 May 2025", action: "SELL", type: "INTRADAY", quantity: 2925, price: 6.90 },
  { scriptName: "NIFTY May 29 2025 24300 PE", orderId: "130000045738611", date: "08 May 2025", action: "BUY", type: "INTRADAY", quantity: 2700, price: 4.85 },
  { scriptName: "NIFTY May 22 2025 24800 CE", orderId: "130000045738612", date: "08 May 2025", action: "SELL", type: "INTRADAY", quantity: 1500, price: 8.20 },
  { scriptName: "NIFTY May 15 2025 25000 PE", orderId: "130000045738613", date: "08 May 2025", action: "BUY", type: "INTRADAY", quantity: 2700, price: 3.10 },
  { scriptName: "NIFTY May 8 2025 23900 PE", orderId: "130000045738614", date: "08 May 2025", action: "SELL", type: "INTRADAY", quantity: 3450, price: 5.60 },
  { scriptName: "NIFTY May 29 2025 24500 CE", orderId: "130000045738615", date: "08 May 2025", action: "BUY", type: "INTRADAY", quantity: 2325, price: 3.95 }
];

const mockChargesData: Charge[] = [
  { month: "Aug 2024", clientId: "DI11257", clientName: "Sonup Bhuyan", panelCharges: 38442.00, status: "Paid" },
  { month: "Sep 2024", clientId: "DI11257", clientName: "Sonup Bhuyan", panelCharges: 38442.00, status: "Paid" },
  { month: "Oct 2024", clientId: "DI11257", clientName: "Sonup Bhuyan", panelCharges: 38442.00, status: "Paid" },
  { month: "Nov 2024", clientId: "DI11257", clientName: "Sonup Bhuyan", panelCharges: 38442.00, status: "Paid" },
  { month: "Dec 2024", clientId: "DI11257", clientName: "Sonup Bhuyan", panelCharges: 38442.00, status: "Paid" },
  { month: "Jan 2025", clientId: "DI11257", clientName: "Sonup Bhuyan", panelCharges: 38442.00, status: "Paid" },
  { month: "Feb 2025", clientId: "DI11257", clientName: "Sonup Bhuyan", panelCharges: 38442.00, status: "Paid" },
  { month: "Mar 2025", clientId: "DI11257", clientName: "Sonup Bhuyan", panelCharges: 38442.00, status: "Paid" },
  { month: "Apr 2025", clientId: "DI11257", clientName: "Sonup Bhuyan", panelCharges: 38442.00, status: "Paid" },
  { month: "May 2025", clientId: "DI11257", clientName: "Sonup Bhuyan", panelCharges: 38442.00, status: "Paid" },
  { month: "June 2025", clientId: "DI11257", clientName: "Sonup Bhuyan", panelCharges: 38442.00, status: "YTG" },
];

const mockOutstandingData: Outstanding[] = [
  { 
    month: "Feb 2025",
    clientId: "DI11257",
    clientName: "Sonup Bhuyan",
    outstandingAmount: 35000000.00,
    dateOfIntimation: "03 Feb 2025",
    tentativeDueDate: "11 July 2025",
    status: "Overdue"
  }
];

const mockMarginData: MarginData[] = [
  { month: "Aug 2024", accountId: "DI11257", marginProvided: "₹7,00,00,000", marginUsed: "₹6,12,89,882" },
  { month: "Sep 2024", accountId: "DI11257", marginProvided: "₹7,00,00,000", marginUsed: "₹6,58,83,546" },
  { month: "Oct 2024", accountId: "DI11257", marginProvided: "₹7,00,00,000", marginUsed: "₹6,02,51,951" },
  { month: "Nov 2024", accountId: "DI11257", marginProvided: "₹7,00,00,000", marginUsed: "₹6,18,12,884" },
  { month: "Dec 2024", accountId: "DI11257", marginProvided: "₹7,00,00,000", marginUsed: "₹6,89,00,320" },
  { month: "Jan 2025", accountId: "DI11257", marginProvided: "₹7,00,00,000", marginUsed: "₹6,79,02,880" },
  { month: "Feb 2025", accountId: "DI11257", marginProvided: "₹7,00,00,000", marginUsed: "₹6,93,01,603" },
  { month: "Mar 2025", accountId: "DI11257", marginProvided: "--", marginUsed: "--" },
  { month: "Apr 2025", accountId: "DI11257", marginProvided: "--", marginUsed: "--" },
  { month: "May 2025", accountId: "DI11257", marginProvided: "--", marginUsed: "--" },
  { month: "Jun 2025", accountId: "DI11257", marginProvided: "--", marginUsed: "--" },
];

const mockInterestData: InterestData[] = [
  { month: "Aug 2024", accountId: "DI11257", marginInterest: "₹2,34,512.35" },
  { month: "Sep 2024", accountId: "DI11257", marginInterest: "₹3,71,140.82" },
  { month: "Oct 2024", accountId: "DI11257", marginInterest: "₹1,58,249.50" },
  { month: "Nov 2024", accountId: "DI11257", marginInterest: "₹4,02,887.96" },
  { month: "Dec 2024", accountId: "DI11257", marginInterest: "₹3,04,005.18" },
  { month: "Jan 2025", accountId: "DI11257", marginInterest: "₹3,28,571.27" },
  { month: "Feb 2025", accountId: "DI11257", marginInterest: "₹2,63,855.53" },
  { month: "Mar 2025", accountId: "DI11257", marginInterest: "--" },
  { month: "Apr 2025", accountId: "DI11257", marginInterest: "--" },
  { month: "May 2025", accountId: "DI11257", marginInterest: "--" },
  { month: "Jun 2025", accountId: "DI11257", marginInterest: "--" },
];

const mockLedgerData = {
  balance: 182071500.00,
  transactions: [
    { type: 'debit' as const, label: 'Opening balance', amount: 169800000.00 },
    { type: 'credit' as const, label: 'Closing balance', amount: 182071500.00 }
  ],
  details: [
    { type: "Fund Inflow", description: "Capital injection by firm", credit: 169800000.00, debit: 0 },
    { type: "Fund Outflow", description: "Capital outflow by firm", credit: 0, debit: 32948958.00 },
    { type: "Trade amount", description: "Amount of fund for trades", credit: 0, debit: 226312861.00 },
    { type: "Charges and Interests", description: "Prop charges and margin interests", credit: 0, debit: 2609106.00 }
  ]
};

const Dashboard: React.FC<DashboardProps> = ({ activePage, setActivePage }) => {
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [showSupportForm, setShowSupportForm] = useState(false);

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId);
  };

  const handleContactSupport = () => {
    setShowSupportForm(true);
  };

  const handleBack = () => {
    setSelectedModule('');
    setActivePage('Home');
  };

  const renderTradesTable = () => {
    return (
      <div className="overflow-x-auto">
        <div className="bg-white py-3 px-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
            <h2 className="text-lg font-semibold">Showing Trades and Charges Summary for 08 May 2025</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">For all previous trade data, please contact support manager</span>
            <button
              onClick={handleContactSupport}
              className="flex items-center space-x-1 bg-primary-900 text-white px-4 py-2 rounded hover:bg-primary-800 transition-colors"
            >
              <MessageCircle size={16} />
              <span>Contact Support</span>
            </button>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Script Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockTradeData.map((trade) => (
              <tr key={trade.orderId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trade.scriptName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.date}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  trade.action === 'BUY' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trade.action}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{trade.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {showSupportForm && <SupportForm onClose={() => setShowSupportForm(false)} />}
      </div>
    );
  };

  const renderBillsTable = () => {
    return (
      <div className="overflow-x-auto">
        <div className="bg-white py-3 px-4 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
            <h2 className="text-lg font-semibold">Prop Charges (Lifetime)</h2>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Panel Charges</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockChargesData.map((charge, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{charge.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{charge.clientId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{charge.clientName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{charge.panelCharges.toFixed(2)}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  charge.status === 'Paid' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {charge.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderOutstandingTable = () => {
    return (
      <div className="overflow-x-auto">
        <div className="bg-white py-3 px-4 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
            <h2 className="text-lg font-semibold">Outstanding Charges</h2>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Intimation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tentative Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockOutstandingData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.clientId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.clientName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.outstandingAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dateOfIntimation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tentativeDueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderMarginTable = () => {
    return (
      <div className="overflow-x-auto">
        <div className="bg-white py-3 px-4 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
            <h2 className="text-lg font-semibold">Margin Analysis</h2>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin Provided (₹)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin Used (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockMarginData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.accountId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.marginProvided}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.marginUsed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderLedger = () => {
    return (
      <div className="overflow-x-auto">
        <div className="bg-white py-3 px-4 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
            <h2 className="text-lg font-semibold">Balance - INR {mockLedgerData.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 p-4">
          {mockLedgerData.transactions.map((transaction, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  {transaction.label}
                </span>
                {transaction.type === 'credit' ? (
                  <ArrowUpRight className="text-green-500" size={20} />
                ) : (
                  <ArrowDownRight className="text-red-500" size={20} />
                )}
              </div>
              <div className="text-lg font-semibold">
                ₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Transaction Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Transaction Description</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Credit (₹)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Debit (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockLedgerData.details.map((detail, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{detail.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {detail.credit > 0 ? `₹${detail.credit.toLocaleString('en-IN')}` : '--'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    {detail.debit > 0 ? `₹${detail.debit.toLocaleString('en-IN')}` : '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderInterestTable = () => {
    return (
      <div className="overflow-x-auto ">
        <div className="bg-white py-3 px-4 border-b">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
            <h2 className="text-lg font-semibold">Total Margin Interest</h2>
          </div>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin Interest (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockInterestData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.accountId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.marginInterest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

 /*  if (selectedModule === 'trades') {
    return renderTradesTable();
  } */

  if (selectedModule === 'bills') {
    return renderBillsTable();
  }

  if (selectedModule === 'outstanding') {
    return renderOutstandingTable();
  }

  if (selectedModule === 'margin') {
    return renderMarginTable();
  }

  if (selectedModule === 'ledger') {
    return renderLedger();
  }

  if (selectedModule === 'interest') {
    return renderInterestTable();
  }

  if (activePage !== 'Home') {
    return (
      <div className="p-6">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
        <h1 className="text-2xl font-bold mb-4">{activePage}</h1>
        <p className="text-gray-600">This is the {activePage} page content.</p>
      </div>
    );
  }

  return (
    <div className="p-0">
      <div className="bg-white py-2 px-4 border-b">
        <h1 className="text-xl font-semibold">Home</h1>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {modules.map((module) => (
            <ModuleCard 
              key={module.id}
              id={module.id}
              label={module.label}
              icon={module.icon}
              onClick={() => handleModuleClick(module.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
