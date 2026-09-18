// src/components/Footer.jsx
import { Dumbbell } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-800 mt-auto w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 text-xl font-bold text-white">
          <Dumbbell className="text-blue-500" size={24} /> SaaS Platform
        </div>
        <div className="text-sm">
          © {new Date().getFullYear()} Mantrivo. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;