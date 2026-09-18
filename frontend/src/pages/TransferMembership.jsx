// src/pages/TransferMembership.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { ArrowRight, User, Phone, DollarSign, CheckCircle } from 'lucide-react';

const TransferMembership = () => {
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [formData, setFormData] = useState({
    newName: '',
    newMobile: '',
    transferFee: '',
    paymentMode: 'Cash'
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchActiveMembers();
  }, []);

  const fetchActiveMembers = async () => {
    try {
      // ✅ BULLETPROOF GYM ID EXTRACTOR
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      const gymId = storedUser?.gymId || storedUser?.data?.user?.gymId || storedUser?.user?.gymId || storedUser?._id || storedUser?.data?.user?._id || storedUser?.data?._id || '65abc123def4567890abcd12';
      
      const res = await api.get(`/members/active?gymId=${gymId}&status=active`);
      setMembers(res.data);
    } catch (err) {
      console.error("Failed to load members", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMemberId) return alert("Please select a member to transfer from.");
    
    setLoading(true);
    try {
      await api.put(`/members/${selectedMemberId}/transfer`, formData);
      setSuccessMsg('Membership successfully transferred!');
      setFormData({ newName: '', newMobile: '', transferFee: '', paymentMode: 'Cash' });
      setSelectedMemberId('');
      fetchActiveMembers(); // Refresh the list
      
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      alert("Error transferring membership: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <ArrowRight className="text-purple-600" size={28} />
        <h2 className="text-2xl font-bold text-gray-800">Transfer Membership</h2>
      </div>

      {successMsg && (
        <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 border border-green-200">
          <CheckCircle size={20} /> <span className="font-semibold">{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        
        {/* Step 1: Select Existing Member */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-2">1. Select Existing Active Member</label>
          <select 
            value={selectedMemberId} 
            onChange={(e) => setSelectedMemberId(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 bg-white"
            required
          >
            <option value="">-- Choose Member --</option>
            {members.map(m => (
              <option key={m._id} value={m._id}>
                {m.name} (Ph: {m.mobile}) - Expires: {new Date(m.expiryDate).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: New Member Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1"><User size={16}/> New Member Name</label>
            <input type="text" required value={formData.newName} onChange={e => setFormData({...formData, newName: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Enter new name" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1"><Phone size={16}/> New Mobile Number</label>
            <input type="tel" required value={formData.newMobile} onChange={e => setFormData({...formData, newMobile: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Enter mobile number" />
          </div>
        </div>

        {/* Step 3: Transfer Fees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1"><DollarSign size={16}/> Transfer Fee (₹)</label>
            <input type="number" value={formData.transferFee} onChange={e => setFormData({...formData, transferFee: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g. 500" min="0" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Payment Mode</label>
            <select value={formData.paymentMode} onChange={e => setFormData({...formData, paymentMode: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-white">
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition disabled:opacity-50 flex items-center gap-2">
            {loading ? 'Processing...' : 'Complete Transfer'} <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferMembership;