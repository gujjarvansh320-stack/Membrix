// src/pages/PlansManager.jsx
import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Trash2, PlusCircle } from 'lucide-react';

const PlansManager = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [newPlan, setNewPlan] = useState({
    name: '',
    durationInMonths: '',
    price: ''
  });

  const fetchPlans = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      const gymId = user?._id || user?.data?._id || user?.gymId || user?.data?.gymId;
      const response = await api.get(`/plans?gymId=${gymId}`);
      setPlans(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError('Failed to load plans.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleInputChange = (e) => {
    setNewPlan({ ...newPlan, [e.target.name]: e.target.value });
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      const gymId = user?._id || user?.data?._id || user?.gymId || user?.data?.gymId;
      
      await api.post('/plans', { ...newPlan, gymId });
      setNewPlan({ name: '', durationInMonths: '', price: '' }); // Reset form
      fetchPlans(); // Refresh the list
    } catch (err) {
      console.error('Error adding plan:', err);
      alert('Failed to add plan');
    }
  };

  const handleDeletePlan = async (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await api.delete(`/plans/${id}`);
        fetchPlans(); // Refresh the list
      } catch (err) {
        console.error('Error deleting plan:', err);
        alert('Failed to delete plan');
      }
    }
  };

  if (loading) return <div className="p-4">Loading plans...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Manage Membership Plans</h2>
      
      {/* Add New Plan Form */}
      <form onSubmit={handleAddPlan} className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Plan Name</label>
          <input type="text" name="name" value={newPlan.name} onChange={handleInputChange} placeholder="e.g. 3 Months Pro" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
        </div>
        <div className="w-full md:w-32">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Months</label>
          <input type="number" name="durationInMonths" value={newPlan.durationInMonths} onChange={handleInputChange} placeholder="e.g. 3" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" required min="1" />
        </div>
        <div className="w-full md:w-40">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹)</label>
          <input type="number" name="price" value={newPlan.price} onChange={handleInputChange} placeholder="e.g. 4000" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" required min="0" />
        </div>
        <button type="submit" className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition h-10">
          <PlusCircle size={18} /> Add Plan
        </button>
      </form>

      {/* List of Existing Plans */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {plans.length === 0 ? (
        <p className="text-gray-500 text-center py-4 border-2 border-dashed rounded-lg">No plans created yet. Add one above!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map(plan => (
            <div key={plan._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition">
              <div>
                <h3 className="font-bold text-gray-800">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.durationInMonths} Month{plan.durationInMonths > 1 ? 's' : ''}</p>
                <p className="text-lg font-bold text-green-600 mt-1">₹{plan.price}</p>
              </div>
              <button onClick={() => handleDeletePlan(plan._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition" title="Delete Plan">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlansManager;