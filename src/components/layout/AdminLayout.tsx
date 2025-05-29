import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import AdminSidebar from '../admin/AdminSidebar';
import AdminHeader from '../admin/AdminHeader';

const AdminLayout = () => {
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <AdminHeader toggleSidebar={toggleSidebar} />
      
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 overflow-auto p-6 transition-all ${sidebarOpen ? 'md:ml-64' : ''}`}>
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 