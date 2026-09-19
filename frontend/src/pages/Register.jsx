// src/pages/Register.jsx
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgType, setOrgType] = useState('gym'); 
  const [softwarePlanTier, setSoftwarePlanTier] = useState('Basic Plan'); 
  const [error, setError] = useState('');
  
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

// ✅ Automatically lock the plan if they select anything other than a gym
  useEffect(() => {
    if (orgType !== 'gym') {
      setSoftwarePlanTier('Basic Plan');
    }
  }, [orgType]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); 
    
    try {
      // 🚀 SEND softwarePlanTier TO THE BACKEND
      await registerUser({ name, email, password, role: 'owner', plan: 'basic', orgType, softwarePlanTier });
      navigate('/login');
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register Business</h2>
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Owner Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Owner Email</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Business Type</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={orgType}
              onChange={(e) => setOrgType(e.target.value)}
            >
              <option value="gym">Gym & Fitness</option>
              <option value="library">Library</option>
              <option value="coaching">Coaching Institute</option>
              <option value="dance">Dance Academy</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Software Plan Tier</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={softwarePlanTier}
              onChange={(e) => setSoftwarePlanTier(e.target.value)}
            >
              <option value="Basic Plan">Basic Plan</option>
              {/* ✅ Only show the Advance plan if Gym is selected */}
              {orgType === 'gym' && (
                <option value="Advance Plan">Advance Plan</option>
              )}
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 mt-2"
          >
            Create Owner Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;