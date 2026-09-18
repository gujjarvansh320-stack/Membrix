// src/pages/Dashboard.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import GymDashboard from './GymDashboard';
import LibraryDashboard from './LibraryDashboard';
import CoachingDashboard from './CoachingDashboard';
import DanceDashboard from './DanceDashboard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  
  const rawStorage = localStorage.getItem("user");
  const localUser = rawStorage && rawStorage !== "undefined" ? JSON.parse(rawStorage) : {};
  
  const businessType = localUser?.businessType || user?.businessType || localUser?.orgType || user?.orgType || 'gym';

  switch (businessType) {
    case 'library':
      return <LibraryDashboard />;
    case 'coaching':
      return <CoachingDashboard />;
    case 'dance':
      return <DanceDashboard />;
    case 'gym':
    default:
      return <GymDashboard />;
  }
};

export default Dashboard;