import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar } from 'lucide-react';

// Import shared Navbar and Footer components
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
      
      <Navbar />

      {/* Pricing Section */}
      <main className="flex-1 bg-[#f4f7fb] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Choose Plan That Fits For You
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              All-In-One Gym Membership Management Software With Multiple Features Made for Gyms & Fitness Health Clubs.
            </p>
            <p className="text-lg font-semibold text-slate-800 mb-4">Gym Software Price</p>
            <div className="inline-block px-8 py-3 bg-[#f58153] text-white font-bold rounded-lg shadow-md">
              Annual Plan
            </div>
          </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
  
  {/* Basic / Startup Plan */}
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col hover:-translate-y-1 transition duration-300">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
        <Calendar size={28} className="text-slate-700" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900">Annual Plan</h3>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Starting Up Businesses
        </p>
      </div>
    </div>

    <ul className="space-y-4 mb-12 flex-1 text-slate-700 text-sm md:text-base font-medium">
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        Smart Dashboard
      </li>
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        Member Management
      </li>
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        Custom Pricing Plans
      </li>
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        WhatsApp Reminders
      </li>
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        Manual PDF Invoicing
      </li>
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        Enquiries & Trials CRM
      </li>
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        Basic Revenue Ledgers
      </li>
    </ul>

    <Link
      to="/contact"
      className="block w-full py-4 px-4 bg-[#f58153] text-white text-center font-bold rounded-lg hover:bg-orange-600 transition shadow-md"
    >
      Contact Us
    </Link>
  </div>


  {/* Advanced / Established Plan */}
  <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-[#f58153] flex flex-col hover:-translate-y-1 transition duration-300 relative">

    {/* Popular Badge */}
    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
      <span className="bg-[#f58153] text-white px-5 py-2 rounded-full text-sm font-bold shadow-md">
        Most Popular
      </span>
    </div>

    <div className="flex items-center gap-4 mb-8 mt-2">
      <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
        <Calendar size={28} className="text-slate-700" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900">Annual Plan</h3>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Established Businesses
        </p>
      </div>
    </div>

    <ul className="space-y-4 mb-12 flex-1 text-slate-700 text-sm md:text-base font-medium">
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        <span className="font-bold">Everything in Basic</span>
      </li>
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        Biometric Attendance Integration
      </li>
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        Automated Membership Renewals
      </li>
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        Automated SMS & Notifications
      </li>
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        Automated Invoice Generation
      </li>
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        Expense Management
      </li>
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
        Staff & Payroll Management
      </li>
    </ul>

    <Link
      to="/contact"
      className="block w-full py-4 px-4 bg-[#f58153] text-white text-center font-bold rounded-lg hover:bg-orange-600 transition shadow-md"
    >
      Contact Us
    </Link>
  </div>


  {/* Custom Plan */}
  <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 flex flex-col hover:-translate-y-1 transition duration-300">

    <div className="flex items-center gap-4 mb-8">
      <div className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center shadow-sm">
        <Calendar size={28} className="text-white" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white">
          Custom Plan
        </h3>
        <p className="text-sm text-slate-400 font-medium mt-1">
          Tailored For Your Gym
        </p>
      </div>
    </div>

    <div className="mb-8">
      <p className="text-3xl font-bold text-white">
        Custom Pricing
      </p>
      <p className="text-sm text-slate-400 mt-2">
        Get a plan built around your requirements.
      </p>
    </div>

    <ul className="space-y-4 mb-12 flex-1 text-slate-300 text-sm md:text-base font-medium">
      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-400 shrink-0" size={20} />
        Everything You Need
      </li>

      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-400 shrink-0" size={20} />
        Custom Features
      </li>

      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-400 shrink-0" size={20} />
        Custom Integrations
      </li>

      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-400 shrink-0" size={20} />
        Biometric Integration
      </li>

      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-400 shrink-0" size={20} />
        WhatsApp & SMS Automation
      </li>

      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-400 shrink-0" size={20} />
        Dedicated Support
      </li>

      <li className="flex items-center gap-3">
        <CheckCircle2 className="text-green-400 shrink-0" size={20} />
        Custom Reports & Dashboard
      </li>
    </ul>

    <Link
      to="/contact"
      className="block w-full py-4 px-4 bg-[#f58153] text-white text-center font-bold rounded-lg hover:bg-orange-600 transition shadow-md"
    >
      Talk To Us
    </Link>

  </div>

</div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
