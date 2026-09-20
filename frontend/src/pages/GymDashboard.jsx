// src/pages/Dashboard.jsx
import { useState, useContext, useEffect, useMemo, useCallback } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  PlusCircle,
  LogOut,
  LayoutDashboard,
  Settings,
  CreditCard,
  UserCheck,
  UserX,
  TrendingUp,
  Clock,
  UserPlus,
  ArrowRight,
  Fingerprint,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AddMemberModal from "../components/AddMemberModal.jsx";
import MembersList from "./MembersList.jsx";
import PaymentsList from "./PaymentsList.jsx";
import SettingsTab from "./SettingsTab.jsx";
import EnquiriesManager from "./EnquiriesManager.jsx";
import TransferMembership from "./TransferMembership.jsx";
import FollowUps from "./FollowUps.jsx";
import StaffManager from "./StaffManager.jsx";
import api from "../api/axios.js";
import BiometricsTab from '../components/BiometricsTab';

const GymDashboard = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ==========================================
  // 🛠️ OPTIMIZED ROLE & PERMISSION EXTRACTOR
  // ==========================================
  const {
    localUser,
    userRole,
    userPermissions,
    displayLogo,
    displayName,
    softwarePlanTier,
  } = useMemo(() => {
    const rawStorage = localStorage.getItem("user");
    const parsedUser =
      rawStorage && rawStorage !== "undefined" ? JSON.parse(rawStorage) : {};

    const role =
      parsedUser?.role ||
      parsedUser?.user?.role ||
      parsedUser?.data?.user?.role ||
      user?.role ||
      "owner";

    let perms =
      parsedUser?.permissions ||
      parsedUser?.user?.permissions ||
      parsedUser?.data?.user?.permissions ||
      user?.permissions;
    if (!perms || perms.length === 0) {
      perms = role === "owner" ? ["all"] : []; // Staff default to EMPTY, not full access
    }

    return {
      localUser: parsedUser,
      userRole: role,
      userPermissions: perms,
      displayLogo:
        parsedUser?.gymLogo ||
        parsedUser?.data?.user?.gymLogo ||
        user?.gymLogo ||
        null,
      displayName:
        parsedUser?.gymName ||
        parsedUser?.data?.user?.gymName ||
        user?.gymName ||
        "Gym SaaS",
      softwarePlanTier:
        parsedUser?.softwarePlanTier ||
        parsedUser?.data?.user?.softwarePlanTier ||
        user?.softwarePlanTier ||
        "Basic Plan",
    };
  }, [user]);

  const hasAccess = useCallback(
    (module) => {
      // 🚀 1. TIER CHECK: Block advanced features if on Basic Plan
      const advanceFeatures = ["biometrics", "automations"]; // Add future advanced tab names here
      if (
        advanceFeatures.includes(module) &&
        softwarePlanTier !== "Advance Plan"
      ) {
        return false;
      }

      // 2. ROLE CHECK: Proceed with normal staff permissions
      if (userRole === "owner" || userRole === "admin") return true;
      return (
        userPermissions.includes("all") || userPermissions.includes(module)
      );
    },
    [userRole, userPermissions, softwarePlanTier], // 👈 softwarePlanTier added to dependencies
  );

  const getDefaultView = () => {
    if (hasAccess("dashboard")) return "dashboard";
    if (hasAccess("members")) return "members";
    if (hasAccess("enquiries")) return "enquiries";
    if (hasAccess("followups")) return "followups";
    return "dashboard";
  };

  const [activeView, setActiveView] = useState(getDefaultView());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [dateFilter, setDateFilter] = useState("this_month");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const [stats, setStats] = useState({
    activeClients: 0,
    inactiveClients: 0,
    totalClients: 0,
    salesCollected: 0,
    pendingPayments: 0,
    newClients: 0,
    renewals: 0,
    chartData: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!hasAccess("dashboard")) return;

      try {
        // Shared ID extractor to pull the owner's gym ID even if a receptionist is logged in
        const gymId =
          localUser?.gymId ||
          localUser?.data?.user?.gymId ||
          user?.gymId ||
          localUser?._id ||
          localUser?.data?.user?._id ||
          user?._id;

        let url = `/members/stats?gymId=${gymId}&filter=${dateFilter}`;
        if (dateFilter === "custom" && customStart && customEnd) {
          url += `&startDate=${customStart}&endDate=${customEnd}`;
        }
        const response = await api.get(url);
        setStats(response.data);
      } catch (error) {
        console.error("Failed to load stats", error);
      }
    };
    fetchStats();
  }, [
    refreshKey,
    dateFilter,
    customStart,
    customEnd,
    localUser,
    user,
    hasAccess,
  ]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          setRefreshKey((prev) => prev + 1);
        }}
      />

      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 flex flex-col items-center justify-center text-center gap-4 border-b border-slate-800">
          {displayLogo ? (
            <img
              src={displayLogo}
              alt="Gym Logo"
              className="h-28 w-28 rounded-full object-cover border-4 border-slate-700 bg-white shrink-0 shadow-lg"
            />
          ) : (
            <div className="h-28 w-28 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-5xl shrink-0 shadow-lg border-4 border-slate-700">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="overflow-hidden w-full px-2">
            <h2
              className="text-xl font-bold text-white truncate"
              title={displayName}
            >
              {displayName}
            </h2>
            <p className="text-sm text-blue-400 mt-1 font-medium capitalize">
              {userRole} Profile
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {hasAccess("dashboard") && (
            <button
              onClick={() => setActiveView("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "dashboard" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
            >
              <LayoutDashboard size={20} /> Dashboard
            </button>
          )}
          {hasAccess("members") && (
            <button
              onClick={() => setActiveView("members")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "members" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
            >
              <Users size={20} /> Members
            </button>
          )}
          {hasAccess("enquiries") && (
            <button
              onClick={() => setActiveView("enquiries")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "enquiries" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
            >
              <UserPlus size={20} /> Enquiries
            </button>
          )}
          {hasAccess("followups") && (
            <button
              onClick={() => setActiveView("followups")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "followups" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
            >
              <Clock size={20} /> Follow-Ups
            </button>
          )}
          {hasAccess("payments") && (
            <button
              onClick={() => setActiveView("payments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "payments" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
            >
              <CreditCard size={20} /> Payments
            </button>
          )}
          {hasAccess("transfer") && (
            <button
              onClick={() => setActiveView("transfer")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "transfer" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
            >
              <ArrowRight size={20} /> Transfer Plan
            </button>
          )}

          {userRole === "owner" && (
            <>
              {hasAccess("biometrics") && (
                <button
                  onClick={() => setActiveView("biometrics")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "biometrics" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
                >
                  <Fingerprint size={20} /> Biometric Attendance
                </button>
              )}
              <button
                onClick={() => setActiveView("staff")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "staff" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
              >
                <UserCheck size={20} /> Manage Staff
              </button>
              <button
                onClick={() => setActiveView("settings")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeView === "settings" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"}`}
              >
                <Settings size={20} /> Settings
              </button>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-300 hover:text-white hover:bg-red-600 w-full px-4 py-3 rounded-lg transition"
          >
            <LogOut size={20} /> Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {activeView === "dashboard"
              ? "Dashboard Overview"
              : activeView === "members"
                ? "Member Directory"
                : activeView === "enquiries"
                  ? "Enquiries & Trials"
                  : activeView === "followups"
                    ? "Follow-Up Tasks"
                    : activeView === "payments"
                      ? "Accounting & Payments"
                      : activeView === "transfer"
                        ? "Transfer Membership"
                        : activeView === "staff"
                          ? "Staff Management"
                          : activeView === "biometrics" // 👈 Add this check
                            ? "Biometric Attendance & Logs"
                            : "Settings"}
          </h1>
          <div className="flex items-center gap-4">
            {userRole !== "trainer" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition shadow-sm"
              >
                <PlusCircle size={18} /> Add Member
              </button>
            )}
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {userRole} Profile
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {activeView === "dashboard" && hasAccess("dashboard") ? (
            <>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-700">
                    Timeframe Filter:
                  </span>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    {[
                      { id: "today", label: "Today" },
                      { id: "this_month", label: "This Month" },
                      { id: "last_month", label: "Last Month" },
                      { id: "all_time", label: "All Time" },
                      { id: "custom", label: "Custom" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setDateFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${dateFilter === tab.id ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {dateFilter === "custom" && (
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className="px-3 py-1.5 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <span className="text-gray-400 text-xs">to</span>
                    <input
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className="px-3 py-1.5 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Sales Collected
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      ₹{stats.salesCollected}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Pending Payments
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      ₹{stats.pendingPayments}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      New Registrations
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {stats.newClients}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Plan Renewals
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {stats.renewals}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="p-3 bg-teal-100 text-teal-600 rounded-lg">
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Active Clients
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {stats.activeClients}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                    <UserX size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Inactive / Expired
                    </p>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {stats.inactiveClients}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 text-center">
                  <div className="py-2 md:py-0">
                    <div className="flex justify-center items-center gap-2 mb-1">
                      <Users size={22} className="text-blue-500" />
                      <h3 className="text-3xl font-bold text-gray-800">
                        {stats.totalClients}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                      Total Clients
                    </p>
                  </div>
                  <div className="py-2 md:py-0">
                    <div className="flex justify-center items-center gap-2 mb-1">
                      <UserCheck size={22} className="text-green-500" />
                      <h3 className="text-3xl font-bold text-gray-800">
                        {stats.activeClients}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                      Active Clients
                    </p>
                  </div>
                  <div className="py-2 md:py-0">
                    <div className="flex justify-center items-center gap-2 mb-1">
                      <UserX size={22} className="text-red-500" />
                      <h3 className="text-3xl font-bold text-gray-800">
                        {stats.inactiveClients}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                      Inactive / Expired
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Revenue Trend (
                  {dateFilter === "today"
                    ? "Today"
                    : dateFilter === "this_month"
                      ? "This Month"
                      : dateFilter === "last_month"
                        ? "Last Month"
                        : dateFilter === "all_time"
                          ? "All Time"
                          : dateFilter === "custom"
                            ? `${customStart} to ${customEnd}`
                            : "Filtered"}
                  )
                </h2>
                {stats.chartData && stats.chartData.length > 0 ? (
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.chartData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#E5E7EB"
                        />
                        <XAxis
                          dataKey="date"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#6B7280", fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#6B7280", fontSize: 12 }}
                          tickFormatter={(value) => `₹${value}`}
                          dx={-10}
                        />
                        <Tooltip
                          cursor={{ fill: "#F3F4F6" }}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                          formatter={(value) => [`₹${value}`, "Revenue"]}
                        />
                        <Bar
                          dataKey="revenue"
                          fill="#2563EB"
                          radius={[4, 4, 0, 0]}
                          barSize={40}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 w-full flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <p className="text-gray-500 font-medium">
                      No revenue data found for this timeframe.
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : activeView === "members" && hasAccess("members") ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-2">
                <MembersList refreshKey={refreshKey} />
              </div>
            </div>
          ) : activeView === "enquiries" && hasAccess("enquiries") ? (
            <EnquiriesManager />
          ) : activeView === "followups" && hasAccess("followups") ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <FollowUps />
            </div>
          ) : activeView === "payments" && hasAccess("payments") ? (
            <PaymentsList refreshKey={refreshKey} />
          ) : activeView === "transfer" && hasAccess("transfer") ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <TransferMembership />
            </div>
          ) : activeView === "staff" && userRole === "owner" ? (
            <StaffManager />
          ) : activeView === "settings" && userRole === "owner" ? (
            <SettingsTab />
          ) : activeView === "biometrics" && hasAccess("biometrics") ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
              <BiometricsTab />
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <h2 className="text-xl font-bold text-gray-800">
                Access Restricted
              </h2>
              <p className="text-gray-500 mt-2">
                You do not have permission to view this section.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GymDashboard;
