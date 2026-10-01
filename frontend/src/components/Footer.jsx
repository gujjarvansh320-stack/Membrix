// // src/components/Footer.jsx
// import { Link } from "react-router-dom";
// import { Dumbbell, Mail, Phone, MapPin } from "lucide-react";

// // Custom lightweight SVGs to replace the removed Lucide brand icons
// const FacebookIcon = ({ size = 18 }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//   </svg>
// );

// const TwitterIcon = ({ size = 18 }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
//   </svg>
// );

// const InstagramIcon = ({ size = 18 }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
//     <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//     <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
//   </svg>
// );

// const LinkedinIcon = ({ size = 18 }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={size}
//     height={size}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//     <rect width="4" height="12" x="2" y="9" />
//     <circle cx="4" cy="4" r="2" />
//   </svg>
// );

// const Footer = () => {
//   return (
//     <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-800 mt-auto w-full font-sans">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
//         {/* Brand & Bio */}
//         <div>
//           <Link
//             to="/"
//             className="flex items-center gap-2 text-2xl font-extrabold text-white mb-6 tracking-tight"
//           >
//             <Dumbbell className="text-blue-500" size={28} />
//             Membrix
//           </Link>
//           <p className="text-sm leading-relaxed mb-6 text-slate-400">
//             Smart management workspaces for modern member-based businesses.
//             Automate renewals, integrate biometrics, and scale effortlessly.
//           </p>
//           <div className="flex gap-4">
//             <a
//               href="#"
//               className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
//             >
//               <TwitterIcon size={18} />
//             </a>
//             <a
//               href="#"
//               className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
//             >
//               <FacebookIcon size={18} />
//             </a>
//             <a
//               href="https://www.instagram.com/your_actual_username/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2 bg-slate-900 rounded-lg hover:bg-pink-600 hover:text-white transition-colors"
//             >
//               <InstagramIcon size={18} />
//             </a>
//             <a
//               href="#"
//               className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
//             >
//               <LinkedinIcon size={18} />
//             </a>
//           </div>
//         </div>

//         {/* Product Links */}
//         <div>
//           <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
//             Product
//           </h4>
//           <ul className="space-y-3 text-sm font-medium">
//             <li>
//               <Link to="/" className="hover:text-blue-400 transition-colors">
//                 Features & Benefits
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/industries"
//                 className="hover:text-blue-400 transition-colors"
//               >
//                 Industries We Serve
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/pricing"
//                 className="hover:text-blue-400 transition-colors"
//               >
//                 Pricing Plans
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/#free-trial"
//                 className="hover:text-blue-400 transition-colors"
//               >
//                 Start Free Trial
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/login"
//                 className="hover:text-blue-400 transition-colors text-blue-500"
//               >
//                 Client Login
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Company Links */}
//         <div>
//           <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
//             Company
//           </h4>
//           <ul className="space-y-3 text-sm font-medium">
//             <li>
//               <Link
//                 to="/contact"
//                 className="hover:text-blue-400 transition-colors"
//               >
//                 Contact Us
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/about"
//                 className="hover:text-blue-400 transition-colors"
//               >
//                 About Us
//               </Link>
//             </li>
//             <Link to="/privacy" className="hover:text-white transition-colors">
//               Privacy
//             </Link>
//             <Link to="/terms" className="hover:text-white transition-colors">
//               Terms
//             </Link>
//             <li>
//               <Link
//                 to="/contact"
//                 className="hover:text-blue-400 transition-colors"
//               >
//                 Help Center
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Contact Information */}
//         <div>
//           <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
//             Get in Touch
//           </h4>
//           <ul className="space-y-4 text-sm font-medium">
//             <li className="flex items-start gap-3">
//               <Phone size={18} className="text-blue-500 shrink-0 mt-0.5" />
//               <a
//                 href="tel:+917404707263"
//                 className="hover:text-blue-400 transition-colors"
//               >
//                 +91 7404707263
//               </a>
//             </li>
//             <li className="flex items-start gap-3">
//               <Mail size={18} className="text-blue-500 shrink-0 mt-0.5" />
//               <a
//                 href="mailto:support@membrix.com"
//                 className="hover:text-blue-400 transition-colors"
//               >
//                 support@membrix.com
//               </a>
//             </li>
//             <li className="flex items-start gap-3">
//               <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
//               <span className="leading-relaxed">
//                 Hisar 125001
//                 <br />
//                 Haryana, India
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Copyright Bar */}
//       <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
//         <div>© {new Date().getFullYear()} Membrix. All rights reserved.</div>
//         <div className="flex gap-6">
//           <Link to="/privacy" className="hover:text-white transition-colors">
//             Privacy
//           </Link>
//           <Link to="/terms" className="hover:text-white transition-colors">
//             Terms
//           </Link>
//           <Link to="/about" className="hover:text-white transition-colors">
//             Cookies
//           </Link>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;








// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { Dumbbell, Mail, Phone, MapPin } from 'lucide-react';

// Custom lightweight SVGs to replace the removed Lucide brand icons
const FacebookIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-6 border-t border-slate-800 mt-auto w-full font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand & Bio */}
        <div>
          <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold text-white mb-6 tracking-tight">
            Membrix
          </Link>
          <p className="text-sm leading-relaxed mb-6 text-slate-400">
            Smart management workspaces for modern member-based businesses. Automate renewals, integrate biometrics, and scale effortlessly.
          </p>
          <div className="flex gap-4">
            {/* <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
              <TwitterIcon size={18} />
            </a> */}
            {/* <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
              <FacebookIcon size={18} />
            </a> */}
            <a 
              href="https://www.instagram.com/membrix.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 bg-slate-900 rounded-lg hover:bg-pink-600 hover:text-white transition-colors"
            >
              <InstagramIcon size={18} />
            </a>
            {/* <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
              <LinkedinIcon size={18} />
            </a> */}
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Product</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">Features & Benefits</Link></li>
            <li><Link to="/industries" className="hover:text-blue-400 transition-colors">Industries We Serve</Link></li>
            <li><Link to="/pricing" className="hover:text-blue-400 transition-colors">Pricing Plans</Link></li>
            <li><Link to="/#free-trial" className="hover:text-blue-400 transition-colors">Start Free Trial</Link></li>
            <li><Link to="/login" className="hover:text-blue-400 transition-colors text-blue-500">Client Login</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Get in Touch</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <a href="tel:+917404707263" className="hover:text-blue-400 transition-colors">+91 7404707263</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <a href="mailto:support@membrix.com" className="hover:text-blue-400 transition-colors">support@membrix.com</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">Hisar 125001<br/>Haryana, India</span>
            </li>
          </ul>
        </div>
        
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
        <div>
          © {new Date().getFullYear()} Membrix. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link to="/privacy" className="hover:text-white transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;