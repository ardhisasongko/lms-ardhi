import { useAuth } from '../context/AuthContext';
import AdminDashboard from './dashboard/AdminDashboard';
import StudentDashboard from './dashboard/StudentDashboard';

const Dashboard = () => {
  const { user, isInstructor, isAdmin } = useAuth();

  // Determine which dashboard to show
  // Admin and Instructor see Admin Dashboard
  // Students see Student Dashboard
  const showAdminDashboard = isAdmin || isInstructor;

  return (
    <div className='page-container py-8'>
      <div className='container-main'>
        {showAdminDashboard ? (
          <AdminDashboard />
        ) : (
          <StudentDashboard />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
