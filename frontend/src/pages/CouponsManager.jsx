// src/pages/CouponsManager.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Trash2, PlusCircle, Tag } from 'lucide-react';

const CouponsManager = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCoupon, setNewCoupon] = useState({ code: '', discountType: 'percentage', discountValue: '', expiryDate: '' });

  const getGymId = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    return user?._id || user?.data?._id || user?.gymId || user?.data?.gymId;
  };

  const fetchCoupons = async () => {
    try {
      const response = await api.get(`/coupons?gymId=${getGymId()}`);
      setCoupons(response.data);
    } catch (err) {
      console.error('Error fetching coupons:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCoupons(); }, []);

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      await api.post('/coupons/create', { ...newCoupon, gymId: getGymId() });
      setNewCoupon({ code: '', discountType: 'percentage', discountValue: '', expiryDate: '' });
      fetchCoupons();
    } catch (err) {
      alert('Failed to add coupon');
    }
  };

  const handleDeleteCoupon = async (id) => {
    if (window.confirm('Delete this coupon?')) {
      try {
        await api.delete(`/coupons/${id}`);
        fetchCoupons();
      } catch (err) {
        alert('Failed to delete coupon');
      }
    }
  };

  if (loading) return <div className="p-4">Loading coupons...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Tag size={24} className="text-blue-500" /> Manage Discount Coupons
      </h2>
      
      {/* Add New Coupon Form */}
      <form onSubmit={handleAddCoupon} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Code</label>
          <input type="text" value={newCoupon.code} onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} placeholder="e.g. SUMMER20" className="w-full px-3 py-2 border rounded-md uppercase" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
          <select value={newCoupon.discountType} onChange={(e) => setNewCoupon({...newCoupon, discountType: e.target.value})} className="w-full px-3 py-2 border rounded-md">
            <option value="percentage">% Percentage</option>
            <option value="fixed">₹ Fixed Amount</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Discount Value</label>
          <input type="number" value={newCoupon.discountValue} onChange={(e) => setNewCoupon({...newCoupon, discountValue: e.target.value})} placeholder="e.g. 20" className="w-full px-3 py-2 border rounded-md" required min="1" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Expiry Date</label>
          <input type="date" value={newCoupon.expiryDate} onChange={(e) => setNewCoupon({...newCoupon, expiryDate: e.target.value})} className="w-full px-3 py-2 border rounded-md" required />
        </div>
        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium h-10 transition">
          <PlusCircle size={18} /> Add
        </button>
      </form>

      {/* Coupons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map(coupon => (
          <div key={coupon._id} className="border border-dashed border-blue-300 bg-blue-50 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-blue-800 text-lg tracking-wider">{coupon.code}</h3>
              <p className="text-sm font-semibold text-blue-600 mt-1">
                {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
              </p>
              <p className="text-xs text-gray-500 mt-1">Valid till: {new Date(coupon.expiryDate).toLocaleDateString()}</p>
            </div>
            <button onClick={() => handleDeleteCoupon(coupon._id)} className="text-red-500 hover:bg-red-100 p-2 rounded-full transition">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponsManager;