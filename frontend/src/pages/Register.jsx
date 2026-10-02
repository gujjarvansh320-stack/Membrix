// // src/pages/Register.jsx
// import { useState, useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [orgType, setOrgType] = useState('gym'); 
//   const [softwarePlanTier, setSoftwarePlanTier] = useState('Basic Plan'); 
//   const [error, setError] = useState('');
  
//   const { registerUser } = useContext(AuthContext);
//   const navigate = useNavigate();

// // ✅ Automatically lock the plan if they select anything other than a gym
//   useEffect(() => {
//     if (orgType !== 'gym') {
//       setSoftwarePlanTier('Basic Plan');
//     }
//   }, [orgType]);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(''); 
    
//     try {
//       // 🚀 SEND softwarePlanTier TO THE BACKEND
//       await registerUser({ name, email, password, role: 'owner', plan: 'basic', orgType, softwarePlanTier });
//       navigate('/login');
//     } catch (err) {
//       setError(err);
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-50">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register Business</h2>
        
//         {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

//         <form onSubmit={handleRegister} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Owner Name</label>
//             <input 
//               type="text" 
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Owner Email</label>
//             <input 
//               type="email" 
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
          
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//             <input 
//               type="password" 
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               minLength="6"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Business Type</label>
//             <select 
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//               value={orgType}
//               onChange={(e) => setOrgType(e.target.value)}
//             >
//               <option value="gym">Gym & Fitness</option>
//               <option value="library">Library</option>
//               <option value="coaching">Coaching Institute</option>
//               <option value="dance">Dance Academy</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Software Plan Tier</label>
//             <select 
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//               value={softwarePlanTier}
//               onChange={(e) => setSoftwarePlanTier(e.target.value)}
//             >
//               <option value="Basic Plan">Basic Plan</option>
//               {/* ✅ Only show the Advance plan if Gym is selected */}
//               {orgType === 'gym' && (
//                 <option value="Advance Plan">Advance Plan</option>
//               )}
//             </select>
//           </div>

//           <button 
//             type="submit" 
//             className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 mt-2"
//           >
//             Create Owner Account
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;









// src/pages/Register.jsx
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner'; // 👈 Imported toast from sonner

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgType, setOrgType] = useState('gym'); 
  const [softwarePlanTier, setSoftwarePlanTier] = useState('Basic Plan'); 
  
  // 👈 Replaced error state with isLoading for better UX
  const [isLoading, setIsLoading] = useState(false);
  
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
    setIsLoading(true);
    
    // 👈 1. Trigger a loading toast when submission starts
    const toastId = toast.loading('Creating business account...');
    
    try {
      // 🚀 SEND softwarePlanTier TO THE BACKEND
      await registerUser({ name, email, password, role: 'owner', plan: 'basic', orgType, softwarePlanTier });
      
      // 👈 2. Show success toast and redirect
      toast.success('Registration successful! Please log in.', { id: toastId });
      navigate('/login');
    } catch (err) {
      // 👈 3. Show error toast if registration fails
      const errorMessage = typeof err === 'string' ? err : err?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register Business</h2>
        
        {/* 👈 Removed the inline error div entirely */}

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
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {/* 👈 Added loading text state */}
            {isLoading ? 'Creating Account...' : 'Create Owner Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;