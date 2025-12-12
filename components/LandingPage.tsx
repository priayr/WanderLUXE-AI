import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Camera, Zap, Globe, ArrowRight, Play, Star, MapPin, Smile, Ticket, Plane, Users, QrCode } from 'lucide-react';

// --- Sub-components ---

const Marquee = () => (
  <div className="relative flex overflow-x-hidden bg-black text-white py-4 transform -rotate-1">
    <div className="animate-marquee whitespace-nowrap flex gap-8 items-center font-black text-2xl uppercase tracking-widest">
      <span className="mx-4">★ PLAN LESS, LIVE MORE</span>
      <span className="mx-4 text-lime-400">★ AI POWERED</span>
      <span className="mx-4">★ HIDDEN GEMS ONLY</span>
      <span className="mx-4 text-purple-400">★ NO TOURIST TRAPS</span>
      <span className="mx-4">★ VIBE CHECK PASSED</span>
      <span className="mx-4 text-lime-400">★ AR GUIDES</span>
      <span className="mx-4">★ PLAN LESS, LIVE MORE</span>
      <span className="mx-4 text-lime-400">★ AI POWERED</span>
      <span className="mx-4">★ HIDDEN GEMS ONLY</span>
      <span className="mx-4 text-purple-400">★ NO TOURIST TRAPS</span>
    </div>
  </div>
);

const YellowMarquee = () => (
  <div className="relative flex overflow-x-hidden bg-[#FFDE00] border-y-[3px] border-black py-6">
    <div className="animate-marquee whitespace-nowrap flex gap-12 items-center font-black text-3xl text-black uppercase tracking-wider">
      {[1, 2, 3, 4, 5].map((i) => (
        <React.Fragment key={i}>
          <span className="flex items-center gap-4">
            <span>★ 4.9 STARS ON APP STORE</span>
            <span>★ DOWNLOAD NOW</span>
            <span>★ TRAVEL WEIRD</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const Pill = ({ text, color = "bg-slate-100" }: { text: string, color?: string }) => (
  <div className={`px-4 py-1.5 rounded-full text-xs font-bold border border-black/5 inline-block ${color}`}>
    {text}
  </div>
);

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans overflow-x-hidden selection:bg-lime-300">
      
      {/* --- CSS for Custom Animations --- */}
      <style>{`
        .bg-grid-pattern {
          background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
          background-size: 40px 40px;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(-15px) rotate(8deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        
        {/* Abstract Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] -z-10" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 transform -rotate-2 hover:rotate-0 transition-transform">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/>
                <span className="font-bold text-sm tracking-tight">AI TRAVEL COMPANION V2.0</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-slate-900 leading-[0.85] mb-8">
                NO MAPS.<br/>
                JUST <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">VIBES.</span>
              </h1>
              
              <p className="text-xl md:text-2xl font-medium text-slate-600 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Ditch the generic "Top 10" lists. WanderLuxe uses AI to curate a trip that actually matches your personality.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => navigate('/tourist')}
                  className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-blue-600 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-0 active:shadow-none border-2 border-transparent"
                >
                  START EXPLORING
                </button>
                <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xl border-2 border-slate-900 hover:bg-slate-50 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] active:translate-y-0 active:shadow-none flex items-center gap-2 justify-center">
                  <Play size={20} fill="currentColor" /> DEMO
                </button>
              </div>

              {/* Social Proof */}
              <div className="mt-12 flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="User" />
                        </div>
                    ))}
                    </div>
                    <div className="text-sm font-bold text-slate-600">
                        Joined by 10,000+ nomads
                    </div>
                </div>
                
                {/* Badge relocated to match screenshot style if needed, but keeping generally visible */}
                <div className="bg-black text-white border-2 border-slate-900 px-4 py-2 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] font-bold flex items-center gap-2 transform rotate-2">
                    <Star size={16} className="text-yellow-400" fill="currentColor" /> 
                    Highly Rated
                </div>
              </div>
            </div>

            {/* Right Visuals - Floating Cards */}
            <div className="flex-1 relative w-full h-[500px] hidden md:block">
              <div className="absolute top-10 right-10 w-64 h-80 bg-slate-900 rounded-3xl transform rotate-3 z-10 overflow-hidden border-4 border-white shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-90" alt="Travel" />
                 <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl">
                    <div className="flex justify-between items-center">
                       <span className="font-bold text-sm">📍 Kyoto, Japan</span>
                       <span className="text-xs bg-black text-white px-2 py-1 rounded">98% Match</span>
                    </div>
                 </div>
              </div>

              <div className="absolute top-32 right-64 w-60 h-72 bg-lime-300 rounded-3xl transform -rotate-6 z-0 border-4 border-slate-900 flex items-center justify-center shadow-xl">
                 <div className="text-center p-6">
                    <Zap size={48} className="mx-auto mb-2 text-slate-900" />
                    <h3 className="font-black text-2xl leading-tight">Itinerary Generated in 3.2s</h3>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Marquee --- */}
      <Marquee />

      {/* --- Bento Grid Features --- */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-4">EVERYTHING YOU NEED.</h2>
            <p className="text-xl text-slate-500 font-medium">To conquer the world (or just your weekend).</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-auto md:h-[600px]">
            
            {/* Card 1: Smart Itineraries (Left Large) */}
            <div className="md:row-span-2 relative bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[24px] p-8 flex flex-col justify-between overflow-hidden group transition-transform hover:-translate-y-1">
               {/* Background Gradient */}
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
               
               <div className="relative z-10">
                 <div className="w-12 h-12 flex items-center justify-center mb-6">
                   <Zap className="w-full h-full fill-yellow-400 text-black" strokeWidth={2} />
                 </div>
                 <h3 className="text-4xl font-black mb-4 leading-tight">Smart Itineraries</h3>
                 <p className="text-xl font-bold text-slate-500">Don't plan. Just say "I want sushi" and watch the magic.</p>
               </div>

               <div className="relative z-10 flex justify-center items-center mt-12 md:mt-0 flex-1">
                  {/* CSS Ticket Animation */}
                  <div className="animate-float relative">
                      <div className="bg-yellow-300 w-64 h-40 border-[3px] border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                          {/* Holes */}
                          <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white border-[3px] border-black rounded-full -translate-y-1/2"></div>
                          <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white border-[3px] border-black rounded-full -translate-y-1/2"></div>
                          
                          {/* Content */}
                          <div className="h-full border-2 border-dashed border-black/20 rounded-lg p-3 flex flex-col justify-between">
                              <div className="flex justify-between items-center border-b-2 border-black pb-2">
                                  <span className="font-black text-xl">TOKYO</span>
                                  <Plane size={24} className="text-black" strokeWidth={2.5} />
                              </div>
                              <div className="font-mono text-sm font-bold opacity-75">
                                  <div className="flex justify-between"><span>ADMIT</span><span>01</span></div>
                                  <div className="flex justify-between"><span>DATE</span><span>NOW</span></div>
                              </div>
                              <div className="self-end font-black text-2xl tracking-widest">WNDR</div>
                          </div>
                      </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-8 h-full">
               {/* Card 2: Vibe Search (Right Top) */}
               <div className="flex-1 bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[24px] p-8 relative group overflow-hidden transition-transform hover:-translate-y-1 cursor-default">
                  <div className="relative z-20 flex justify-between items-start mb-4">
                     <h3 className="text-2xl font-black">Vibe Search</h3>
                     <div className="bg-black text-white p-1 rounded-full"><Smile size={24} /></div>
                  </div>
                  <p className="relative z-20 font-bold text-slate-500 mb-8">Chill vs Party</p>

                  {/* Polaroid Stack */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 flex items-center justify-center mt-4 pointer-events-none">
                      <div className="absolute w-32 h-40 bg-purple-400 border-[3px] border-black p-2 pb-8 shadow-sm rotate-12 transition-transform duration-500 group-hover:rotate-[25deg] group-hover:translate-x-16 z-0 rounded-lg">
                          <div className="w-full h-full bg-black/10 rounded-sm"></div>
                      </div>
                      <div className="absolute w-32 h-40 bg-lime-400 border-[3px] border-black p-2 pb-8 shadow-sm -rotate-6 transition-transform duration-500 group-hover:-rotate-[15deg] group-hover:-translate-x-16 z-10 rounded-lg">
                          <div className="w-full h-full bg-black/10 rounded-sm"></div>
                      </div>
                      <div className="absolute w-32 h-40 bg-white border-[3px] border-black p-2 pb-8 shadow-sm rotate-3 z-20 transition-transform duration-300 group-hover:scale-105 rounded-lg">
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center rounded-sm">
                              <Smile size={32} className="opacity-20" />
                          </div>
                      </div>
                  </div>
               </div>

               {/* Card 3: Split Costs (Right Bottom) */}
               <div className="flex-1 bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[24px] p-8 flex flex-col justify-between transition-transform hover:-translate-y-1">
                   <h3 className="text-2xl font-black">Fair & Square</h3>
                   
                   <div className="flex items-center justify-between px-2 py-6">
                       <div className="w-14 h-14 rounded-full border-[3px] border-black bg-orange-200 flex items-center justify-center font-black text-lg">A</div>
                       
                       <div className="flex-1 h-0 border-t-[3px] border-dashed border-black relative mx-2">
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded-full text-sm font-bold border-2 border-white shadow-sm transform -rotate-2">
                               $50
                           </div>
                       </div>
                       
                       <div className="w-14 h-14 rounded-full border-[3px] border-black bg-blue-200 flex items-center justify-center font-black text-lg">B</div>
                   </div>
                   <p className="text-right text-sm font-bold text-slate-400">Splitting made simple.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-32 bg-[#020617] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-20">
            {/* Left Column: Text & Boarding Pass */}
            <div className="flex-1 text-center lg:text-left z-20 w-full">
              <h2 className="text-6xl md:text-9xl font-black mb-12 tracking-tighter leading-[0.8] text-white">
                READY TO <br /> <span className="text-[#a6f756]">GO?</span>
              </h2>

              {/* Boarding Pass Component */}
              <div
                onClick={() => navigate('/tourist')}
                className="group mx-auto lg:mx-0 bg-white w-full max-w-[480px] h-48 border-[3px] border-black rounded-[32px] shadow-[8px_8px_0px_0px_#a6f756] flex overflow-hidden cursor-pointer transition-transform hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#a6f756]"
              >
                {/* Ticket Stub */}
                <div className="flex-1 p-6 relative flex flex-col justify-between border-r-[3px] border-dashed border-black bg-white">
                  {/* Perforation Circles */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#020617] rounded-full border-[3px] border-black"></div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#020617] rounded-full border-[3px] border-black"></div>

                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                        DESTINATION
                      </div>
                      <div className="text-4xl font-black text-black leading-none">
                        WORLD
                      </div>
                    </div>
                    <Plane className="text-slate-200 rotate-45" size={40} />
                  </div>

                  <div className="flex gap-8">
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        PASSENGER
                      </div>
                      <div className="text-lg font-black text-black">YOU</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        CLASS
                      </div>
                      <div className="text-lg font-black text-black bg-[#FFDE00] px-2 border-2 border-black -rotate-2 inline-block">
                        VIP
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Section */}
                <div className="w-40 bg-[#a6f756] p-4 flex flex-col items-center justify-center text-center relative">
                  <div className="bg-white p-2 border-[3px] border-black rounded-xl mb-3 group-hover:scale-105 transition-transform">
                    <QrCode size={48} className="text-black" />
                  </div>
                  <div className="text-[10px] font-black text-black uppercase leading-tight">
                    SCAN TO
                    <br />
                    BOARD
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Phone Mockup */}
            <div className="flex-1 relative w-full flex justify-center lg:justify-end">
              <div className="relative w-[320px] h-[640px] bg-slate-100 rounded-[50px] border-[4px] border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden transform rotate-[-6deg] hover:rotate-0 transition-all duration-500 z-10">
                {/* Frame Details */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-30"></div>

                {/* Screen Image */}
                <img
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop"
                  className="w-full h-full object-cover filter brightness-110"
                  alt="App Interface"
                />

                {/* UI Overlay on Phone */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-20 flex flex-col justify-end p-6">
                  <div className="bg-white/10 backdrop-blur-md border-[2px] border-white/50 rounded-2xl p-4 text-white">
                    <h3 className="font-black text-2xl mb-1">
                      BALI, INDONESIA
                    </h3>
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <span className="bg-[#a6f756] text-black px-2 py-0.5 rounded-md border border-black">
                        98% Match
                      </span>
                      <span>$800/week</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-[#FFDE00] text-black font-black py-3 rounded-xl border-[2px] border-black shadow-[4px_4px_0px_0px_black] hover:translate-y-1 hover:shadow-none transition-all">
                    VIEW ITINERARY
                  </button>
                </div>
              </div>

              {/* Decorative Elements behind phone */}
              <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
              <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#a6f756] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Yellow Marquee --- */}
      <YellowMarquee />

      {/* --- Footer --- */}
      <footer className="bg-black text-white pt-24 pb-12 border-t-[3px] border-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-white text-black p-2.5 rounded-xl border-[3px] border-white">
                <Compass size={32} strokeWidth={2.5} />
              </div>
              <span className="text-3xl font-black tracking-tighter">
                WanderLuxe.
              </span>
            </div>

            {/* Center: Newsletter Form */}
            <div className="w-full max-w-lg">
              <label className="block text-center text-xl font-black mb-4 tracking-wide text-white/90">
                GET WEIRD TRAVEL TIPS.
              </label>
              <div className="flex gap-0 relative">
                <input
                  type="email"
                  placeholder="you@weird.com"
                  className="w-full bg-white text-black border-[3px] border-black p-4 text-lg font-bold outline-none placeholder:text-slate-400 focus:bg-[#f0f9ff]"
                />
                <button className="bg-[#a6f756] text-black border-y-[3px] border-r-[3px] border-black px-8 py-4 font-black text-lg hover:bg-[#b5fd6d] transition-colors shadow-[6px_6px_0px_0px_#333] hover:shadow-[4px_4px_0px_0px_#333] hover:translate-y-[2px] active:translate-y-[4px] active:shadow-none">
                  SEND
                </button>
              </div>
            </div>

            {/* Right: Socials */}
            <div className="flex gap-8 text-sm font-black text-slate-400 uppercase tracking-widest">
              <a
                href="#"
                className="hover:text-[#a6f756] hover:underline decoration-[3px] underline-offset-4 transition-all"
              >
                Instagram
              </a>
              <a
                href="#"
                className="hover:text-[#a6f756] hover:underline decoration-[3px] underline-offset-4 transition-all"
              >
                TikTok
              </a>
              <a
                href="#"
                className="hover:text-[#a6f756] hover:underline decoration-[3px] underline-offset-4 transition-all"
              >
                Twitter
              </a>
            </div>
          </div>

          <div className="text-center text-slate-700 font-bold text-xs uppercase tracking-widest">
            © 2024 WanderLuxe AI. Plan Less, Live More.
          </div>
        </div>
      </footer>

    </div>
  );
};