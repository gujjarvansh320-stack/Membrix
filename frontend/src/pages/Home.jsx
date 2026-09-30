// import { useState } from 'react';
// import { ChevronRight, Send, Image as ImageIcon } from 'lucide-react';

// // Import shared components
// import Navbar from '../components/Navbar.jsx';
// import Footer from '../components/Footer.jsx';

// // ✅ Paste your Cloudinary image URLs here
// const trustedGyms = [
//   { name: "IRON CORE GYM", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/iron-core-logo.png" },
//   { name: "Tara Gym", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/veda-homes-logo.png" },
//   { name: "Fit Pilot Gym", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/coaching-logo.png" },
//   { name: "Classic Gym", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/mercury-logo.png" },
//   { name: "ELEVATE FITNESS", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/elevate-logo.png" },
//   { name: "7 TO 9 Fitness Gym", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/library-logo.png" },
// ];

// const Home = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     businessType: 'Gym'
//   });

//   const handleTrialSubmit = (e) => {
//     e.preventDefault();
//     // Replace with your actual WhatsApp business number (country code + number, no '+' sign)
//     const wpNumber = "919876543210"; 
    
//     const message = `Hello, I am interested in a Free Trial.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Business Type:* ${formData.businessType}`;
    
//     window.open(`https://wa.me/${wpNumber}?text=${message}`, '_blank');
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
      
//       <Navbar />

//       <main className="flex-1">
//         {/* Hero Section */}
//         <header className="max-w-6xl mx-auto px-6 py-24 text-center">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-full text-sm mb-8 border border-blue-100 shadow-sm">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
//             </span>
//             Management Workspaces Available Now
//           </div>
//           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
//             Smart Management for <br/><span className="text-blue-600">Modern Businesses</span>
//           </h1>
//           <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
//             Automate renewals, integrate biometrics, and manage your members effortlessly with our powerful, isolated workspaces.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <a 
//               href="#free-trial" 
//               className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//             >
//               Start Free Trial <ChevronRight size={20} />
//             </a>
//           </div>
//         </header>

//         {/* Flowing Marquee Trusted By Section */}
//         <section className="border-y border-slate-200 bg-white py-10 overflow-hidden relative">
//           <div className="max-w-7xl mx-auto px-6 text-center mb-8">
//             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
//               Trusted by Local Businesses & Gyms
//             </p>
//           </div>

//           <style>{`
//             @keyframes marquee {
//               0% { transform: translateX(0%); }
//               100% { transform: translateX(-50%); }
//             }
//             .animate-marquee {
//               display: flex;
//               width: max-content;
//               animation: marquee 30s linear infinite;
//             }
//             .animate-marquee:hover {
//               animation-play-state: paused;
//             }
//           `}</style>

//           <div className="relative w-full overflow-hidden flex">
//             <div className="animate-marquee flex items-center gap-16 px-8">
//               {/* Combine the array with itself to loop seamlessly */}
//               {[...trustedGyms, ...trustedGyms].map((gym, index) => (
//                 <div key={index} className="flex items-center gap-4 min-w-max group cursor-default">
//                   {/* Logo Container */}
//                   <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center overflow-hidden shadow-sm transition-transform group-hover:scale-110">
//                     <img 
//                       src={gym.logo} 
//                       alt={`${gym.name} logo`} 
//                       className="w-full h-full object-cover"
//                       // Fallback icon if the Cloudinary image path is broken/missing
//                       onError={(e) => {
//                         e.target.style.display = 'none';
//                         e.target.nextSibling.style.display = 'block';
//                       }}
//                     />
//                     <ImageIcon className="hidden text-slate-400" size={20} />
//                   </div>
//                   {/* Gym Name */}
//                   <div className="text-xl font-black text-slate-700 tracking-wider">
//                     {gym.name}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* WhatsApp Free Trial Section */}
//         <section id="free-trial" className="bg-slate-900 py-24 px-6 text-white border-t border-slate-800">
//           <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            
//             <div className="flex-1 text-center md:text-left">
//               <h2 className="text-3xl md:text-4xl font-bold mb-4">Claim Your Free Trial</h2>
//               <p className="text-lg text-slate-400 mb-8">
//                 Experience the power of automated member management. Fill out the form and our team will instantly connect with you via WhatsApp to set up your isolated workspace.
//               </p>
//               <ul className="space-y-4 text-slate-300 font-medium">
//                 <li className="flex items-center gap-3 justify-center md:justify-start"><ChevronRight className="text-green-500" size={20} /> 100% Free Workspace Setup</li>
//                 <li className="flex items-center gap-3 justify-center md:justify-start"><ChevronRight className="text-green-500" size={20} /> No Credit Card Required</li>
//                 <li className="flex items-center gap-3 justify-center md:justify-start"><ChevronRight className="text-green-500" size={20} /> 1-on-1 Software Onboarding</li>
//               </ul>
//             </div>
            
//             <div className="flex-1 w-full max-w-md bg-white rounded-2xl p-8 text-slate-900 shadow-2xl">
//               <h3 className="text-2xl font-bold mb-6 text-center">Start Today</h3>
//               <form onSubmit={handleTrialSubmit} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
//                   <input 
//                     type="text" 
//                     required 
//                     value={formData.name} 
//                     onChange={(e) => setFormData({...formData, name: e.target.value})}
//                     className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
//                     placeholder="John Doe"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">WhatsApp Number</label>
//                   <input 
//                     type="tel" 
//                     required 
//                     value={formData.phone} 
//                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                     className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
//                     placeholder="9876543210"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 mb-1">Business Type</label>
//                   <select 
//                     value={formData.businessType} 
//                     onChange={(e) => setFormData({...formData, businessType: e.target.value})}
//                     className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white text-sm"
//                   >
//                     <option value="Gym">Fitness Gym</option>
//                     <option value="Coaching">Coaching Institute</option>
//                     <option value="Library">Library</option>
//                     <option value="Dance Academy">Dance Academy</option>
//                   </select>
//                 </div>
//                 <button 
//                   type="submit" 
//                   className="w-full bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 mt-4 shadow-md"
//                 >
//                   Send to WhatsApp <Send size={18} />
//                 </button>
//               </form>
//             </div>

//           </div>
//         </section>
//       </main>
      
//       <Footer />
//     </div>
//   );
// };

// export default Home;









import { useState } from 'react';
import { ChevronRight, Send, Image as ImageIcon, MessageCircle, Fingerprint, CreditCard, BarChart3, Smartphone, ChevronDown } from 'lucide-react';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const trustedGyms = [
  { name: "IRON CORE GYM", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/iron-core-logo.png" },
  { name: "VEDA HOMES", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/veda-homes-logo.png" },
  { name: "COACHING PORTALS", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/coaching-logo.png" },
  { name: "MERCURY DETAILERS", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/mercury-logo.png" },
  { name: "ELEVATE FITNESS", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/elevate-logo.png" },
  { name: "CENTRAL LIBRARY", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/library-logo.png" },
];

const faqs = [
  { question: "Is the software strictly for gyms?", answer: "No, our multi-tenant architecture provides isolated, specialized workspaces for Gyms, Coaching Institutes, Dance Academies, and Libraries." },
  { question: "Do you support biometric integration?", answer: "Yes! We integrate seamlessly with standard biometric attendance machines to log member entries and sync them directly to your dashboard." },
  { question: "Can I try it before paying?", answer: "Absolutely. We offer a 100% free workspace setup and trial period so you can test the automated billing and member management tools." },
  { question: "Will it send automated WhatsApp reminders?", answer: "Yes, the system automatically sends expiry notifications, payment receipts, and custom alerts to your members via WhatsApp." },
];

const Home = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', businessType: 'Gym' });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const wpNumber = "917404707263"; 

  const handleTrialSubmit = (e) => {
    e.preventDefault();
    const message = `Hello, I am interested in a Free Trial.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Business Type:* ${formData.businessType}`;
    window.open(`https://wa.me/${wpNumber}?text=${message}`, '_blank');
  };

  const handleDirectWhatsApp = () => {
    window.open(`https://wa.me/${wpNumber}?text=Hello, I have an inquiry regarding your SaaS platform.`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col relative">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <header className="max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-full text-sm mb-8 border border-blue-100 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Management Workspaces Available Now
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
            Smart Management for <br/><span className="text-blue-600">Modern Businesses</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Automate renewals, integrate biometrics, and manage your members effortlessly with our powerful, isolated workspaces.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#free-trial" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
              Start Free Trial <ChevronRight size={20} />
            </a>
          </div>
        </header>

        {/* 2. Trusted By Marquee */}
        <section className="border-y border-slate-200 bg-white py-10 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 text-center mb-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Trusted by Local Businesses & Gyms
            </p>
          </div>
          <style>{`
            @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
            .animate-marquee { display: flex; width: max-content; animation: marquee 30s linear infinite; }
            .animate-marquee:hover { animation-play-state: paused; }
          `}</style>
          <div className="relative w-full overflow-hidden flex">
            <div className="animate-marquee flex items-center gap-16 px-8">
              {[...trustedGyms, ...trustedGyms].map((gym, index) => (
                <div key={index} className="flex items-center gap-4 min-w-max group cursor-default">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center overflow-hidden shadow-sm transition-transform group-hover:scale-110">
                    <img src={gym.logo} alt={`${gym.name} logo`} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    <ImageIcon className="hidden text-slate-400" size={20} />
                  </div>
                  <div className="text-xl font-black text-slate-700 tracking-wider">{gym.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Core Features Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything You Need to Scale</h2>
            <p className="text-lg text-slate-600">Stop juggling spreadsheets. Manage your entire facility from one dashboard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6"><Fingerprint size={28} /></div>
              <h3 className="text-xl font-bold mb-2">Biometrics Setup</h3>
              <p className="text-slate-600 text-sm">Sync your front-desk fingerprint scanner directly with the cloud to automatically log daily attendance.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6"><CreditCard size={28} /></div>
              <h3 className="text-xl font-bold mb-2">Automated Billing</h3>
              <p className="text-slate-600 text-sm">Never miss a payment. Track pending fees, log offline payments, and generate digital invoices.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6"><Smartphone size={28} /></div>
              <h3 className="text-xl font-bold mb-2">WhatsApp Alerts</h3>
              <p className="text-slate-600 text-sm">Keep members informed with automated renewal reminders, receipt links, and promotional blasts.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6"><BarChart3 size={28} /></div>
              <h3 className="text-xl font-bold mb-2">Revenue Analytics</h3>
              <p className="text-slate-600 text-sm">View visual graphs detailing your monthly revenue, active memberships, and projected growth.</p>
            </div>
          </div>
        </section>

        {/* 4. FAQ Section */}
        <section className="bg-slate-100 py-24 px-6 border-y border-slate-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-slate-600">Got questions? We've got answers.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-sm">
                  <button 
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex justify-between items-center font-bold text-slate-900 hover:bg-slate-50 transition"
                  >
                    {faq.question}
                    <ChevronDown className={`transform transition-transform ${openFaqIndex === index ? "rotate-180 text-blue-600" : "text-slate-400"}`} size={20} />
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-8 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. WhatsApp Free Trial Section */}
        <section id="free-trial" className="bg-slate-900 py-24 px-6 text-white">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Claim Your Free Trial</h2>
              <p className="text-lg text-slate-400 mb-8">
                Experience the power of automated member management. Fill out the form and our team will instantly connect with you via WhatsApp to set up your isolated workspace.
              </p>
              <ul className="space-y-4 text-slate-300 font-medium">
                <li className="flex items-center gap-3 justify-center md:justify-start"><ChevronRight className="text-green-500" size={20} /> 100% Free Workspace Setup</li>
                <li className="flex items-center gap-3 justify-center md:justify-start"><ChevronRight className="text-green-500" size={20} /> No Credit Card Required</li>
                <li className="flex items-center gap-3 justify-center md:justify-start"><ChevronRight className="text-green-500" size={20} /> 1-on-1 Software Onboarding</li>
              </ul>
            </div>
            
            <div className="flex-1 w-full max-w-md bg-white rounded-2xl p-8 text-slate-900 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center">Start Today</h3>
              <form onSubmit={handleTrialSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" placeholder="9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Business Type</label>
                  <select value={formData.businessType} onChange={(e) => setFormData({...formData, businessType: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white text-sm">
                    <option value="Gym">Fitness Gym</option>
                    <option value="Coaching">Coaching Institute</option>
                    <option value="Library">Library</option>
                    <option value="Dance Academy">Dance Academy</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 mt-4 shadow-md">
                  Send to WhatsApp <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Global WhatsApp Contact Button */}
      <button 
        onClick={handleDirectWhatsApp}
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={32} />
      </button>

      <Footer />
    </div>
  );
};

export default Home;