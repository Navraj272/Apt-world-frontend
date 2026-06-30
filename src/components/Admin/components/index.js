import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CategoriesTab from './CategoriesTab';
import SubcategoriesTab from './SubcategoriesTab';
import ProductsTab from './ProductsTab';
import EnquiriesTab from './EnquiriesTab';
import FranchiseLocationsTab from './FranchiseLocationsTab';

const Admin = () => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('category'); // category, product, enquiry

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('admin_username');
      const storedPass = localStorage.getItem('admin_password');

      const expectedUser = process.env.NEXT_PUBLIC_USERNAME || 'admin@aptworld.com';
      const expectedPass = process.env.NEXT_PUBLIC_PASSWORD || 'aptWorldAdmin';

      if (storedUser === expectedUser && storedPass === expectedPass) {
        setAuthorized(true);
      } else {
        const enteredUser = prompt('Enter Admin Username:');
        if (enteredUser === null) {
          alert('Access denied. Authentication cancelled.');
          router.push('/');
          return;
        }

        const enteredPass = prompt('Enter Admin Password:');
        if (enteredPass === null) {
          alert('Access denied. Authentication cancelled.');
          router.push('/');
          return;
        }

        if (enteredUser === expectedUser && enteredPass === expectedPass) {
          localStorage.setItem('admin_username', enteredUser);
          localStorage.setItem('admin_password', enteredPass);
          setAuthorized(true);
        } else {
          localStorage.removeItem('admin_username');
          localStorage.removeItem('admin_password');
          alert('Access denied. Incorrect credentials.');
          router.push('/');
        }
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_username');
    localStorage.removeItem('admin_password');
    router.push('/');
  };

  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#070e1e] text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-red-650 border-red-200 rounded-full animate-spin"></div>
          <p className="font-montserrat tracking-widest text-xs uppercase text-gray-400">Verifying Admin Credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070e1e] text-slate-100 font-montserrat flex flex-col">
      {/* Navigation bar */}
      <header className="bg-[#091225] border-b border-slate-800 px-6 py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-red-600 text-white px-2.5 py-1.5 rounded-sm font-black tracking-tighter text-sm">
              APT
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-wider text-white">Admin Workspace</h1>
              <span className="text-[9px] font-bold text-slate-400 block -mt-0.5">APT WORLD PORTAL</span>
            </div>
          </div>

          {/* Tab switcher buttons */}
          <nav className="flex space-x-1 bg-[#050a16] border border-slate-800 p-1 rounded-sm">
             {[
              { id: 'category', label: 'Categories' },
              { id: 'subcategory', label: 'Subcategories' },
              { id: 'product', label: 'Products' },
              { id: 'enquiry', label: 'Enquiries' },
              { id: 'franchise', label: 'Franchise Locations' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action block */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-500 font-bold block">LOGGED IN AS</span>
              <span className="text-xs text-slate-300 font-semibold">Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 bg-[#0c1830] hover:bg-[#122347] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-[10px] uppercase px-3 py-2 rounded-sm transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main body area */}
      <main className="flex-grow p-6 overflow-y-auto bg-[#070e1e]">
        <div className="max-w-7xl mx-auto bg-[#091225]/45 border border-slate-800/60 p-6 md:p-8 rounded-sm shadow-xl min-h-[75vh]">
          {activeTab === 'category' && <CategoriesTab />}
          {activeTab === 'subcategory' && <SubcategoriesTab />}
          {activeTab === 'product' && <ProductsTab />}
          {activeTab === 'enquiry' && <EnquiriesTab />}
          {activeTab === 'franchise' && <FranchiseLocationsTab />}
        </div>
      </main>
    </div>
  );
};

export default Admin;

