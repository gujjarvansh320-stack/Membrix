// src/pages/LibraryDashboard.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, LogOut, LayoutDashboard, Settings, CreditCard } from "lucide-react";

const LibraryDashboard = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("dashboard");

  const rawStorage = localStorage.getItem("user");
  const localUser = rawStorage && rawStorage !== "undefined" ? JSON.parse(rawStorage) : {};
  const displayName = localUser?.gymName || "Library Manager"; 

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800 text-center">
          <div className="h-20 w-20 mx-auto rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-white mt-4 truncate">{displayName}</h2>
          <p className="text-sm text-indigo-400 mt-1 font-medium">Library Administrator</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button onClick={() => setActiveView("dashboard")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "dashboard" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}>
            <LayoutDashboard size={20} /> Overview
          </button>
          <button onClick={() => setActiveView("readers")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "readers" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}>
            <Users size={20} /> Readers Directory
          </button>
          <button onClick={() => setActiveView("books")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "books" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}>
            <BookOpen size={20} /> Book Inventory
          </button>
          <button onClick={() => setActiveView("fines")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "fines" ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}>
            <CreditCard size={20} /> Fines & Fees
          </button>
        </nav>

        <div className="p-4">
          <button onClick={handleLogout} className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-red-600 w-full px-4 py-3 rounded-lg transition">
            <LogOut size={20} /> Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeView}</h1>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {activeView === "dashboard" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Users size={24} /></div>
                <div><p className="text-sm text-gray-500 font-medium">Active Readers</p><h3 className="text-2xl font-bold text-gray-800">0</h3></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg"><BookOpen size={24} /></div>
                <div><p className="text-sm text-gray-500 font-medium">Books Issued</p><h3 className="text-2xl font-bold text-gray-800">0</h3></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-red-100 text-red-600 rounded-lg"><CreditCard size={24} /></div>
                <div><p className="text-sm text-gray-500 font-medium">Pending Fines</p><h3 className="text-2xl font-bold text-gray-800">₹0</h3></div>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Component for {activeView} coming soon...</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LibraryDashboard;