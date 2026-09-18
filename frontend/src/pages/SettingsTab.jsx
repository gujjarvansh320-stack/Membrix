// // src/pages/SettingsTab.jsx
// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import PlansManager from "./PlansManager";
// import CouponsManager from "./CouponsManager";
// import { UploadCloud, CheckCircle } from "lucide-react";

// const SettingsTab = () => {
//   const { user } = useContext(AuthContext);

//   // Deep search for current branding and info
//   const currentLogo = user?.gymLogo || user?.data?.gymLogo || null;
//   const currentName = user?.gymName || user?.data?.gymName || "";
//   const currentPhone = user?.phone || user?.data?.phone || "";
//   const currentAddress = user?.address || user?.data?.address || "";
//   // ✅ Extract current Terms & Conditions
//   const currentTerms = user?.termsAndConditions || user?.data?.termsAndConditions || "";

//   const [gymName, setGymName] = useState(currentName);
//   const [gymPhone, setGymPhone] = useState(currentPhone);
//   const [gymAddress, setGymAddress] = useState(currentAddress);
//   const [termsAndConditions, setTermsAndConditions] = useState(currentTerms); // ✅ New State
  
//   const [logoPreview, setLogoPreview] = useState(currentLogo);
//   const [logoFile, setLogoFile] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setLogoFile(file);
//       setLogoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMsg("");

//     const submitData = new FormData();
//     submitData.append("gymName", gymName);
//     submitData.append("phone", gymPhone);
//     submitData.append("address", gymAddress);
//     submitData.append("termsAndConditions", termsAndConditions); // ✅ Append T&C to payload

//     const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//     const currentUserId =
//       user?._id || user?.data?._id || storedUser?._id || storedUser?.data?._id;
//     const token =
//       user?.token || storedUser?.token || localStorage.getItem("token");

//     submitData.append("userId", currentUserId);

//     if (logoFile) {
//       submitData.append("logo", logoFile);
//     }

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/users/update-gym-profile",
//         {
//           method: "PUT",
//           headers: {
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           body: submitData,
//         },
//       );

//       if (!response.ok) throw new Error("Failed to upload to server.");

//       const data = await response.json();
//       const updatedUser = data.user;

//       // Bulletproof storage merge
//       if (storedUser.data) {
//         storedUser.data = { ...storedUser.data, ...updatedUser };
//       } else {
//         Object.assign(storedUser, updatedUser);
//       }

//       // Save it safely back to local storage
//       localStorage.setItem("user", JSON.stringify(storedUser));
//       setSuccessMsg("Gym profile updated successfully!");

//       // Reload page to force the sidebar and invoices to update with the new info
//       setTimeout(() => {
//         window.location.reload();
//       }, 1000);
//     } catch (error) {
//       console.error("Failed to update profile", error);
//       alert("Failed to update gym profile. Check the backend terminal.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* BRANDING SETTINGS */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">
//           Gym Profile & Branding
//         </h2>

//         {successMsg && (
//           <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center gap-2 text-sm font-medium">
//             <CheckCircle size={16} /> {successMsg}
//           </div>
//         )}

//         <form onSubmit={handleProfileSubmit} className="space-y-5">
//           <div className="flex flex-col sm:flex-row gap-6 items-start">
//             {/* Logo Uploader */}
//             <div className="w-full sm:w-1/3">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Gym Logo
//               </label>
//               <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition flex flex-col items-center justify-center cursor-pointer h-40 overflow-hidden">
//                 {logoPreview ? (
//                   <img
//                     src={logoPreview}
//                     alt="Logo"
//                     className="h-full object-contain"
//                   />
//                 ) : (
//                   <>
//                     <UploadCloud size={30} className="text-blue-500 mb-2" />
//                     <p className="text-xs text-gray-600 font-medium text-center">
//                       Click to upload logo
//                     </p>
//                   </>
//                 )}
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 />
//               </div>
//             </div>

//             {/* Inputs Area */}
//             <div className="w-full sm:w-2/3 space-y-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Gym Name
//                 </label>
//                 <input
//                   type="text"
//                   value={gymName}
//                   onChange={(e) => setGymName(e.target.value)}
//                   placeholder="e.g. FitLife Gym"
//                   className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     value={gymPhone}
//                     onChange={(e) => setGymPhone(e.target.value)}
//                     placeholder="e.g. 9876543210"
//                     className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">
//                     Gym Address
//                   </label>
//                   <input
//                     type="text"
//                     value={gymAddress}
//                     onChange={(e) => setGymAddress(e.target.value)}
//                     placeholder="e.g. 123 Fitness Ave, NY"
//                     className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   />
//                 </div>
//               </div>

//               {/* ✅ NEW: Terms and Conditions Textarea */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Custom Terms & Conditions
//                 </label>
//                 <textarea
//                   value={termsAndConditions}
//                   onChange={(e) => setTermsAndConditions(e.target.value)}
//                   placeholder="Enter your gym's specific rules and refund policies here..."
//                   className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 text-sm resize-none"
//                 />
//               </div>

//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition disabled:opacity-50"
//                 >
//                   {loading ? "Saving..." : "Save Branding"}
//                 </button>
//                 <p className="text-xs text-gray-400 mt-2">
//                   Changes will automatically update your dashboard sidebar and invoices.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>

//       <PlansManager />
      
//       <CouponsManager />
//     </div>
//   );
// };

// export default SettingsTab;













// // src/pages/SettingsTab.jsx
// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import PlansManager from "./PlansManager";
// import CouponsManager from "./CouponsManager";
// import { UploadCloud, CheckCircle, UserPlus } from "lucide-react";
// import api from "../api/axios";

// const SettingsTab = () => {
//   const { user } = useContext(AuthContext);

//   // Deep search for current branding and info
//   const currentLogo = user?.gymLogo || user?.data?.gymLogo || null;
//   const currentName = user?.gymName || user?.data?.gymName || "";
//   const currentPhone = user?.phone || user?.data?.phone || "";
//   const currentAddress = user?.address || user?.data?.address || "";
//   const currentTerms = user?.termsAndConditions || user?.data?.termsAndConditions || "";
//   const userRole = user?.role || user?.data?.role || "owner";

//   const [gymName, setGymName] = useState(currentName);
//   const [gymPhone, setGymPhone] = useState(currentPhone);
//   const [gymAddress, setGymAddress] = useState(currentAddress);
//   const [termsAndConditions, setTermsAndConditions] = useState(currentTerms);
  
//   const [logoPreview, setLogoPreview] = useState(currentLogo);
//   const [logoFile, setLogoFile] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");

//   // ✅ NEW: Staff Creation State
//   const [staffData, setStaffData] = useState({ name: '', email: '', password: '', phone: '', role: 'receptionist' });
//   const [staffLoading, setStaffLoading] = useState(false);
//   const [staffMsg, setStaffMsg] = useState("");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setLogoFile(file);
//       setLogoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMsg("");

//     const submitData = new FormData();
//     submitData.append("gymName", gymName);
//     submitData.append("phone", gymPhone);
//     submitData.append("address", gymAddress);
//     submitData.append("termsAndConditions", termsAndConditions);

//     const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//     const currentUserId = user?._id || user?.data?._id || storedUser?._id || storedUser?.data?._id;
//     const token = user?.token || storedUser?.token || localStorage.getItem("token");

//     submitData.append("userId", currentUserId);

//     if (logoFile) {
//       submitData.append("logo", logoFile);
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/users/update-gym-profile", {
//         method: "PUT",
//         headers: { ...(token && { Authorization: `Bearer ${token}` }) },
//         body: submitData,
//       });

//       if (!response.ok) throw new Error("Failed to upload to server.");

//       const data = await response.json();
//       const updatedUser = data.user;

//       if (storedUser.data) {
//         storedUser.data = { ...storedUser.data, ...updatedUser };
//       } else {
//         Object.assign(storedUser, updatedUser);
//       }

//       localStorage.setItem("user", JSON.stringify(storedUser));
//       setSuccessMsg("Gym profile updated successfully!");

//       setTimeout(() => {
//         window.location.reload();
//       }, 1000);
//     } catch (error) {
//       console.error("Failed to update profile", error);
//       alert("Failed to update gym profile. Check the backend terminal.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ NEW: Handle Staff Creation
//   const handleCreateStaff = async (e) => {
//     e.preventDefault();
//     setStaffLoading(true);
//     setStaffMsg("");
    
//     try {
//       // Define restricted permissions based on role[cite: 3]
//       const permissions = staffData.role === 'receptionist' ? ['members', 'enquiries'] : ['all'];
      
//       await api.post('/auth/create-staff', { ...staffData, permissions });
//       setStaffMsg("Staff account created successfully!");
//       setStaffData({ name: '', email: '', password: '', phone: '', role: 'receptionist' });
      
//       setTimeout(() => setStaffMsg(""), 3000);
//     } catch (error) {
//       alert(error.response?.data?.message || 'Failed to create staff account');
//     } finally {
//       setStaffLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
      
//       {/* BRANDING SETTINGS */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Gym Profile & Branding</h2>

//         {successMsg && (
//           <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center gap-2 text-sm font-medium">
//             <CheckCircle size={16} /> {successMsg}
//           </div>
//         )}

//         <form onSubmit={handleProfileSubmit} className="space-y-5">
//           <div className="flex flex-col sm:flex-row gap-6 items-start">
            
//             {/* Logo Uploader */}
//             <div className="w-full sm:w-1/3">
//               <label className="block text-sm font-semibold text-gray-700 mb-2">Gym Logo</label>
//               <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition flex flex-col items-center justify-center cursor-pointer h-40 overflow-hidden">
//                 {logoPreview ? (
//                   <img src={logoPreview} alt="Logo" className="h-full object-contain" />
//                 ) : (
//                   <>
//                     <UploadCloud size={30} className="text-blue-500 mb-2" />
//                     <p className="text-xs text-gray-600 font-medium text-center">Click to upload logo</p>
//                   </>
//                 )}
//                 <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
//               </div>
//             </div>

//             {/* Inputs Area */}
//             <div className="w-full sm:w-2/3 space-y-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Gym Name</label>
//                 <input type="text" value={gymName} onChange={(e) => setGymName(e.target.value)} placeholder="e.g. FitLife Gym" className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
//                   <input type="tel" value={gymPhone} onChange={(e) => setGymPhone(e.target.value)} placeholder="e.g. 9876543210" className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-1">Gym Address</label>
//                   <input type="text" value={gymAddress} onChange={(e) => setGymAddress(e.target.value)} placeholder="e.g. 123 Fitness Ave, NY" className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Custom Terms & Conditions</label>
//                 <textarea value={termsAndConditions} onChange={(e) => setTermsAndConditions(e.target.value)} placeholder="Enter your gym's specific rules and refund policies here..." className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 text-sm resize-none" />
//               </div>

//               <div className="pt-2">
//                 <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition disabled:opacity-50">
//                   {loading ? "Saving..." : "Save Branding"}
//                 </button>
//                 <p className="text-xs text-gray-400 mt-2">Changes will automatically update your dashboard sidebar and invoices.</p>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* ✅ NEW: STAFF MANAGEMENT UI */}
//       {userRole === 'owner' && (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//             <UserPlus size={24} className="text-blue-600" /> Create Staff Accounts
//           </h2>
          
//           {staffMsg && (
//             <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center gap-2 text-sm font-medium">
//               <CheckCircle size={16} /> {staffMsg}
//             </div>
//           )}

//           <form onSubmit={handleCreateStaff} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <input
//               type="text"
//               placeholder="Staff Name"
//               value={staffData.name}
//               onChange={(e) => setStaffData({...staffData, name: e.target.value})}
//               className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               required
//             />
//             <input
//               type="email"
//               placeholder="Staff Email"
//               value={staffData.email}
//               onChange={(e) => setStaffData({...staffData, email: e.target.value})}
//               className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Temporary Password"
//               value={staffData.password}
//               onChange={(e) => setStaffData({...staffData, password: e.target.value})}
//               className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//               required
//             />
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               value={staffData.phone}
//               onChange={(e) => setStaffData({...staffData, phone: e.target.value})}
//               className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <select
//               value={staffData.role}
//               onChange={(e) => setStaffData({...staffData, role: e.target.value})}
//               className="px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
//             >
//               <option value="receptionist">Receptionist</option>
//               <option value="trainer">Trainer</option>
//               <option value="admin">Admin</option>
//             </select>
            
//             <button
//               type="submit"
//               disabled={staffLoading}
//               className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-6 rounded-lg transition disabled:opacity-50"
//             >
//               {staffLoading ? "Creating..." : "Add Staff"}
//             </button>
//           </form>
//           <p className="text-xs text-gray-400 mt-3">Staff accounts will inherit your Gym ID and only have access to allowed tabs.</p>
//         </div>
//       )}

//       <PlansManager />
//       <CouponsManager />
//     </div>
//   );
// };

// export default SettingsTab;







// src/pages/SettingsTab.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PlansManager from "./PlansManager";
import CouponsManager from "./CouponsManager";
import { UploadCloud, CheckCircle } from "lucide-react";

const SettingsTab = () => {
  const { user } = useContext(AuthContext);

  // Deep search for current branding and info
  const currentLogo = user?.gymLogo || user?.data?.gymLogo || null;
  const currentName = user?.gymName || user?.data?.gymName || "";
  const currentPhone = user?.phone || user?.data?.phone || "";
  const currentAddress = user?.address || user?.data?.address || "";
  const currentTerms = user?.termsAndConditions || user?.data?.termsAndConditions || "";

  const [gymName, setGymName] = useState(currentName);
  const [gymPhone, setGymPhone] = useState(currentPhone);
  const [gymAddress, setGymAddress] = useState(currentAddress);
  const [termsAndConditions, setTermsAndConditions] = useState(currentTerms);
  
  const [logoPreview, setLogoPreview] = useState(currentLogo);
  const [logoFile, setLogoFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    const submitData = new FormData();
    submitData.append("gymName", gymName);
    submitData.append("phone", gymPhone);
    submitData.append("address", gymAddress);
    submitData.append("termsAndConditions", termsAndConditions);

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const currentUserId = user?._id || user?.data?._id || storedUser?._id || storedUser?.data?._id;
    const token = user?.token || storedUser?.token || localStorage.getItem("token");

    submitData.append("userId", currentUserId);

    if (logoFile) {
      submitData.append("logo", logoFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/update-gym-profile", {
        method: "PUT",
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        body: submitData,
      });

      if (!response.ok) throw new Error("Failed to upload to server.");

      const data = await response.json();
      const updatedUser = data.user;

      if (storedUser.data) {
        storedUser.data = { ...storedUser.data, ...updatedUser };
      } else {
        Object.assign(storedUser, updatedUser);
      }

      localStorage.setItem("user", JSON.stringify(storedUser));
      setSuccessMsg("Gym profile updated successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update gym profile. Check the backend terminal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* BRANDING SETTINGS */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Gym Profile & Branding</h2>

        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center gap-2 text-sm font-medium">
            <CheckCircle size={16} /> {successMsg}
          </div>
        )}

        <form onSubmit={handleProfileSubmit} className="space-y-5">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            
            {/* Logo Uploader */}
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gym Logo</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition flex flex-col items-center justify-center cursor-pointer h-40 overflow-hidden">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="h-full object-contain" />
                ) : (
                  <>
                    <UploadCloud size={30} className="text-blue-500 mb-2" />
                    <p className="text-xs text-gray-600 font-medium text-center">Click to upload logo</p>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
            </div>

            {/* Inputs Area */}
            <div className="w-full sm:w-2/3 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Gym Name</label>
                <input type="text" value={gymName} onChange={(e) => setGymName(e.target.value)} placeholder="e.g. FitLife Gym" className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" value={gymPhone} onChange={(e) => setGymPhone(e.target.value)} placeholder="e.g. 9876543210" className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Gym Address</label>
                  <input type="text" value={gymAddress} onChange={(e) => setGymAddress(e.target.value)} placeholder="e.g. 123 Fitness Ave, NY" className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Custom Terms & Conditions</label>
                <textarea value={termsAndConditions} onChange={(e) => setTermsAndConditions(e.target.value)} placeholder="Enter your gym's specific rules and refund policies here..." className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-24 text-sm resize-none" />
              </div>

              <div className="pt-2">
                <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition disabled:opacity-50">
                  {loading ? "Saving..." : "Save Branding"}
                </button>
                <p className="text-xs text-gray-400 mt-2">Changes will automatically update your dashboard sidebar and invoices.</p>
              </div>
            </div>
          </div>
        </form>
      </div>

      <PlansManager />
      <CouponsManager />
    </div>
  );
};

export default SettingsTab;