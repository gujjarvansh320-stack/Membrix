import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col relative">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
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
      </main>

      <Footer />
    </div>
  );
};

export default Terms;