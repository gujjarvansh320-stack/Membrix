import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Phone } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Highlights the current active page
  const getLinkClass = (path) => {
    return currentPath === path 
      ? "text-blue-600 font-bold" 
      : "hover:text-blue-600 transition font-medium text-slate-600";
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight flex items-center gap-2">
          {/* <Dumbbell className="text-blue-600" size={28} /> */}
          Membrix
        </Link>
        
        {/* Center: Navigation Links */}
        <div className="hidden md:flex gap-8">
          <Link to="/" className={getLinkClass('/')}>Home</Link>
          <Link to="/industries" className={getLinkClass('/industries')}>Industries</Link>
          <Link to="/pricing" className={getLinkClass('/pricing')}>Pricing</Link>
          <Link to="/contact" className={getLinkClass('/contact')}>Contact Us</Link>
        </div>
        
        {/* Right: Contact & Login */}
        <div className="flex items-center gap-6">
          <a 
            href="tel:+917404707263" 
            className="hidden lg:flex items-center gap-2 text-slate-700 hover:text-blue-600 transition font-bold"
          >
            <Phone size={18} className="text-blue-600" />
            +91 7404707263
          </a>
          
          <Link 
            to="/login" 
            className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition shadow-sm"
          >
            Client Login
          </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;