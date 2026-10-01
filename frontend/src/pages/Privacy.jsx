import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 flex flex-col relative">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
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
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;