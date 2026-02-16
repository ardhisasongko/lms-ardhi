import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors'>
      <Navbar />
      <main className='flex-1 bg-gray-50 dark:bg-gray-900'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
