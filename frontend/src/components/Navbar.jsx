import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Phone, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Highlights the current active page
  const getLinkClass = (path) => {
    return currentPath === path 
      ? "text-blue-600 font-bold" 
      : "hover:text-blue-600 transition font-medium text-slate-600";
  };

  const getMobileLinkClass = (path) => {
    return currentPath === path 
      ? "text-blue-600 font-bold block py-2" 
      : "text-slate-600 hover:text-blue-600 transition font-medium block py-2";
  };

  return (
    <>
      {/* Fixed Navbar with Background Blur */}
      <nav className="w-full bg-white/90 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50 border-b border-slate-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* Left: Logo */}
          <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight flex items-center gap-2 z-50">
            Membrix
          </Link>
          
          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex gap-8">
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/about" className={getLinkClass('/about')}>About</Link>
            <Link to="/industries" className={getLinkClass('/industries')}>Industries</Link>
            <Link to="/pricing" className={getLinkClass('/pricing')}>Pricing</Link>
            <Link to="/contact" className={getLinkClass('/contact')}>Contact Us</Link>
          </div>
          
          {/* Right: Contact & Login (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="tel:+917404707263" 
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition font-bold"
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

          {/* Hamburger Menu Toggle (Mobile) */}
          <button 
            className="md:hidden text-slate-700 z-50 focus:outline-none" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 px-6 py-6 shadow-2xl flex flex-col gap-4 z-40">
            <Link to="/" className={getMobileLinkClass('/')} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className={getMobileLinkClass('/about')} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/industries" className={getMobileLinkClass('/industries')} onClick={() => setIsMobileMenuOpen(false)}>Industries</Link>
            <Link to="/pricing" className={getMobileLinkClass('/pricing')} onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
            <Link to="/contact" className={getMobileLinkClass('/contact')} onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
            
            <hr className="my-2 border-slate-100" />
            
            <a href="tel:+917404707263" className="flex items-center gap-2 text-slate-700 font-bold py-2">
              <Phone size={18} className="text-blue-600" />
              +91 7404707263
            </a>
            
            <Link 
              to="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center mt-2 py-3 bg-slate-900 text-white font-semibold rounded-lg"
            >
              Client Login
            </Link>
          </div>
        )}
      </nav>

      {/* Invisible Spacer - This prevents page content from jumping up underneath the fixed navbar */}
      <div className="h-20 w-full shrink-0"></div>
    </>
  );
};

export default Navbar;