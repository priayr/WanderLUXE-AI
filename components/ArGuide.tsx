import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, Maximize, ScanLine, X } from 'lucide-react';
import { analyzeLandmark } from '../services/geminiService';

export const ArGuide: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      // Strip prefix for Gemini (data:image/jpeg;base64,)
      const cleanBase64 = base64Data.split(',')[1];
      setImage(base64Data);
      
      setAnalyzing(true);
      const result = await analyzeLandmark(cleanBase64);
      setAnalysis(result);
      setAnalyzing(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 pt-32 pb-20 font-sans">
       <style>{`
         @keyframes scan {
           0% { top: 0%; opacity: 0.8; }
           50% { top: 98%; opacity: 1; }
           100% { top: 0%; opacity: 0.8; }
         }
         .animate-scan {
           animation: scan 3s ease-in-out infinite;
         }
       `}</style>

       <div className="mb-8 text-center">
         <div className="inline-block border-[3px] border-black bg-white px-3 py-1 font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
            System V2.0
         </div>
         <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-black">
            Object Identifier
         </h2>
       </div>
       
       <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 relative">
          
          {/* Viewfinder Area */}
          <div className="aspect-[4/3] md:aspect-video bg-slate-50 relative border-[3px] border-black mb-8 overflow-hidden group cursor-pointer" onClick={() => !image && fileInputRef.current?.click()}>
            
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-[6px] border-l-[6px] border-black z-20"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-[6px] border-r-[6px] border-black z-20"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-[6px] border-l-[6px] border-black z-20"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[6px] border-r-[6px] border-black z-20"></div>

            {/* Crosshair Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-black"></div>
                <div className="absolute top-4 bottom-4 left-1/2 w-[2px] bg-black"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-black rounded-full"></div>
            </div>

            {/* Scan Line Animation */}
            {!image && (
                <div className="absolute left-0 right-0 h-[3px] bg-[#a6f756] shadow-[0_0_15px_#a6f756] animate-scan z-10"></div>
            )}

            {/* Content */}
            {image ? (
                <img src={image} alt="Landmark" className="w-full h-full object-contain relative z-10 bg-black/5" />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <div className="bg-white p-6 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
                        <Camera size={48} className="mx-auto mb-2 text-black" strokeWidth={3} />
                        <p className="font-black text-lg uppercase tracking-wider">Upload Target Image</p>
                    </div>
                </div>
            )}
            
            {/* Analyzing Overlay */}
            {analyzing && (
                <div className="absolute inset-0 bg-black/90 flex items-center justify-center text-[#a6f756] z-30 font-mono text-xl font-bold tracking-widest uppercase">
                    <div className="flex flex-col items-center gap-6">
                        <RefreshCw className="animate-spin w-16 h-16" strokeWidth={3} /> 
                        <span className="animate-pulse">Analyzing Data Stream...</span>
                    </div>
                </div>
            )}
          </div>

          <div className="">
            {!image ? (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-[#a6f756] text-black py-5 border-[3px] border-black font-black text-2xl hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all uppercase tracking-wider flex items-center justify-center gap-3"
                >
                  ACTIVATE LENS
                </button>
            ) : (
                <div className="space-y-6">
                    <div className="bg-white border-[3px] border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative mt-4">
                         <div className="absolute -top-3 left-4 bg-black text-[#a6f756] px-3 py-0.5 font-black text-xs uppercase tracking-widest border border-black">Analysis Complete</div>
                         <h3 className="font-black text-2xl text-black mb-4 uppercase flex items-center gap-2">
                            <Maximize size={24} strokeWidth={3} /> Identification Result
                         </h3>
                         <div className="prose prose-lg text-black font-bold font-mono leading-relaxed">
                             {analysis.split('\n').map((line, i) => line && <p key={i} className="mb-2 pl-4 border-l-[4px] border-[#a6f756]">{line}</p>)}
                         </div>
                    </div>
                    
                    <button 
                      onClick={() => { setImage(null); setAnalysis(''); }}
                      className="w-full bg-white text-black py-4 border-[3px] border-black font-black hover:bg-slate-50 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] active:shadow-none transition-all uppercase tracking-wide flex items-center justify-center gap-2"
                    >
                      <X strokeWidth={3} /> Reset Scanner
                    </button>
                </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              capture="environment" 
              onChange={handleFileChange}
            />
          </div>
       </div>
    </div>
  );
};