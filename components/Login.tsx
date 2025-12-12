import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ArrowRight, Star, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo, redirect to tourist view
    navigate('/tourist');
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans relative overflow-hidden flex items-center justify-center p-4 pt-24 md:pt-4">
      {/* Background Grid & Blobs */}
       <style>{`
        .bg-grid-pattern {
          background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] -z-10" />
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-pulse"></div>
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-[#a6f756] rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-pulse delay-1000"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Side: Branding/Art */}
        <div className="hidden lg:block space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white border-2 border-transparent shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] mb-4 transform -rotate-2">
                <Star size={16} className="text-[#FFDE00]" fill="#FFDE00" />
                <span className="font-bold text-sm tracking-tight uppercase">Members Only</span>
            </div>
            
            <h1 className="text-8xl font-black tracking-tighter leading-[0.85]">
                WELCOME <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">BACK.</span>
            </h1>
            
            <p className="text-2xl font-bold text-slate-500 max-w-md">
                Ready to plan your next weird adventure? The AI has been waiting for you.
            </p>

            {/* Decorative Card */}
             <div className="relative w-80 h-48 bg-[#FFDE00] border-[4px] border-black rounded-2xl shadow-[8px_8px_0px_0px_black] p-6 flex flex-col justify-between transform rotate-3 hover:rotate-6 transition-transform mt-12">
                <div className="flex justify-between items-start">
                    <Compass size={40} strokeWidth={2.5} />
                    <div className="bg-black text-white px-2 py-1 font-mono text-xs font-bold uppercase">Valid: Forever</div>
                </div>
                <div className="font-black text-2xl tracking-widest uppercase">WanderLuxe<br/>Passport</div>
             </div>
        </div>

        {/* Right Side: Login Form */}
        <div>
            <div className="bg-white border-[4px] border-black rounded-[32px] p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
                
                {/* Mobile Title */}
                <div className="lg:hidden mb-8 text-center">
                    <h1 className="text-5xl font-black tracking-tighter mb-2">HEY THERE.</h1>
                    <p className="font-bold text-slate-500">Sign in to start exploring.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block font-black text-sm uppercase mb-2 ml-1">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="nomad@example.com" 
                            className="w-full bg-slate-50 border-[3px] border-black rounded-xl p-4 font-bold text-lg outline-none focus:bg-[#FFDE00]/20 focus:shadow-[4px_4px_0px_0px_black] transition-all placeholder:text-slate-400"
                        />
                    </div>
                    
                    <div>
                        <label className="block font-black text-sm uppercase mb-2 ml-1 flex justify-between">
                            <span>Password</span>
                            <a href="#" className="text-blue-600 underline decoration-2 underline-offset-2">Forgot?</a>
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            className="w-full bg-slate-50 border-[3px] border-black rounded-xl p-4 font-bold text-lg outline-none focus:bg-[#FFDE00]/20 focus:shadow-[4px_4px_0px_0px_black] transition-all placeholder:text-slate-400"
                        />
                    </div>

                    <button className="w-full bg-[#a6f756] text-black border-[3px] border-black rounded-xl py-5 font-black text-xl uppercase tracking-wider shadow-[6px_6px_0px_0px_black] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_black] active:translate-y-[6px] active:shadow-none transition-all flex items-center justify-center gap-3">
                        Let's Go <ArrowRight strokeWidth={3} />
                    </button>
                </form>

                <div className="mt-8 relative flex py-5 items-center">
                    <div className="flex-grow border-t-[3px] border-slate-200"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-400 font-bold text-sm uppercase">Or continue with</span>
                    <div className="flex-grow border-t-[3px] border-slate-200"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="border-[3px] border-black rounded-xl py-3 font-bold hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors">
                        <span className="text-xl">G</span> Google
                    </button>
                    <button className="border-[3px] border-black rounded-xl py-3 font-bold hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors">
                        <span className="text-xl"></span> Apple
                    </button>
                </div>

                <div className="mt-8 text-center font-bold text-sm">
                    Don't have an account? <Link to="/register" className="text-blue-600 underline decoration-[3px] underline-offset-4 decoration-black/20 hover:decoration-black transition-all">Join the club</Link>
                </div>

                {/* Floating Secure Badge */}
                <div className="absolute -top-6 -right-6 bg-white border-[3px] border-black px-4 py-2 rounded-lg shadow-[4px_4px_0px_0px_black] rotate-6 hidden md:flex items-center gap-2">
                    <ShieldCheck size={20} className="text-green-500" />
                    <span className="font-black text-xs uppercase">100% Secure</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};