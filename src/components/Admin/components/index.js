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
  const [checked, setChecked] = useState(false); // true after localStorage check
  const [activeTab, setActiveTab] = useState('category');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('admin_username');
      const storedPass = localStorage.getItem('admin_password');
      const expectedUser = process.env.NEXT_PUBLIC_USERNAME || 'admin@aptworld.com';
      const expectedPass = process.env.NEXT_PUBLIC_PASSWORD || 'aptWorldAdmin';
      if (storedUser === expectedUser && storedPass === expectedPass) {
        setAuthorized(true);
      }
      setChecked(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const expectedUser = process.env.NEXT_PUBLIC_USERNAME || 'admin@aptworld.com';
    const expectedPass = process.env.NEXT_PUBLIC_PASSWORD || 'aptWorldAdmin';
    if (loginUsername === expectedUser && loginPassword === expectedPass) {
      localStorage.setItem('admin_username', loginUsername);
      localStorage.setItem('admin_password', loginPassword);
      setAuthorized(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect credentials. Please try again.');
      setLoginPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_username');
    localStorage.removeItem('admin_password');
    router.push('/');
  };

  // Wait for localStorage check before showing anything
  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--apt-offwhite)]">
        <div className="w-10 h-10 border-4 border-[var(--apt-red)]/20 border-t-[var(--apt-red)] rounded-full animate-spin" />
      </div>
    );
  }

  // Login screen
  if (!authorized) {
    return (
      <div className="min-h-screen bg-[var(--apt-offwhite)] flex items-center justify-center px-4 font-montserrat">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <span className="font-khand text-3xl font-extrabold tracking-wider text-[var(--apt-navy)]">
              APT <span className="text-[var(--apt-red)]">WORLD</span>
            </span>
            <p className="text-xs text-gray-500 mt-1 tracking-widest uppercase font-bold">Admin Portal</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 sm:p-10">
            <h2 className="font-khand text-2xl font-extrabold uppercase tracking-tight text-[var(--apt-navy)] mb-1">Sign In</h2>
            <p className="text-xs text-gray-500 mb-8">Enter your admin credentials to access the workspace.</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black tracking-wider text-gray-400 uppercase">Username / Email</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="admin@aptworld.com"
                  className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-[var(--apt-red)]/50 focus:outline-none rounded-xl px-4 py-3 text-xs font-medium placeholder-gray-400 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black tracking-wider text-gray-400 uppercase">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[var(--apt-offwhite)] text-[var(--apt-navy)] border border-gray-200 focus:border-[var(--apt-red)]/50 focus:outline-none rounded-xl px-4 py-3 pr-11 text-xs font-medium placeholder-gray-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {loginError && (
                <p className="text-[11px] text-[var(--apt-red)] font-medium bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[var(--apt-red)] hover:bg-[var(--apt-navy)] text-white font-bold text-xs tracking-widest py-3.5 rounded-xl transition-all duration-300 shadow-md shadow-[var(--apt-red)]/15 uppercase"
              >
                Sign In to Admin
              </button>
            </form>

            <div className="mt-6 text-center">
              <a href="/" className="text-[10px] text-gray-400 hover:text-[var(--apt-red)] transition-colors uppercase tracking-widest font-bold">
                ← Back to Website
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--apt-offwhite)] text-[var(--apt-navy)] font-montserrat flex flex-col">
      {/* Navigation bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-[var(--apt-red)] text-white px-2.5 py-1.5 rounded-sm font-black tracking-tighter text-sm">
              APT
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-wider text-[var(--apt-navy)]">Admin Workspace</h1>
              <span className="text-[9px] font-bold text-gray-500 block -mt-0.5">APT WORLD PORTAL</span>
            </div>
          </div>

          {/* Tab switcher buttons */}
          <nav className="flex space-x-1 bg-gray-50 border border-gray-200 p-1 rounded-sm">
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
                    ? 'bg-[var(--apt-red)] text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Action block */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-gray-400 font-bold block">LOGGED IN AS</span>
              <span className="text-xs text-gray-600 font-semibold">Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-[var(--apt-navy)] font-bold text-[10px] uppercase px-3 py-2 rounded-sm transition-all"
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
      <main className="flex-grow p-6 overflow-y-auto bg-[var(--apt-offwhite)]">
        <div className="max-w-7xl mx-auto bg-white/80 border border-gray-200 p-6 md:p-8 rounded-sm shadow-xl min-h-[75vh]">
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

