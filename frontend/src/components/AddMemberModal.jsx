// // src/components/AddMemberModal.jsx
// import { useState, useContext, useRef, useCallback, useEffect } from "react";
// import { X, UploadCloud, Camera, Tag, Smartphone, RefreshCw } from "lucide-react";
// import Webcam from "react-webcam";
// import { QRCodeSVG } from "qrcode.react";
// import api from "../api/axios";
// import { AuthContext } from "../context/AuthContext";

// const AddMemberModal = ({ isOpen, onClose, onSuccess }) => {
//   const { user } = useContext(AuthContext);
//   const webcamRef = useRef(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     dob: "",
//     gender: "",
//     address: "",
//     aadharNumber: "",
//     expiryDate: "",
//     amountPaid: "",
//     photo: null,
//     photoUrl: "", // ✅ ADDED: To store the URL if taken via phone
//     dueDate: "",
//     paymentMode: "Cash",
//   });

//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isCameraOpen, setIsCameraOpen] = useState(false);
//   const [photoPreview, setPhotoPreview] = useState(null);

//   // ✅ NEW: Phone Sync States
//   const [isQrOpen, setIsQrOpen] = useState(false);
//   const [syncSessionId, setSyncSessionId] = useState("");
//   const [isPolling, setIsPolling] = useState(false);

//   // Coupon & Pricing States
//   const [couponCode, setCouponCode] = useState("");
//   const [couponMessage, setCouponMessage] = useState({ text: "", type: "" });
//   const [basePrice, setBasePrice] = useState(0);
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [selectedPlanName, setSelectedPlanName] = useState("Custom Plan");

//   // BULLETPROOF GYM ID EXTRACTOR FOR STAFF AND OWNERS
//   const getOwnerGymId = () => {
//     const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//     return (
//       storedUser?.gymId || storedUser?.data?.user?.gymId || storedUser?.user?.gymId || 
//       user?.gymId || user?.data?.gymId || 
//       storedUser?._id || storedUser?.data?.user?._id || user?._id ||
//       "65abc123def4567890abcd12"
//     );
//   };

//   useEffect(() => {
//     if (isOpen) {
//       const fetchPlans = async () => {
//         try {
//           const gymId = getOwnerGymId();
//           const response = await api.get(`/plans?gymId=${gymId}`);
//           setPlans(response.data);
//         } catch (err) {
//           console.error("Error fetching plans for modal:", err);
//         }
//       };
//       fetchPlans();
//     }
//   }, [isOpen, user]);

//   // ✅ NEW: Polling Hook to check for phone upload
//   useEffect(() => {
//     let interval;
//     if (isPolling && syncSessionId) {
//       interval = setInterval(async () => {
//         try {
//           const response = await api.get(`/members/temp-photo/${syncSessionId}`);
//           if (response.data?.uploaded) {
//             setPhotoPreview(response.data.photoUrl);
//             setFormData((prev) => ({ ...prev, photo: null, photoUrl: response.data.photoUrl }));
//             setIsPolling(false);
//             setIsQrOpen(false);
//           }
//         } catch (err) {
//           console.error("Polling error:", err);
//         }
//       }, 2000);
//     }
//     return () => clearInterval(interval);
//   }, [isPolling, syncSessionId]);

//   const handlePlanChange = (e) => {
//     const selectedPlanId = e.target.value;
//     if (!selectedPlanId) {
//       setFormData((prev) => ({ ...prev, amountPaid: "", expiryDate: "", dueDate: "", paymentMode: "Cash" }));
//       setBasePrice(0);
//       setDiscountAmount(0);
//       setCouponMessage({ text: "", type: "" });
//       setCouponCode("");
//       setSelectedPlanName("Custom Plan");
//       return;
//     }

//     const plan = plans.find((p) => p._id === selectedPlanId);
//     if (plan) {
//       const date = new Date();
//       date.setMonth(date.getMonth() + plan.durationInMonths);
//       const calculatedExpiry = date.toISOString().split("T")[0];

//       setBasePrice(plan.price);
//       setDiscountAmount(0);
//       setCouponMessage({ text: "", type: "" });
//       setCouponCode("");
//       setSelectedPlanName(plan.name);

//       setFormData((prev) => ({
//         ...prev,
//         amountPaid: plan.price,
//         expiryDate: calculatedExpiry,
//         dueDate: "",
//         paymentMode: "Cash",
//       }));
//     }
//   };

//   const applyCoupon = async () => {
//     if (!couponCode || !basePrice) {
//       setCouponMessage({ text: "Please select a plan and enter a code first.", type: "error" });
//       return;
//     }
//     try {
//       const gymId = getOwnerGymId();
//       const res = await api.post("/coupons/validate", { gymId, code: couponCode });

//       const coupon = res.data.data;
//       let newPrice = basePrice;

//       if (coupon.discountType === "percentage") {
//         newPrice = basePrice - basePrice * (coupon.discountValue / 100);
//       } else {
//         newPrice = basePrice - coupon.discountValue;
//       }

//       const finalPrice = Math.max(0, newPrice);
//       const discountSaved = basePrice - finalPrice;

//       setDiscountAmount(discountSaved);
//       setFormData((prev) => ({ ...prev, amountPaid: finalPrice }));
//       setCouponMessage({
//         text: `Coupon applied successfully! Discount: ₹${discountSaved.toFixed(0)}`,
//         type: "success",
//       });
//     } catch (err) {
//       setCouponMessage({ text: err.response?.data?.message || "Invalid coupon code", type: "error" });
//       setFormData((prev) => ({ ...prev, amountPaid: basePrice }));
//       setDiscountAmount(0);
//     }
//   };

//   const dataURLtoFile = (dataurl, filename) => {
//     let arr = dataurl.split(","),
//       mime = arr[0].match(/:(.*?);/)[1],
//       bstr = atob(arr[1]),
//       n = bstr.length,
//       u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], filename, { type: mime });
//   };

//   const capturePhoto = useCallback(() => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (imageSrc) {
//       setPhotoPreview(imageSrc);
//       const file = dataURLtoFile(imageSrc, "webcam-capture.jpg");
//       setFormData((prevData) => ({ ...prevData, photo: file, photoUrl: "" })); // Clear URL if camera used
//       setIsCameraOpen(false);
//     }
//   }, []);

//   // ✅ NEW: Start Phone Sync Session
//   const startPhoneSync = () => {
//     const newSessionId = `gym_reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
//     setSyncSessionId(newSessionId);
//     setIsQrOpen(true);
//     setIsCameraOpen(false);
//     setIsPolling(true);
//   };

//   if (!isOpen) return null;

//   const handleClose = () => {
//     setFormData({
//       name: "", mobile: "", email: "", dob: "", gender: "",
//       address: "", aadharNumber: "", expiryDate: "", amountPaid: "",
//       photo: null, photoUrl: "", dueDate: "", paymentMode: "Cash",
//     });
//     setPhotoPreview(null);
//     setIsCameraOpen(false);
//     setIsQrOpen(false);
//     setIsPolling(false);
//     setError("");
//     setCouponCode("");
//     setCouponMessage({ text: "", type: "" });
//     setBasePrice(0);
//     setDiscountAmount(0);
//     setSelectedPlanName("Custom Plan");
//     onClose();
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, photo: file, photoUrl: "" }); // Clear URL if file uploaded
//       setPhotoPreview(URL.createObjectURL(file));
//     }
//   };

//   const pendingBalance = Math.max(0, basePrice - discountAmount - Number(formData.amountPaid || 0));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     // ✅ UPDATE: Accept either photo (File) or photoUrl (String from phone)
//     if (!formData.photo && !formData.photoUrl) {
//       setError("Please capture or upload a photo first.");
//       setLoading(false);
//       return;
//     }

//     const currentGymId = getOwnerGymId();
//     const calculatedDiscount = Math.max(0, basePrice - Number(formData.amountPaid));

//     const submitData = new FormData();
//     submitData.append("name", formData.name);
//     submitData.append("mobile", formData.mobile);
//     submitData.append("email", formData.email);
//     submitData.append("dob", formData.dob);
//     submitData.append("gender", formData.gender);
//     submitData.append("address", formData.address);
//     submitData.append("aadharNumber", formData.aadharNumber);
//     submitData.append("expiryDate", formData.expiryDate);
//     submitData.append("amountPaid", formData.amountPaid);
//     submitData.append("gymId", currentGymId);
//     submitData.append("couponCode", couponCode);
//     submitData.append("planName", selectedPlanName);
//     submitData.append("discountAmount", calculatedDiscount);
//     submitData.append("pendingBalance", pendingBalance);
//     submitData.append("pendingDueDate", pendingBalance > 0 ? formData.dueDate : "");
//     submitData.append("paymentMode", formData.paymentMode);

//     // ✅ UPDATE: Append the correct image format
//     if (formData.photo) {
//       submitData.append("photo", formData.photo);
//     } else if (formData.photoUrl) {
//       submitData.append("photoUrl", formData.photoUrl);
//     }

//     try {
//       await api.post("/members/register", submitData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       handleClose();
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       console.error("Error saving member:", err);
//       setError(err.response?.data?.message || "Failed to register member");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55 transition-opacity p-4">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
//         <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 shrink-0">
//           <h3 className="text-lg font-bold text-gray-800">Register New Member</h3>
//           <button onClick={handleClose} className="text-gray-400 hover:text-red-500 transition">
//             <X size={20} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
//           {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm font-medium">{error}</div>}

//           {/* ✅ UPDATED PHOTO UPLOAD SECTION */}
//           <div className="space-y-3">
//             <label className="block text-sm font-semibold text-gray-700">Member Photo</label>
            
//             {isQrOpen ? (
//               <div className="flex flex-col items-center bg-gray-50 border-2 border-dashed border-blue-400 rounded-xl p-6 text-center">
//                 <QRCodeSVG value={`${window.location.origin}/capture/${syncSessionId}`} size={160} level="M" />
//                 <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-700">
//                   <RefreshCw size={16} className="animate-spin" />
//                   Waiting for photo from phone...
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">Scan using any phone camera to snap photo</p>
//                 <button type="button" onClick={() => { setIsQrOpen(false); setIsPolling(false); }} className="mt-4 text-xs text-red-600 hover:underline font-semibold">
//                   Cancel
//                 </button>
//               </div>
//             ) : isCameraOpen ? (
//               <div className="flex flex-col items-center bg-gray-900 rounded-lg overflow-hidden">
//                 <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full object-cover max-h-48" />
//                 <div className="p-3 flex gap-4 w-full justify-center bg-gray-800">
//                   <button type="button" onClick={capturePhoto} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold text-sm transition">Snap Photo</button>
//                   <button type="button" onClick={() => setIsCameraOpen(false)} className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-full font-semibold text-sm transition">Cancel</button>
//                 </div>
//               </div>
//             ) : photoPreview ? (
//               <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden flex justify-center bg-gray-50">
//                 <img src={photoPreview} alt="Preview" className="h-48 object-cover" />
//                 <button type="button" onClick={() => { setPhotoPreview(null); setFormData({ ...formData, photo: null, photoUrl: "" }); }} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600">
//                   <X size={16} />
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-3 gap-3">
//                 <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
//                   <UploadCloud size={24} className="text-blue-500 mb-1" />
//                   <p className="text-xs text-gray-600 font-medium text-center">Upload File</p>
//                   <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
//                 </div>
                
//                 <button type="button" onClick={() => setIsCameraOpen(true)} className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-blue-50 transition cursor-pointer text-blue-600">
//                   <Camera size={24} className="mb-1" />
//                   <p className="text-xs font-medium text-center">Open Camera</p>
//                 </button>
                
//                 <button type="button" onClick={startPhoneSync} className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-purple-50 transition cursor-pointer text-purple-600">
//                   <Smartphone size={24} className="mb-1" />
//                   <p className="text-xs font-medium text-center">Use Phone</p>
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
//               <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" required />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
//               <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" required />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
//               <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
//               <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm">
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
//               <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-1">ID Number</label>
//               <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} placeholder="XXXX-XXXX-XXXX" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">Residential Address</label>
//             <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street, City, Pincode" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">Select Membership Plan</label>
//             <select onChange={handlePlanChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm">
//               <option value="">-- Choose a custom plan --</option>
//               {plans.map((plan) => (
//                 <option key={plan._id} value={plan._id}>
//                   {plan.name} ({plan.durationInMonths} Mo) - ₹{plan.price}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {basePrice > 0 && (
//             <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
//               <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
//                 <Tag size={12} className="text-blue-500" /> Have a Promo Code?
//               </label>
//               <div className="flex gap-2">
//                 <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="Enter Code" className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 uppercase text-sm" />
//                 <button type="button" onClick={applyCoupon} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
//                   Apply
//                 </button>
//               </div>
//               {couponMessage.text && <p className={`mt-2 text-xs font-semibold ${couponMessage.type === "success" ? "text-green-600" : "text-red-600"}`}>{couponMessage.text}</p>}
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry Date</label>
//               <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" required />
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-1">
//                 Amount Paid (₹)
//                 {discountAmount > 0 && <span className="text-gray-400 line-through ml-1 font-normal text-[10px]">₹{basePrice}</span>}
//               </label>
//               <input type="number" name="amountPaid" value={formData.amountPaid} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" required min="0" />
//             </div>
//             <div>
//               <label className="block text-xs font-semibold text-gray-700 mb-1">Payment Mode</label>
//               <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm" required>
//                 <option value="Cash">Cash</option>
//                 <option value="UPI">UPI</option>
//                 <option value="Card">Card</option>
//                 <option value="Net Banking">Net Banking</option>
//               </select>
//             </div>
//           </div>

//           {pendingBalance > 0 && <p className="text-xs text-red-600 font-bold mt-1 text-right">Due Balance: ₹{pendingBalance.toFixed(0)}</p>}

//           {pendingBalance > 0 && (
//             <div className="bg-red-50 p-3 rounded-lg border border-red-200 mt-2">
//               <label className="block text-xs font-bold text-red-700 mb-1">Clear Dues By (Due Date)</label>
//               <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full px-3 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-500 text-sm bg-white" required />
//             </div>
//           )}

//           <div className="pt-4 shrink-0">
//             <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 text-sm">
//               {loading ? "Processing..." : "Register Member"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddMemberModal;








// src/components/AddMemberModal.jsx
import { useState, useContext, useRef, useCallback, useEffect } from "react";
import { X, UploadCloud, Camera, Tag, Smartphone, RefreshCw } from "lucide-react";
import Webcam from "react-webcam";
import { QRCodeSVG } from "qrcode.react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const AddMemberModal = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const webcamRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
    address: "",
    aadharNumber: "",
    expiryDate: "",
    amountPaid: "",
    photo: null,
    photoUrl: "", 
    dueDate: "",
    paymentMode: "Cash",
  });

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Phone Sync States
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [syncSessionId, setSyncSessionId] = useState("");
  const [isPolling, setIsPolling] = useState(false);

  // Coupon & Pricing States
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState({ text: "", type: "" });
  const [basePrice, setBasePrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedPlanName, setSelectedPlanName] = useState("Custom Plan");

  // BULLETPROOF GYM ID EXTRACTOR FOR STAFF AND OWNERS
  const getOwnerGymId = () => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    return (
      storedUser?.gymId || storedUser?.data?.user?.gymId || storedUser?.user?.gymId || 
      user?.gymId || user?.data?.gymId || 
      storedUser?._id || storedUser?.data?.user?._id || user?._id ||
      "65abc123def4567890abcd12"
    );
  };

  useEffect(() => {
    if (isOpen) {
      const fetchPlans = async () => {
        try {
          const gymId = getOwnerGymId();
          const response = await api.get(`/plans?gymId=${gymId}`);
          setPlans(response.data);
        } catch (err) {
          console.error("Error fetching plans for modal:", err);
        }
      };
      fetchPlans();
    }
  }, [isOpen, user]);

  // ✅ FIXED: Polling Hook with Timeout and Silent 404 Handling
  useEffect(() => {
    let interval;
    let attempts = 0;
    const MAX_ATTEMPTS = 150; // Automatically stop polling after 5 minutes (150 * 2s)

    if (isPolling && syncSessionId) {
      interval = setInterval(async () => {
        attempts++;
        if (attempts >= MAX_ATTEMPTS) {
          setIsPolling(false);
          setIsQrOpen(false);
          setError("Phone sync timed out. Please try again.");
          clearInterval(interval);
          return;
        }

        try {
          // Tell Axios NOT to throw an error for a 404 (Not Found yet) response
          const response = await api.get(`/members/temp-photo/${syncSessionId}`, {
            validateStatus: (status) => status >= 200 && status < 500
          });
          
          if (response.status === 200 && response.data?.uploaded) {
            setPhotoPreview(response.data.photoUrl);
            setFormData((prev) => ({ ...prev, photo: null, photoUrl: response.data.photoUrl }));
            setIsPolling(false);
            setIsQrOpen(false);
          }
        } catch (err) {
          // Only logs actual server crashes or network disconnections now
          console.error("Polling network error:", err);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPolling, syncSessionId]);

  const handlePlanChange = (e) => {
    const selectedPlanId = e.target.value;
    if (!selectedPlanId) {
      setFormData((prev) => ({ ...prev, amountPaid: "", expiryDate: "", dueDate: "", paymentMode: "Cash" }));
      setBasePrice(0);
      setDiscountAmount(0);
      setCouponMessage({ text: "", type: "" });
      setCouponCode("");
      setSelectedPlanName("Custom Plan");
      return;
    }

    const plan = plans.find((p) => p._id === selectedPlanId);
    if (plan) {
      const date = new Date();
      date.setMonth(date.getMonth() + plan.durationInMonths);
      const calculatedExpiry = date.toISOString().split("T")[0];

      setBasePrice(plan.price);
      setDiscountAmount(0);
      setCouponMessage({ text: "", type: "" });
      setCouponCode("");
      setSelectedPlanName(plan.name);

      setFormData((prev) => ({
        ...prev,
        amountPaid: plan.price,
        expiryDate: calculatedExpiry,
        dueDate: "",
        paymentMode: "Cash",
      }));
    }
  };

  const applyCoupon = async () => {
    if (!couponCode || !basePrice) {
      setCouponMessage({ text: "Please select a plan and enter a code first.", type: "error" });
      return;
    }
    try {
      const gymId = getOwnerGymId();
      const res = await api.post("/coupons/validate", { gymId, code: couponCode });

      const coupon = res.data.data;
      let newPrice = basePrice;

      if (coupon.discountType === "percentage") {
        newPrice = basePrice - basePrice * (coupon.discountValue / 100);
      } else {
        newPrice = basePrice - coupon.discountValue;
      }

      const finalPrice = Math.max(0, newPrice);
      const discountSaved = basePrice - finalPrice;

      setDiscountAmount(discountSaved);
      setFormData((prev) => ({ ...prev, amountPaid: finalPrice }));
      setCouponMessage({
        text: `Coupon applied successfully! Discount: ₹${discountSaved.toFixed(0)}`,
        type: "success",
      });
    } catch (err) {
      setCouponMessage({ text: err.response?.data?.message || "Invalid coupon code", type: "error" });
      setFormData((prev) => ({ ...prev, amountPaid: basePrice }));
      setDiscountAmount(0);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhotoPreview(imageSrc);
      const file = dataURLtoFile(imageSrc, "webcam-capture.jpg");
      setFormData((prevData) => ({ ...prevData, photo: file, photoUrl: "" }));
      setIsCameraOpen(false);
    }
  }, []);

  const startPhoneSync = () => {
    const newSessionId = `gym_reg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setSyncSessionId(newSessionId);
    setIsQrOpen(true);
    setIsCameraOpen(false);
    setIsPolling(true);
  };

  if (!isOpen) return null;

  const handleClose = () => {
    setFormData({
      name: "", mobile: "", email: "", dob: "", gender: "",
      address: "", aadharNumber: "", expiryDate: "", amountPaid: "",
      photo: null, photoUrl: "", dueDate: "", paymentMode: "Cash",
    });
    setPhotoPreview(null);
    setIsCameraOpen(false);
    setIsQrOpen(false);
    setIsPolling(false);
    setError("");
    setCouponCode("");
    setCouponMessage({ text: "", type: "" });
    setBasePrice(0);
    setDiscountAmount(0);
    setSelectedPlanName("Custom Plan");
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file, photoUrl: "" });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const pendingBalance = Math.max(0, basePrice - discountAmount - Number(formData.amountPaid || 0));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.photo && !formData.photoUrl) {
      setError("Please capture or upload a photo first.");
      setLoading(false);
      return;
    }

    const currentGymId = getOwnerGymId();
    const calculatedDiscount = Math.max(0, basePrice - Number(formData.amountPaid));

    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("mobile", formData.mobile);
    submitData.append("email", formData.email);
    submitData.append("dob", formData.dob);
    submitData.append("gender", formData.gender);
    submitData.append("address", formData.address);
    submitData.append("aadharNumber", formData.aadharNumber);
    submitData.append("expiryDate", formData.expiryDate);
    submitData.append("amountPaid", formData.amountPaid);
    submitData.append("gymId", currentGymId);
    submitData.append("couponCode", couponCode);
    submitData.append("planName", selectedPlanName);
    submitData.append("discountAmount", calculatedDiscount);
    submitData.append("pendingBalance", pendingBalance);
    submitData.append("pendingDueDate", pendingBalance > 0 ? formData.dueDate : "");
    submitData.append("paymentMode", formData.paymentMode);

    if (formData.photo) {
      submitData.append("photo", formData.photo);
    } else if (formData.photoUrl) {
      submitData.append("photoUrl", formData.photoUrl);
    }

    try {
      await api.post("/members/register", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      handleClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error saving member:", err);
      setError(err.response?.data?.message || "Failed to register member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55 transition-opacity p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50 shrink-0">
          <h3 className="text-lg font-bold text-gray-800">Register New Member</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-red-500 transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm font-medium">{error}</div>}

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Member Photo</label>
            
            {isQrOpen ? (
              <div className="flex flex-col items-center bg-gray-50 border-2 border-dashed border-blue-400 rounded-xl p-6 text-center">
                <QRCodeSVG value={`${window.location.origin}/capture/${syncSessionId}`} size={160} level="M" />
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-700">
                  <RefreshCw size={16} className="animate-spin" />
                  Waiting for photo from phone...
                </div>
                <p className="text-xs text-gray-500 mt-1">Scan using any phone camera to snap photo</p>
                <button type="button" onClick={() => { setIsQrOpen(false); setIsPolling(false); }} className="mt-4 text-xs text-red-600 hover:underline font-semibold">
                  Cancel
                </button>
              </div>
            ) : isCameraOpen ? (
              <div className="flex flex-col items-center bg-gray-900 rounded-lg overflow-hidden">
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full object-cover max-h-48" />
                <div className="p-3 flex gap-4 w-full justify-center bg-gray-800">
                  <button type="button" onClick={capturePhoto} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold text-sm transition">Snap Photo</button>
                  <button type="button" onClick={() => setIsCameraOpen(false)} className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-full font-semibold text-sm transition">Cancel</button>
                </div>
              </div>
            ) : photoPreview ? (
              <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden flex justify-center bg-gray-50">
                <img src={photoPreview} alt="Preview" className="h-48 object-cover" />
                <button type="button" onClick={() => { setPhotoPreview(null); setFormData({ ...formData, photo: null, photoUrl: "" }); }} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                  <UploadCloud size={24} className="text-blue-500 mb-1" />
                  <p className="text-xs text-gray-600 font-medium text-center">Upload File</p>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
                
                <button type="button" onClick={() => setIsCameraOpen(true)} className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-blue-50 transition cursor-pointer text-blue-600">
                  <Camera size={24} className="mb-1" />
                  <p className="text-xs font-medium text-center">Open Camera</p>
                </button>
                
                <button type="button" onClick={startPhoneSync} className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-purple-50 transition cursor-pointer text-purple-600">
                  <Smartphone size={24} className="mb-1" />
                  <p className="text-xs font-medium text-center">Use Phone</p>
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">ID Number</label>
              <input type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} placeholder="XXXX-XXXX-XXXX" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Residential Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street, City, Pincode" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Select Membership Plan</label>
            <select onChange={handlePlanChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm">
              <option value="">-- Choose a custom plan --</option>
              {plans.map((plan) => (
                <option key={plan._id} value={plan._id}>
                  {plan.name} ({plan.durationInMonths} Mo) - ₹{plan.price}
                </option>
              ))}
            </select>
          </div>

          {basePrice > 0 && (
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Tag size={12} className="text-blue-500" /> Have a Promo Code?
              </label>
              <div className="flex gap-2">
                <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="Enter Code" className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 uppercase text-sm" />
                <button type="button" onClick={applyCoupon} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
                  Apply
                </button>
              </div>
              {couponMessage.text && <p className={`mt-2 text-xs font-semibold ${couponMessage.type === "success" ? "text-green-600" : "text-red-600"}`}>{couponMessage.text}</p>}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry Date</label>
              <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Amount Paid (₹)
                {discountAmount > 0 && <span className="text-gray-400 line-through ml-1 font-normal text-[10px]">₹{basePrice}</span>}
              </label>
              <input type="number" name="amountPaid" value={formData.amountPaid} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm" required min="0" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Payment Mode</label>
              <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-sm" required>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
                <option value="Net Banking">Net Banking</option>
              </select>
            </div>
          </div>

          {pendingBalance > 0 && <p className="text-xs text-red-600 font-bold mt-1 text-right">Due Balance: ₹{pendingBalance.toFixed(0)}</p>}

          {pendingBalance > 0 && (
            <div className="bg-red-50 p-3 rounded-lg border border-red-200 mt-2">
              <label className="block text-xs font-bold text-red-700 mb-1">Clear Dues By (Due Date)</label>
              <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full px-3 py-2 border border-red-300 rounded-md focus:ring-2 focus:ring-red-500 text-sm bg-white" required />
            </div>
          )}

          <div className="pt-4 shrink-0">
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 text-sm">
              {loading ? "Processing..." : "Register Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;