// import { useState } from 'react';
// import { ChevronRight, Send } from 'lucide-react';

// // Import shared components
// import Navbar from '../components/Navbar.jsx';
// import Footer from '../components/Footer.jsx';

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
import { ChevronRight, Send } from 'lucide-react';

// Import shared components
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    businessType: 'Gym'
  });

  const handleTrialSubmit = (e) => {
    e.preventDefault();
    const wpNumber = "919876543210"; 
    
    const message = `Hello, I am interested in a Free Trial.%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Business Type:* ${formData.businessType}`;
    
    window.open(`https://wa.me/${wpNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
      
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
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
            <a 
              href="#free-trial" 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Start Free Trial <ChevronRight size={20} />
            </a>
          </div>
        </header>

        {/* Flowing Marquee Trusted By Section */}
        <section className="border-y border-slate-200 bg-white py-10 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 text-center mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Trusted by Local Businesses & Gyms
            </p>
          </div>

          <style>{`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              display: flex;
              width: max-content;
              animation: marquee 25s linear infinite;
            }
            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="relative w-full overflow-hidden flex">
            <div className="animate-marquee flex items-center gap-16 px-8">
              {/* First set */}
              <div className="text-xl font-black text-slate-700 tracking-wider flex items-center gap-2">⚡ IRON CORE GYM</div>
              <div className="text-xl font-black text-slate-700 tracking-wider flex items-center gap-2">🏢 VEDA HOMES</div>
              <div className="text-xl font-black text-slate-700 tracking-wider flex items-center gap-2">🎓 COACHING PORTALS</div>
              <div className="text-xl font-black text-slate-700 tracking-wider flex items-center gap-2">🚗 MERCURY DETAILERS</div>
              <div className="text-xl font-black text-slate-700 tracking-wider flex items-center gap-2">💪 ELEVATE FITNESS</div>
              <div className="text-xl font-black text-slate-700 tracking-wider flex items-center gap-2">🏛️ CENTRAL LIBRARY</div>
              
              {/* Duplicate set to ensure seamless infinite loop */}
              <div className="text-xl font-black text-slate-700 tracking-wider flex items-center gap-2">⚡ IRON CORE GYM</div>
              <div className="text-xl font-black text-slate-700 tracking-wider flex items-center gap-2">🏢 VEDA HOMES</div>
              <div className="text-xl font-black text-slate-700 tracking-wider flex items-center gap-2">🎓 COACHING PORTALS</div>
              <div className="text-xl font-black text-slate-700 tracking-wider flex items-center gap-2">🚗 MERCURY DETAILERS</div>
              <div className="text-xl font-black text-slate-700 tracking-wider flex items-center gap-2">💪 ELEVATE FITNESS</div>
              <div className="text-xl font-black text-slate-700 tracking-wider flex items-center gap-2">🏛️ CENTRAL LIBRARY</div>
            </div>
          </div>
        </section>

        {/* WhatsApp Free Trial Section */}
        <section id="free-trial" className="bg-slate-900 py-24 px-6 text-white border-t border-slate-800">
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
                  <input 
                    type="text" 
                    required 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                  <input 
                    type="tel" 
                    required 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                    placeholder="9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Business Type</label>
                  <select 
                    value={formData.businessType} 
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white text-sm"
                  >
                    <option value="Gym">Fitness Gym</option>
                    <option value="Coaching">Coaching Institute</option>
                    <option value="Library">Library</option>
                    <option value="Dance Academy">Dance Academy</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-[#25D366] hover:bg-green-600 text-white font-bold py-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 mt-4 shadow-md"
                >
                  Send to WhatsApp <Send size={18} />
                </button>
              </form>
            </div>

          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;