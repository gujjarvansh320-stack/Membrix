// // src/pages/Contact.jsx
// import { Link } from 'react-router-dom';
// import { Dumbbell, Phone, Mail, MapPin, Send } from 'lucide-react';

// const Contact = () => {
//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
      
//       {/* Navigation */}
//       <nav className="flex justify-between items-center p-6 bg-white shadow-sm max-w-7xl mx-auto w-full rounded-b-2xl sticky top-0 z-50">
//         <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight flex items-center gap-2">
//           <Dumbbell className="text-blue-600" size={28} />
//           SaaS Platform
//         </Link>
//         <div className="hidden md:flex gap-8 font-medium text-slate-600">
//           <Link to="/" className="hover:text-blue-600 transition">Home</Link>
//           <Link to="/industries" className="hover:text-blue-600 transition">Industries</Link>
//           <Link to="/pricing" className="hover:text-blue-600 transition">Pricing</Link>
//           <Link to="/contact" className="text-blue-600 font-bold">Contact Us</Link>
//         </div>
//         <Link to="/login" className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition shadow-sm">
//           Client Login
//         </Link>
//       </nav>

//       <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-20">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
//             Get in Touch
//           </h1>
//           <p className="text-lg text-slate-600 max-w-2xl mx-auto">
//             Have questions about pricing, custom integrations, or data migration? Our team is ready to help you set up your ideal workspace.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
//           {/* Contact Information */}
//           <div className="bg-slate-900 text-white p-10 md:p-14 flex flex-col justify-center">
//             <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
//             <p className="text-slate-400 mb-10">
//               Fill out the form and our team will get back to you within 24 hours. Alternatively, reach out directly using the details below.
//             </p>
            
//             <div className="space-y-8">
//               <div className="flex items-start gap-4">
//                 <Phone className="text-blue-500 mt-1" size={24} />
//                 <div>
//                   <h3 className="font-semibold text-lg text-slate-200">Phone & WhatsApp</h3>
//                   <p className="text-slate-400">+91 7404707263</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-4">
//                 <Mail className="text-blue-500 mt-1" size={24} />
//                 <div>
//                   <h3 className="font-semibold text-lg text-slate-200">Email Address</h3>
//                   <p className="text-slate-400">support@saasplatform.com</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start gap-4">
//                 <MapPin className="text-blue-500 mt-1" size={24} />
//                 <div>
//                   <h3 className="font-semibold text-lg text-slate-200">Headquarters</h3>
//                   <p className="text-slate-400">Hisar 125001<br/>Haryana, India 110001</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="p-10 md:p-14">
//             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
//                   <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50" placeholder="John" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
//                   <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50" placeholder="Doe" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
//                 <input type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50" placeholder="john@business.com" />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">Business Type</label>
//                 <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50">
//                   <option>Gym / Fitness Center</option>
//                   <option>Coaching Institute</option>
//                   <option>Dance / Arts Academy</option>
//                   <option>Library</option>
//                   <option>Other</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
//                 <textarea rows="4" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50 resize-none" placeholder="How can we help your business grow?"></textarea>
//               </div>

//               <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg flex justify-center items-center gap-2">
//                 Send Message <Send size={18} />
//               </button>
//             </form>
//           </div>
//         </div>
//       </main>

//       <footer className="bg-slate-950 text-slate-400 py-12 px-6 border-t border-slate-800 mt-auto">
//         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
//           <div className="flex items-center gap-2 text-xl font-bold text-white">
//             <Dumbbell className="text-blue-500" size={24} /> SaaS Platform
//           </div>
//           <div className="text-sm">© {new Date().getFullYear()} Matrivo. All rights reserved.</div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Contact;







// src/pages/Contact.jsx
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

// Import shared Navbar and Footer components
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
      
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Have questions about pricing, custom integrations, or data migration? Our team is ready to help you set up your ideal workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Contact Information */}
          <div className="bg-slate-900 text-white p-10 md:p-14 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <p className="text-slate-400 mb-10">
              Fill out the form and our team will get back to you within 24 hours. Alternatively, reach out directly using the details below.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="text-blue-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg text-slate-200">Phone & WhatsApp</h3>
                  <p className="text-slate-400">+91 7404707263</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Mail className="text-blue-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg text-slate-200">Email Address</h3>
                  <p className="text-slate-400">support@saasplatform.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="text-blue-500 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg text-slate-200">Headquarters</h3>
                  <p className="text-slate-400">Hisar 125001<br/>Haryana, India 110001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 md:p-14">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50" placeholder="Doe" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50" placeholder="john@business.com" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Business Type</label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50">
                  <option>Gym / Fitness Center</option>
                  <option>Coaching Institute</option>
                  <option>Dance / Arts Academy</option>
                  <option>Library</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50 resize-none" placeholder="How can we help your business grow?"></textarea>
              </div>

              <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg flex justify-center items-center gap-2">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;