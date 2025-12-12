import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ReferenceLine } from 'recharts';
import { Plus, Users, DollarSign, Package, MessageSquare, Tag, Download, CheckCircle, Clock, ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TourPackage } from '../types';

// Mock Data
const bookingData = [
  { name: 'Mon', bookings: 4, revenue: 2400 },
  { name: 'Tue', bookings: 3, revenue: 1398 },
  { name: 'Wed', bookings: 9, revenue: 9800 },
  { name: 'Thu', bookings: 6, revenue: 3908 },
  { name: 'Fri', bookings: 8, revenue: 4800 },
  { name: 'Sat', bookings: 12, revenue: 8800 },
  { name: 'Sun', bookings: 10, revenue: 6300 },
];

const upcomingDepartures = [
    { id: 1, name: 'Bali Temple Run', time: 'Tomorrow, 08:00 AM', status: 'Confirmed', travelers: 4 },
    { id: 2, name: 'Kyoto Tea Ceremony', time: 'Tomorrow, 02:00 PM', status: 'Pending', travelers: 2 },
    { id: 3, name: 'Paris Night Walk', time: 'Wed, 07:00 PM', status: 'Confirmed', travelers: 8 },
    { id: 4, name: 'Tokyo Drift Tour', time: 'Wed, 09:00 PM', status: 'Confirmed', travelers: 12 },
];

export const VendorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'packages'>('dashboard');
  const [packages, setPackages] = useState<TourPackage[]>([
    { id: '1', name: 'Bali Bliss', destination: 'Bali', price: 1200, duration: 7, image: '', bookings: 24 },
    { id: '2', name: 'Paris Romance', destination: 'Paris', price: 2500, duration: 5, image: '', bookings: 12 },
  ]);

  const [newPackage, setNewPackage] = useState({ name: '', price: '', dest: '' });

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    const pkg: TourPackage = {
      id: Math.random().toString(),
      name: newPackage.name,
      destination: newPackage.dest,
      price: Number(newPackage.price),
      duration: 5,
      image: '',
      bookings: 0
    };
    setPackages([...packages, pkg]);
    setNewPackage({ name: '', price: '', dest: '' });
    alert("Package published successfully!");
  };

  const BrutalButton = ({ children, className = "", variant = "white", onClick }: any) => (
      <button onClick={onClick} className={`px-6 py-3 font-bold text-sm md:text-base border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 ${variant === 'lime' ? 'bg-[#a6f756] text-black' : 'bg-white text-black'} ${className}`}>
          {children}
      </button>
  );

  const BrutalCard = ({ children, className = "" }: any) => (
      <div className={`bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-6 ${className}`}>
          {children}
      </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 pt-20 font-sans bg-[#FDFCF8] min-h-screen">
      
      {/* NEW HEADER DESIGN */}
      <div className="relative mb-16 mt-8">
          
          {/* Global Nav Pill - Floating on top border */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 bg-white border-[3px] border-black rounded-full p-1.5 flex gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Link to="/tourist" className="px-6 py-2 rounded-full text-xs font-black text-slate-500 hover:bg-slate-100 uppercase tracking-wide transition-colors">Explore</Link>
              <Link to="/ar-guide" className="px-6 py-2 rounded-full text-xs font-black text-slate-500 hover:bg-slate-100 uppercase tracking-wide transition-colors">AR Guide</Link>
              <span className="px-6 py-2 rounded-full text-xs font-black bg-black text-white uppercase tracking-wide shadow-md">Business</span>
          </div>

          {/* Main Header Box */}
          <div className="bg-white border-[6px] border-black rounded-[40px] p-8 md:p-12 shadow-none relative z-10">
              {/* Top Row: Brand */}
              <div className="flex items-center gap-4 mb-4">
                  <Link to="/" className="bg-black text-white w-12 h-12 flex items-center justify-center rounded-xl hover:scale-105 transition-transform border-2 border-transparent hover:border-black hover:bg-white hover:text-black">
                      <Compass size={28} strokeWidth={2.5} />
                  </Link>
                  <div className="flex items-center gap-3">
                      <span className="font-black text-2xl tracking-tight">WanderLuxe.</span>
                      <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">Vendor Portal</span>
                  </div>
              </div>

              {/* Title */}
              <h1 className="text-7xl md:text-9xl font-black text-black uppercase tracking-tighter leading-[0.85] mb-12 -ml-1">
                  Dashboard
              </h1>

              {/* Bottom Row: Controls */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  
                  {/* Tabs */}
                  <div className="bg-white border-[3px] border-slate-200 rounded-full p-1.5 flex gap-1 shadow-sm">
                      <button 
                          onClick={() => setActiveTab('dashboard')}
                          className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-wide transition-all ${activeTab === 'dashboard' ? 'bg-[#a6f756] text-black border-[3px] border-black shadow-[2px_2px_0px_0px_black] scale-105' : 'text-slate-400 hover:text-black hover:bg-slate-50 border-[3px] border-transparent'}`}
                      >
                          Overview
                      </button>
                      <button 
                          onClick={() => setActiveTab('packages')}
                          className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-wide transition-all ${activeTab === 'packages' ? 'bg-[#a6f756] text-black border-[3px] border-black shadow-[2px_2px_0px_0px_black] scale-105' : 'text-slate-400 hover:text-black hover:bg-slate-50 border-[3px] border-transparent'}`}
                      >
                          Packages
                      </button>
                  </div>

                  {/* Auth Actions */}
                  <div className="flex items-center gap-8 pl-4">
                      <Link to="/login" className="font-black text-black text-sm hover:underline decoration-[3px] underline-offset-4">Log in</Link>
                      <button className="bg-black text-white px-8 py-4 rounded-full font-black text-sm uppercase hover:scale-105 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] border-[3px] border-black hover:bg-white hover:text-black">
                          Get App
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="space-y-12 animate-fade-in-up">
          
          {/* 1. Quick Action Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BrutalButton variant="lime" className="w-full h-16 text-lg" onClick={() => setActiveTab('packages')}>
                  <Plus strokeWidth={3} size={24} /> ADD PACKAGE
              </BrutalButton>
              <BrutalButton className="w-full h-16 text-lg">
                  <MessageSquare strokeWidth={3} size={24} /> REVIEWS
              </BrutalButton>
              <BrutalButton className="w-full h-16 text-lg">
                  <Tag strokeWidth={3} size={24} /> CREATE PROMO
              </BrutalButton>
          </div>

          {/* 2. KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BrutalCard className="flex items-center gap-6 transform hover:-translate-y-1 transition-transform">
              <div className="bg-black text-white w-20 h-20 flex items-center justify-center border-[3px] border-black shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                <DollarSign size={40} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Total Revenue</p>
                <p className="text-5xl font-black tracking-tighter text-black">$34,250</p>
              </div>
            </BrutalCard>
            <BrutalCard className="flex items-center gap-6 transform hover:-translate-y-1 transition-transform">
              <div className="bg-black text-white w-20 h-20 flex items-center justify-center border-[3px] border-black shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                <Users size={40} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Active Bookings</p>
                <p className="text-5xl font-black tracking-tighter text-black">142</p>
              </div>
            </BrutalCard>
            <BrutalCard className="flex items-center gap-6 transform hover:-translate-y-1 transition-transform">
              <div className="bg-black text-white w-20 h-20 flex items-center justify-center border-[3px] border-black shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                <Package size={40} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Total Packages</p>
                <p className="text-5xl font-black tracking-tighter text-black">{packages.length}</p>
              </div>
            </BrutalCard>
          </div>

          {/* 3. Charts & Activity Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Revenue Chart (Spans 2 columns) */}
            <div className="md:col-span-2">
                <BrutalCard className="h-full min-h-[500px] flex flex-col p-8">
                    <div className="flex justify-between items-center mb-8 border-b-[3px] border-black pb-4">
                        <h3 className="font-black text-3xl uppercase tracking-tight">Revenue Performance</h3>
                        <button className="flex items-center gap-2 font-bold text-xs uppercase bg-slate-100 px-3 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors">
                            <Download size={14} /> Download Report
                        </button>
                    </div>
                    
                    <div className="flex-1 w-full h-full relative">
                         {/* Chart */}
                        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                            <LineChart data={bookingData} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" strokeWidth={2} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'black', fontWeight: '900', fontSize: 12, fontFamily: 'Inter' }} dy={15} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'black', fontWeight: '900', fontSize: 12, fontFamily: 'Inter' }} tickFormatter={(value) => `$${value}`} dx={-10} />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#fff', 
                                        border: '3px solid black', 
                                        boxShadow: '4px 4px 0px 0px black',
                                        borderRadius: '0px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Inter',
                                        textTransform: 'uppercase'
                                    }} 
                                    cursor={{ stroke: 'black', strokeWidth: 2 }}
                                />
                                <ReferenceLine y={7000} label={{ value: 'Monthly Goal', position: 'insideTopRight', fill: 'black', fontWeight: '900', fontSize: 10, bg: 'white' }} stroke="black" strokeDasharray="8 8" strokeWidth={3} />
                                <Line type="monotone" dataKey="revenue" stroke="#a6f756" strokeWidth={5} dot={{ r: 8, fill: "black", strokeWidth: 0 }} activeDot={{ r: 10, fill: "#a6f756", stroke: "black", strokeWidth: 3 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </BrutalCard>
            </div>

            {/* Upcoming Departures (Activity Feed) */}
            <div className="md:col-span-1">
                <BrutalCard className="h-full flex flex-col p-8 border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="mb-8 flex items-center gap-3">
                         <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse border-2 border-black"></div>
                         <h3 className="font-black text-2xl uppercase leading-tight">Upcoming <br/>Departures (48h)</h3>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                        {upcomingDepartures.map((trip) => (
                            <div key={trip.id} className="pb-4 border-b-2 border-black/10 group hover:bg-slate-50 transition-colors p-2 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-lg leading-tight group-hover:underline decoration-2">{trip.name}</h4>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                     <span className={`px-2 py-1 text-[10px] font-black uppercase border-2 border-black ${trip.status === 'Confirmed' ? 'bg-[#a6f756]' : 'bg-[#FFDE00]'}`}>
                                        {trip.status}
                                    </span>
                                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} className="text-black" strokeWidth={3} /> {trip.time.split(',')[0]}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users size={12} className="text-black" strokeWidth={3} /> {trip.travelers}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="pt-4 mt-auto">
                            <button className="w-full py-4 text-center font-black text-sm border-[3px] border-dashed border-black hover:bg-black hover:text-white hover:border-black transition-all uppercase tracking-widest">
                                View Full Schedule
                            </button>
                        </div>
                    </div>
                </BrutalCard>
            </div>

          </div>
        </div>
      )}

      {activeTab === 'packages' && (
        <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up">
          {/* Add New Card */}
          <div className="bg-[#a6f756] border-[3px] border-black p-8 flex flex-col justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[400px]">
            <h3 className="font-black text-3xl mb-8 text-center uppercase leading-none">Create New<br/>Package</h3>
            <form onSubmit={handleAddPackage} className="space-y-4">
              <input 
                required
                type="text" 
                placeholder="PACKAGE NAME" 
                className="w-full p-4 border-[3px] border-black font-bold text-lg outline-none focus:bg-white bg-white/50 placeholder:text-black/40 uppercase"
                value={newPackage.name}
                onChange={e => setNewPackage({...newPackage, name: e.target.value})}
              />
              <input 
                required
                type="text" 
                placeholder="DESTINATION" 
                className="w-full p-4 border-[3px] border-black font-bold text-lg outline-none focus:bg-white bg-white/50 placeholder:text-black/40 uppercase"
                value={newPackage.dest}
                onChange={e => setNewPackage({...newPackage, dest: e.target.value})}
              />
              <input 
                required
                type="number" 
                placeholder="PRICE ($)" 
                className="w-full p-4 border-[3px] border-black font-bold text-lg outline-none focus:bg-white bg-white/50 placeholder:text-black/40 uppercase"
                value={newPackage.price}
                onChange={e => setNewPackage({...newPackage, price: e.target.value})}
              />
              <button className="w-full bg-black text-white py-4 font-black text-lg border-[3px] border-transparent hover:bg-white hover:text-black hover:border-black transition-all flex items-center justify-center gap-2 uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                <Plus size={24} strokeWidth={3} /> Publish Now
              </button>
            </form>
          </div>

          {/* Existing Packages */}
          {packages.map(pkg => (
             <BrutalCard key={pkg.id} className="!p-0 overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
               <div className="h-48 bg-slate-200 relative border-b-[3px] border-black group">
                 <img src={`https://picsum.photos/400/200?random=${pkg.id}`} alt="cover" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                 <span className="absolute top-4 right-4 bg-white border-[2px] border-black px-4 py-1 text-lg font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-3">
                    ${pkg.price}
                 </span>
               </div>
               <div className="p-8 flex-1 flex flex-col">
                 <h4 className="font-black text-2xl mb-2 uppercase leading-tight">{pkg.name}</h4>
                 <p className="text-sm font-bold text-slate-500 mb-8 flex items-center gap-2 uppercase tracking-wide">
                    <ArrowRight size={16} strokeWidth={3} /> {pkg.destination} • {pkg.duration} DAYS
                 </p>
                 <div className="mt-auto flex justify-between items-center border-t-[3px] border-black pt-6">
                   <div className="flex items-center gap-2">
                       <Users size={16} />
                       <span className="font-black text-sm">{pkg.bookings} BOOKINGS</span>
                   </div>
                   <button className="font-black text-sm uppercase bg-slate-200 px-4 py-2 border-2 border-black hover:bg-[#a6f756] transition-colors shadow-[2px_2px_0px_0px_black]">EDIT</button>
                 </div>
               </div>
             </BrutalCard>
          ))}
        </div>
      )}
    </div>
  );
};