// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Users, Building2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await loginUser({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Invalid credentials. Please try again.'); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      
      {/* Left Brand Panel (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-20 transform -skew-x-12 scale-150"></div>
        
        <div className="relative z-10 p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-600 rounded-2xl shadow-xl">
              <Building2 size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
            Member Management Pro
          </h1>
          <p className="text-lg text-slate-300 max-w-md mx-auto">
            The all-in-one platform to manage your members, automate renewals, and grow your institution.
          </p>
          
          <div className="mt-12 flex justify-center gap-4 text-slate-400">
            <div className="flex items-center gap-2"><Users size={16}/> Academies</div>
            <div className="flex items-center gap-2"><Users size={16}/> Institutes</div>
            <div className="flex items-center gap-2"><Users size={16}/> Studios</div>
          </div>
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-slate-50 lg:bg-white">
        <div className="w-full max-w-md bg-white lg:bg-transparent p-8 lg:p-0 rounded-2xl shadow-sm lg:shadow-none border border-gray-100 lg:border-none">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-500 mt-2">Enter your credentials to access your dashboard.</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-md text-sm font-medium animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="email" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                  placeholder="admin@yourbusiness.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>
          
        </div>
      </div>
      
    </div>
  );
};

export default Login;








// import { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { loginUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       await loginUser({ email, password });
//       // The master dashboard router will handle dropping them into Gym vs Library
//       navigate('/dashboard'); 
//     } catch (err) {
//       setError(typeof err === 'string' ? err : 'Invalid credentials or server error.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
//       <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
        
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h2>
//           <p className="text-slate-500">Sign in to your management workspace</p>
//         </div>
        
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg flex items-center gap-3 text-sm font-medium">
//             <AlertCircle size={18} />
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-6">
          
//           <div>
//             <label className="block text-slate-700 text-sm font-bold mb-2">Email Address</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
//               <input 
//                 type="email" 
//                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
//                 placeholder="owner@business.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 disabled={isLoading}
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-slate-700 text-sm font-bold mb-2">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
//               <input 
//                 type="password" 
//                 className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 disabled={isLoading}
//               />
//             </div>
//           </div>

//           <button 
//             type="submit" 
//             disabled={isLoading}
//             className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex justify-center items-center gap-2 disabled:opacity-70"
//           >
//             {isLoading ? 'Authenticating...' : (
//               <>
//                 Sign In <LogIn size={18} />
//               </>
//             )}
//           </button>
//         </form>
        
//         <div className="mt-8 pt-6 border-t border-slate-100 text-center">
//           <p className="text-sm text-slate-500">
//             Secure multi-tenant workspace access.
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;