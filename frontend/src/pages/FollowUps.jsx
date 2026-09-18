// // src/pages/FollowUps.jsx
// import { useState, useEffect } from 'react';
// import api from '../api/axios';
// import { MessageCircle, Clock, AlertCircle, UserPlus } from 'lucide-react';

// const FollowUps = () => {
//   const [data, setData] = useState({ expiringMembers: [], pendingDues: [], enquiries: [] });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchFollowUps();
//   }, []);

//   const fetchFollowUps = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user')) || {};
//       const gymId = user?._id || user?.data?._id || user?.gymId;
//       const res = await api.get(`/members/follow-ups?gymId=${gymId}`);
//       setData(res.data);
//     } catch (err) {
//       console.error("Failed to load follow-ups", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendWhatsApp = (mobile, name, type) => {
//     let phone = mobile.replace(/\D/g, '');
//     if (phone.length === 10) phone = '91' + phone;
    
//     let message = '';
//     if (type === 'expiry') {
//       message = `Hi ${name}, your gym membership is expiring soon. Please renew your plan!`;
//     } else if (type === 'due') {
//       message = `Hi ${name}, this is a gentle reminder regarding your pending balance at the gym.`;
//     } else if (type === 'enquiry') {
//       message = `Hi ${name}, thank you for your interest in our gym! Let us know if you have any questions or if you'd like to start your membership.`;
//     }

//     window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
//   };

//   if (loading) return <div className="p-6 font-medium text-gray-600">Loading follow-ups...</div>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto space-y-6">
//       <h2 className="text-2xl font-bold text-gray-800">Follow-Up Tasks</h2>

//       {/* ✅ Section 1: Enquiries / Leads */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//           <UserPlus className="text-blue-500" size={20} /> Pending Enquiries & Leads
//         </h3>
//         {!data.enquiries || data.enquiries.length === 0 ? (
//           <p className="text-sm text-gray-500">No pending enquiries found.</p>
//         ) : (
//           <div className="space-y-3">
//             {data.enquiries.map(m => (
//               <div key={m._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
//                 <div>
//                   <p className="font-semibold text-gray-800">{m.name} <span className="text-xs text-gray-500">({m.mobile})</span></p>
//                   <p className="text-xs text-blue-600 font-medium">Date: {new Date(m.createdAt || m.date).toLocaleDateString()}</p>
//                 </div>
//                 <button onClick={() => sendWhatsApp(m.mobile, m.name, 'enquiry')} className="bg-green-50 text-green-600 hover:bg-green-100 p-2 rounded-md border border-green-200 flex items-center gap-1 text-xs font-semibold transition">
//                   <MessageCircle size={16} /> Follow Up
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Section 2: Expiring Memberships */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//           <Clock className="text-amber-500" size={20} /> Expiring & Expired Memberships
//         </h3>
//         {!data.expiringMembers || data.expiringMembers.length === 0 ? (
//           <p className="text-sm text-gray-500">No upcoming expirations to follow up on.</p>
//         ) : (
//           <div className="space-y-3">
//             {data.expiringMembers.map(m => (
//               <div key={m._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
//                 <div>
//                   <p className="font-semibold text-gray-800">{m.name} <span className="text-xs text-gray-500">({m.mobile})</span></p>
//                   <p className="text-xs text-red-600">Expiry: {new Date(m.expiryDate).toLocaleDateString()}</p>
//                 </div>
//                 <button onClick={() => sendWhatsApp(m.mobile, m.name, 'expiry')} className="bg-green-50 text-green-600 hover:bg-green-100 p-2 rounded-md border border-green-200 flex items-center gap-1 text-xs font-semibold transition">
//                   <MessageCircle size={16} /> Remind via WhatsApp
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Section 3: Pending Dues */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
//         <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//           <AlertCircle className="text-red-500" size={20} /> Pending Dues Collection
//         </h3>
//         {!data.pendingDues || data.pendingDues.length === 0 ? (
//           <p className="text-sm text-gray-500">No pending dues found.</p>
//         ) : (
//           <div className="space-y-3">
//             {data.pendingDues.map(m => (
//               <div key={m._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
//                 <div>
//                   <p className="font-semibold text-gray-800">{m.name} <span className="text-xs text-gray-500">({m.mobile})</span></p>
//                   <p className="text-xs text-red-600 font-bold">Due Amount: ₹{m.pendingBalance}</p>
//                 </div>
//                 <button onClick={() => sendWhatsApp(m.mobile, m.name, 'due')} className="bg-green-50 text-green-600 hover:bg-green-100 p-2 rounded-md border border-green-200 flex items-center gap-1 text-xs font-semibold transition">
//                   <MessageCircle size={16} /> Request Payment
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FollowUps;








// src/pages/FollowUps.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { MessageCircle, Clock, AlertCircle, UserPlus } from 'lucide-react';

const FollowUps = () => {
  const [data, setData] = useState({ expiringMembers: [], pendingDues: [], enquiries: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowUps();
  }, []);

  const fetchFollowUps = async () => {
    try {
      // ✅ BULLETPROOF GYM ID EXTRACTOR
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      const gymId = storedUser?.gymId || storedUser?.data?.user?.gymId || storedUser?.user?.gymId || storedUser?._id || storedUser?.data?.user?._id || storedUser?.data?._id || '65abc123def4567890abcd12';
      
      const res = await api.get(`/members/follow-ups?gymId=${gymId}`);
      setData(res.data);
    } catch (err) {
      console.error("Failed to load follow-ups", err);
    } finally {
      setLoading(false);
    }
  };

  const sendWhatsApp = (mobile, name, type) => {
    let phone = mobile.replace(/\D/g, '');
    if (phone.length === 10) phone = '91' + phone;
    
    let message = '';
    if (type === 'expiry') {
      message = `Hi ${name}, your gym membership is expiring soon. Please renew your plan!`;
    } else if (type === 'due') {
      message = `Hi ${name}, this is a gentle reminder regarding your pending balance at the gym.`;
    } else if (type === 'enquiry') {
      message = `Hi ${name}, thank you for your interest in our gym! Let us know if you have any questions or if you'd like to start your membership.`;
    }

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) return <div className="p-6 font-medium text-gray-600">Loading follow-ups...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Follow-Up Tasks</h2>

      {/* ✅ Section 1: Enquiries / Leads */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <UserPlus className="text-blue-500" size={20} /> Pending Enquiries & Leads
        </h3>
        {!data.enquiries || data.enquiries.length === 0 ? (
          <p className="text-sm text-gray-500">No pending enquiries found.</p>
        ) : (
          <div className="space-y-3">
            {data.enquiries.map(m => (
              <div key={m._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                <div>
                  <p className="font-semibold text-gray-800">{m.name} <span className="text-xs text-gray-500">({m.mobile})</span></p>
                  <p className="text-xs text-blue-600 font-medium">Date: {new Date(m.createdAt || m.date).toLocaleDateString()}</p>
                </div>
                <button onClick={() => sendWhatsApp(m.mobile, m.name, 'enquiry')} className="bg-green-50 text-green-600 hover:bg-green-100 p-2 rounded-md border border-green-200 flex items-center gap-1 text-xs font-semibold transition">
                  <MessageCircle size={16} /> Follow Up
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Expiring Memberships */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Clock className="text-amber-500" size={20} /> Expiring & Expired Memberships
        </h3>
        {!data.expiringMembers || data.expiringMembers.length === 0 ? (
          <p className="text-sm text-gray-500">No upcoming expirations to follow up on.</p>
        ) : (
          <div className="space-y-3">
            {data.expiringMembers.map(m => (
              <div key={m._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                <div>
                  <p className="font-semibold text-gray-800">{m.name} <span className="text-xs text-gray-500">({m.mobile})</span></p>
                  <p className="text-xs text-red-600">Expiry: {new Date(m.expiryDate).toLocaleDateString()}</p>
                </div>
                <button onClick={() => sendWhatsApp(m.mobile, m.name, 'expiry')} className="bg-green-50 text-green-600 hover:bg-green-100 p-2 rounded-md border border-green-200 flex items-center gap-1 text-xs font-semibold transition">
                  <MessageCircle size={16} /> Remind via WhatsApp
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 3: Pending Dues */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertCircle className="text-red-500" size={20} /> Pending Dues Collection
        </h3>
        {!data.pendingDues || data.pendingDues.length === 0 ? (
          <p className="text-sm text-gray-500">No pending dues found.</p>
        ) : (
          <div className="space-y-3">
            {data.pendingDues.map(m => (
              <div key={m._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                <div>
                  <p className="font-semibold text-gray-800">{m.name} <span className="text-xs text-gray-500">({m.mobile})</span></p>
                  <p className="text-xs text-red-600 font-bold">Due Amount: ₹{m.pendingBalance}</p>
                </div>
                <button onClick={() => sendWhatsApp(m.mobile, m.name, 'due')} className="bg-green-50 text-green-600 hover:bg-green-100 p-2 rounded-md border border-green-200 flex items-center gap-1 text-xs font-semibold transition">
                  <MessageCircle size={16} /> Request Payment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowUps;