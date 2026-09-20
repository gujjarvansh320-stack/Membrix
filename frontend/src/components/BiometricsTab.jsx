import { useState, useEffect } from 'react';

const BiometricsTab = () => {
  const [logs, setLogs] = useState([]);
  const [syncQueue, setSyncQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  // Retrieve the logged-in gym owner's ID
  const user = JSON.parse(localStorage.getItem('user'));
  const gymId = user?.gymId || user?._id || user?.id;

  useEffect(() => {
    const fetchBiometricData = async () => {
      try {
        // 1. Fetch Today's Attendance Logs
        const logsRes = await fetch(`http://localhost:5000/api/attendance/logs?gymId=${gymId}`);
        if (logsRes.ok) {
          const logsData = await logsRes.json();
          setLogs(logsData);
        }

        // 2. Fetch the Hardware Sync Queue
        const queueRes = await fetch(`http://localhost:5000/api/members/biometric/sync-queue?gymId=${gymId}`);
        if (queueRes.ok) {
          const queueData = await queueRes.json();
          setSyncQueue(queueData);
        }
      } catch (error) {
        console.error("Error fetching biometric data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (gymId) {
      fetchBiometricData();
      // Auto-refresh the dashboard every 10 seconds for live punch updates
      const interval = setInterval(fetchBiometricData, 10000);
      return () => clearInterval(interval);
    }
  }, [gymId]);

  if (loading) return <div className="p-4 text-gray-600">Loading Biometric Data...</div>;

  return (
    <div className="p-6 bg-gray-50 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Biometric Access Control</h2>

      {/* SYNC QUEUE WIDGET */}
      {syncQueue.length > 0 && (
        <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md shadow-sm">
          <h3 className="text-lg font-bold text-yellow-800 mb-2">Hardware Sync Queue</h3>
          <p className="text-sm text-yellow-700 mb-3">
            The local Python script will process these updates shortly.
          </p>
          <ul className="space-y-2">
            {syncQueue.map(member => (
              <li key={member._id} className="flex justify-between bg-white p-2 rounded shadow-sm text-sm">
                <span className="font-semibold">{member.name || `ID: ${member.biometricId}`}</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  member.biometricSyncAction === 'disable' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  PENDING {member.biometricSyncAction.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* LIVE ATTENDANCE TABLE */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-800 text-white font-bold">
          Today's Live Punches
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm border-b">
              <th className="p-3">Time</th>
              <th className="p-3">Member Name</th>
              <th className="p-3">Biometric ID</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">No scans recorded today.</td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3 font-mono text-gray-600">
                    {new Date(log.punchTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-3 font-semibold text-gray-800">
                    {log.memberId ? log.memberId.name : 'Unknown'}
                  </td>
                  <td className="p-3 text-gray-500">{log.biometricId}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                      Access Granted
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BiometricsTab;