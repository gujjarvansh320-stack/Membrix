import { useState, useEffect } from 'react';
import { 
  ChevronRight, Send, Image as ImageIcon, Fingerprint, CreditCard, 
  BarChart3, Smartphone, ChevronDown, Star, XCircle, X, CheckCircle2 
} from 'lucide-react';

import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

// Gym Logos for Marquee
const trustedGyms = [
  { name: "IRON CORE GYM", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/iron-core-logo.png" },
  { name: "TARA GYM", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/veda-homes-logo.png" },
  { name: "ALPHA FIT GYM", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/coaching-logo.png" },
  { name: "7 TO 9 FITNESS", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/mercury-logo.png" },
  { name: "ELEVATE FITNESS", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/elevate-logo.png" },
  { name: "CLASSIC FITNESS", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/library-logo.png" },
  { name: "FITNESS HUB", logo: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/library-logo.png" },
];

// Custom Animated Counter Component for the "Stuck" value effect
const AnimatedCounter = ({ endValue, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const duration = 2000; // 2 seconds animation duration

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth slowdown before it gets "stuck"
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * endValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [endValue]);

  return (
    <span>{count.toLocaleString()}{suffix}</span>
  );
};

// Platform Stats configured for the Animated Counter
const platformStats = [
  { endValue: 500, suffix: "+", label: "Active Workspaces" },
  { endValue: 2, suffix: "M+", label: "Member Check-ins" },
  { endValue: 99, suffix: ".9%", label: "Uptime Guarantee" },
  { endValue: 24, suffix: "/7", label: "WhatsApp Support" },
];

// Customer Reviews Data
const customerReviews = [
  {
    name: "Rahul Sharma",
    role: "Owner, Iron Core Gym",
    avatar: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/avatar1.jpg",
    review: "The biometric integration completely changed how we operate. No more manual entry, and the automated WhatsApp reminders have reduced our pending payments by 80%.",
    rating: 5
  },
  {
    name: "Priya Patel",
    role: "Manager, Elevate Fitness",
    avatar: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/avatar2.jpg",
    review: "Switching to this SaaS platform was the best decision for our gym. The dashboard is incredibly intuitive, and setting up custom pricing plans takes seconds.",
    rating: 5
  },
  {
    name: "Vikram Singh",
    role: "Owner, Fitness Hub",
    avatar: "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/avatar3.jpg",
    review: "This platform has made managing our gym much easier. Member management, attendance, payments, and membership tracking are all handled in one place. It saves us a lot of time every day.",
    rating: 5
  }
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col relative overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <header className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
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
            <a href="#free-trial" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 z-20 relative">
              Start Free Trial <ChevronRight size={20} />
            </a>
          </div>
        </header>

        {/* CSS for Marquees */}
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
          .animate-marquee { display: flex; width: max-content; animation: marquee 30s linear infinite; }
          .animate-marquee:hover { animation-play-state: paused; }
        `}</style>

        {/* 2. Trusted By Marquee */}
        <section className="border-t border-slate-200 bg-white py-10 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 text-center mb-8">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Trusted By The Leading Gyms Across India
            </p>
          </div>
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

        {/* 3. Old Way vs New Way Comparison */}
        <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Upgrade Your System?</h2>
              <p className="text-lg text-slate-600">See the difference between manual chaos and automated scale.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-red-100 rounded-3xl p-8 shadow-sm">
                <div className="text-red-500 font-bold mb-6 text-xl flex items-center gap-2"><XCircle /> The Old Way</div>
                <ul className="space-y-4 text-slate-600 font-medium">
                  <li className="flex items-start gap-3"><X className="text-red-400 mt-0.5 shrink-0" size={20} /> Excel sheets and messy physical attendance registers.</li>
                  <li className="flex items-start gap-3"><X className="text-red-400 mt-0.5 shrink-0" size={20} /> Manually messaging members for overdue fees.</li>
                  <li className="flex items-start gap-3"><X className="text-red-400 mt-0.5 shrink-0" size={20} /> Guessing monthly revenue and active memberships.</li>
                  <li className="flex items-start gap-3"><X className="text-red-400 mt-0.5 shrink-0" size={20} /> Physical ID cards getting lost or shared between friends.</li>
                </ul>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl text-white">
                <div className="text-[#25D366] font-bold mb-6 text-xl flex items-center gap-2"><CheckCircle2 /> The SaaS Way</div>
                <ul className="space-y-4 text-slate-300 font-medium">
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-[#25D366] mt-0.5 shrink-0" size={20} /> Centralized cloud dashboard accessible from anywhere.</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-[#25D366] mt-0.5 shrink-0" size={20} /> Automated WhatsApp reminders for expiry & payments.</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-[#25D366] mt-0.5 shrink-0" size={20} /> Real-time analytics, revenue graphs, and growth tracking.</li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="text-[#25D366] mt-0.5 shrink-0" size={20} /> Biometric fingerprint integration preventing unauthorized entry.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Core Features Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto bg-white">
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

        {/* 5. How It Works (3-Step Onboarding) */}
        <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Go Live in 3 Simple Steps</h2>
              <p className="text-lg text-slate-600">No technical knowledge required. We handle the heavy lifting for you.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-slate-200 -z-10"></div>
              
              <div className="text-center relative">
                <div className="w-24 h-24 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black border-4 border-slate-100 shadow-md">1</div>
                <h3 className="text-xl font-bold mb-3">Claim Workspace</h3>
                <p className="text-slate-600 text-sm">Submit your WhatsApp request. Our team provisions a secure, isolated database just for your business.</p>
              </div>
              <div className="text-center relative">
                <div className="w-24 h-24 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black border-4 border-slate-100 shadow-md">2</div>
                <h3 className="text-xl font-bold mb-3">Onboarding & Data Sync</h3>
                <p className="text-slate-600 text-sm">We help import your existing member list from Excel and configure your custom pricing plans.</p>
              </div>
              <div className="text-center relative">
                <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black border-4 border-blue-200 shadow-md">3</div>
                <h3 className="text-xl font-bold mb-3">Automate & Grow</h3>
                <p className="text-slate-600 text-sm">Connect your biometric scanner and let the automated WhatsApp alerts handle your renewals automatically.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Customer Reviews Section */}
        <section className="bg-slate-900 py-24 px-6 border-y border-slate-800 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Business Owners</h2>
              <p className="text-lg text-slate-400">See what our clients are saying about their new management workflow.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {customerReviews.map((review, index) => (
                <div key={index} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 flex flex-col shadow-lg hover:-translate-y-1 transition duration-300">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 italic mb-8 flex-1 leading-relaxed">
                    "{review.review}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700 border-2 border-slate-600">
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center font-bold text-slate-400">${review.name.charAt(0)}</div>`; }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{review.name}</h4>
                      <p className="text-sm text-slate-400">{review.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Animated Stats Counter Grid */}
        <section className="py-20 px-6 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformStats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-1"
                >
                  <div className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight drop-shadow-sm">
                    <AnimatedCounter endValue={stat.endValue} suffix={stat.suffix} />
                  </div>
                  <div className="text-indigo-100 font-medium text-lg drop-shadow-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ Section */}
        <section className="bg-slate-50 py-24 px-6">
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

        {/* 9. WhatsApp Free Trial Section */}
        <section id="free-trial" className="bg-white py-24 px-6 border-t border-slate-200">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 bg-slate-900 rounded-3xl p-2 md:p-12 shadow-2xl">
            <div className="flex-1 text-center md:text-left p-8 text-white">
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
            
            <div className="flex-1 w-full max-w-md bg-white rounded-2xl p-8 text-slate-900 shadow-xl m-4 md:m-0">
              <h3 className="text-2xl font-bold mb-6 text-center">Start Today</h3>
              <form onSubmit={handleTrialSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm bg-slate-50" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm bg-slate-50" placeholder="9876543210" />
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

      {/* 10. Floating Global WhatsApp Contact Button (SVG Logo) */}
      <button 
        onClick={handleDirectWhatsApp}
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </button>

      <Footer />
    </div>
  );
};

export default Home;