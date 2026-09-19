// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';

// // Public website components/pages
// import Home from './pages/Home.jsx';
// import Industries from './components/Industries.jsx';
// import Pricing from './components/Pricing.jsx';
// import Contact from './components/Contact.jsx';

// // Authentication & application pages
// import Login from './pages/Login.jsx';
// import Register from './pages/Register.jsx';
// import Dashboard from './pages/Dashboard.jsx';
// import CreateGym from './pages/CreateGym.jsx';

// // Route protection
// import ProtectedRoute from './components/ProtectedRoute.jsx';

// function App() {
//   return (
//     <Router>
//       <Routes>

//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/industries" element={<Industries />} />
//         <Route path="/pricing" element={<Pricing />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* Login */}
//         <Route path="/login" element={<Login />} />

//         {/* Secret Admin Registration */}
//         <Route
//           path="/admin-secret-register"
//           element={<Register />}
//         />

//         {/* Protected Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Protected Create Gym */}
//         <Route
//           path="/create-gym"
//           element={
//             <ProtectedRoute>
//               <CreateGym />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>
//     </Router>
//   );
// }

// export default App;





import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Public website components/pages
import Home from './pages/Home.jsx';
import Industries from './components/Industries.jsx';
import Pricing from './components/Pricing.jsx';
import Contact from './components/Contact.jsx';

// Authentication & application pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CreateGym from './pages/CreateGym.jsx';
import MobileCapture from './pages/MobileCapture.jsx'; // 👈 Added Import

// Route protection
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Secret Admin Registration */}
        <Route
          path="/admin-secret-register"
          element={<Register />}
        />

        {/* Mobile Camera Photo Sync Route */}
        <Route 
          path="/capture/:sessionId" 
          element={<MobileCapture />} 
        /> {/* 👈 Added Route for QR code scanning */}

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Create Gym */}
        <Route
          path="/create-gym"
          element={
            <ProtectedRoute>
              <CreateGym />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;