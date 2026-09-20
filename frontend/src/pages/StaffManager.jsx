import { useState, useEffect, useRef } from "react";
import { UserPlus, CheckCircle, Edit2, Trash2, X, UploadCloud, Camera } from "lucide-react";
import api from "../api/axios";

const availableModules = [
  { id: "dashboard", label: "Dashboard Overview" },
  { id: "members", label: "Members Directory" },
  { id: "enquiries", label: "Enquiries & Trials" },
  { id: "followups", label: "Follow-Ups" },
  { id: "payments", label: "Payments & Accounting" },
  { id: "transfer", label: "Transfer Plan" },
  { id: "biometrics", label: "Biometric Attendance" },
];

const StaffManager = () => {
  const [staffList, setStaffList] = useState([]);
  const [staffData, setStaffData] = useState({ name: '', email: '', password: '', phone: '', role: 'receptionist', photo: null });
  const [permissions, setPermissions] = useState(["members", "enquiries"]); 
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // ✅ Camera State with Routing Target
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraTarget, setCameraTarget] = useState('create'); 
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const getOwnerGymId = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    return (
      storedUser?.gymId || 
      storedUser?.data?.user?.gymId || 
      storedUser?.user?.gymId || 
      storedUser?._id || 
      storedUser?.data?.user?._id || 
      storedUser?.data?._id || 
      '65abc123def4567890abcd12'
    );
  };

  const getSoftwarePlanTier = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    return (
      storedUser?.softwarePlanTier || 
      storedUser?.data?.user?.softwarePlanTier || 
      storedUser?.user?.softwarePlanTier || 
      "Basic Plan"
    );
  };

  const softwarePlanTier = getSoftwarePlanTier();
  const displayedModules = availableModules.filter(module => {
    if (module.id === "biometrics" && softwarePlanTier !== "Advance Plan") {
      return false; 
    }
    return true; 
  });

  const fetchStaff = async () => {
    try {
      const gymId = getOwnerGymId();
      const res = await api.get(`/auth/staff?gymId=${gymId}`);
      setStaffList(res.data);
    } catch (err) {
      console.error("Failed to fetch staff", err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const startCamera = async (target = 'create') => {
    setCameraTarget(target);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setIsCameraOpen(true);
    } catch (err) {
      alert("Camera access denied or unavailable.");
    }
  };

  useEffect(() => {
    if (isCameraOpen && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraOpen, stream]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
        if (cameraTarget === 'edit') {
          setEditData({ ...editData, newPhoto: file }); 
        } else {
          setStaffData({ ...staffData, photo: file }); 
        }
        stopCamera();
      }, "image/jpeg");
    }
  };

  const handleTogglePermission = (id, isEdit = false) => {
    if (isEdit) {
      setEditData(prev => ({
        ...prev,
        permissions: prev.permissions.includes(id) 
          ? prev.permissions.filter(p => p !== id) 
          : [...prev.permissions, id]
      }));
    } else {
      setPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    }
  };

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const gymId = getOwnerGymId();
      const submitData = new FormData();
      submitData.append('name', staffData.name);
      submitData.append('email', staffData.email);
      submitData.append('password', staffData.password);
      submitData.append('phone', staffData.phone);
      submitData.append('role', staffData.role);
      submitData.append('gymId', gymId);
      submitData.append('permissions', JSON.stringify(permissions));
      
      if (staffData.photo) {
        submitData.append('photo', staffData.photo);
      }

      await api.post('/auth/create-staff', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMsg(`Staff account for ${staffData.name} created successfully!`);
      setStaffData({ name: '', email: '', password: '', phone: '', role: 'receptionist', photo: null });
      setPermissions(["members", "enquiries"]); 
      fetchStaff();
      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create staff account');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStaff = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete ${name}?`)) {
      try {
        await api.delete(`/auth/staff/${id}`);
        fetchStaff();
      } catch (err) {
        alert("Failed to delete staff account.");
      }
    }
  };

  // ✅ Send FormData for photo update capability
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      submitData.append('name', editData.name);
      submitData.append('email', editData.email);
      submitData.append('phone', editData.phone || '');
      submitData.append('role', editData.role);
      submitData.append('permissions', JSON.stringify(editData.permissions));
      
      if (editData.newPhoto) {
        submitData.append('photo', editData.newPhoto);
      }

      await api.put(`/auth/staff/${editData._id}`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setIsEditModalOpen(false);
      fetchStaff();
    } catch (err) {
      alert("Failed to update staff account.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <UserPlus size={24} className="text-blue-600" /> Create Staff Accounts
      </h2>
      
      {msg && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center gap-2 text-sm font-medium">
          <CheckCircle size={16} /> {msg}
        </div>
      )}

      {/* CREATE STAFF FORM */}
      <form onSubmit={handleCreateStaff} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Staff Photo</label>
            <div className="flex gap-4">
              <div className="relative flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex flex-col items-center justify-center">
                <UploadCloud size={24} className="text-blue-500 mb-1" />
                <p className="text-xs text-gray-600 font-medium">Upload File</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setStaffData({...staffData, photo: e.target.files[0]})} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                />
              </div>
              <div onClick={() => startCamera('create')} className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex flex-col items-center justify-center">
                <Camera size={24} className="text-blue-500 mb-1" />
                <p className="text-xs text-gray-600 font-medium">Open Camera</p>
              </div>
            </div>
            {staffData.photo && <p className="text-xs text-green-600 mt-2 font-bold">Selected: {staffData.photo.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input type="text" value={staffData.name} onChange={(e) => setStaffData({...staffData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email (Login ID)</label>
            <input type="email" value={staffData.email} onChange={(e) => setStaffData({...staffData, email: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Temporary Password</label>
            <input type="password" value={staffData.password} onChange={(e) => setStaffData({...staffData, password: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
            <input type="tel" value={staffData.phone} onChange={(e) => setStaffData({...staffData, phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Assign Role</label>
            <select value={staffData.role} onChange={(e) => setStaffData({...staffData, role: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="receptionist">Receptionist</option>
              <option value="trainer">Trainer</option>
            </select>
          </div>
        </div>

<div className="border-t border-gray-100 pt-4">
          <label className="block text-sm font-bold text-gray-800 mb-3">Feature Access (Tick to Allow)</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {displayedModules.map((module) => (
              <label key={module.id} className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition border border-transparent hover:border-gray-200">
                <input type="checkbox" checked={permissions.includes(module.id)} onChange={() => handleTogglePermission(module.id)} className="w-4 h-4 text-blue-600 rounded cursor-pointer" />
                <span className="text-sm font-medium text-gray-700">{module.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" disabled={loading} className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-8 rounded-lg transition disabled:opacity-50">
            {loading ? "Creating..." : "Add Staff Worker"}
          </button>
        </div>
      </form>

      {/* STAFF DIRECTORY TABLE */}
      <div className="mt-10 border-t border-gray-100 pt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Existing Staff Members</h3>
        {staffList.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6 border border-dashed rounded-lg">No staff accounts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left border-b font-semibold">Name</th>
                  <th className="py-3 px-4 text-left border-b font-semibold">Contact</th>
                  <th className="py-3 px-4 text-left border-b font-semibold">Role</th>
                  <th className="py-3 px-4 text-left border-b font-semibold">Access</th>
                  <th className="py-3 px-4 text-center border-b font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {staffList.map((staff) => (
                  <tr key={staff._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 flex items-center gap-3 whitespace-nowrap">
                      {staff.photo ? (
                        <img src={staff.photo} alt={staff.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                          {staff.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="font-semibold text-gray-800">{staff.name}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      <p>{staff.email}</p>
                      <p className="text-xs">{staff.phone}</p>
                    </td>
                    <td className="py-3 px-4 capitalize font-medium text-blue-600">{staff.role}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {(staff.permissions || []).map(p => (
                          <span key={p} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200 capitalize">
                            {p}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <button onClick={() => { setEditData({ ...staff, permissions: staff.permissions || [] }); setIsEditModalOpen(true); }} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md transition inline-block" title="Edit Staff">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteStaff(staff._id, staff.name)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition inline-block" title="Delete Staff">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* EDIT STAFF MODAL */}
      {isEditModalOpen && editData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-bold text-gray-800">Edit Staff Member</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              
              {/* ✅ Added Photo Upload options to Edit Modal */}
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Update Photo</label>
                <div className="flex gap-2">
                  <div className="relative flex-1 border border-dashed border-gray-300 rounded p-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex flex-col items-center justify-center">
                    <UploadCloud size={18} className="text-blue-500 mb-1" />
                    <p className="text-[10px] text-gray-600 font-medium">Upload File</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setEditData({...editData, newPhoto: e.target.files[0]})} 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                  </div>
                  <div onClick={() => startCamera('edit')} className="flex-1 border border-dashed border-gray-300 rounded p-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer flex flex-col items-center justify-center">
                    <Camera size={18} className="text-blue-500 mb-1" />
                    <p className="text-[10px] text-gray-600 font-medium">Open Camera</p>
                  </div>
                </div>
                {editData.newPhoto && <p className="text-[10px] text-green-600 mt-1 font-bold">New photo selected.</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Name</label>
                  <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                  <input type="email" value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
                  <input type="tel" value={editData.phone || ''} onChange={(e) => setEditData({...editData, phone: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Role</label>
                  <select value={editData.role} onChange={(e) => setEditData({...editData, role: e.target.value})} className="w-full px-3 py-2 border rounded-md text-sm bg-white">
                    <option value="receptionist">Receptionist</option>
                    <option value="trainer">Trainer</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <label className="block text-xs font-bold text-gray-800 mb-2">Update Feature Access</label>
                <div className="grid grid-cols-2 gap-2">
                  {displayedModules.map((module) => (
                    <label key={module.id} className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-gray-50 transition border border-transparent">
                      <input type="checkbox" checked={editData.permissions.includes(module.id)} onChange={() => handleTogglePermission(module.id, true)} className="w-3.5 h-3.5 text-blue-600 rounded cursor-pointer" />
                      <span className="text-xs font-medium text-gray-700">{module.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-200 transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CAMERA OVERLAY */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div className="relative w-full max-w-md flex flex-col items-center">
            <button onClick={stopCamera} className="absolute -top-12 right-0 text-white hover:text-red-500 z-10 transition">
              <X size={32} />
            </button>
            <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-xl shadow-2xl border-4 border-gray-800 bg-black"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <button 
              type="button" 
              onClick={capturePhoto} 
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition flex items-center gap-2"
            >
              <Camera size={20} /> Capture Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManager;