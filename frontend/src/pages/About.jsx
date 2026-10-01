// import { Link } from 'react-router-dom';
// import { Target, Shield, Zap, Users, ChevronRight } from 'lucide-react';

// // Import shared components
// import Navbar from '../components/Navbar.jsx';
// import Footer from '../components/Footer.jsx';

// const About = () => {
//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col relative">
//       <Navbar />

//       <main className="flex-1">
//         {/* 1. Hero Section */}
//         <header className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-full text-sm mb-8 border border-blue-100 shadow-sm">
//             <Target size={16} />
//             Our Mission
//           </div>
//           <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
//             Building the Operating System for <span className="text-blue-600">Modern Businesses</span>
//           </h1>
//           <p className="text-xl text-slate-600 mb-10 leading-relaxed">
//             We are on a mission to eliminate manual paperwork, Excel sheets, and billing chaos so business owners can focus on what they do best: serving their members.
//           </p>
//         </header>

//         {/* 2. Our Story Section */}
//         <section className="py-20 px-6 bg-white border-y border-slate-200">
//           <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
//             <div className="flex-1">
//               <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">How Membrix Started</h2>
//               <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
//                 <p>
//                   It started with a simple observation: Gym owners, coaching institutes, and dance academies were spending hours every day chasing pending payments, managing physical ID cards, and trying to decipher messy attendance registers.
//                 </p>
//                 <p>
//                   Existing software was either too expensive, incredibly outdated, or lacked basic modern integrations like WhatsApp and Cloud Biometrics.
//                 </p>
//                 <p>
//                   We built Membrix to change that. By providing isolated, highly secure cloud workspaces, we give local businesses the same powerful automation tools used by enterprise franchises—at a fraction of the cost.
//                 </p>
//               </div>
//             </div>
//             <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[500px]">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
//               {/* Replace with a real photo of your team or office from Cloudinary */}
//               <img 
//                 src="https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/team-photo.jpg" 
//                 alt="The Membrix Team" 
//                 className="w-full h-full object-cover rounded-3xl shadow-xl border border-slate-100"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   e.target.nextSibling.style.display = 'flex';
//                 }}
//               />
//               {/* Fallback if image fails */}
//               <div className="hidden w-full h-full bg-slate-800 rounded-3xl shadow-xl flex-col items-center justify-center text-slate-400 p-8 text-center border border-slate-700">
//                 <Users size={64} className="mb-4 opacity-50" />
//                 <span className="font-bold text-xl text-white mb-2">Team Photo Placeholder</span>
//                 <span>Replace URL with your Cloudinary team or office image.</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* 3. By the Numbers (Stats) */}
//         <section className="bg-slate-900 text-white py-20 px-6">
//           <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             <div>
//               <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2">500+</div>
//               <div className="text-slate-400 font-medium">Active Workspaces</div>
//             </div>
//             <div>
//               <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2">2M+</div>
//               <div className="text-slate-400 font-medium">Member Check-ins</div>
//             </div>
//             <div>
//               <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2">99.9%</div>
//               <div className="text-slate-400 font-medium">Uptime Guarantee</div>
//             </div>
//             <div>
//               <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2">24/7</div>
//               <div className="text-slate-400 font-medium">WhatsApp Support</div>
//             </div>
//           </div>
//         </section>

//         {/* 4. Core Values */}
//         <section className="py-24 px-6 max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
//             <p className="text-lg text-slate-600">The principles that drive every feature we build.</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
//               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
//                 <Users size={28} />
//               </div>
//               <h3 className="text-xl font-bold mb-3 text-slate-900">Customer Obsessed</h3>
//               <p className="text-slate-600">We don't just sell software; we partner with you. Your feedback directly shapes our development roadmap.</p>
//             </div>
            
//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
//               <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
//                 <Shield size={28} />
//               </div>
//               <h3 className="text-xl font-bold mb-3 text-slate-900">Uncompromising Security</h3>
//               <p className="text-slate-600">Your member data is your most valuable asset. Our isolated multi-tenant architecture ensures complete privacy.</p>
//             </div>

//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
//               <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
//                 <Zap size={28} />
//               </div>
//               <h3 className="text-xl font-bold mb-3 text-slate-900">Relentless Innovation</h3>
//               <p className="text-slate-600">We constantly ship new features, from biometric integrations to automated WhatsApp bots, to keep you ahead.</p>
//             </div>
//           </div>
//         </section>

//         {/* 5. CTA Section */}
//         <section className="bg-blue-600 py-20 px-6 text-center text-white">
//           <div className="max-w-3xl mx-auto">
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business?</h2>
//             <p className="text-xl text-blue-100 mb-10">
//               Join hundreds of business owners who have already automated their workflows with Membrix.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Link 
//                 to="/#free-trial" 
//                 className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-50 transition text-lg shadow-lg flex items-center justify-center gap-2"
//               >
//                 Start Free Trial <ChevronRight size={20} />
//               </Link>
//               <Link 
//                 to="/contact" 
//                 className="px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition text-lg border border-blue-500 flex items-center justify-center"
//               >
//                 Contact Sales
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default About;







import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Target, Shield, Zap, Users, ChevronRight, FileText, Lock } from 'lucide-react';

// Import shared components
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const About = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('about');

  // Automatically switch tabs if a user clicks a specific link from the footer (e.g., /about#privacy)
  useEffect(() => {
    if (location.hash === '#privacy') {
      setActiveTab('privacy');
    } else if (location.hash === '#terms') {
      setActiveTab('terms');
    } else {
      setActiveTab('about');
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col relative">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        
        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto px-6 mb-12 flex justify-center">
          <div className="inline-flex bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm overflow-x-auto w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('about')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex items-center justify-center gap-2 ${activeTab === 'about' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}
            >
              <Users size={16} /> Our Company
            </button>
            <button 
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex items-center justify-center gap-2 ${activeTab === 'privacy' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}
            >
              <Lock size={16} /> Privacy Policy
            </button>
            <button 
              onClick={() => setActiveTab('terms')}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex items-center justify-center gap-2 ${activeTab === 'terms' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}
            >
              <FileText size={16} /> Terms of Service
            </button>
          </div>
        </div>

        {/* =========================================
            TAB 1: ABOUT US 
        ========================================= */}
        {activeTab === 'about' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Section */}
            <header className="max-w-4xl mx-auto px-6 text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 font-bold rounded-full text-sm mb-8 border border-blue-100 shadow-sm">
                <Target size={16} />
                Our Mission
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
                Building the Operating System for <span className="text-blue-600">Modern Businesses</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                We are on a mission to eliminate manual paperwork, Excel sheets, and billing chaos so business owners can focus on what they do best: serving their members.
              </p>
            </header>

            {/* Our Story Section */}
            <section className="py-20 px-6 bg-white border-y border-slate-200">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">How Membrix Started</h2>
                  <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                    <p>
                      It started with a simple observation: Gym owners, coaching institutes, and dance academies were spending hours every day chasing pending payments, managing physical ID cards, and trying to decipher messy attendance registers.
                    </p>
                    <p>
                      Existing software was either too expensive, incredibly outdated, or lacked basic modern integrations like WhatsApp and Cloud Biometrics.
                    </p>
                    <p>
                      We built Membrix to change that. By providing isolated, highly secure cloud workspaces, we give local businesses the same powerful automation tools used by enterprise franchises—at a fraction of the cost.
                    </p>
                  </div>
                </div>
                <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
                  <img 
                    src="https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/team-photo.jpg" 
                    alt="The Membrix Team" 
                    className="w-full h-full object-cover rounded-3xl shadow-xl border border-slate-100"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-full h-full bg-slate-800 rounded-3xl shadow-xl flex-col items-center justify-center text-slate-400 p-8 text-center border border-slate-700">
                    <Users size={64} className="mb-4 opacity-50" />
                    <span className="font-bold text-xl text-white mb-2">Team Photo Placeholder</span>
                    <span>Replace URL with your Cloudinary team or office image.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* By the Numbers (Stats) */}
            <section className="bg-slate-900 text-white py-20 px-6">
              <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2">500+</div>
                  <div className="text-slate-400 font-medium">Active Workspaces</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2">2M+</div>
                  <div className="text-slate-400 font-medium">Member Check-ins</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2">99.9%</div>
                  <div className="text-slate-400 font-medium">Uptime Guarantee</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2">24/7</div>
                  <div className="text-slate-400 font-medium">WhatsApp Support</div>
                </div>
              </div>
            </section>

            {/* Core Values */}
            <section className="py-24 px-6 max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
                <p className="text-lg text-slate-600">The principles that drive every feature we build.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <Users size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Customer Obsessed</h3>
                  <p className="text-slate-600">We don't just sell software; we partner with you. Your feedback directly shapes our development roadmap.</p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                  <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                    <Shield size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Uncompromising Security</h3>
                  <p className="text-slate-600">Your member data is your most valuable asset. Our isolated multi-tenant architecture ensures complete privacy.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                  <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-6">
                    <Zap size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">Relentless Innovation</h3>
                  <p className="text-slate-600">We constantly ship new features, from biometric integrations to automated WhatsApp bots, to keep you ahead.</p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 py-20 px-6 text-center text-white">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business?</h2>
                <p className="text-xl text-blue-100 mb-10">
                  Join hundreds of business owners who have already automated their workflows with Membrix.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    to="/#free-trial" 
                    className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-50 transition text-lg shadow-lg flex items-center justify-center gap-2"
                  >
                    Start Free Trial <ChevronRight size={20} />
                  </Link>
                  <Link 
                    to="/contact" 
                    className="px-8 py-4 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition text-lg border border-blue-500 flex items-center justify-center"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* =========================================
            TAB 2: PRIVACY POLICY 
        ========================================= */}
        {activeTab === 'privacy' && (
          <div className="max-w-4xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
              <h1 className="text-4xl font-black mb-4">Privacy Policy</h1>
              <p className="text-slate-500 mb-8 font-medium">Last Updated: October 2026</p>
              
              <p>At Membrix, protecting the privacy and security of your business and your members' data is our highest priority. This Privacy Policy outlines how we collect, use, and safeguard information across our SaaS platform.</p>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">1. Information We Collect</h3>
              <p>We collect information primarily to provide isolated workspace services to Gyms, Coaching Institutes, Libraries, and Dance Academies. This includes:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Business Information:</strong> Name, contact details, and billing information of the facility owner.</li>
                <li><strong>Member Data:</strong> Names, phone numbers, and subscription dates entered by the facility into their secure dashboard.</li>
                <li><strong>Biometric Data (Temporary):</strong> If utilizing our biometric attendance integration, template codes are securely synced directly to the hardware. We do not store raw fingerprint images.</li>
              </ul>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">2. How We Use WhatsApp Data</h3>
              <p>Membrix integrates with the official WhatsApp Business API to automate facility communications. We only send messages (such as renewal reminders and fee receipts) to members on behalf of the business owner. We do not sell, rent, or use member phone numbers for external marketing campaigns.</p>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">3. Data Security & Multi-Tenancy</h3>
              <p>Your workspace is architecturally isolated. This means your member data is segmented from all other facilities using Membrix. We utilize industry-standard encryption protocols (SSL/TLS) for data transmission and secure cloud hosting environments (AWS/Vultr) with continuous backups to prevent data loss.</p>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">4. Third-Party Sharing</h3>
              <p>We do not sell data to data brokers. Information is only shared with trusted sub-processors strictly required to run the service (e.g., cloud hosting providers, payment gateways like Razorpay, and the WhatsApp messaging API).</p>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">5. Contacting the Privacy Team</h3>
              <p>If you have any questions regarding your data privacy, or wish to request data deletion, please contact our support team at <strong>support@membrix.com</strong> or via our WhatsApp support line at <strong>+91 7404707263</strong>.</p>
            </div>
          </div>
        )}

        {/* =========================================
            TAB 3: TERMS OF SERVICE 
        ========================================= */}
        {activeTab === 'terms' && (
          <div className="max-w-4xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
              <h1 className="text-4xl font-black mb-4">Terms of Service</h1>
              <p className="text-slate-500 mb-8 font-medium">Last Updated: October 2026</p>
              
              <p>By accessing or using the Membrix SaaS platform, you agree to be bound by these Terms of Service. Please read them carefully before subscribing to a workspace.</p>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">1. SaaS License & Usage</h3>
              <p>Membrix grants you a limited, non-exclusive, non-transferable right to access and use the platform strictly for your internal business operations (managing your gym, coaching center, etc.). You may not resell, distribute, or reverse-engineer the software.</p>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">2. Free Trial & Subscriptions</h3>
              <p>We offer a 100% free initial workspace setup and trial period. Following the trial, continued access requires an active, paid subscription. Failure to pay subscription fees will result in account suspension and eventual data deletion after a 30-day grace period.</p>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">3. Hardware Compatibility</h3>
              <p>While Membrix provides seamless biometric integrations, the functionality depends on the specific hardware models you purchase. Membrix is not responsible for physical hardware failures or network connectivity issues at your facility.</p>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">4. User Responsibilities</h3>
              <p>You are solely responsible for ensuring you have the legal right and consent to upload your members' phone numbers and data into Membrix for the purpose of WhatsApp notifications and billing. Membrix acts solely as a data processor on your behalf.</p>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">5. Limitation of Liability</h3>
              <p>To the maximum extent permitted by law, Membrix shall not be liable for any indirect, incidental, or consequential damages arising from system downtime, missed WhatsApp reminders, or loss of profits.</p>

              <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-900">6. Modifications</h3>
              <p>We reserve the right to modify these terms at any time. Significant changes will be communicated via email or an alert in your Membrix dashboard.</p>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default About;