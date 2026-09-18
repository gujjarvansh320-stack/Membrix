// // src/context/AuthContext.jsx
// import { createContext, useState, useEffect } from 'react';
// import api from '../api/axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const storedUser = localStorage.getItem('user');

//     if (token) {
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       if (storedUser && storedUser !== 'undefined') {
//         try {
//           setUser(JSON.parse(storedUser));
//         } catch (e) {
//           setUser({ token });
//         }
//       } else {
//         setUser({ token });
//       }
//     }
//     setLoading(false);
//   }, []);

//   const registerUser = async (userData) => {
//     try {
//       const response = await api.post('/auth/register', userData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data?.message || 'Registration failed';
//     }
//   };

//   const loginUser = async (credentials) => {
//     try {
//       const response = await api.post('/auth/login', credentials);
      
//       // ✅ FIX: Match your controller's nested response structure: response.data.data
//       const responseData = response.data.data || response.data;
//       const token = responseData.token;
//       const userData = responseData.user;
      
//       if (token) {
//         localStorage.setItem('token', token);
//         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       }

//       if (userData) {
//         // Normalize id to _id so your components can find it easily
//         const normalizedUser = { 
//           ...userData, 
//           _id: userData._id || userData.id, 
//           token 
//         };
//         localStorage.setItem('user', JSON.stringify(normalizedUser));
//         setUser(normalizedUser);
//       } else if (token) {
//         const fallbackUser = { token };
//         localStorage.setItem('user', JSON.stringify(fallbackUser));
//         setUser(fallbackUser);
//       }
      
//       return response.data;
//     } catch (error) {
//       throw error.response?.data?.message || 'Login failed';
//     }
//   };

//   const logoutUser = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     delete api.defaults.headers.common['Authorization'];
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, registerUser, loginUser, logoutUser }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };













// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      if (storedUser && storedUser !== 'undefined') {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          setUser({ token });
        }
      } else {
        setUser({ token });
      }
    }
    setLoading(false);
  }, []);

  const registerUser = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed';
    }
  };

  const loginUser = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Match your controller's nested response structure: response.data.data
      const responseData = response.data.data || response.data;
      const token = responseData.token;
      const userData = responseData.user;
      
      if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      if (userData) {
        // Normalize id to _id so your components can find it easily
        const normalizedUser = { 
          ...userData, 
          _id: userData._id || userData.id, 
          token 
        };
        localStorage.setItem('user', JSON.stringify(normalizedUser));
        setUser(normalizedUser);
      } else if (token) {
        const fallbackUser = { token };
        localStorage.setItem('user', JSON.stringify(fallbackUser));
        setUser(fallbackUser);
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, registerUser, loginUser, logoutUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;