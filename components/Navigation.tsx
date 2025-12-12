import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Compass, Briefcase, Camera, Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide global navigation on the Vendor Dashboard to prevent double headers
  // Also hide on login page for cleaner look
  if (location.pathname === '/vendor' || location.pathname === '/login') {
    return null;
  }

  const navLinks = [
    { to: "/tourist", label: "Explore", icon: Compass },
    { to: "/ar-guide", label: "AR Guide", icon: Camera },
    { to: "/vendor", label: "Business", icon: Briefcase },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl border-slate-200/50 py-6 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' 
            : 'bg-transparent border-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center relative min-h-[48px]">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group relative z-50">
            <div className="bg-slate-900 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-slate-900/20">
               <Compass size={22} strokeWidth={2.5} />
            </div>
            <span className={`font-black text-2xl tracking-tight transition-colors duration-300 ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              WanderLuxe.
            </span>
          </Link>

          {/* Desktop Navigation - Centered Pill */}
          <div className="hidden md:flex items-center gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-lg shadow-slate-200/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
            {navLinks.map((link) => (
              <NavLink 
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                  flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                  ${isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
                  }
                `}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4 relative z-50">
             <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition px-2">Log in</Link>
             <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 hover:-translate-y-0.5">
               Sign Up
             </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-slate-900 bg-white/50 backdrop-blur-md rounded-xl border border-white/20 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 pt-24 px-6 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) md:hidden ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <NavLink 
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-4 p-4 rounded-2xl text-lg font-bold transition border border-transparent
                ${isActive ? 'bg-slate-50 border-slate-100 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}
              `}
            >
              <div className={`p-3 rounded-full ${link.label === 'Business' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                <link.icon size={24} strokeWidth={2.5} />
              </div>
              {link.label}
            </NavLink>
          ))}
           <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4">
             <Link to="/login" className="w-full py-4 text-center text-slate-900 font-bold border border-slate-200 rounded-xl hover:bg-slate-50 transition">Log in</Link>
             <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition">Sign Up</button>
           </div>
        </div>
      </div>
    </>
  );
};