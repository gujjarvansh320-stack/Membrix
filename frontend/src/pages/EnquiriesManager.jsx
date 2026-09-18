// // src/pages/EnquiriesManager.jsx
// import { useState, useEffect } from 'react';
// import api from '../api/axios';
// import { UserPlus, Trash2, Search, Edit2 } from 'lucide-react';

// const EnquiriesManager = () => {
//   const [enquiries, setEnquiries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');

//   // Add Enquiry Modal State
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '', mobile: '', email: '', goal: 'General Fitness', status: 'Pending', trialDate: '', notes: ''
//   });

//   // Edit Enquiry Modal State
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     name: '', mobile: '', email: '', goal: 'General Fitness', status: 'Pending', trialDate: '', notes: ''
//   });

//   // Convert to Member Modal State
//   const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
//   const [selectedEnquiry, setSelectedEnquiry] = useState(null);
//   const [convertData, setConvertData] = useState({ expiryDate: '', amountPaid: '' });
//   const [plans, setPlans] = useState([]);

//   useEffect(() => {
//     fetchEnquiries();
//   }, [statusFilter, searchTerm]);

//   const fetchEnquiries = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user')) || {};
//       const gymId = user?._id || user?.data?._id || user?.gymId || user?.data?.gymId;
//       const res = await api.get(`/enquiries?gymId=${gymId}&status=${statusFilter}&search=${searchTerm}`);
//       setEnquiries(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching enquiries:", err);
//       setLoading(false);
//     }
//   };

//   // --- ADD HANDLERS ---
//   const handleAddSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const user = JSON.parse(localStorage.getItem('user')) || {};
//       const gymId = user?._id || user?.data?._id || user?.gymId || user?.data?.gymId;
//       await api.post('/enquiries', { ...formData, gymId });
//       setIsAddModalOpen(false);
//       setFormData({ name: '', mobile: '', email: '', goal: 'General Fitness', status: 'Pending', trialDate: '', notes: '' });
//       fetchEnquiries();
//     } catch (err) {
//       alert('Failed to create enquiry');
//     }
//   };

//   // --- EDIT HANDLERS ---
//   const openEditModal = (enq) => {
//     setEditId(enq._id);
//     setEditFormData({
//       name: enq.name,
//       mobile: enq.mobile,
//       email: enq.email || '',
//       goal: enq.goal || 'General Fitness',
//       status: enq.status || 'Pending',
//       trialDate: enq.trialDate ? new Date(enq.trialDate).toISOString().split('T')[0] : '',
//       notes: enq.notes || ''
//     });
//     setIsEditModalOpen(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/enquiries/${editId}`, editFormData);
//       setIsEditModalOpen(false);
//       fetchEnquiries();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update enquiry');
//     }
//   };

//   // --- DELETE HANDLER ---
//   const handleDelete = async (id) => {
//     if (window.confirm('Delete this lead/enquiry?')) {
//       try {
//         await api.delete(`/enquiries/${id}`);
//         fetchEnquiries();
//       } catch (err) {
//         alert('Failed to delete enquiry');
//       }
//     }
//   };

//   // --- CONVERT HANDLERS ---
//   const openConvertModal = async (enquiry) => {
//     setSelectedEnquiry(enquiry);
//     const date = new Date();
//     date.setMonth(date.getMonth() + 1);
//     setConvertData({ expiryDate: date.toISOString().split('T')[0], amountPaid: '' });
//     setIsConvertModalOpen(true);

//     try {
//       const user = JSON.parse(localStorage.getItem('user')) || {};
//       const gymId = user?._id || user?.data?._id || user?.gymId || user?.data?.gymId;
//       const res = await api.get(`/plans?gymId=${gymId}`);
//       setPlans(res.data);
//     } catch (err) {
//       console.error("Error loading plans");
//     }
//   };

//   const handlePlanSelectForConvert = (e) => {
//     const planId = e.target.value;
//     if (!planId) return;
//     const plan = plans.find(p => p._id === planId);
//     if (plan) {
//       const date = new Date();
//       date.setMonth(date.getMonth() + plan.durationInMonths);
//       setConvertData({
//         expiryDate: date.toISOString().split('T')[0],
//         amountPaid: plan.price
//       });
//     }
//   };

//   const handleConvertSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post(`/enquiries/${selectedEnquiry._id}/convert`, convertData);
//       setIsConvertModalOpen(false);
//       fetchEnquiries();
//       alert('Enquiry successfully converted to active member!');
//     } catch (err) {
//       alert('Failed to convert enquiry');
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      
//       {/* Header & Controls */}
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
//         <div className="flex items-center gap-4 w-full sm:w-auto">
//           <h2 className="text-xl font-bold text-gray-800">Enquiries & Trials CRM</h2>
          
//           <div className="flex bg-gray-100 p-1 rounded-lg">
//             {['all', 'Pending', 'Trial', 'Converted', 'Dropped'].map((st) => (
//               <button
//                 key={st}
//                 onClick={() => setStatusFilter(st)}
//                 className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition ${
//                   statusFilter === st ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
//                 }`}
//               >
//                 {st}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="flex items-center gap-3 w-full sm:w-auto">
//           <div className="relative w-full sm:w-60">
//             <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//             <input 
//               type="text" 
//               placeholder="Search leads..." 
//               className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button 
//             onClick={() => setIsAddModalOpen(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shrink-0"
//           >
//             + Add Enquiry
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       {enquiries.length === 0 ? (
//         <p className="text-gray-500 text-center py-10 border-2 border-dashed rounded-lg">No enquiries found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//             <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
//               <tr>
//                 <th className="py-3 px-4 text-left border-b">Name & Mobile</th>
//                 <th className="py-3 px-4 text-left border-b">Goal</th>
//                 <th className="py-3 px-4 text-left border-b">Trial Date</th>
//                 <th className="py-3 px-4 text-left border-b">Status</th>
//                 <th className="py-3 px-4 text-left border-b">Notes</th>
//                 <th className="py-3 px-4 text-center border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 text-sm">
//               {enquiries.map((enq) => (
//                 <tr key={enq._id} className="hover:bg-gray-50">
//                   <td className="py-3 px-4">
//                     <p className="font-semibold text-gray-900">{enq.name}</p>
//                     <p className="text-xs text-gray-500">{enq.mobile}</p>
//                   </td>
//                   <td className="py-3 px-4 text-gray-600">{enq.goal}</td>
//                   <td className="py-3 px-4 text-gray-500 text-xs">
//                     {enq.trialDate ? new Date(enq.trialDate).toLocaleDateString() : 'No Trial Scheduled'}
//                   </td>
//                   <td className="py-3 px-4">
//                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                       enq.status === 'Converted' ? 'bg-green-100 text-green-800' :
//                       enq.status === 'Trial' ? 'bg-blue-100 text-blue-800' :
//                       enq.status === 'Dropped' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
//                     }`}>
//                       {enq.status}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-xs text-gray-500 max-w-xs truncate">{enq.notes || '-'}</td>
//                   <td className="py-3 px-4 text-center space-x-2">
//                     {enq.status !== 'Converted' && (
//                       <button 
//                         onClick={() => openConvertModal(enq)}
//                         className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 px-3 py-1.5 rounded-md text-xs font-semibold transition inline-flex items-center gap-1"
//                         title="Convert to Member"
//                       >
//                         <UserPlus size={14} /> Convert
//                       </button>
//                     )}
                    
//                     <button 
//                       onClick={() => openEditModal(enq)}
//                       className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition inline-block"
//                       title="Edit Lead"
//                     >
//                       <Edit2 size={16} />
//                     </button>

//                     <button 
//                       onClick={() => handleDelete(enq._id)}
//                       className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition inline-block"
//                       title="Delete Lead"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ADD ENQUIRY MODAL */}
//       {isAddModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Enquiry / Trial Lead</h3>
//             <form onSubmit={handleAddSubmit} className="space-y-3">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
//                 <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
//                 <input type="tel" required value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-700 mb-1">Fitness Goal</label>
//                   <select value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm bg-white">
//                     <option value="Weight Loss">Weight Loss</option>
//                     <option value="Muscle Gain">Muscle Gain</option>
//                     <option value="General Fitness">General Fitness</option>
//                     <option value="CrossFit / HIIT">CrossFit / HIIT</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
//                   <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm bg-white">
//                     <option value="Pending">Pending</option>
//                     <option value="Trial">Trial</option>
//                     <option value="Dropped">Dropped</option>
//                   </select>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">Trial Date (Optional)</label>
//                 <input type="date" value={formData.trialDate} onChange={e => setFormData({...formData, trialDate: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">Notes / Remarks</label>
//                 <input type="text" placeholder="e.g. Interested in morning batch" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
//               </div>
//               <div className="flex gap-2 justify-end pt-3">
//                 <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">Cancel</button>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-medium">Save Lead</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* EDIT ENQUIRY MODAL */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Enquiry / Trial Lead</h3>
//             <form onSubmit={handleEditSubmit} className="space-y-3">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
//                 <input type="text" required value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
//                 <input type="tel" required value={editFormData.mobile} onChange={e => setEditFormData({...editFormData, mobile: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-700 mb-1">Fitness Goal</label>
//                   <select value={editFormData.goal} onChange={e => setEditFormData({...editFormData, goal: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm bg-white">
//                     <option value="Weight Loss">Weight Loss</option>
//                     <option value="Muscle Gain">Muscle Gain</option>
//                     <option value="General Fitness">General Fitness</option>
//                     <option value="CrossFit / HIIT">CrossFit / HIIT</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
//                   <select value={editFormData.status} onChange={e => setEditFormData({...editFormData, status: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm bg-white">
//                     <option value="Pending">Pending</option>
//                     <option value="Trial">Trial</option>
//                     <option value="Dropped">Dropped</option>
//                   </select>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">Trial Date (Optional)</label>
//                 <input type="date" value={editFormData.trialDate} onChange={e => setEditFormData({...editFormData, trialDate: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">Notes / Remarks</label>
//                 <input type="text" placeholder="e.g. Interested in morning batch" value={editFormData.notes} onChange={e => setEditFormData({...editFormData, notes: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
//               </div>
//               <div className="flex gap-2 justify-end pt-3">
//                 <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">Cancel</button>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-medium">Update Lead</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* CONVERT TO MEMBER MODAL */}
//       {isConvertModalOpen && selectedEnquiry && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-1">Convert Lead to Member</h3>
//             <p className="text-xs text-gray-500 mb-4">Converting: {selectedEnquiry.name}</p>
//             <form onSubmit={handleConvertSubmit} className="space-y-3">
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">Select Plan</label>
//                 <select onChange={handlePlanSelectForConvert} className="w-full px-3 py-2 border rounded-md text-sm bg-white">
//                   <option value="">-- Choose a plan --</option>
//                   {plans.map(p => (
//                     <option key={p._id} value={p._id}>{p.name} ({p.durationInMonths} Mo) - ₹{p.price}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">Membership Expiry Date</label>
//                 <input type="date" required value={convertData.expiryDate} onChange={e => setConvertData({...convertData, expiryDate: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1">Amount Paid (₹)</label>
//                 <input type="number" required value={convertData.amountPaid} onChange={e => setConvertData({...convertData, amountPaid: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" min="0" />
//               </div>
//               <div className="flex gap-2 justify-end pt-3">
//                 <button type="button" onClick={() => setIsConvertModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">Cancel</button>
//                 <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md text-xs font-medium">Complete Conversion</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default EnquiriesManager;







// src/pages/EnquiriesManager.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { UserPlus, Trash2, Search, Edit2 } from 'lucide-react';

const EnquiriesManager = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Add Enquiry Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', goal: 'General Fitness', status: 'Pending', trialDate: '', notes: ''
  });

  // Edit Enquiry Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '', mobile: '', email: '', goal: 'General Fitness', status: 'Pending', trialDate: '', notes: ''
  });

  // Convert to Member Modal State
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [convertData, setConvertData] = useState({ expiryDate: '', amountPaid: '' });
  const [plans, setPlans] = useState([]);

  // ✅ BULLETPROOF GYM ID EXTRACTOR FOR STAFF AND OWNERS
  const getOwnerGymId = () => {
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};
    return (
      storedUser?.gymId || storedUser?.data?.user?.gymId || storedUser?.user?.gymId || 
      storedUser?._id || storedUser?.data?.user?._id || storedUser?.data?._id || 
      '65abc123def4567890abcd12'
    );
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, searchTerm]);

  const fetchEnquiries = async () => {
    try {
      const gymId = getOwnerGymId(); // ✅ Fix: Uses shared Gym ID
      const res = await api.get(`/enquiries?gymId=${gymId}&status=${statusFilter}&search=${searchTerm}`);
      setEnquiries(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching enquiries:", err);
      setLoading(false);
    }
  };

  // --- ADD HANDLERS ---
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const gymId = getOwnerGymId(); // ✅ Fix: Assign lead to the shared Gym ID
      await api.post('/enquiries', { ...formData, gymId });
      setIsAddModalOpen(false);
      setFormData({ name: '', mobile: '', email: '', goal: 'General Fitness', status: 'Pending', trialDate: '', notes: '' });
      fetchEnquiries();
    } catch (err) {
      alert('Failed to create enquiry');
    }
  };

  // --- EDIT HANDLERS ---
  const openEditModal = (enq) => {
    setEditId(enq._id);
    setEditFormData({
      name: enq.name,
      mobile: enq.mobile,
      email: enq.email || '',
      goal: enq.goal || 'General Fitness',
      status: enq.status || 'Pending',
      trialDate: enq.trialDate ? new Date(enq.trialDate).toISOString().split('T')[0] : '',
      notes: enq.notes || ''
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/enquiries/${editId}`, editFormData);
      setIsEditModalOpen(false);
      fetchEnquiries();
    } catch (err) {
      console.error(err);
      alert('Failed to update enquiry');
    }
  };

  // --- DELETE HANDLER ---
  const handleDelete = async (id) => {
    if (window.confirm('Delete this lead/enquiry?')) {
      try {
        await api.delete(`/enquiries/${id}`);
        fetchEnquiries();
      } catch (err) {
        alert('Failed to delete enquiry');
      }
    }
  };

  // --- CONVERT HANDLERS ---
  const openConvertModal = async (enquiry) => {
    setSelectedEnquiry(enquiry);
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    setConvertData({ expiryDate: date.toISOString().split('T')[0], amountPaid: '' });
    setIsConvertModalOpen(true);

    try {
      const gymId = getOwnerGymId(); // ✅ Fix: Load custom plans using the shared Gym ID
      const res = await api.get(`/plans?gymId=${gymId}`);
      setPlans(res.data);
    } catch (err) {
      console.error("Error loading plans");
    }
  };

  const handlePlanSelectForConvert = (e) => {
    const planId = e.target.value;
    if (!planId) return;
    const plan = plans.find(p => p._id === planId);
    if (plan) {
      const date = new Date();
      date.setMonth(date.getMonth() + plan.durationInMonths);
      setConvertData({
        expiryDate: date.toISOString().split('T')[0],
        amountPaid: plan.price
      });
    }
  };

  const handleConvertSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/enquiries/${selectedEnquiry._id}/convert`, convertData);
      setIsConvertModalOpen(false);
      fetchEnquiries();
      alert('Enquiry successfully converted to active member!');
    } catch (err) {
      alert('Failed to convert enquiry');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <h2 className="text-xl font-bold text-gray-800">Enquiries & Trials CRM</h2>
          
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {['all', 'Pending', 'Trial', 'Converted', 'Dropped'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition ${
                  statusFilter === st ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-60">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shrink-0"
          >
            + Add Enquiry
          </button>
        </div>
      </div>

      {/* Table */}
      {enquiries.length === 0 ? (
        <p className="text-gray-500 text-center py-10 border-2 border-dashed rounded-lg">No enquiries found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="py-3 px-4 text-left border-b">Name & Mobile</th>
                <th className="py-3 px-4 text-left border-b">Goal</th>
                <th className="py-3 px-4 text-left border-b">Trial Date</th>
                <th className="py-3 px-4 text-left border-b">Status</th>
                <th className="py-3 px-4 text-left border-b">Notes</th>
                <th className="py-3 px-4 text-center border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {enquiries.map((enq) => (
                <tr key={enq._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-gray-900">{enq.name}</p>
                    <p className="text-xs text-gray-500">{enq.mobile}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{enq.goal}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">
                    {enq.trialDate ? new Date(enq.trialDate).toLocaleDateString() : 'No Trial Scheduled'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      enq.status === 'Converted' ? 'bg-green-100 text-green-800' :
                      enq.status === 'Trial' ? 'bg-blue-100 text-blue-800' :
                      enq.status === 'Dropped' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-500 max-w-xs truncate">{enq.notes || '-'}</td>
                  <td className="py-3 px-4 text-center space-x-2">
                    {enq.status !== 'Converted' && (
                      <button 
                        onClick={() => openConvertModal(enq)}
                        className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 px-3 py-1.5 rounded-md text-xs font-semibold transition inline-flex items-center gap-1"
                        title="Convert to Member"
                      >
                        <UserPlus size={14} /> Convert
                      </button>
                    )}
                    
                    <button 
                      onClick={() => openEditModal(enq)}
                      className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition inline-block"
                      title="Edit Lead"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button 
                      onClick={() => handleDelete(enq._id)}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition inline-block"
                      title="Delete Lead"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD ENQUIRY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Enquiry / Trial Lead</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
                <input type="tel" required value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Fitness Goal</label>
                  <select value={formData.goal} onChange={e => setFormData({...formData, goal: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="General Fitness">General Fitness</option>
                    <option value="CrossFit / HIIT">CrossFit / HIIT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                    <option value="Pending">Pending</option>
                    <option value="Trial">Trial</option>
                    <option value="Dropped">Dropped</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Trial Date (Optional)</label>
                <input type="date" value={formData.trialDate} onChange={e => setFormData({...formData, trialDate: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Notes / Remarks</label>
                <input type="text" placeholder="e.g. Interested in morning batch" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
              </div>
              <div className="flex gap-2 justify-end pt-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-medium">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW: EDIT ENQUIRY MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Enquiry / Trial Lead</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <input type="text" required value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile Number</label>
                <input type="tel" required value={editFormData.mobile} onChange={e => setEditFormData({...editFormData, mobile: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Fitness Goal</label>
                  <select value={editFormData.goal} onChange={e => setEditFormData({...editFormData, goal: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="General Fitness">General Fitness</option>
                    <option value="CrossFit / HIIT">CrossFit / HIIT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Status</label>
                  <select value={editFormData.status} onChange={e => setEditFormData({...editFormData, status: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                    <option value="Pending">Pending</option>
                    <option value="Trial">Trial</option>
                    <option value="Dropped">Dropped</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Trial Date (Optional)</label>
                <input type="date" value={editFormData.trialDate} onChange={e => setEditFormData({...editFormData, trialDate: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Notes / Remarks</label>
                <input type="text" placeholder="e.g. Interested in morning batch" value={editFormData.notes} onChange={e => setEditFormData({...editFormData, notes: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
              </div>
              <div className="flex gap-2 justify-end pt-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-medium">Update Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONVERT TO MEMBER MODAL */}
      {isConvertModalOpen && selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Convert Lead to Member</h3>
            <p className="text-xs text-gray-500 mb-4">Converting: {selectedEnquiry.name}</p>
            <form onSubmit={handleConvertSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Select Plan</label>
                <select onChange={handlePlanSelectForConvert} className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                  <option value="">-- Choose a plan --</option>
                  {plans.map(p => (
                    <option key={p._id} value={p._id}>{p.name} ({p.durationInMonths} Mo) - ₹{p.price}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Membership Expiry Date</label>
                <input type="date" required value={convertData.expiryDate} onChange={e => setConvertData({...convertData, expiryDate: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Amount Paid (₹)</label>
                <input type="number" required value={convertData.amountPaid} onChange={e => setConvertData({...convertData, amountPaid: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" min="0" />
              </div>
              <div className="flex gap-2 justify-end pt-3">
                <button type="button" onClick={() => setIsConvertModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md text-xs font-medium">Complete Conversion</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default EnquiriesManager;