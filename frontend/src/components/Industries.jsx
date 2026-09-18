// import { Link } from 'react-router-dom';
// import { Dumbbell, BookOpen, GraduationCap, Music, CheckCircle2, ArrowRight, Clock, LayoutDashboard } from 'lucide-react';

// // Import shared Navbar and Footer components
// import Navbar from './Navbar.jsx';
// import Footer from './Footer.jsx';

// const Industries = () => {
//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
      
//       <Navbar />

//       <main className="flex-1">
//         {/* Hero Section */}
//         <header className="max-w-5xl mx-auto px-6 py-20 text-center">
//           <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
//             Built for Every <span className="text-blue-600">Member-Based Business</span>
//           </h1>
//           <p className="text-xl text-slate-600 max-w-3xl mx-auto">
//             Our multi-tenant architecture provides isolated, highly customized workspaces tailored specifically to the operational needs of your industry.
//           </p>
//         </header>

//         {/* Industry Breakdowns */}
//         <section className="max-w-6xl mx-auto px-6 py-12 space-y-32 mb-24">
          
//           {/* Gyms (Active) */}
//           <div className="flex flex-col md:flex-row items-center gap-12">
//             <div className="flex-1">
//               <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
//                 <Dumbbell size={32} />
//               </div>
//               <h2 className="text-3xl font-bold mb-4">Fitness Gyms & Health Clubs</h2>
//               <p className="text-slate-600 mb-6 text-lg">Automate your entire front desk. Track active members, manage custom pricing plans, and prevent revenue leakage with automated alerts.</p>
//               <ul className="space-y-3 mb-8">
//                 <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-blue-500" size={20}/> Biometric Attendance Integration</li>
//                 <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-blue-500" size={20}/> Automated Expiry & WhatsApp Reminders</li>
//                 <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-blue-500" size={20}/> Trainer Assignment & Diet Plan Tracking</li>
//               </ul>
//             </div>
            
//             {/* Gym Interface Placeholder */}
//             <div className="flex-1 bg-slate-200 rounded-3xl h-80 w-full overflow-hidden relative border-8 border-white shadow-2xl flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-200 group">
//               <div className="text-center text-blue-500 flex flex-col items-center transition-transform group-hover:scale-105">
//                 <LayoutDashboard size={48} className="mb-4 opacity-75" />
//                 <span className="font-bold text-xl text-slate-800">Gym Workspace Live</span>
//                 <span className="text-sm text-slate-500 font-medium mt-1">Ready for Image Insert</span>
//               </div>
//             </div>
//           </div>

//           {/* Coaching (Coming Soon) */}
//           <div className="flex flex-col md:flex-row-reverse items-center gap-12">
//             <div className="flex-1">
//               <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
//                 <GraduationCap size={32} />
//               </div>
//               <h2 className="text-3xl font-bold mb-4">Coaching Institutes</h2>
//               <p className="text-slate-600 mb-6 text-lg">Shift your focus from administration to education. Manage student batches, track test scores, and streamline fee collections seamlessly.</p>
//               <ul className="space-y-3 mb-8">
//                 <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-amber-500" size={20}/> Student Batch & Shift Management</li>
//                 <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-amber-500" size={20}/> Automated Fee Collection Ledgers</li>
//                 <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-amber-500" size={20}/> Parent Communication via WhatsApp</li>
//               </ul>
//             </div>
            
//             {/* Coaching Coming Soon Card */}
//             <div className="flex-1 bg-slate-50 rounded-3xl h-80 w-full border-4 border-white shadow-xl flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
//               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
//               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 z-10">
//                 <Clock className="text-amber-500" size={32} />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-800 mb-3 z-10">Development in Progress</h3>
//               <p className="text-slate-500 text-base max-w-sm z-10">
//                 The dedicated workspace for coaching institutes is currently being engineered by our team. Check back soon for early access.
//               </p>
//               <div className="mt-6 px-5 py-2 bg-amber-100 text-amber-700 rounded-full text-xs font-extrabold uppercase tracking-widest z-10 shadow-sm border border-amber-200">
//                 Coming Soon
//               </div>
//             </div>
//           </div>

//           {/* Dance Academies (Coming Soon) */}
//           <div className="flex flex-col md:flex-row items-center gap-12">
//             <div className="flex-1">
//               <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
//                 <Music size={32} />
//               </div>
//               <h2 className="text-3xl font-bold mb-4">Dance & Arts Academies</h2>
//               <p className="text-slate-600 mb-6 text-lg">Organize instructors, schedule choreography classes, and monitor student renewals in one centralized workspace.</p>
//               <ul className="space-y-3 mb-8">
//                 <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-purple-500" size={20}/> Instructor Scheduling & Payroll</li>
//                 <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-purple-500" size={20}/> Class Capacity & Booking Limits</li>
//                 <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-purple-500" size={20}/> Enquiries & Trials CRM</li>
//               </ul>
//             </div>
            
//             {/* Dance Coming Soon Card */}
//             <div className="flex-1 bg-slate-50 rounded-3xl h-80 w-full border-4 border-white shadow-xl flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
//               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
//               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 z-10">
//                 <Clock className="text-purple-500" size={32} />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-800 mb-3 z-10">Development in Progress</h3>
//               <p className="text-slate-500 text-base max-w-sm z-10">
//                 The specialized choreography and class scheduling tools for dance academies are actively being built.
//               </p>
//               <div className="mt-6 px-5 py-2 bg-purple-100 text-purple-700 rounded-full text-xs font-extrabold uppercase tracking-widest z-10 shadow-sm border border-purple-200">
//                 Coming Soon
//               </div>
//             </div>
//           </div>

//           {/* Libraries (Coming Soon) */}
//           <div className="flex flex-col md:flex-row-reverse items-center gap-12">
//             <div className="flex-1">
//               <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
//                 <BookOpen size={32} />
//               </div>
//               <h2 className="text-3xl font-bold mb-4">Libraries & Study Circles</h2>
//               <p className="text-slate-600 mb-6 text-lg">Modernize your reading space. Track reader subscriptions, automate late fee calculations, and manage physical seating capacity.</p>
//               <ul className="space-y-3 mb-8">
//                 <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-green-500" size={20}/> Reader Subscription Tracking</li>
//                 <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-green-500" size={20}/> Seat Allocation Systems</li>
//                 <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-green-500" size={20}/> Late Fee Automation</li>
//               </ul>
//             </div>
            
//             {/* Library Coming Soon Card */}
//             <div className="flex-1 bg-slate-50 rounded-3xl h-80 w-full border-4 border-white shadow-xl flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
//               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
//               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 z-10">
//                 <Clock className="text-green-500" size={32} />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-800 mb-3 z-10">Development in Progress</h3>
//               <p className="text-slate-500 text-base max-w-sm z-10">
//                 The seat allocation logic and reader subscription workflows are currently under development.
//               </p>
//               <div className="mt-6 px-5 py-2 bg-green-100 text-green-700 rounded-full text-xs font-extrabold uppercase tracking-widest z-10 shadow-sm border border-green-200">
//                 Coming Soon
//               </div>
//             </div>
//           </div>

//         </section>

//         {/* CTA */}
//         <section className="bg-blue-600 py-16 text-center text-white px-6">
//           <h2 className="text-3xl font-bold mb-6">Ready to upgrade your management system?</h2>
//           <Link to="/#free-trial" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-50 transition shadow-lg text-lg">
//             Start Free Trial <ArrowRight size={20} />
//           </Link>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Industries;







import { Link } from 'react-router-dom';
import { Dumbbell, BookOpen, GraduationCap, Music, CheckCircle2, ArrowRight, Clock } from 'lucide-react';

// Import shared Navbar and Footer components
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Industries = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col">
      
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <header className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
            Built for Every <span className="text-blue-600">Member-Based Business</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our multi-tenant architecture provides isolated, highly customized workspaces tailored specifically to the operational needs of your industry.
          </p>
        </header>

        {/* Industry Breakdowns */}
        <section className="max-w-6xl mx-auto px-6 py-12 space-y-32 mb-24">
          
          {/* Gyms (Active) */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Dumbbell size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Fitness Gyms & Health Clubs</h2>
              <p className="text-slate-600 mb-6 text-lg">Automate your entire front desk. Track active members, manage custom pricing plans, and prevent revenue leakage with automated alerts.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-blue-500" size={20}/> Biometric Attendance Integration</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-blue-500" size={20}/> Automated Expiry & WhatsApp Reminders</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-blue-500" size={20}/> Trainer Assignment & Diet Plan Tracking</li>
              </ul>
            </div>
            
            {/* ✅ GYM IMAGE FIXED HERE */}
            <div className="flex-1 bg-slate-200 rounded-3xl h-80 w-full overflow-hidden relative border-8 border-white shadow-2xl flex items-center justify-center">
              {/* Change this src to your actual image path */}
              <img 
                src="https://res.cloudinary.com/kw7bcxsi/image/upload/v1789731300/Screenshot_2026-09-18_165039.png" 
                alt="Gym Dashboard Interface" 
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" 
              />
            </div>
          </div>

          {/* Coaching (Coming Soon) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Coaching Institutes</h2>
              <p className="text-slate-600 mb-6 text-lg">Shift your focus from administration to education. Manage student batches, track test scores, and streamline fee collections seamlessly.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-amber-500" size={20}/> Student Batch & Shift Management</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-amber-500" size={20}/> Automated Fee Collection Ledgers</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-amber-500" size={20}/> Parent Communication via WhatsApp</li>
              </ul>
            </div>
            
            {/* Coaching Coming Soon Card */}
            <div className="flex-1 bg-slate-50 rounded-3xl h-80 w-full border-4 border-white shadow-xl flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 z-10">
                <Clock className="text-amber-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 z-10">Development in Progress</h3>
              <p className="text-slate-500 text-base max-w-sm z-10">
                The dedicated workspace for coaching institutes is currently being engineered by our team. Check back soon for early access.
              </p>
              <div className="mt-6 px-5 py-2 bg-amber-100 text-amber-700 rounded-full text-xs font-extrabold uppercase tracking-widest z-10 shadow-sm border border-amber-200">
                Coming Soon
              </div>
            </div>
          </div>

          {/* Dance Academies (Coming Soon) */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Music size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Dance & Arts Academies</h2>
              <p className="text-slate-600 mb-6 text-lg">Organize instructors, schedule choreography classes, and monitor student renewals in one centralized workspace.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-purple-500" size={20}/> Instructor Scheduling & Payroll</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-purple-500" size={20}/> Class Capacity & Booking Limits</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-purple-500" size={20}/> Enquiries & Trials CRM</li>
              </ul>
            </div>
            
            {/* Dance Coming Soon Card */}
            <div className="flex-1 bg-slate-50 rounded-3xl h-80 w-full border-4 border-white shadow-xl flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 z-10">
                <Clock className="text-purple-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 z-10">Development in Progress</h3>
              <p className="text-slate-500 text-base max-w-sm z-10">
                The specialized choreography and class scheduling tools for dance academies are actively being built.
              </p>
              <div className="mt-6 px-5 py-2 bg-purple-100 text-purple-700 rounded-full text-xs font-extrabold uppercase tracking-widest z-10 shadow-sm border border-purple-200">
                Coming Soon
              </div>
            </div>
          </div>

          {/* Libraries (Coming Soon) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen size={32} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Libraries & Study Circles</h2>
              <p className="text-slate-600 mb-6 text-lg">Modernize your reading space. Track reader subscriptions, automate late fee calculations, and manage physical seating capacity.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-green-500" size={20}/> Reader Subscription Tracking</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-green-500" size={20}/> Seat Allocation Systems</li>
                <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="text-green-500" size={20}/> Late Fee Automation</li>
              </ul>
            </div>
            
            {/* Library Coming Soon Card */}
            <div className="flex-1 bg-slate-50 rounded-3xl h-80 w-full border-4 border-white shadow-xl flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 z-10">
                <Clock className="text-green-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3 z-10">Development in Progress</h3>
              <p className="text-slate-500 text-base max-w-sm z-10">
                The seat allocation logic and reader subscription workflows are currently under development.
              </p>
              <div className="mt-6 px-5 py-2 bg-green-100 text-green-700 rounded-full text-xs font-extrabold uppercase tracking-widest z-10 shadow-sm border border-green-200">
                Coming Soon
              </div>
            </div>
          </div>

        </section>

        {/* CTA */}
        <section className="bg-blue-600 py-16 text-center text-white px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to upgrade your management system?</h2>
          <Link to="/#free-trial" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-50 transition shadow-lg text-lg">
            Start Free Trial <ArrowRight size={20} />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Industries;