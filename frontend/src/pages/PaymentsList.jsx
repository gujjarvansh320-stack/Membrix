// // src/pages/PaymentsList.jsx
// import { useState, useEffect } from 'react';
// import api from '../api/axios';
// import { Trash2, Edit2, Search, Download } from 'lucide-react';
// import { generateInvoice } from '../utils/generateInvoice';

// const PaymentsList = () => {
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showOnlyDues, setShowOnlyDues] = useState(false);

//   // Edit Modal State
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentPayment, setCurrentPayment] = useState(null);
//   const [editAmount, setEditAmount] = useState('');
//   const [editType, setEditType] = useState('');
//   const [editMode, setEditMode] = useState('Cash');

//   // Clear Dues Modal State
//   const [isClearModalOpen, setIsClearModalOpen] = useState(false);
//   const [clearingPayment, setClearingPayment] = useState(null);
//   const [clearAmount, setClearAmount] = useState('');
//   const [clearMode, setClearMode] = useState('Cash');

//   // ✅ BULLETPROOF GYM ID EXTRACTOR FOR STAFF
//   const getOwnerGymId = () => {
//     const rawStorage = localStorage.getItem('user');
//     const storedUser = rawStorage && rawStorage !== 'undefined' ? JSON.parse(rawStorage) : {};
//     return (
//       storedUser?.user?.gymId || 
//       storedUser?.gymId || 
//       storedUser?.data?.user?.gymId || 
//       storedUser?.user?._id || 
//       storedUser?.user?.id || 
//       storedUser?._id || 
//       storedUser?.id || 
//       storedUser?.data?.user?._id || 
//       '65abc123def4567890abcd12'
//     );
//   };

//   const fetchPayments = async () => {
//     try {
//       const gymId = getOwnerGymId();
//       const response = await api.get(`/members/payments/all?gymId=${gymId}`);
//       setPayments(response.data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching payments:', err);
//       setError('Failed to load payment history.');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this payment record?')) {
//       try {
//         await api.delete(`/members/payments/${id}`);
//         fetchPayments();
//       } catch (err) {
//         console.error('Error deleting payment:', err);
//         alert('Failed to delete payment record.');
//       }
//     }
//   };

//   const openEditModal = (payment) => {
//     setCurrentPayment(payment);
//     setEditAmount(payment.amount);
//     setEditType(payment.paymentType);
//     setEditMode(payment.paymentMode || 'Cash');
//     setIsEditModalOpen(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.put(`/members/payments/${currentPayment._id}`, {
//         amount: editAmount,
//         paymentType: editType,
//         paymentMode: editMode 
//       });
//       setIsEditModalOpen(false);
//       fetchPayments();
//     } catch (err) {
//       console.error('Error updating payment:', err);
//       alert('Failed to update payment record.');
//     }
//   };

//   // ✅ Open Clear Dues Modal
//   const openClearModal = (payment) => {
//     setClearingPayment(payment);
//     setClearAmount(payment.memberId?.pendingBalance || payment.pendingBalance || '');
//     setClearMode('Cash');
//     setIsClearModalOpen(true);
//   };

//  const handleClearDuesSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Ensure we extract the raw string ID whether it's populated or an ObjectId
//       const memberId = clearingPayment.memberId?._id || clearingPayment.memberId;
      
//       if (!memberId) {
//         alert("Member ID is missing.");
//         return;
//       }

//       await api.put(`/members/${memberId}/clear-dues`, {
//         amountPaid: Number(clearAmount),
//         paymentMode: clearMode
//       });
//       setIsClearModalOpen(false);
//       fetchPayments(); // Refresh ledger list
//     } catch (err) {
//       console.error('Error clearing dues:', err);
//       alert(err.response?.data?.message || 'Failed to process payment.');
//     }
//   };
//   const handleDownloadInvoice = (payment) => {
//     const user = JSON.parse(localStorage.getItem('user')) || {};
//     const gymName = user?.gymName || user?.data?.gymName || 'Gym Invoice';
    
//     const memberData = payment.memberId || {};
//     memberData.planName = payment.planName || memberData.planName || 'Custom Plan';
    
//     generateInvoice(memberData, payment, gymName);
//   };

//   const filteredPayments = payments.filter(p => {
//     const name = p.memberId?.name || '';
//     const mobile = p.memberId?.mobile || '';
//     const plan = p.planName || p.memberId?.planName || '';
    
//     const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           mobile.includes(searchTerm) || 
//                           plan.toLowerCase().includes(searchTerm.toLowerCase());
                          
//     const matchesDueFilter = showOnlyDues ? (p.pendingBalance > 0) : true;

//     return matchesSearch && matchesDueFilter;
//   });

//   if (loading) return <div className="p-6 text-gray-500">Loading payments ledger...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        
//         <div className="flex items-center gap-4 w-full sm:w-auto">
//           <h2 className="text-xl font-bold text-gray-800">
//             {showOnlyDues ? 'Pending Dues' : 'Financial Ledger'}
//           </h2>
          
//           <div className="flex bg-gray-100 p-1 rounded-lg">
//             <button 
//               onClick={() => setShowOnlyDues(false)} 
//               className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${!showOnlyDues ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//             >
//               All
//             </button>
//             <button 
//               onClick={() => setShowOnlyDues(true)} 
//               className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${showOnlyDues ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
//             >
//               Dues Pending
//             </button>
//           </div>
//         </div>
        
//         <div className="relative w-full sm:w-72">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <input 
//             type="text" 
//             placeholder="Search name, mobile or plan..." 
//             className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {filteredPayments.length === 0 ? (
//         <p className="text-gray-500 text-center py-8 border-2 border-dashed rounded-lg">
//           {showOnlyDues ? "Hooray! No pending dues found." : "No payment records found."}
//         </p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 rounded-lg">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Client Name</th>
//                 <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Plan & Type</th>
//                 <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Mode</th>
//                 <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Amount Paid</th>
//                 <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Payment Due</th>
//                 <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Due Date</th>
//                 <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Payment Date</th>
//                 <th className="py-3 px-3 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredPayments.map((payment) => (
//                 <tr key={payment._id} className="hover:bg-gray-50 transition">
                  
//                   <td className="py-3 px-3 whitespace-nowrap">
//                     <p className="font-bold text-gray-900 text-sm">{payment.memberId?.name || 'Unknown'}</p>
//                     <p className="text-xs text-gray-500">{payment.memberId?.mobile || 'N/A'}</p>
//                   </td>

//                   <td className="py-3 px-3 whitespace-nowrap">
//                     <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold block w-max mb-1">
//                       {payment.planName || payment.memberId?.planName || 'Custom Plan'}
//                     </span>
//                     <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full block w-max ${
//                       payment.paymentType === 'Registration' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
//                     }`}>
//                       {payment.paymentType}
//                     </span>
//                   </td>

//                   <td className="py-3 px-3 whitespace-nowrap">
//                     <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-[11px] font-semibold border border-gray-200">
//                       {payment.paymentMode || 'Cash'}
//                     </span>
//                   </td>

//                   <td className="py-3 px-3 whitespace-nowrap font-bold text-green-600 text-sm">
//                     <div className="flex flex-col items-start gap-1">
//                       <span>₹{payment.amount}</span>
//                       {payment.couponCode && (
//                         <span className="text-[9px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-bold tracking-wider uppercase border border-green-200">
//                           {payment.couponCode}
//                         </span>
//                       )}
//                     </div>
//                   </td>

//                   <td className="py-3 px-3 whitespace-nowrap text-sm">
//                     {payment.pendingBalance > 0 ? (
//                       <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100">
//                         ₹{payment.pendingBalance}
//                       </span>
//                     ) : (
//                       <span className="font-semibold text-gray-400">₹0</span>
//                     )}
//                   </td>

//                   <td className="py-3 px-3 whitespace-nowrap text-gray-700 text-xs font-medium">
//                     {payment.pendingBalance > 0 && payment.pendingDueDate 
//                       ? <span className="text-red-600 font-bold">{new Date(payment.pendingDueDate).toLocaleDateString('en-GB')}</span> 
//                       : <span className="text-gray-400">-</span>
//                     }
//                   </td>

//                   <td className="py-3 px-3 whitespace-nowrap text-gray-500 text-xs font-medium">
//                     {new Date(payment.paymentDate).toLocaleDateString('en-GB')}
//                   </td>
                  
//                   <td className="py-3 px-3 whitespace-nowrap text-center space-x-2">
//                     {/* ✅ CLEAR DUES ACTION BUTTON */}
//                     {payment.pendingBalance > 0 && (
//                       <button 
//                         onClick={() => openClearModal(payment)}
//                         className="text-xs bg-red-600 text-white hover:bg-red-700 px-2.5 py-1 rounded-md font-bold transition inline-block mr-1"
//                         title="Clear Dues"
//                       >
//                         Clear Dues
//                       </button>
//                     )}

//                     <button 
//                       onClick={() => handleDownloadInvoice(payment)} 
//                       className="text-green-600 hover:bg-green-50 p-1.5 rounded-md transition border border-transparent hover:border-green-200 inline-block" 
//                       title="Download Invoice"
//                     >
//                       <Download size={16} />
//                     </button>
//                     <button 
//                       onClick={() => openEditModal(payment)}
//                       className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition border border-transparent hover:border-blue-200 inline-block"
//                       title="Edit Payment"
//                     >
//                       <Edit2 size={16} />
//                     </button>
//                     <button 
//                       onClick={() => handleDelete(payment._id)}
//                       className="text-red-600 hover:bg-red-50 p-1.5 rounded-md transition border border-transparent hover:border-red-200 inline-block"
//                       title="Delete Payment"
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

//       {/* EDIT PAYMENT MODAL */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Payment Record</h3>
            
//             <form onSubmit={handleEditSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Type</label>
//                 <select 
//                   value={editType} 
//                   onChange={(e) => setEditType(e.target.value)} 
//                   className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
//                 >
//                   <option value="Registration">Registration</option>
//                   <option value="Renewal">Renewal</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (₹)</label>
//                 <input 
//                   type="number" 
//                   value={editAmount} 
//                   onChange={(e) => setEditAmount(e.target.value)} 
//                   className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
//                   required
//                   min="0"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Mode</label>
//                 <select 
//                   value={editMode} 
//                   onChange={(e) => setEditMode(e.target.value)} 
//                   className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
//                 >
//                   <option value="Cash">Cash</option>
//                   <option value="UPI">UPI</option>
//                   <option value="Card">Card</option>
//                   <option value="Net Banking">Net Banking</option>
//                 </select>
//               </div>

//               <div className="flex gap-3 justify-end mt-6">
//                 <button 
//                   type="button" 
//                   onClick={() => setIsEditModalOpen(false)} 
//                   className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ✅ CLEAR DUES MODAL */}
//       {isClearModalOpen && clearingPayment && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
//             <h3 className="text-lg font-bold text-gray-800 mb-1">Clear Pending Dues</h3>
//             <p className="text-xs text-gray-500 mb-4">Member: {clearingPayment.memberId?.name}</p>
            
//             <form onSubmit={handleClearDuesSubmit} className="space-y-4">
//               <div className="bg-red-50 p-3 rounded-md border border-red-100 text-xs text-red-700 font-semibold">
//                 Total Outstanding Balance: ₹{clearingPayment.pendingBalance}
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Collection Amount (₹)</label>
//                 <input 
//                   type="number" 
//                   value={clearAmount} 
//                   onChange={(e) => setClearAmount(e.target.value)} 
//                   className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
//                   required
//                   min="1"
//                   max={clearingPayment.pendingBalance}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Mode</label>
//                 <select 
//                   value={clearMode} 
//                   onChange={(e) => setClearMode(e.target.value)} 
//                   className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-sm"
//                 >
//                   <option value="Cash">Cash</option>
//                   <option value="UPI">UPI</option>
//                   <option value="Card">Card</option>
//                   <option value="Net Banking">Net Banking</option>
//                 </select>
//               </div>

//               <div className="flex gap-3 justify-end mt-6">
//                 <button 
//                   type="button" 
//                   onClick={() => setIsClearModalOpen(false)} 
//                   className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition"
//                 >
//                   Confirm Payment
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentsList;








// src/pages/PaymentsList.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Trash2, Edit2, Search, Download } from 'lucide-react';
import { generateInvoice } from '../utils/generateInvoice';

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyDues, setShowOnlyDues] = useState(false);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editType, setEditType] = useState('');
  const [editMode, setEditMode] = useState('Cash');

  // Clear Dues Modal State
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [clearingPayment, setClearingPayment] = useState(null);
  const [clearAmount, setClearAmount] = useState('');
  const [clearMode, setClearMode] = useState('Cash');

  const getOwnerGymId = () => {
    const rawStorage = localStorage.getItem('user');
    const storedUser = rawStorage && rawStorage !== 'undefined' ? JSON.parse(rawStorage) : {};
    return (
      storedUser?.user?.gymId || 
      storedUser?.gymId || 
      storedUser?.data?.user?.gymId || 
      storedUser?.user?._id || 
      storedUser?.user?.id || 
      storedUser?._id || 
      storedUser?.id || 
      storedUser?.data?.user?._id || 
      '65abc123def4567890abcd12'
    );
  };

  const fetchPayments = async () => {
    try {
      const gymId = getOwnerGymId();
      const response = await api.get(`/members/payments/all?gymId=${gymId}`);
      setPayments(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError('Failed to load payment history.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment record?')) {
      try {
        await api.delete(`/members/payments/${id}`);
        fetchPayments();
      } catch (err) {
        console.error('Error deleting payment:', err);
        alert('Failed to delete payment record.');
      }
    }
  };

  const openEditModal = (payment) => {
    setCurrentPayment(payment);
    setEditAmount(payment.amount);
    setEditType(payment.paymentType);
    setEditMode(payment.paymentMode || 'Cash');
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/members/payments/${currentPayment._id}`, {
        amount: editAmount,
        paymentType: editType,
        paymentMode: editMode 
      });
      setIsEditModalOpen(false);
      fetchPayments();
    } catch (err) {
      console.error('Error updating payment:', err);
      alert('Failed to update payment record.');
    }
  };

  const openClearModal = (payment) => {
    setClearingPayment(payment);
    // Use the unified logic for extracting balance
    const balance = payment.memberId?.pendingBalance || payment.pendingBalance || '';
    setClearAmount(balance);
    setClearMode('Cash');
    setIsClearModalOpen(true);
  };

  const handleClearDuesSubmit = async (e) => {
    e.preventDefault();
    try {
      const memberId = clearingPayment.memberId?._id || clearingPayment.memberId;
      
      if (!memberId) {
        alert("Member ID is missing.");
        return;
      }

      const gymId = getOwnerGymId();

      await api.put(`/members/${memberId}/clear-dues`, {
        amountPaid: Number(clearAmount),
        amount: Number(clearAmount), // Sent to cover both variable naming conventions
        paymentMode: clearMode,
        gymId: gymId // Sent to pass backend multi-tenant authorization
      });
      setIsClearModalOpen(false);
      fetchPayments(); 
    } catch (err) {
      console.error('Error clearing dues:', err);
      alert(err.response?.data?.message || 'Failed to process payment.');
    }
  };

  const handleDownloadInvoice = (payment) => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const gymName = user?.gymName || user?.data?.gymName || 'Gym Invoice';
    
    const memberData = payment.memberId || {};
    memberData.planName = payment.planName || memberData.planName || 'Custom Plan';
    
    generateInvoice(memberData, payment, gymName);
  };

  const filteredPayments = payments.filter(p => {
    const name = p.memberId?.name || '';
    const mobile = p.memberId?.mobile || '';
    const plan = p.planName || p.memberId?.planName || '';
    const dueAmount = p.pendingBalance || p.memberId?.pendingBalance || 0;
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          mobile.includes(searchTerm) || 
                          plan.toLowerCase().includes(searchTerm.toLowerCase());
                          
    const matchesDueFilter = showOnlyDues ? (dueAmount > 0) : true;

    return matchesSearch && matchesDueFilter;
  });

  if (loading) return <div className="p-6 text-gray-500">Loading payments ledger...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <h2 className="text-xl font-bold text-gray-800">
            {showOnlyDues ? 'Pending Dues' : 'Financial Ledger'}
          </h2>
          
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setShowOnlyDues(false)} 
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${!showOnlyDues ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              All
            </button>
            <button 
              onClick={() => setShowOnlyDues(true)} 
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${showOnlyDues ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Dues Pending
            </button>
          </div>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search name, mobile or plan..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredPayments.length === 0 ? (
        <p className="text-gray-500 text-center py-8 border-2 border-dashed rounded-lg">
          {showOnlyDues ? "Hooray! No pending dues found." : "No payment records found."}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Client Name</th>
                <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Plan & Type</th>
                <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Mode</th>
                <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Amount Paid</th>
                <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Payment Due</th>
                <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Due Date</th>
                <th className="py-3 px-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Payment Date</th>
                <th className="py-3 px-3 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                // Unified check for where the due amount is stored in the JSON object
                const dueAmount = payment.pendingBalance || payment.memberId?.pendingBalance || 0;
                
                return (
                <tr key={payment._id} className="hover:bg-gray-50 transition">
                  
                  <td className="py-3 px-3 whitespace-nowrap">
                    <p className="font-bold text-gray-900 text-sm">{payment.memberId?.name || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">{payment.memberId?.mobile || 'N/A'}</p>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold block w-max mb-1">
                      {payment.planName || payment.memberId?.planName || 'Custom Plan'}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full block w-max ${
                      payment.paymentType === 'Registration' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {payment.paymentType}
                    </span>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-[11px] font-semibold border border-gray-200">
                      {payment.paymentMode || 'Cash'}
                    </span>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap font-bold text-green-600 text-sm">
                    <div className="flex flex-col items-start gap-1">
                      <span>₹{payment.amount}</span>
                      {payment.couponCode && (
                        <span className="text-[9px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-bold tracking-wider uppercase border border-green-200">
                          {payment.couponCode}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap text-sm">
                    {dueAmount > 0 ? (
                      <span className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                        ₹{dueAmount}
                      </span>
                    ) : (
                      <span className="font-semibold text-gray-400">₹0</span>
                    )}
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap text-gray-700 text-xs font-medium">
                    {dueAmount > 0 && payment.pendingDueDate 
                      ? <span className="text-red-600 font-bold">{new Date(payment.pendingDueDate).toLocaleDateString('en-GB')}</span> 
                      : <span className="text-gray-400">-</span>
                    }
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap text-gray-500 text-xs font-medium">
                    {new Date(payment.paymentDate).toLocaleDateString('en-GB')}
                  </td>
                  
                  <td className="py-3 px-3 whitespace-nowrap text-center space-x-2">
                    {dueAmount > 0 && (
                      <button 
                        onClick={() => openClearModal(payment)}
                        className="text-xs bg-red-600 text-white hover:bg-red-700 px-2.5 py-1 rounded-md font-bold transition inline-block mr-1"
                        title="Clear Dues"
                      >
                        Clear Dues
                      </button>
                    )}

                    <button 
                      onClick={() => handleDownloadInvoice(payment)} 
                      className="text-green-600 hover:bg-green-50 p-1.5 rounded-md transition border border-transparent hover:border-green-200 inline-block" 
                      title="Download Invoice"
                    >
                      <Download size={16} />
                    </button>
                    <button 
                      onClick={() => openEditModal(payment)}
                      className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition border border-transparent hover:border-blue-200 inline-block"
                      title="Edit Payment"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(payment._id)}
                      className="text-red-600 hover:bg-red-50 p-1.5 rounded-md transition border border-transparent hover:border-red-200 inline-block"
                      title="Delete Payment"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT PAYMENT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Payment Record</h3>
            
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Type</label>
                <select 
                  value={editType} 
                  onChange={(e) => setEditType(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
                >
                  <option value="Registration">Registration</option>
                  <option value="Renewal">Renewal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (₹)</label>
                <input 
                  type="number" 
                  value={editAmount} 
                  onChange={(e) => setEditAmount(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Mode</label>
                <select 
                  value={editMode} 
                  onChange={(e) => setEditMode(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm"
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Net Banking">Net Banking</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)} 
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CLEAR DUES MODAL */}
      {isClearModalOpen && clearingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Clear Pending Dues</h3>
            <p className="text-xs text-gray-500 mb-4">Member: {clearingPayment.memberId?.name}</p>
            
            <form onSubmit={handleClearDuesSubmit} className="space-y-4">
              <div className="bg-red-50 p-3 rounded-md border border-red-100 text-xs text-red-700 font-semibold">
                Total Outstanding Balance: ₹{clearingPayment.memberId?.pendingBalance || clearingPayment.pendingBalance}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Collection Amount (₹)</label>
                <input 
                  type="number" 
                  value={clearAmount} 
                  onChange={(e) => setClearAmount(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                  min="1"
                  max={clearingPayment.memberId?.pendingBalance || clearingPayment.pendingBalance}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Mode</label>
                <select 
                  value={clearMode} 
                  onChange={(e) => setClearMode(e.target.value)} 
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Net Banking">Net Banking</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsClearModalOpen(false)} 
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsList;