import React, { useState, useEffect } from 'react';
import { 
  Database, RefreshCw, Download, Copy, Check, 
  Search, CreditCard, User, Building, MapPin, Code
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FakePerson } from '../../types';

interface FakeDataModalProps {
  onClose: () => void;
  onRecordUse: (toolId: string) => void;
}

const FIRST_NAMES = ['Liam', 'Olivia', 'Noah', 'Emma', 'Oliver', 'Charlotte', 'Elijah', 'Amelia', 'James', 'Ava', 'William', 'Sophia', 'Lucas', 'Isabella', 'Henry', 'Mia', 'Alexander', 'Evelyn', 'Daniel', 'Harper'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
const STREETS = ['Maple Ave', 'Oak Street', 'Pine Lane', 'Cedar Blvd', 'Sunset Way', 'Washington St', 'Main Street', 'Park Avenue', 'Broadway', 'Elm Court'];
const CITIES = ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Chicago, IL', 'Boston, MA', 'Denver, CO', 'Miami, FL', 'Atlanta, GA', 'San Diego, CA'];
const COMPANIES = ['Nexlify Labs', 'Vanguard Logic', 'Apex Cloud Systems', 'Stratos AI', 'Hyperion Dynamics', 'OmniScale Tech', 'BlueShift Media', 'QuantumPulse Software'];
const ROLES = ['Senior Software Engineer', 'Product Lead', 'Data Architect', 'UX Research Director', 'DevOps Specialist', 'Growth Marketing Lead', 'Security Analyst', 'Full Stack Developer'];

// Generates a Luhn-compliant credit card number
function generateLuhnCard(type: 'Visa' | 'Mastercard' | 'Amex'): string {
  let prefix = '4';
  let length = 16;
  if (type === 'Mastercard') {
    prefix = '5' + Math.floor(1 + Math.random() * 5);
    length = 16;
  } else if (type === 'Amex') {
    prefix = '37';
    length = 15;
  }

  let card = prefix;
  while (card.length < length - 1) {
    card += Math.floor(Math.random() * 10);
  }

  // Calculate checksum digit
  let sum = 0;
  let alternate = true;
  for (let i = card.length - 1; i >= 0; i--) {
    let n = parseInt(card.charAt(i), 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n = (n % 10) + 1;
    }
    sum += n;
    alternate = !alternate;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return card + checkDigit;
}

export const FakeDataModal: React.FC<FakeDataModalProps> = ({ onClose, onRecordUse }) => {
  const [dataType, setDataType] = useState<'all' | 'cards' | 'profiles' | 'companies' | 'geo'>('all');
  const [count, setCount] = useState<number>(10);
  const [data, setData] = useState<FakePerson[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCell, setCopiedCell] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generateData = () => {
    onRecordUse('fake-data-generator');
    const generated: FakePerson[] = [];

    for (let i = 0; i < count; i++) {
      const fName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
      const lName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
      const fullName = `${fName} ${lName}`;
      const emailDomain = ['gmail.com', 'outlook.com', 'yahoo.com', 'proton.me', 'example.org'][Math.floor(Math.random() * 5)];
      const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${Math.floor(Math.random() * 99)}@${emailDomain}`;
      const phone = `+1 (${Math.floor(200 + Math.random() * 700)}) ${Math.floor(200 + Math.random() * 700)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const streetNum = Math.floor(100 + Math.random() * 9800);
      const street = STREETS[Math.floor(Math.random() * STREETS.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
      const jobTitle = ROLES[Math.floor(Math.random() * ROLES.length)];

      const cardTypes: Array<'Visa' | 'Mastercard' | 'Amex'> = ['Visa', 'Mastercard', 'Amex'];
      const cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
      const cardNumber = generateLuhnCard(cardType);
      const expMonth = String(Math.floor(1 + Math.random() * 12)).padStart(2, '0');
      const expYear = String(2027 + Math.floor(Math.random() * 5));
      const cardExpiry = `${expMonth}/${expYear.slice(2)}`;
      const cardCvv = String(Math.floor(100 + Math.random() * 900));

      generated.push({
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        fullName,
        email,
        phone,
        address: `${streetNum} ${street}`,
        city,
        country: 'United States',
        company,
        jobTitle,
        cardNumber,
        cardExpiry,
        cardCvv,
        cardType
      });
    }

    setData(generated);
  };

  useEffect(() => {
    generateData();
  }, [count, dataType]);

  const copyValue = (val: string, keyId: string) => {
    navigator.clipboard.writeText(val);
    setCopiedCell(keyId);
    setTimeout(() => setCopiedCell(null), 1500);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Address', 'City', 'Company', 'Job Title', 'Card Type', 'Card Number', 'Expiry', 'CVV'];
    const rows = data.map(d => [
      d.id, `"${d.fullName}"`, `"${d.email}"`, `"${d.phone}"`, `"${d.address}"`, `"${d.city}"`, `"${d.company}"`, `"${d.jobTitle}"`, d.cardType, d.cardNumber, d.cardExpiry, d.cardCvv
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Synthetic_Mock_Data_${data.length}_Records.csv`;
    link.click();

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Synthetic_Mock_Data_${data.length}.json`;
    link.click();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
  };

  const copyAllJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const filteredData = data.filter(d => 
    d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.cardNumber.includes(searchTerm)
  );

  return (
    <div id="fake-data-modal-overlay" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div id="fake-data-modal-card" className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-md shadow-cyan-600/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">Fake Data & Test Card Generator</h2>
                <span className="bg-cyan-100 text-cyan-800 text-xs font-semibold px-2 py-0.5 rounded-full border border-cyan-200">
                  DEV PRO • Luhn Valid
                </span>
              </div>
              <p className="text-xs text-slate-500">Generate deterministic mock identities, test credit cards, and addresses</p>
            </div>
          </div>

          <button 
            id="fake-data-close-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Controls Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          
          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setDataType('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                dataType === 'all' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <User className="w-3.5 h-3.5" /> Full Profiles
            </button>
            <button
              onClick={() => setDataType('cards')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                dataType === 'cards' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" /> Test Cards
            </button>
            <button
              onClick={() => setDataType('companies')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                dataType === 'companies' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Building className="w-3.5 h-3.5" /> Corporate
            </button>
            <button
              onClick={() => setDataType('geo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                dataType === 'geo' ? 'bg-cyan-600 text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" /> Addresses
            </button>
          </div>

          {/* Count & Search */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <span>Count:</span>
              <select
                id="fake-data-count-select"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-800 outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value={5}>5 Rows</option>
                <option value={10}>10 Rows</option>
                <option value={25}>25 Rows</option>
                <option value={50}>50 Rows</option>
                <option value={100}>100 Rows</option>
              </select>
            </div>

            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter table..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <button
              id="fake-data-regen-btn"
              onClick={generateData}
              className="p-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 transition-colors"
              title="Regenerate"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Table Content */}
        <div className="overflow-x-auto flex-1 p-4 bg-slate-50/50">
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-3">Profile Name</th>
                  <th className="p-3">Email & Phone</th>
                  <th className="p-3">Company & Role</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Test Card (Luhn Valid)</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredData.map((person) => (
                  <tr key={person.id} className="hover:bg-cyan-50/40 transition-colors">
                    
                    {/* Name */}
                    <td className="p-3 font-sans">
                      <div className="font-bold text-slate-900">{person.fullName}</div>
                      <div className="text-[10px] text-slate-400">{person.id}</div>
                    </td>

                    {/* Email & Phone */}
                    <td className="p-3">
                      <div 
                        onClick={() => copyValue(person.email, `${person.id}-email`)}
                        className="text-slate-800 hover:text-cyan-700 cursor-pointer flex items-center gap-1 group"
                      >
                        <span>{person.email}</span>
                        {copiedCell === `${person.id}-email` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100" />}
                      </div>
                      <div className="text-[11px] text-slate-500">{person.phone}</div>
                    </td>

                    {/* Company */}
                    <td className="p-3 font-sans">
                      <div className="font-semibold text-slate-800">{person.company}</div>
                      <div className="text-[11px] text-slate-500">{person.jobTitle}</div>
                    </td>

                    {/* Location */}
                    <td className="p-3 font-sans">
                      <div className="text-slate-800">{person.address}</div>
                      <div className="text-[11px] text-slate-500">{person.city}</div>
                    </td>

                    {/* Card */}
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          person.cardType === 'Visa' ? 'bg-blue-100 text-blue-800' : person.cardType === 'Mastercard' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {person.cardType}
                        </span>
                        <span 
                          onClick={() => copyValue(person.cardNumber, `${person.id}-card`)}
                          className="font-bold text-slate-900 hover:text-cyan-700 cursor-pointer flex items-center gap-1 group"
                        >
                          {person.cardNumber}
                          {copiedCell === `${person.id}-card` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100" />}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        EXP: {person.cardExpiry} | CVV: {person.cardCvv}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="p-3 text-right">
                      <button
                        onClick={() => copyValue(JSON.stringify(person), `${person.id}-all`)}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-sans font-medium transition-colors"
                      >
                        {copiedCell === `${person.id}-all` ? 'Copied' : 'Copy JSON'}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Showing {filteredData.length} generated records • 100% synthetic for QA testing
          </div>

          <div className="flex items-center gap-2">
            <button
              id="fake-data-copy-json-btn"
              onClick={copyAllJSON}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              {copiedAll ? <Check className="w-4 h-4 text-emerald-600" /> : <Code className="w-4 h-4" />}
              {copiedAll ? 'JSON Copied!' : 'Copy as JSON'}
            </button>

            <button
              id="fake-data-export-json-btn"
              onClick={exportJSON}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-all"
            >
              <Download className="w-4 h-4" />
              Download JSON
            </button>

            <button
              id="fake-data-export-csv-btn"
              onClick={exportCSV}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-600/20 transition-all"
            >
              <Download className="w-4 h-4" />
              Download CSV ({data.length})
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
