// // src/pages/MembersList.jsx
// import { useState, useEffect, useRef, useCallback } from 'react';
// import api from '../api/axios';
// import Webcam from 'react-webcam';
// import { Trash2, Eye, MessageCircle, Search, Edit2, UploadCloud, Camera, X, Tag, Download, ClipboardList, Activity } from 'lucide-react';
// import { generateInvoice } from '../utils/generateInvoice';

// // Helper to safely read the latest progress for the small badge
// const getLatestProgressText = (progressStr) => {
//   if (!progressStr) return 'No progress logged yet.';
//   try {
//       const logs = JSON.parse(progressStr);
//       if (Array.isArray(logs) && logs.length > 0) {
//           const last = logs[logs.length - 1];
//           return `${last.weight ? last.weight + 'kg - ' : ''}${last.notes || ''}`;
//       }
//       return progressStr;
//   } catch {
//       return progressStr;
//   }
// };

// // Helper to parse the full timeline for the Profile Modal
// const parseProgressLogs = (progressStr, fallbackDate) => {
//   if (!progressStr) return [];
//   try {
//       const logs = JSON.parse(progressStr);
//       if (Array.isArray(logs)) return logs;
//       return [{ date: fallbackDate || new Date().toISOString(), notes: progressStr }];
//   } catch {
//       return [{ date: fallbackDate || new Date().toISOString(), notes: progressStr }];
//   }
// };

// const MembersList = ({ refreshKey }) => {
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [memberStatus, setMemberStatus] = useState('active');

//   const webcamRef = useRef(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editMemberId, setEditMemberId] = useState(null);
//   const [editLoading, setEditLoading] = useState(false);
  
//   const [isEditCameraOpen, setIsEditCameraOpen] = useState(false);
//   const [editPhotoPreview, setEditPhotoPreview] = useState(null);
//   const [editPhotoFile, setEditPhotoFile] = useState(null);

//   const [editFormData, setEditFormData] = useState({
//     name: '', mobile: '', email: '', gender: '', dob: '', aadharNumber: '', address: '', expiryDate: '',
//     assignedTrainer: '', fitnessGoal: '', goalProgress: '',
//     progressLogs: [], newWeight: '', newBodyFat: '', newNotes: ''
//   });

//   const [renewModalOpen, setRenewModalOpen] = useState(false);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [newExpiryDate, setNewExpiryDate] = useState('');
//   const [renewAmount, setRenewAmount] = useState('');
//   const [renewDueDate, setRenewDueDate] = useState(''); 
//   const [renewPaymentMode, setRenewPaymentMode] = useState('Cash'); 
//   const [renewLoading, setRenewLoading] = useState(false);
//   const [plans, setPlans] = useState([]);
  
//   const [renewPlanName, setRenewPlanName] = useState('Custom Plan');
//   const [couponCode, setCouponCode] = useState('');
//   const [couponMessage, setCouponMessage] = useState({ text: '', type: '' });
//   const [basePrice, setBasePrice] = useState(0);
//   const [discountAmount, setDiscountAmount] = useState(0);

//   const [profileModalOpen, setProfileModalOpen] = useState(false);
//   const [profileMember, setProfileMember] = useState(null);
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [paymentsLoading, setPaymentsLoading] = useState(false);

//   const [trainers, setTrainers] = useState([]);

//   // GYM ID EXTRACTOR
//   const getOwnerGymId = () => {
//     const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
//     return (
//       storedUser?.gymId || storedUser?.data?.user?.gymId || storedUser?.user?.gymId || 
//       storedUser?._id || storedUser?.data?.user?._id || storedUser?.data?._id ||
//       '65abc123def4567890abcd12'
//     );
//   };

//   // ROLE EXTRACTOR
//   const getUserRole = () => {
//     const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
//     return (storedUser?.role || storedUser?.data?.user?.role || storedUser?.user?.role || 'owner').toLowerCase();
//   };
//   const userRole = getUserRole();

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       fetchMembers();
//     }, 300);
//     return () => clearTimeout(delayDebounceFn);
//   }, [refreshKey, searchTerm, memberStatus]);

//   useEffect(() => {
//     const fetchTrainers = async () => {
//       if (userRole === 'trainer') return; 
//       try {
//         const gymId = getOwnerGymId(); 
//         const res = await api.get(`/auth/staff?gymId=${gymId}`);
//         if (Array.isArray(res.data)) {
//           setTrainers(res.data.filter(staff => staff.role?.toLowerCase() === 'trainer'));
//         }
//       } catch (err) {
//         console.error('Failed to load trainers', err);
//       }
//     };
//     fetchTrainers();
//   }, [userRole]);

//   const fetchMembers = async () => {
//     try {
//       const gymId = getOwnerGymId(); 
//       const response = await api.get(
//         `/members/active?gymId=${gymId}&search=${searchTerm}&status=${memberStatus}`
//       );

//       let fetchedData = response.data;

//       if (userRole === 'trainer') {
//         const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
//         const myTrainerId = storedUser?.id || storedUser?._id || storedUser?.data?.user?._id || storedUser?.data?._id || storedUser?.user?._id;

//         fetchedData = fetchedData.filter(member => {
//           if (!member.assignedTrainer) return false;
//           const assignedId = typeof member.assignedTrainer === 'object' ? member.assignedTrainer._id : member.assignedTrainer;
//           return String(assignedId) === String(myTrainerId);
//         });
//       }

//       setMembers(fetchedData);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to load members.');
//       setLoading(false);
//     }
//   };

//   const dataURLtoFile = (dataurl, filename) => {
//     let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
//     while(n--){ u8arr[n] = bstr.charCodeAt(n); }
//     return new File([u8arr], filename, {type:mime});
//   };

//   const captureEditPhoto = useCallback(() => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setEditPhotoPreview(imageSrc);
//       const file = dataURLtoFile(imageSrc, 'webcam-capture.jpg');
//       setEditPhotoFile(file);
//       setIsEditCameraOpen(false);
//     }
//   }, []);

//   const handleEditFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEditPhotoFile(file);
//       setEditPhotoPreview(URL.createObjectURL(file));
//     }
//   };

//   const openEditModal = async (member) => {
//     let parsedLogs = [];
//     let rawProgress = member.goalProgress || '';
    
//     if (rawProgress) {
//       try {
//         parsedLogs = JSON.parse(rawProgress);
//         if (!Array.isArray(parsedLogs)) {
//           parsedLogs = [{ date: member.updatedAt || new Date().toISOString(), notes: rawProgress }];
//         }
//       } catch {
//         parsedLogs = [{ date: member.updatedAt || new Date().toISOString(), notes: rawProgress }];
//       }
//     }

//     setEditMemberId(member._id);
//     setEditFormData({
//       name: member.name || '', mobile: member.mobile || '', email: member.email || '', gender: member.gender || '',
//       dob: member.dob ? new Date(member.dob).toISOString().split('T')[0] : '', aadharNumber: member.aadharNumber || '',
//       address: member.address || '', expiryDate: member.expiryDate ? new Date(member.expiryDate).toISOString().split('T')[0] : '',
//       assignedTrainer: member.assignedTrainer?._id || member.assignedTrainer || '',
//       fitnessGoal: member.fitnessGoal || '',
//       goalProgress: rawProgress,
//       progressLogs: parsedLogs,
//       newWeight: '', newBodyFat: '', newNotes: ''
//     });
//     setEditPhotoPreview(member.photoUrl || null);
//     setEditPhotoFile(null);
//     setIsEditCameraOpen(false);
//     setIsEditModalOpen(true);
//   };

//   // ✅ 1-CLICK SAVE MAGIC: This now handles submitting EVERYTHING to the backend at once
//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     setEditLoading(true);

//     const submitData = new FormData();
//     submitData.append('name', editFormData.name);
//     submitData.append('mobile', editFormData.mobile);
//     submitData.append('email', editFormData.email);
//     submitData.append('gender', editFormData.gender);
//     submitData.append('dob', editFormData.dob);
//     submitData.append('aadharNumber', editFormData.aadharNumber);
//     submitData.append('address', editFormData.address);
//     submitData.append('expiryDate', editFormData.expiryDate);
//     submitData.append('assignedTrainer', editFormData.assignedTrainer);
//     submitData.append('fitnessGoal', editFormData.fitnessGoal);
    
//     // Automatically package new inputs into the timeline array if the user typed anything
//     if (userRole === 'trainer') {
//       let finalLogs = [...editFormData.progressLogs];
      
//       if (editFormData.newNotes || editFormData.newWeight || editFormData.newBodyFat) {
//         finalLogs.push({
//           date: new Date().toISOString(),
//           weight: editFormData.newWeight,
//           bodyFat: editFormData.newBodyFat,
//           notes: editFormData.newNotes
//         });
//       }
//       submitData.append('goalProgress', JSON.stringify(finalLogs));
//     } else {
//       submitData.append('goalProgress', editFormData.goalProgress);
//     }
    
//     if (editPhotoFile) submitData.append('photo', editPhotoFile);

//     try {
//       await api.put(`/members/${editMemberId}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       setIsEditModalOpen(false); 
//       fetchMembers();
//     } catch (err) {
//       alert('Failed to update member details.');
//     } finally { 
//       setEditLoading(false); 
//     }
//   };

//   const openRenewModal = async (member) => {
//     setSelectedMember(member); setRenewAmount(''); setRenewPlanName('Custom Plan'); setBasePrice(0); setDiscountAmount(0); setCouponCode(''); setCouponMessage({ text: '', type: '' }); setRenewDueDate(''); setRenewPaymentMode('Cash');
//     const baseDate = new Date(); baseDate.setMonth(baseDate.getMonth() + 1);
//     setNewExpiryDate(baseDate.toISOString().split('T')[0]); setRenewModalOpen(true);
//     try {
//       const gymId = getOwnerGymId(); 
//       const res = await api.get(`/plans?gymId=${gymId}`);
//       setPlans(res.data);
//     } catch (err) { console.error('Error fetching plans for renewal:', err); }
//   };

//   const handleRenewPlanChange = (e) => {
//     const planId = e.target.value;
//     if (!planId) { setBasePrice(0); setRenewAmount(''); setDiscountAmount(0); setRenewDueDate(''); setRenewPaymentMode('Cash'); return; }
//     const plan = plans.find((p) => p._id === planId);
//     if (plan) {
//       const baseDate = new Date(); baseDate.setMonth(baseDate.getMonth() + plan.durationInMonths);
//       setNewExpiryDate(baseDate.toISOString().split('T')[0]); setRenewAmount(plan.price); setBasePrice(plan.price); setRenewPlanName(plan.name); setDiscountAmount(0); setCouponCode(''); setCouponMessage({ text: '', type: '' }); setRenewDueDate(''); setRenewPaymentMode('Cash');
//     }
//   };

//   const applyCoupon = async () => {
//     if (!couponCode || !basePrice) return setCouponMessage({ text: 'Please select a plan and enter a code.', type: 'error' });
//     try {
//       const gymId = getOwnerGymId(); 
//       const res = await api.post('/coupons/validate', { gymId, code: couponCode });
//       const coupon = res.data.data;
//       let newPrice = basePrice;
//       if (coupon.discountType === 'percentage') newPrice = basePrice - (basePrice * (coupon.discountValue / 100));
//       else newPrice = basePrice - coupon.discountValue;

//       const finalPrice = Math.max(0, newPrice);
//       const discountSaved = basePrice - finalPrice; 
//       setDiscountAmount(discountSaved);
//       setRenewAmount(finalPrice);
//       setCouponMessage({ text: `Coupon applied successfully! Discount: ₹${discountSaved.toFixed(0)}`, type: 'success' });
//     } catch (err) {
//       setCouponMessage({ text: err.response?.data?.message || 'Invalid coupon code', type: 'error' }); setRenewAmount(basePrice); 
//     }
//   };

//   const pendingBalance = Math.max(0, basePrice - discountAmount - Number(renewAmount || 0));

//   const handleRenewSubmit = async (e) => {
//     e.preventDefault();
//     setRenewLoading(true);

//     try {
//       await api.put(`/members/${selectedMember._id}/renew`, { 
//         newExpiryDate, amountPaid: renewAmount, couponCode, planName: renewPlanName,
//         discountAmount, pendingBalance, 
//         pendingDueDate: pendingBalance > 0 ? renewDueDate : '',
//         paymentMode: renewPaymentMode
//       });
//       setRenewModalOpen(false); fetchMembers();
//     } catch (err) { alert('Failed to renew member'); } finally { setRenewLoading(false); }
//   };

//   const handleDelete = async (id, name) => {
//     if (window.confirm(`Are you sure you want to permanently delete ${name}? This action cannot be undone.`)) {
//       try { await api.delete(`/members/${id}`); fetchMembers(); } catch (err) { alert('Failed to delete member'); }
//     }
//   };

//   const openProfileModal = async (member) => {
//     setProfileMember(member); setProfileModalOpen(true); setPaymentsLoading(true);
//     try {
//       const response = await api.get(`/members/${member._id}/payments`); setPaymentHistory(response.data);
//     } catch (err) { setPaymentHistory([]); } finally { setPaymentsLoading(false); }
//   };

//   const sendWhatsApp = (member) => {
//     const isExpired = new Date(member.expiryDate) < new Date();
//     const dateStr = new Date(member.expiryDate).toLocaleDateString();
//     let message = isExpired ? `Hi ${member.name}, your gym membership expired on ${dateStr}. Please renew your plan!` : `Hi ${member.name}, your gym membership is expiring soon on ${dateStr}. Please renew your plan!`;
//     let phone = member.mobile.replace(/\D/g, ''); if (phone.length === 10) phone = '91' + phone;
//     window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
//   };

//   if (loading) return <div className="p-6 text-gray-500">Loading members...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-sm relative">
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
//         <div className="flex items-center gap-4 w-full sm:w-auto">
//           <h2 className="text-xl font-bold text-gray-800">
//             {userRole === 'trainer' ? 'My Assigned Clients' : 'Members Directory'}
//           </h2>
          
//           {userRole !== 'trainer' && (
//             <div className="flex bg-gray-100 p-1 rounded-lg">
//               <button onClick={() => setMemberStatus('all')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${memberStatus === 'all' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>All</button>
//               <button onClick={() => setMemberStatus('active')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${memberStatus === 'active' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Active</button>
//               <button onClick={() => setMemberStatus('expiring_soon')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${memberStatus === 'expiring_soon' ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Expiring Soon</button>
//               <button onClick={() => setMemberStatus('expired')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${memberStatus === 'expired' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Expired</button>
//             </div>
//           )}
//         </div>
        
//         <div className="relative w-full sm:w-72">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input 
//             type="text" 
//             placeholder="Search by name or mobile..." 
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
//             value={searchTerm} 
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               if (e.target.value.length > 0 && memberStatus !== 'all' && userRole !== 'trainer') {
//                 setMemberStatus('all');
//               }
//             }} 
//           />
//         </div>
//       </div>
      
//       {members.length === 0 ? (
//         <p className="text-gray-500 py-8 text-center border-2 border-dashed rounded-lg">No members found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Photo</th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Name</th>
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Mobile</th>
                
//                 {userRole === 'trainer' ? (
//                   <>
//                     <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Fitness Goal</th>
//                     <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Latest Assessment</th>
//                   </>
//                 ) : (
//                   <>
//                     <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Plan</th>
//                     <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Type</th>
//                     <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Expiry Date</th>
//                   </>
//                 )}
                
//                 <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
//                   {userRole === 'trainer' ? 'Actions' : 'Status & Actions'}
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {members.map((member) => {
//                 const isExpired = new Date(member.expiryDate) < new Date();
//                 const isExpiringSoon = !isExpired && new Date(member.expiryDate) < new Date(new Date().setDate(new Date().getDate() + 7));

//                 return (
//                   <tr key={member._id} className="hover:bg-gray-50 transition">
//                     <td className="py-3 px-4 whitespace-nowrap">{member.photoUrl ? <img src={member.photoUrl} alt={member.name} className="h-10 w-10 rounded-full object-cover border border-gray-300" /> : <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">No Pic</div>}</td>
//                     <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">{member.name}</td>
//                     <td className="py-3 px-4 whitespace-nowrap text-gray-500">{member.mobile}</td>
                    
//                     {userRole === 'trainer' ? (
//                       <>
//                         <td className="py-3 px-4 whitespace-nowrap text-gray-700 font-medium">{member.fitnessGoal || 'Not Set'}</td>
//                         <td className="py-3 px-4 max-w-[250px] truncate text-gray-600 text-xs">
//                           {(() => {
//                             if (!member.goalProgress) return <span className="text-gray-400 italic">No notes logged</span>;
//                             try {
//                               const logs = JSON.parse(member.goalProgress);
//                               if (Array.isArray(logs) && logs.length > 0) {
//                                 const last = logs[logs.length - 1];
//                                 return (
//                                   <div className="flex items-center gap-2">
//                                     {last.weight && <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">{last.weight}kg</span>}
//                                     <span className="truncate">{last.notes}</span>
//                                   </div>
//                                 );
//                               }
//                               return member.goalProgress;
//                             } catch {
//                               return member.goalProgress;
//                             }
//                           })()}
//                         </td>
//                       </>
//                     ) : (
//                       <>
//                         <td className="py-3 px-4 whitespace-nowrap"><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">{member.planName || 'Custom'}</span></td>
//                         <td className="py-3 px-4 whitespace-nowrap"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${member.lastPaymentType === 'Renewal' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>{member.lastPaymentType || 'Registration'}</span></td>
//                         <td className="py-3 px-4 whitespace-nowrap text-gray-500">{new Date(member.expiryDate).toLocaleDateString()}</td>
//                       </>
//                     )}

//                     <td className="py-3 px-4 whitespace-nowrap flex items-center gap-2">
//                       {userRole !== 'trainer' && (
//                         <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${isExpired ? 'bg-red-100 text-red-800' : isExpiringSoon ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
//                           {isExpired ? 'Expired' : isExpiringSoon ? 'Expiring Soon' : 'Active'}
//                         </span>
//                       )}
                      
//                       {userRole !== 'trainer' && (
//                         <button onClick={() => openProfileModal(member)} className="text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 p-1.5 rounded-md border border-gray-200" title="View Profile"><Eye size={16} /></button>
//                       )}
                      
//                       <button onClick={() => openEditModal(member)} className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 p-1.5 rounded-md border border-blue-200" title={userRole === 'trainer' ? 'Update Progress' : 'Edit Member'}><Edit2 size={16} /></button>
//                       <button onClick={() => sendWhatsApp(member)} className="text-xs bg-green-50 text-green-600 hover:bg-green-100 p-1.5 rounded-md border border-green-200" title="Send Reminder"><MessageCircle size={16} /></button>
                      
//                       {userRole !== 'trainer' && (
//                         <>
//                           <button onClick={() => openRenewModal(member)} className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-md border border-blue-200 font-medium">Renew</button>
//                           <button onClick={() => handleDelete(member._id, member.name)} className="text-xs bg-red-50 text-red-600 hover:bg-red-100 p-1.5 rounded-md border border-red-200" title="Delete"><Trash2 size={16} /></button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* EDIT MODAL / PROGRESS REPORT MODAL */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] flex flex-col">
            
//             <div className="flex justify-between items-center mb-4 shrink-0">
//               <h3 className="text-xl font-bold text-gray-800">
//                 {userRole === 'trainer' ? 'Client Progress Timeline' : 'Edit Profile & Goals'}
//               </h3>
//               <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-red-500 transition"><X size={20} /></button>
//             </div>
            
//             <form onSubmit={handleEditSubmit} className="space-y-4 overflow-y-auto pr-2 pb-2 custom-scrollbar">
              
//               {userRole === 'trainer' ? (
//                 <div className="space-y-5">
//                   <div className="flex items-center gap-4 bg-gradient-to-r from-slate-800 to-slate-900 p-4 rounded-xl shadow-sm">
//                     {editPhotoPreview ? (
//                       <img src={editPhotoPreview} alt="Client" className="h-16 w-16 rounded-full object-cover border-2 border-slate-600 shadow-sm" />
//                     ) : (
//                       <div className="h-16 w-16 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-2xl border-2 border-slate-600 shadow-sm">
//                         {editFormData.name.charAt(0)}
//                       </div>
//                     )}
//                     <div>
//                       <h4 className="text-xl font-bold text-white">{editFormData.name}</h4>
//                       <p className="text-sm text-slate-300 font-medium mt-0.5">{editFormData.mobile}</p>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Target Fitness Goal</label>
//                     <input 
//                       type="text" 
//                       placeholder="e.g. Muscle Hypertrophy & Fat Loss" 
//                       value={editFormData.fitnessGoal} 
//                       onChange={e => setEditFormData({...editFormData, fitnessGoal: e.target.value})} 
//                       className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-sm transition" 
//                     />
//                   </div>

//                   <div className="bg-blue-50/40 p-5 rounded-xl border border-blue-100 shadow-inner">
//                     <div className="flex items-center gap-2 mb-4 border-b border-blue-200 pb-2">
//                       <Activity className="text-blue-600" size={20} />
//                       <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wider">Assessment History</h4>
//                     </div>
                    
//                     <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-3 custom-scrollbar">
//                       {editFormData.progressLogs.length === 0 && <p className="text-sm text-gray-500 italic">No logs recorded yet.</p>}
//                       {editFormData.progressLogs.map((log, idx) => (
//                         <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-sm relative">
//                           <div className="flex justify-between items-center text-gray-500 font-bold mb-2">
//                             <span className="text-blue-600 text-sm">{new Date(log.date).toLocaleDateString()}</span>
//                             <div className="flex gap-2">
//                               {log.weight && <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 border border-slate-200">Wt: {log.weight}kg</span>}
//                               {log.bodyFat && <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 border border-slate-200">BF: {log.bodyFat}%</span>}
//                             </div>
//                           </div>
//                           {log.notes && <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{log.notes}</p>}
//                         </div>
//                       ))}
//                     </div>

//                     <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm space-y-4">
//                       <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Log New Assessment</h5>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <input type="number" placeholder="Weight (kg)" value={editFormData.newWeight} onChange={e => setEditFormData({...editFormData, newWeight: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500" />
//                         </div>
//                         <div>
//                           <input type="number" placeholder="Body Fat (%)" value={editFormData.newBodyFat} onChange={e => setEditFormData({...editFormData, newBodyFat: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500" />
//                         </div>
//                       </div>
//                       <div>
//                         <textarea placeholder="Assessment notes, milestones, PRs... (Press 'Update Client Database' below to save)" value={editFormData.newNotes} onChange={e => setEditFormData({...editFormData, newNotes: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 resize-none" rows="3" />
//                       </div>
//                       {/* ✅ REMOVED THE EXTRA "ADD TO TIMELINE" BUTTON */}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div className="mb-2 space-y-2">
//                     <label className="block text-sm font-semibold text-gray-700">Update Photo (Optional)</label>
//                     {isEditCameraOpen ? (
//                       <div className="flex flex-col items-center bg-gray-900 rounded-lg overflow-hidden">
//                         <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full object-cover max-h-48" />
//                         <div className="p-3 flex gap-4 w-full justify-center bg-gray-800">
//                           <button type="button" onClick={captureEditPhoto} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold text-sm transition">Snap Photo</button>
//                           <button type="button" onClick={() => setIsCameraOpen(false)} className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-full font-semibold text-sm transition">Cancel</button>
//                         </div>
//                       </div>
//                     ) : editPhotoPreview ? (
//                       <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden flex justify-center bg-gray-50">
//                         <img src={editPhotoPreview} alt="Preview" className="h-32 object-cover" />
//                         <button type="button" onClick={() => { setEditPhotoPreview(null); setEditPhotoFile(null); }} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600" title="Remove Photo"><X size={14} /></button>
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-2 gap-4">
//                         <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
//                           <UploadCloud size={24} className="text-blue-500 mb-2" />
//                           <p className="text-sm text-gray-600 font-medium text-center">Upload File</p>
//                           <input type="file" accept="image/*" onChange={handleEditFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
//                         </div>
//                         <button type="button" onClick={() => setIsEditCameraOpen(true)} className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-blue-50 transition cursor-pointer text-blue-600">
//                           <Camera size={24} className="mb-2" />
//                           <p className="text-sm font-medium text-center">Open Camera</p>
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-1">Assigned Trainer</label>
//                     <select value={editFormData.assignedTrainer} onChange={e => setEditFormData({...editFormData, assignedTrainer: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
//                       <option value="">-- No Trainer Assigned --</option>
//                       {trainers.map((trainer) => (
//                         <option key={trainer._id} value={trainer._id}>{trainer.name}</option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-1">Fitness Goal</label>
//                       <input type="text" placeholder="e.g. Weight Loss" value={editFormData.fitnessGoal} onChange={e => setEditFormData({...editFormData, fitnessGoal: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-1">Latest Progress</label>
//                       <input type="text" readOnly value={getLatestProgressText(editFormData.goalProgress)} className="w-full px-4 py-2 border rounded-md text-sm bg-gray-100 text-gray-500 cursor-not-allowed" title="Trainers track progress logs via their dashboard" />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div><label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label><input type="text" required value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
//                     <div><label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label><input type="tel" required value={editFormData.mobile} onChange={e => setEditFormData({...editFormData, mobile: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div><label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label><input type="email" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
//                       <select value={editFormData.gender} onChange={e => setEditFormData({...editFormData, gender: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
//                         <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div><label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label><input type="date" value={editFormData.dob} onChange={e => setEditFormData({...editFormData, dob: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
//                     <div><label className="block text-sm font-semibold text-gray-700 mb-1">ID Number</label><input type="text" placeholder="ID Number" value={editFormData.aadharNumber} onChange={e => setEditFormData({...editFormData, aadharNumber: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
//                   </div>

//                   <div><label className="block text-sm font-semibold text-gray-700 mb-1">Residential Address</label><input type="text" value={editFormData.address} onChange={e => setEditFormData({...editFormData, address: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
//                 </>
//               )}

//               {/* ✅ ONE SINGLE BUTTON FOR EVERYTHING */}
//               <div className="flex gap-2 justify-end pt-5 border-t mt-5 shrink-0">
//                 <button type="submit" disabled={editLoading} className="w-full bg-blue-600 text-white rounded-md text-base font-bold py-3 hover:bg-blue-700 transition disabled:opacity-50">
//                   {editLoading ? 'Saving...' : (userRole === 'trainer' ? 'Update Client Database' : 'Save All Changes')}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* RENEW MODAL */}
//       {renewModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-1">Renew Membership</h3>
//             <p className="text-sm text-gray-500 mb-4">{selectedMember?.name}</p>
//             <form onSubmit={handleRenewSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Select Plan</label>
//                 <select onChange={handleRenewPlanChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm">
//                   <option value="">-- Choose a plan --</option>
//                   {plans.map((plan) => (<option key={plan._id} value={plan._id}>{plan.name} ({plan.durationInMonths} Mo) - ₹{plan.price}</option>))}
//                 </select>
//               </div>

//               {basePrice > 0 && (
//                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
//                     <Tag size={14} className="text-blue-500" /> Have a Promo Code?
//                   </label>
//                   <div className="flex gap-2">
//                     <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="Enter Code" className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 uppercase text-sm" />
//                     <button type="button" onClick={applyCoupon} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition">Apply</button>
//                   </div>
//                   {couponMessage.text && <p className={`mt-2 text-sm font-semibold ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{couponMessage.text}</p>}
//                 </div>
//               )}

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">New Expiry Date</label>
//                   <input type="date" value={newExpiryDate} onChange={(e) => setNewExpiryDate(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" required />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Mode</label>
//                   <select value={renewPaymentMode} onChange={(e) => setRenewPaymentMode(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm" required>
//                     <option value="Cash">Cash</option>
//                     <option value="UPI">UPI</option>
//                     <option value="Card">Card</option>
//                     <option value="Net Banking">Net</option>
//                   </select>
//                 </div>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Amount Paid
//                   {discountAmount > 0 && <span className="text-gray-400 line-through ml-2 font-normal text-xs">₹{basePrice}</span>}
//                 </label>
//                 <input type="number" value={renewAmount} onChange={(e) => setRenewAmount(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" required min="0" />
//               </div>
              
//               {pendingBalance > 0 && <p className="text-sm text-red-600 font-bold mt-1 text-right">Due Balance: ₹{pendingBalance.toFixed(0)}</p>}

//               {pendingBalance > 0 && (
//                 <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-2">
//                   <label className="block text-sm font-bold text-red-700 mb-2">Clear Dues By (Due Date)</label>
//                   <input type="date" value={renewDueDate} onChange={(e) => setRenewDueDate(e.target.value)} className="w-full px-3 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-500 text-sm bg-white" required />
//                 </div>
//               )}

//               <div className="flex gap-3 justify-end pt-4">
//                 <button type="button" onClick={() => setRenewModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition">Cancel</button>
//                 <button type="submit" disabled={renewLoading} className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition disabled:opacity-50">{renewLoading ? 'Saving...' : 'Confirm Renewal'}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* FULL PROFILE MODAL (Owner view) */}
//       {profileModalOpen && profileMember && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] flex flex-col">
//             <div className="flex justify-between items-start mb-4 border-b pb-4 shrink-0">
//               <div className="flex items-center gap-4">
//                 {profileMember.photoUrl ? (
//                   <img src={profileMember.photoUrl} alt={profileMember.name} className="h-16 w-16 rounded-full object-cover border-2 border-blue-100" />
//                 ) : (
//                   <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-2xl">{profileMember.name.charAt(0)}</div>
//                 )}
//                 <div>
//                   <h3 className="text-2xl font-bold text-gray-800">{profileMember.name}</h3>
//                   <p className="text-base text-gray-500">{profileMember.mobile}</p>
//                 </div>
//               </div>
//               <button onClick={() => setProfileModalOpen(false)} className="text-gray-400 hover:text-red-500 transition">✕</button>
//             </div>
            
//             <div className="overflow-y-auto flex-1 pr-2 space-y-5 custom-scrollbar">
//               <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-wrap gap-5 text-sm">
//                 <div className="flex-1 min-w-[120px]"><span className="text-blue-800 font-bold block text-xs uppercase tracking-wider">Assigned Trainer</span><span className="font-semibold text-blue-900 text-base">{profileMember.assignedTrainer?.name || 'Unassigned'}</span></div>
//                 <div className="flex-1 min-w-[120px]"><span className="text-blue-800 font-bold block text-xs uppercase tracking-wider">Fitness Goal</span><span className="font-semibold text-blue-900 text-base">{profileMember.fitnessGoal || 'N/A'}</span></div>
//                 <div className="flex-1 min-w-[120px]"><span className="text-blue-800 font-bold block text-xs uppercase tracking-wider">Latest Progress</span><span className="font-semibold text-blue-900 text-base">{getLatestProgressText(profileMember.goalProgress)}</span></div>
//               </div>

//               <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 grid grid-cols-2 gap-4 text-sm">
//                 <div className="col-span-2 bg-white border border-gray-200 p-3 rounded-md mb-2"><span className="text-gray-500 font-bold block text-xs uppercase tracking-wider">Active Plan</span><span className="font-bold text-gray-800 text-base">{profileMember.planName || 'Custom'}</span></div>
//                 <div><span className="text-gray-400 block text-xs">Email Address</span><span className="font-medium text-gray-800 text-base">{profileMember.email || 'N/A'}</span></div>
//                 <div><span className="text-gray-400 block text-xs">Gender</span><span className="font-medium text-gray-800 text-base">{profileMember.gender || 'N/A'}</span></div>
//                 <div><span className="text-gray-400 block text-xs">Date of Birth</span><span className="font-medium text-gray-800 text-base">{profileMember.dob ? new Date(profileMember.dob).toLocaleDateString() : 'N/A'}</span></div>
//                 <div><span className="text-gray-400 block text-xs">ID Number</span><span className="font-medium text-gray-800 text-base">{profileMember.aadharNumber || 'N/A'}</span></div>
//                 <div className="col-span-2"><span className="text-gray-400 block text-xs">Residential Address</span><span className="font-medium text-gray-800 text-base">{profileMember.address || 'N/A'}</span></div>
//                 <div className="col-span-2 border-t pt-3 mt-2"><span className="text-gray-400 block text-xs">Membership Expiry</span><span className="font-bold text-red-600 text-base">{new Date(profileMember.expiryDate).toLocaleDateString()}</span></div>
//               </div>

//               {/* FULL PROGRESS HISTORY TIMELINE DISPLAYED FOR THE GYM OWNER */}
//               <div>
//                 <h4 className="font-bold text-gray-800 mb-3 text-base flex items-center gap-2">
//                   <Activity size={20} className="text-blue-600"/> Progress History
//                 </h4>
//                 {(() => {
//                   const logs = parseProgressLogs(profileMember.goalProgress, profileMember.updatedAt);
//                   if (logs.length === 0 || (logs.length === 1 && !logs[0].notes && !logs[0].weight && !logs[0].bodyFat)) {
//                     return <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">No progress history logged.</p>;
//                   }
//                   return (
//                     <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
//                       {logs.map((log, idx) => (
//                         <div key={idx} className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm text-sm">
//                           <div className="flex justify-between items-center text-gray-500 font-bold mb-2 border-b border-gray-50 pb-2">
//                             <span className="text-blue-600 text-sm">{new Date(log.date).toLocaleDateString()}</span>
//                             <div className="flex gap-3">
//                               {log.weight && <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 border border-slate-200">Wt: {log.weight}kg</span>}
//                               {log.bodyFat && <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 border border-slate-200">BF: {log.bodyFat}%</span>}
//                             </div>
//                           </div>
//                           {log.notes ? (
//                             <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{log.notes}</p>
//                           ) : (
//                             <p className="text-gray-400 italic">No notes logged for this assessment.</p>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   );
//                 })()}
//               </div>
              
//               <div className="border-t pt-5">
//                 <h4 className="font-bold text-gray-800 mb-3 text-base">Payment History</h4>
//                 {paymentsLoading ? (
//                   <p className="text-sm text-gray-500 text-center py-2">Loading history...</p>
//                 ) : paymentHistory.length === 0 ? (
//                   <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">No payment history found.</p>
//                 ) : (
//                   <ul className="space-y-3">
//                     {paymentHistory.map((payment) => (
//                       <li key={payment._id} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-lg shadow-sm text-sm">
//                         <div>
//                           <p className="font-bold text-gray-800 text-base">₹{payment.amount}</p>
//                           <p className="text-sm text-gray-500">{payment.paymentType}</p>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{new Date(payment.paymentDate).toLocaleDateString()}</span>
//                           <button onClick={() => { const user = JSON.parse(localStorage.getItem('user')) || {}; generateInvoice(profileMember, payment, user?.gymName || 'Gym Invoice'); }} className="text-green-600 hover:bg-green-50 p-2 rounded-md transition" title="Download Invoice"><Download size={18} /></button>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>
//             <div className="mt-5 pt-4 border-t shrink-0">
//               <button onClick={() => setProfileModalOpen(false)} className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold py-3 px-4 rounded-md transition text-base">Close Profile</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MembersList;













// src/pages/MembersList.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../api/axios';
import Webcam from 'react-webcam';
import { QRCodeSVG } from 'qrcode.react';
import { Trash2, Eye, MessageCircle, Search, Edit2, UploadCloud, Camera, X, Tag, Download, ClipboardList, Activity, Smartphone, RefreshCw } from 'lucide-react';
import { generateInvoice } from '../utils/generateInvoice';

// Helper to safely read the latest progress for the small badge
const getLatestProgressText = (progressStr) => {
  if (!progressStr) return 'No progress logged yet.';
  try {
      const logs = JSON.parse(progressStr);
      if (Array.isArray(logs) && logs.length > 0) {
          const last = logs[logs.length - 1];
          return `${last.weight ? last.weight + 'kg - ' : ''}${last.notes || ''}`;
      }
      return progressStr;
  } catch {
      return progressStr;
  }
};

// Helper to parse the full timeline for the Profile Modal
const parseProgressLogs = (progressStr, fallbackDate) => {
  if (!progressStr) return [];
  try {
      const logs = JSON.parse(progressStr);
      if (Array.isArray(logs)) return logs;
      return [{ date: fallbackDate || new Date().toISOString(), notes: progressStr }];
  } catch {
      return [{ date: fallbackDate || new Date().toISOString(), notes: progressStr }];
  }
};

const MembersList = ({ refreshKey }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [memberStatus, setMemberStatus] = useState('active');

  const webcamRef = useRef(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editMemberId, setEditMemberId] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  
  const [isEditCameraOpen, setIsEditCameraOpen] = useState(false);
  const [editPhotoPreview, setEditPhotoPreview] = useState(null);
  const [editPhotoFile, setEditPhotoFile] = useState(null);

  // ✅ NEW: Phone Sync States
  const [isEditQrOpen, setIsEditQrOpen] = useState(false);
  const [syncSessionId, setSyncSessionId] = useState('');
  const [isPolling, setIsPolling] = useState(false);

  const [editFormData, setEditFormData] = useState({
    name: '', mobile: '', email: '', gender: '', dob: '', aadharNumber: '', address: '', expiryDate: '',
    assignedTrainer: '', fitnessGoal: '', goalProgress: '', photoUrl: '',
    progressLogs: [], newWeight: '', newBodyFat: '', newNotes: ''
  });

  const [renewModalOpen, setRenewModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [newExpiryDate, setNewExpiryDate] = useState('');
  const [renewAmount, setRenewAmount] = useState('');
  const [renewDueDate, setRenewDueDate] = useState(''); 
  const [renewPaymentMode, setRenewPaymentMode] = useState('Cash'); 
  const [renewLoading, setRenewLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  
  const [renewPlanName, setRenewPlanName] = useState('Custom Plan');
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState({ text: '', type: '' });
  const [basePrice, setBasePrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileMember, setProfileMember] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);

  const [trainers, setTrainers] = useState([]);

  // GYM ID EXTRACTOR
  const getOwnerGymId = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    return (
      storedUser?.gymId || storedUser?.data?.user?.gymId || storedUser?.user?.gymId || 
      storedUser?._id || storedUser?.data?.user?._id || storedUser?.data?._id ||
      '65abc123def4567890abcd12'
    );
  };

  // ROLE EXTRACTOR
  const getUserRole = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    return (storedUser?.role || storedUser?.data?.user?.role || storedUser?.user?.role || 'owner').toLowerCase();
  };
  const userRole = getUserRole();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMembers();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [refreshKey, searchTerm, memberStatus]);

  // ✅ NEW: Polling Hook for Phone Photo Sync
  useEffect(() => {
    let interval;
    if (isPolling && syncSessionId) {
      interval = setInterval(async () => {
        try {
          const response = await api.get(`/members/temp-photo/${syncSessionId}`);
          if (response.data?.uploaded) {
            setEditPhotoPreview(response.data.photoUrl);
            setEditFormData((prev) => ({ ...prev, photoUrl: response.data.photoUrl }));
            setEditPhotoFile(null); // Clear local file if phone is used
            setIsPolling(false);
            setIsEditQrOpen(false);
          }
        } catch (err) {
          console.error('Polling error:', err);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPolling, syncSessionId]);

  useEffect(() => {
    const fetchTrainers = async () => {
      if (userRole === 'trainer') return; 
      try {
        const gymId = getOwnerGymId(); 
        const res = await api.get(`/auth/staff?gymId=${gymId}`);
        if (Array.isArray(res.data)) {
          setTrainers(res.data.filter(staff => staff.role?.toLowerCase() === 'trainer'));
        }
      } catch (err) {
        console.error('Failed to load trainers', err);
      }
    };
    fetchTrainers();
  }, [userRole]);

  const fetchMembers = async () => {
    try {
      const gymId = getOwnerGymId(); 
      const response = await api.get(
        `/members/active?gymId=${gymId}&search=${searchTerm}&status=${memberStatus}`
      );

      let fetchedData = response.data;

      if (userRole === 'trainer') {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const myTrainerId = storedUser?.id || storedUser?._id || storedUser?.data?.user?._id || storedUser?.data?._id || storedUser?.user?._id;

        fetchedData = fetchedData.filter(member => {
          if (!member.assignedTrainer) return false;
          const assignedId = typeof member.assignedTrainer === 'object' ? member.assignedTrainer._id : member.assignedTrainer;
          return String(assignedId) === String(myTrainerId);
        });
      }

      setMembers(fetchedData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load members.');
      setLoading(false);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){ u8arr[n] = bstr.charCodeAt(n); }
    return new File([u8arr], filename, {type:mime});
  };

  const captureEditPhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setEditPhotoPreview(imageSrc);
      const file = dataURLtoFile(imageSrc, 'webcam-capture.jpg');
      setEditPhotoFile(file);
      setEditFormData(prev => ({ ...prev, photoUrl: '' }));
      setIsEditCameraOpen(false);
    }
  }, []);

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditPhotoFile(file);
      setEditPhotoPreview(URL.createObjectURL(file));
      setEditFormData(prev => ({ ...prev, photoUrl: '' }));
    }
  };

  // ✅ NEW: Start Phone Sync Session
  const startPhoneSync = () => {
    const newSessionId = `gym_edit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setSyncSessionId(newSessionId);
    setIsEditQrOpen(true);
    setIsEditCameraOpen(false);
    setIsPolling(true);
  };

  const openEditModal = async (member) => {
    let parsedLogs = [];
    let rawProgress = member.goalProgress || '';
    
    if (rawProgress) {
      try {
        parsedLogs = JSON.parse(rawProgress);
        if (!Array.isArray(parsedLogs)) {
          parsedLogs = [{ date: member.updatedAt || new Date().toISOString(), notes: rawProgress }];
        }
      } catch {
        parsedLogs = [{ date: member.updatedAt || new Date().toISOString(), notes: rawProgress }];
      }
    }

    setEditMemberId(member._id);
    setEditFormData({
      name: member.name || '', mobile: member.mobile || '', email: member.email || '', gender: member.gender || '',
      dob: member.dob ? new Date(member.dob).toISOString().split('T')[0] : '', aadharNumber: member.aadharNumber || '',
      address: member.address || '', expiryDate: member.expiryDate ? new Date(member.expiryDate).toISOString().split('T')[0] : '',
      assignedTrainer: member.assignedTrainer?._id || member.assignedTrainer || '',
      fitnessGoal: member.fitnessGoal || '',
      goalProgress: rawProgress,
      photoUrl: '', // Reset for new upload
      progressLogs: parsedLogs,
      newWeight: '', newBodyFat: '', newNotes: ''
    });
    setEditPhotoPreview(member.photoUrl || null);
    setEditPhotoFile(null);
    setIsEditCameraOpen(false);
    setIsEditQrOpen(false);
    setIsPolling(false);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    const submitData = new FormData();
    submitData.append('name', editFormData.name);
    submitData.append('mobile', editFormData.mobile);
    submitData.append('email', editFormData.email);
    submitData.append('gender', editFormData.gender);
    submitData.append('dob', editFormData.dob);
    submitData.append('aadharNumber', editFormData.aadharNumber);
    submitData.append('address', editFormData.address);
    submitData.append('expiryDate', editFormData.expiryDate);
    submitData.append('assignedTrainer', editFormData.assignedTrainer);
    submitData.append('fitnessGoal', editFormData.fitnessGoal);
    
    // Automatically package new inputs into the timeline array if the user typed anything
    if (userRole === 'trainer') {
      let finalLogs = [...editFormData.progressLogs];
      
      if (editFormData.newNotes || editFormData.newWeight || editFormData.newBodyFat) {
        finalLogs.push({
          date: new Date().toISOString(),
          weight: editFormData.newWeight,
          bodyFat: editFormData.newBodyFat,
          notes: editFormData.newNotes
        });
      }
      submitData.append('goalProgress', JSON.stringify(finalLogs));
    } else {
      submitData.append('goalProgress', editFormData.goalProgress);
    }
    
    // ✅ NEW: Support submitting either the local file OR the URL received from the phone
    if (editPhotoFile) {
      submitData.append('photo', editPhotoFile);
    } else if (editFormData.photoUrl) {
      submitData.append('photoUrl', editFormData.photoUrl);
    }

    try {
      await api.put(`/members/${editMemberId}`, submitData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setIsEditModalOpen(false); 
      setIsPolling(false);
      fetchMembers();
    } catch (err) {
      alert('Failed to update member details.');
    } finally { 
      setEditLoading(false); 
    }
  };

  const openRenewModal = async (member) => {
    setSelectedMember(member); setRenewAmount(''); setRenewPlanName('Custom Plan'); setBasePrice(0); setDiscountAmount(0); setCouponCode(''); setCouponMessage({ text: '', type: '' }); setRenewDueDate(''); setRenewPaymentMode('Cash');
    const baseDate = new Date(); baseDate.setMonth(baseDate.getMonth() + 1);
    setNewExpiryDate(baseDate.toISOString().split('T')[0]); setRenewModalOpen(true);
    try {
      const gymId = getOwnerGymId(); 
      const res = await api.get(`/plans?gymId=${gymId}`);
      setPlans(res.data);
    } catch (err) { console.error('Error fetching plans for renewal:', err); }
  };

  const handleRenewPlanChange = (e) => {
    const planId = e.target.value;
    if (!planId) { setBasePrice(0); setRenewAmount(''); setDiscountAmount(0); setRenewDueDate(''); setRenewPaymentMode('Cash'); return; }
    const plan = plans.find((p) => p._id === planId);
    if (plan) {
      const baseDate = new Date(); baseDate.setMonth(baseDate.getMonth() + plan.durationInMonths);
      setNewExpiryDate(baseDate.toISOString().split('T')[0]); setRenewAmount(plan.price); setBasePrice(plan.price); setRenewPlanName(plan.name); setDiscountAmount(0); setCouponCode(''); setCouponMessage({ text: '', type: '' }); setRenewDueDate(''); setRenewPaymentMode('Cash');
    }
  };

  const applyCoupon = async () => {
    if (!couponCode || !basePrice) return setCouponMessage({ text: 'Please select a plan and enter a code.', type: 'error' });
    try {
      const gymId = getOwnerGymId(); 
      const res = await api.post('/coupons/validate', { gymId, code: couponCode });
      const coupon = res.data.data;
      let newPrice = basePrice;
      if (coupon.discountType === 'percentage') newPrice = basePrice - (basePrice * (coupon.discountValue / 100));
      else newPrice = basePrice - coupon.discountValue;

      const finalPrice = Math.max(0, newPrice);
      const discountSaved = basePrice - finalPrice; 
      setDiscountAmount(discountSaved);
      setRenewAmount(finalPrice);
      setCouponMessage({ text: `Coupon applied successfully! Discount: ₹${discountSaved.toFixed(0)}`, type: 'success' });
    } catch (err) {
      setCouponMessage({ text: err.response?.data?.message || 'Invalid coupon code', type: 'error' }); setRenewAmount(basePrice); 
    }
  };

  const pendingBalance = Math.max(0, basePrice - discountAmount - Number(renewAmount || 0));

  const handleRenewSubmit = async (e) => {
    e.preventDefault();
    setRenewLoading(true);

    try {
      await api.put(`/members/${selectedMember._id}/renew`, { 
        newExpiryDate, amountPaid: renewAmount, couponCode, planName: renewPlanName,
        discountAmount, pendingBalance, 
        pendingDueDate: pendingBalance > 0 ? renewDueDate : '',
        paymentMode: renewPaymentMode
      });
      setRenewModalOpen(false); fetchMembers();
    } catch (err) { alert('Failed to renew member'); } finally { setRenewLoading(false); }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete ${name}? This action cannot be undone.`)) {
      try { await api.delete(`/members/${id}`); fetchMembers(); } catch (err) { alert('Failed to delete member'); }
    }
  };

  const openProfileModal = async (member) => {
    setProfileMember(member); setProfileModalOpen(true); setPaymentsLoading(true);
    try {
      const response = await api.get(`/members/${member._id}/payments`); setPaymentHistory(response.data);
    } catch (err) { setPaymentHistory([]); } finally { setPaymentsLoading(false); }
  };

  const sendWhatsApp = (member) => {
    const isExpired = new Date(member.expiryDate) < new Date();
    const dateStr = new Date(member.expiryDate).toLocaleDateString();
    let message = isExpired ? `Hi ${member.name}, your gym membership expired on ${dateStr}. Please renew your plan!` : `Hi ${member.name}, your gym membership is expiring soon on ${dateStr}. Please renew your plan!`;
    let phone = member.mobile.replace(/\D/g, ''); if (phone.length === 10) phone = '91' + phone;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) return <div className="p-6 text-gray-500">Loading members...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm relative">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <h2 className="text-xl font-bold text-gray-800">
            {userRole === 'trainer' ? 'My Assigned Clients' : 'Members Directory'}
          </h2>
          
          {userRole !== 'trainer' && (
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button onClick={() => setMemberStatus('all')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${memberStatus === 'all' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>All</button>
              <button onClick={() => setMemberStatus('active')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${memberStatus === 'active' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Active</button>
              <button onClick={() => setMemberStatus('expiring_soon')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${memberStatus === 'expiring_soon' ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Expiring Soon</button>
              <button onClick={() => setMemberStatus('expired')} className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${memberStatus === 'expired' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Expired</button>
            </div>
          )}
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or mobile..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
            value={searchTerm} 
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value.length > 0 && memberStatus !== 'all' && userRole !== 'trainer') {
                setMemberStatus('all');
              }
            }} 
          />
        </div>
      </div>
      
      {members.length === 0 ? (
        <p className="text-gray-500 py-8 text-center border-2 border-dashed rounded-lg">No members found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Photo</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Name</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Mobile</th>
                
                {userRole === 'trainer' ? (
                  <>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Fitness Goal</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Latest Assessment</th>
                  </>
                ) : (
                  <>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Plan</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Type</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Expiry Date</th>
                  </>
                )}
                
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                  {userRole === 'trainer' ? 'Actions' : 'Status & Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {members.map((member) => {
                const isExpired = new Date(member.expiryDate) < new Date();
                const isExpiringSoon = !isExpired && new Date(member.expiryDate) < new Date(new Date().setDate(new Date().getDate() + 7));

                return (
                  <tr key={member._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 whitespace-nowrap">{member.photoUrl ? <img src={member.photoUrl} alt={member.name} className="h-10 w-10 rounded-full object-cover border border-gray-300" /> : <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">No Pic</div>}</td>
                    <td className="py-3 px-4 whitespace-nowrap font-medium text-gray-900">{member.name}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-gray-500">{member.mobile}</td>
                    
                    {userRole === 'trainer' ? (
                      <>
                        <td className="py-3 px-4 whitespace-nowrap text-gray-700 font-medium">{member.fitnessGoal || 'Not Set'}</td>
                        <td className="py-3 px-4 max-w-[250px] truncate text-gray-600 text-xs">
                          {(() => {
                            if (!member.goalProgress) return <span className="text-gray-400 italic">No notes logged</span>;
                            try {
                              const logs = JSON.parse(member.goalProgress);
                              if (Array.isArray(logs) && logs.length > 0) {
                                const last = logs[logs.length - 1];
                                return (
                                  <div className="flex items-center gap-2">
                                    {last.weight && <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">{last.weight}kg</span>}
                                    <span className="truncate">{last.notes}</span>
                                  </div>
                                );
                              }
                              return member.goalProgress;
                            } catch {
                              return member.goalProgress;
                            }
                          })()}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4 whitespace-nowrap"><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">{member.planName || 'Custom'}</span></td>
                        <td className="py-3 px-4 whitespace-nowrap"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${member.lastPaymentType === 'Renewal' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>{member.lastPaymentType || 'Registration'}</span></td>
                        <td className="py-3 px-4 whitespace-nowrap text-gray-500">{new Date(member.expiryDate).toLocaleDateString()}</td>
                      </>
                    )}

                    <td className="py-3 px-4 whitespace-nowrap flex items-center gap-2">
                      {userRole !== 'trainer' && (
                        <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${isExpired ? 'bg-red-100 text-red-800' : isExpiringSoon ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {isExpired ? 'Expired' : isExpiringSoon ? 'Expiring Soon' : 'Active'}
                        </span>
                      )}
                      
                      {userRole !== 'trainer' && (
                        <button onClick={() => openProfileModal(member)} className="text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 p-1.5 rounded-md border border-gray-200" title="View Profile"><Eye size={16} /></button>
                      )}
                      
                      <button onClick={() => openEditModal(member)} className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 p-1.5 rounded-md border border-blue-200" title={userRole === 'trainer' ? 'Update Progress' : 'Edit Member'}><Edit2 size={16} /></button>
                      <button onClick={() => sendWhatsApp(member)} className="text-xs bg-green-50 text-green-600 hover:bg-green-100 p-1.5 rounded-md border border-green-200" title="Send Reminder"><MessageCircle size={16} /></button>
                      
                      {userRole !== 'trainer' && (
                        <>
                          <button onClick={() => openRenewModal(member)} className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-md border border-blue-200 font-medium">Renew</button>
                          <button onClick={() => handleDelete(member._id, member.name)} className="text-xs bg-red-50 text-red-600 hover:bg-red-100 p-1.5 rounded-md border border-red-200" title="Delete"><Trash2 size={16} /></button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT MODAL / PROGRESS REPORT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] flex flex-col">
            
            <div className="flex justify-between items-center mb-4 shrink-0">
              <h3 className="text-xl font-bold text-gray-800">
                {userRole === 'trainer' ? 'Client Progress Timeline' : 'Edit Profile & Goals'}
              </h3>
              <button onClick={() => { setIsEditModalOpen(false); setIsPolling(false); }} className="text-gray-400 hover:text-red-500 transition"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="space-y-4 overflow-y-auto pr-2 pb-2 custom-scrollbar">
              
              {userRole === 'trainer' ? (
                <div className="space-y-5">
                  <div className="flex items-center gap-4 bg-gradient-to-r from-slate-800 to-slate-900 p-4 rounded-xl shadow-sm">
                    {editPhotoPreview ? (
                      <img src={editPhotoPreview} alt="Client" className="h-16 w-16 rounded-full object-cover border-2 border-slate-600 shadow-sm" />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-2xl border-2 border-slate-600 shadow-sm">
                        {editFormData.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xl font-bold text-white">{editFormData.name}</h4>
                      <p className="text-sm text-slate-300 font-medium mt-0.5">{editFormData.mobile}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Target Fitness Goal</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Muscle Hypertrophy & Fat Loss" 
                      value={editFormData.fitnessGoal} 
                      onChange={e => setEditFormData({...editFormData, fitnessGoal: e.target.value})} 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white shadow-sm transition" 
                    />
                  </div>

                  <div className="bg-blue-50/40 p-5 rounded-xl border border-blue-100 shadow-inner">
                    <div className="flex items-center gap-2 mb-4 border-b border-blue-200 pb-2">
                      <Activity className="text-blue-600" size={20} />
                      <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wider">Assessment History</h4>
                    </div>
                    
                    <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-3 custom-scrollbar">
                      {editFormData.progressLogs.length === 0 && <p className="text-sm text-gray-500 italic">No logs recorded yet.</p>}
                      {editFormData.progressLogs.map((log, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-sm relative">
                          <div className="flex justify-between items-center text-gray-500 font-bold mb-2">
                            <span className="text-blue-600 text-sm">{new Date(log.date).toLocaleDateString()}</span>
                            <div className="flex gap-2">
                              {log.weight && <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 border border-slate-200">Wt: {log.weight}kg</span>}
                              {log.bodyFat && <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 border border-slate-200">BF: {log.bodyFat}%</span>}
                            </div>
                          </div>
                          {log.notes && <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{log.notes}</p>}
                        </div>
                      ))}
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm space-y-4">
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Log New Assessment</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input type="number" placeholder="Weight (kg)" value={editFormData.newWeight} onChange={e => setEditFormData({...editFormData, newWeight: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <input type="number" placeholder="Body Fat (%)" value={editFormData.newBodyFat} onChange={e => setEditFormData({...editFormData, newBodyFat: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500" />
                        </div>
                      </div>
                      <div>
                        <textarea placeholder="Assessment notes, milestones, PRs... (Press 'Update Client Database' below to save)" value={editFormData.newNotes} onChange={e => setEditFormData({...editFormData, newNotes: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 resize-none" rows="3" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* ✅ UPDATED PHOTO UPLOAD UI FOR OWNERS */}
                  <div className="mb-2 space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Update Photo (Optional)</label>
                    
                    {isEditQrOpen ? (
                      <div className="flex flex-col items-center bg-gray-50 border-2 border-dashed border-blue-400 rounded-xl p-6 text-center">
                        <QRCodeSVG value={`${window.location.origin}/capture/${syncSessionId}`} size={160} level="M" />
                        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-700">
                          <RefreshCw size={16} className="animate-spin" />
                          Waiting for photo from phone...
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Scan using any phone camera to snap photo</p>
                        <button type="button" onClick={() => { setIsEditQrOpen(false); setIsPolling(false); }} className="mt-4 text-xs text-red-600 hover:underline">
                          Cancel
                        </button>
                      </div>
                    ) : isEditCameraOpen ? (
                      <div className="flex flex-col items-center bg-gray-900 rounded-lg overflow-hidden">
                        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full object-cover max-h-48" />
                        <div className="p-3 flex gap-4 w-full justify-center bg-gray-800">
                          <button type="button" onClick={captureEditPhoto} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold text-sm transition">Snap Photo</button>
                          <button type="button" onClick={() => setIsEditCameraOpen(false)} className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-full font-semibold text-sm transition">Cancel</button>
                        </div>
                      </div>
                    ) : editPhotoPreview ? (
                      <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden flex justify-center bg-gray-50">
                        <img src={editPhotoPreview} alt="Preview" className="h-32 object-cover" />
                        <button type="button" onClick={() => { setEditPhotoPreview(null); setEditPhotoFile(null); setEditFormData(prev => ({...prev, photoUrl: ''})); }} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600" title="Remove Photo"><X size={14} /></button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-3">
                        <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                          <UploadCloud size={24} className="text-blue-500 mb-2" />
                          <p className="text-sm text-gray-600 font-medium text-center">Upload File</p>
                          <input type="file" accept="image/*" onChange={handleEditFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                        
                        <button type="button" onClick={() => setIsEditCameraOpen(true)} className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-blue-50 transition cursor-pointer text-blue-600">
                          <Camera size={24} className="mb-2" />
                          <p className="text-sm font-medium text-center">Webcam</p>
                        </button>
                        
                        <button type="button" onClick={startPhoneSync} className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-purple-50 transition cursor-pointer text-purple-600">
                          <Smartphone size={24} className="mb-2" />
                          <p className="text-sm font-medium text-center">Use Phone</p>
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Assigned Trainer</label>
                    <select value={editFormData.assignedTrainer} onChange={e => setEditFormData({...editFormData, assignedTrainer: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <option value="">-- No Trainer Assigned --</option>
                      {trainers.map((trainer) => (
                        <option key={trainer._id} value={trainer._id}>{trainer.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Fitness Goal</label>
                      <input type="text" placeholder="e.g. Weight Loss" value={editFormData.fitnessGoal} onChange={e => setEditFormData({...editFormData, fitnessGoal: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Latest Progress</label>
                      <input type="text" readOnly value={getLatestProgressText(editFormData.goalProgress)} className="w-full px-4 py-2 border rounded-md text-sm bg-gray-100 text-gray-500 cursor-not-allowed" title="Trainers track progress logs via their dashboard" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label><input type="text" required value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label><input type="tel" required value={editFormData.mobile} onChange={e => setEditFormData({...editFormData, mobile: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label><input type="email" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                      <select value={editFormData.gender} onChange={e => setEditFormData({...editFormData, gender: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label><input type="date" value={editFormData.dob} onChange={e => setEditFormData({...editFormData, dob: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
                    <div><label className="block text-sm font-semibold text-gray-700 mb-1">ID Number</label><input type="text" placeholder="ID Number" value={editFormData.aadharNumber} onChange={e => setEditFormData({...editFormData, aadharNumber: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
                  </div>

                  <div><label className="block text-sm font-semibold text-gray-700 mb-1">Residential Address</label><input type="text" value={editFormData.address} onChange={e => setEditFormData({...editFormData, address: e.target.value})} className="w-full px-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" /></div>
                </>
              )}

              <div className="flex gap-2 justify-end pt-5 border-t mt-5 shrink-0">
                <button type="submit" disabled={editLoading} className="w-full bg-blue-600 text-white rounded-md text-base font-bold py-3 hover:bg-blue-700 transition disabled:opacity-50">
                  {editLoading ? 'Saving...' : (userRole === 'trainer' ? 'Update Client Database' : 'Save All Changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RENEW MODAL */}
      {renewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Renew Membership</h3>
            <p className="text-sm text-gray-500 mb-4">{selectedMember?.name}</p>
            <form onSubmit={handleRenewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Select Plan</label>
                <select onChange={handleRenewPlanChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm">
                  <option value="">-- Choose a plan --</option>
                  {plans.map((plan) => (<option key={plan._id} value={plan._id}>{plan.name} ({plan.durationInMonths} Mo) - ₹{plan.price}</option>))}
                </select>
              </div>

              {basePrice > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                    <Tag size={14} className="text-blue-500" /> Have a Promo Code?
                  </label>
                  <div className="flex gap-2">
                    <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="Enter Code" className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 uppercase text-sm" />
                    <button type="button" onClick={applyCoupon} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition">Apply</button>
                  </div>
                  {couponMessage.text && <p className={`mt-2 text-sm font-semibold ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{couponMessage.text}</p>}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">New Expiry Date</label>
                  <input type="date" value={newExpiryDate} onChange={(e) => setNewExpiryDate(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Mode</label>
                  <select value={renewPaymentMode} onChange={(e) => setRenewPaymentMode(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm" required>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                    <option value="Net Banking">Net</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Amount Paid
                  {discountAmount > 0 && <span className="text-gray-400 line-through ml-2 font-normal text-xs">₹{basePrice}</span>}
                </label>
                <input type="number" value={renewAmount} onChange={(e) => setRenewAmount(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" required min="0" />
              </div>
              
              {pendingBalance > 0 && <p className="text-sm text-red-600 font-bold mt-1 text-right">Due Balance: ₹{pendingBalance.toFixed(0)}</p>}

              {pendingBalance > 0 && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-2">
                  <label className="block text-sm font-bold text-red-700 mb-2">Clear Dues By (Due Date)</label>
                  <input type="date" value={renewDueDate} onChange={(e) => setRenewDueDate(e.target.value)} className="w-full px-3 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-500 text-sm bg-white" required />
                </div>
              )}

              <div className="flex gap-3 justify-end pt-4">
                <button type="button" onClick={() => setRenewModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition">Cancel</button>
                <button type="submit" disabled={renewLoading} className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition disabled:opacity-50">{renewLoading ? 'Saving...' : 'Confirm Renewal'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL PROFILE MODAL (Owner view) */}
      {profileModalOpen && profileMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-start mb-4 border-b pb-4 shrink-0">
              <div className="flex items-center gap-4">
                {profileMember.photoUrl ? (
                  <img src={profileMember.photoUrl} alt={profileMember.name} className="h-16 w-16 rounded-full object-cover border-2 border-blue-100" />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-2xl">{profileMember.name.charAt(0)}</div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{profileMember.name}</h3>
                  <p className="text-base text-gray-500">{profileMember.mobile}</p>
                </div>
              </div>
              <button onClick={() => setProfileModalOpen(false)} className="text-gray-400 hover:text-red-500 transition">✕</button>
            </div>
            
            <div className="overflow-y-auto flex-1 pr-2 space-y-5 custom-scrollbar">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-wrap gap-5 text-sm">
                <div className="flex-1 min-w-[120px]"><span className="text-blue-800 font-bold block text-xs uppercase tracking-wider">Assigned Trainer</span><span className="font-semibold text-blue-900 text-base">{profileMember.assignedTrainer?.name || 'Unassigned'}</span></div>
                <div className="flex-1 min-w-[120px]"><span className="text-blue-800 font-bold block text-xs uppercase tracking-wider">Fitness Goal</span><span className="font-semibold text-blue-900 text-base">{profileMember.fitnessGoal || 'N/A'}</span></div>
                <div className="flex-1 min-w-[120px]"><span className="text-blue-800 font-bold block text-xs uppercase tracking-wider">Latest Progress</span><span className="font-semibold text-blue-900 text-base">{getLatestProgressText(profileMember.goalProgress)}</span></div>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 grid grid-cols-2 gap-4 text-sm">
                <div className="col-span-2 bg-white border border-gray-200 p-3 rounded-md mb-2"><span className="text-gray-500 font-bold block text-xs uppercase tracking-wider">Active Plan</span><span className="font-bold text-gray-800 text-base">{profileMember.planName || 'Custom'}</span></div>
                <div><span className="text-gray-400 block text-xs">Email Address</span><span className="font-medium text-gray-800 text-base">{profileMember.email || 'N/A'}</span></div>
                <div><span className="text-gray-400 block text-xs">Gender</span><span className="font-medium text-gray-800 text-base">{profileMember.gender || 'N/A'}</span></div>
                <div><span className="text-gray-400 block text-xs">Date of Birth</span><span className="font-medium text-gray-800 text-base">{profileMember.dob ? new Date(profileMember.dob).toLocaleDateString() : 'N/A'}</span></div>
                <div><span className="text-gray-400 block text-xs">ID Number</span><span className="font-medium text-gray-800 text-base">{profileMember.aadharNumber || 'N/A'}</span></div>
                <div className="col-span-2"><span className="text-gray-400 block text-xs">Residential Address</span><span className="font-medium text-gray-800 text-base">{profileMember.address || 'N/A'}</span></div>
                <div className="col-span-2 border-t pt-3 mt-2"><span className="text-gray-400 block text-xs">Membership Expiry</span><span className="font-bold text-red-600 text-base">{new Date(profileMember.expiryDate).toLocaleDateString()}</span></div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 mb-3 text-base flex items-center gap-2">
                  <Activity size={20} className="text-blue-600"/> Progress History
                </h4>
                {(() => {
                  const logs = parseProgressLogs(profileMember.goalProgress, profileMember.updatedAt);
                  if (logs.length === 0 || (logs.length === 1 && !logs[0].notes && !logs[0].weight && !logs[0].bodyFat)) {
                    return <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">No progress history logged.</p>;
                  }
                  return (
                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                      {logs.map((log, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm text-sm">
                          <div className="flex justify-between items-center text-gray-500 font-bold mb-2 border-b border-gray-50 pb-2">
                            <span className="text-blue-600 text-sm">{new Date(log.date).toLocaleDateString()}</span>
                            <div className="flex gap-3">
                              {log.weight && <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 border border-slate-200">Wt: {log.weight}kg</span>}
                              {log.bodyFat && <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 border border-slate-200">BF: {log.bodyFat}%</span>}
                            </div>
                          </div>
                          {log.notes ? (
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{log.notes}</p>
                          ) : (
                            <p className="text-gray-400 italic">No notes logged for this assessment.</p>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
              
              <div className="border-t pt-5">
                <h4 className="font-bold text-gray-800 mb-3 text-base">Payment History</h4>
                {paymentsLoading ? (
                  <p className="text-sm text-gray-500 text-center py-2">Loading history...</p>
                ) : paymentHistory.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">No payment history found.</p>
                ) : (
                  <ul className="space-y-3">
                    {paymentHistory.map((payment) => (
                      <li key={payment._id} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-lg shadow-sm text-sm">
                        <div>
                          <p className="font-bold text-gray-800 text-base">₹{payment.amount}</p>
                          <p className="text-sm text-gray-500">{payment.paymentType}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{new Date(payment.paymentDate).toLocaleDateString()}</span>
                          <button onClick={() => { const user = JSON.parse(localStorage.getItem('user')) || {}; generateInvoice(profileMember, payment, user?.gymName || 'Gym Invoice'); }} className="text-green-600 hover:bg-green-50 p-2 rounded-md transition" title="Download Invoice"><Download size={18} /></button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="mt-5 pt-4 border-t shrink-0">
              <button onClick={() => setProfileModalOpen(false)} className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold py-3 px-4 rounded-md transition text-base">Close Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersList;