// import { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Camera, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
// import api from '../api/axios';

// const MobileCapture = () => {
//   const { sessionId } = useParams();
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const handleCapture = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPhotoPreview(URL.createObjectURL(selectedFile));
//       setError('');
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     setLoading(true);
//     setError('');

//     const formData = new FormData();
//     formData.append('photo', file);
//     formData.append('sessionId', sessionId);

//     try {
//       await api.post('/members/temp-photo', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setSuccess(true);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to upload photo. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
//       <div className="max-w-sm w-full bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
//         <h2 className="text-xl font-bold mb-2">Member Photo Sync</h2>
//         <p className="text-sm text-slate-400 mb-6">Take a photo to send directly to the laptop screen.</p>

//         {error && (
//           <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-sm text-red-200 flex items-center gap-2">
//             <AlertCircle size={16} /> {error}
//           </div>
//         )}

//         {success ? (
//           <div className="py-8 space-y-3">
//             <CheckCircle2 size={56} className="text-green-400 mx-auto animate-bounce" />
//             <h3 className="text-lg font-semibold text-green-300">Photo Synced!</h3>
//             <p className="text-xs text-slate-400">The laptop form has been updated. You can close this window.</p>
//           </div>
//         ) : (
//           <div className="space-y-5">
//             {photoPreview ? (
//               <div className="relative rounded-xl overflow-hidden border border-slate-600 bg-black aspect-square">
//                 <img src={photoPreview} alt="Captured preview" className="w-full h-full object-cover" />
//               </div>
//             ) : (
//               <label className="border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-xl aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer transition bg-slate-900/50">
//                 <Camera size={40} className="text-blue-400" />
//                 <span className="text-sm font-medium text-slate-300">Open Phone Camera</span>
//                 {/* capture="environment" triggers the rear camera immediately on mobile devices */}
//                 <input 
//                   type="file" 
//                   accept="image/*" 
//                   capture="environment" 
//                   onChange={handleCapture} 
//                   className="hidden" 
//                 />
//               </label>
//             )}

//             {photoPreview && (
//               <div className="flex gap-3">
//                 <label className="flex-1 py-3 px-4 rounded-xl border border-slate-600 text-sm font-medium cursor-pointer text-center">
//                   Retake
//                   <input type="file" accept="image/*" capture="environment" onChange={handleCapture} className="hidden" />
//                 </label>
//                 <button
//                   onClick={handleUpload}
//                   disabled={loading}
//                   className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
//                 >
//                   {loading ? <Loader2 size={18} className="animate-spin" /> : 'Send to Laptop'}
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MobileCapture;









// src/pages/MobileCapture.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import api from '../api/axios';

const MobileCapture = () => {
  const { sessionId } = useParams();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleCapture = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPhotoPreview(URL.createObjectURL(selectedFile));
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('photo', file);
    // You no longer strictly need to append sessionId here since it's in the URL, 
    // but it's safe to leave it.
    formData.append('sessionId', sessionId);

    try {
      // ✅ FIX: Added the ${sessionId} directly to the endpoint URL
      await api.post(`/members/temp-photo/${sessionId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload photo. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-sm w-full bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-700">
        <h2 className="text-xl font-bold mb-2">Member Photo Sync</h2>
        <p className="text-sm text-slate-400 mb-6">Take a photo to send directly to the laptop screen.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-sm text-red-200 flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {success ? (
          <div className="py-8 space-y-3">
            <CheckCircle2 size={56} className="text-green-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-semibold text-green-300">Photo Synced!</h3>
            <p className="text-xs text-slate-400">The laptop form has been updated. You can close this window.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {photoPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-600 bg-black aspect-square">
                <img src={photoPreview} alt="Captured preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-xl aspect-square flex flex-col items-center justify-center gap-2 cursor-pointer transition bg-slate-900/50">
                <Camera size={40} className="text-blue-400" />
                <span className="text-sm font-medium text-slate-300">Open Phone Camera</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  onChange={handleCapture} 
                  className="hidden" 
                />
              </label>
            )}

            {photoPreview && (
              <div className="flex gap-3">
                <label className="flex-1 py-3 px-4 rounded-xl border border-slate-600 text-sm font-medium cursor-pointer text-center">
                  Retake
                  <input type="file" accept="image/*" capture="environment" onChange={handleCapture} className="hidden" />
                </label>
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : 'Send to Laptop'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileCapture;