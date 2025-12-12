import React, { useState } from 'react';
import { Search, MapPin, Calendar, DollarSign, Sun, Clock, Move, Sparkles, Plane, Hotel, Utensils, Tag, ArrowRight } from 'lucide-react';
import { getDestinationDetails, generateItinerary, getVibeMatch } from '../services/geminiService';
import { DestinationDetails, DayPlan } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartTooltip, Legend } from 'recharts';

const COLORS = ['#000000', '#84cc16', '#a855f7', '#3b82f6']; // Black, Lime, Purple, Blue

const BrutalCard = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);

const BrutalButton = ({ onClick, children, variant = "primary", className = "", disabled = false }: any) => {
  const baseStyle = "px-6 py-3 font-black text-lg rounded-xl border-2 border-black transition-all active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-lime-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
    secondary: "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
    dark: "bg-black text-white shadow-[4px_4px_0px_0px_#84cc16] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#84cc16]"
  };
  
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}>
      {children}
    </button>
  );
};

export const TouristView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [vibeMode, setVibeMode] = useState(false);
  const [destination, setDestination] = useState<DestinationDetails | null>(null);
  const [destinationName, setDestinationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'budget'>('overview');
  
  // Itinerary State
  const [itinerary, setItinerary] = useState<DayPlan[]>([]);
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState('Culture, Food');

  // Cost Calculator State
  const [travelers, setTravelers] = useState(2);
  const [travelStyle, setTravelStyle] = useState<'Budget' | 'Luxury'>('Budget');

  // New Data for Explore View
  const vibes = ['Solo Trip', 'Hidden Gems', 'Cyberpunk', 'Digital Nomad', 'Eco-Retreat'];
  const trending = [
    { id: 1, name: 'TOKYO', price: '$1,200', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26' },
    { id: 2, name: 'ICELAND', price: '$1,500', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae' },
    { id: 3, name: 'MARRAKECH', price: '$900', image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b' },
    { id: 4, name: 'BALI', price: '$800', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4' },
    { id: 5, name: 'NYC', price: '$1,800', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9' },
    { id: 6, name: 'SANTORINI', price: '$2,000', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff' },
  ];

  const handleSearch = async (overrideQuery?: string, overrideVibeMode?: boolean) => {
    const activeQuery = overrideQuery || query;
    const activeVibeMode = overrideVibeMode !== undefined ? overrideVibeMode : vibeMode;

    if (!activeQuery) return;
    
    // Update local state to reflect what's happening
    if (overrideQuery) setQuery(overrideQuery);
    if (overrideVibeMode !== undefined) setVibeMode(activeVibeMode);

    setLoading(true);
    setDestination(null);
    setItinerary([]);
    
    try {
      let targetPlace = activeQuery;
      if (activeVibeMode) {
        const matches = await getVibeMatch(activeQuery);
        if (matches.length > 0) {
            targetPlace = matches[0]; 
            setDestinationName(targetPlace);
        }
      } else {
        setDestinationName(activeQuery);
      }

      const details = await getDestinationDetails(targetPlace);
      setDestination(details);
      
      const plans = await generateItinerary(targetPlace, days, interests);
      setItinerary(plans);
    } catch (e) {
      alert("Failed to fetch destination data. Please check API Key or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, dayIndex: number, itemIndex: number) => {
    e.dataTransfer.setData('dayIndex', dayIndex.toString());
    e.dataTransfer.setData('itemIndex', itemIndex.toString());
  };

  const handleDrop = (e: React.DragEvent, targetDayIndex: number) => {
    e.preventDefault();
    const sourceDayIndex = parseInt(e.dataTransfer.getData('dayIndex'));
    const sourceItemIndex = parseInt(e.dataTransfer.getData('itemIndex'));

    if (isNaN(sourceDayIndex) || isNaN(sourceItemIndex)) return;

    const newItinerary = [...itinerary];
    const [movedItem] = newItinerary[sourceDayIndex].activities.splice(sourceItemIndex, 1);
    newItinerary[targetDayIndex].activities.push(movedItem);
    setItinerary(newItinerary);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const calculateCost = () => {
    const multiplier = travelStyle === 'Luxury' ? 2.5 : 1;
    const flight = 500 * multiplier;
    const hotel = 100 * days * multiplier;
    const daily = 50 * days * travelers * multiplier;
    
    return [
      { name: 'Flights', value: flight * travelers },
      { name: 'Stay', value: hotel },
      { name: 'Daily', value: daily },
      { name: 'Transport', value: 100 * multiplier },
    ];
  };

  const costData = calculateCost();
  const totalCost = costData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-20 px-4 md:px-8 font-sans selection:bg-lime-300">
      
      {/* --- Search Section --- */}
      <div className="max-w-5xl mx-auto mb-16">
        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-slate-900">
          EXPLORE.
        </h1>
        
        <div className="relative z-10">
          <div className="bg-white border-2 border-black rounded-3xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-4 items-center">
            
            {/* Vibe Toggle */}
            <button 
              onClick={() => setVibeMode(!vibeMode)}
              className={`px-6 py-3 rounded-xl font-bold border-2 border-black transition-all flex items-center gap-2
                ${vibeMode ? 'bg-purple-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white hover:bg-slate-50'}`}
            >
              {vibeMode ? <Sparkles size={20} /> : <MapPin size={20} />}
              {vibeMode ? 'VIBE MODE' : 'DESTINATION'}
            </button>

            {/* Input */}
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={vibeMode ? "e.g., Cyberpunk city with ramen..." : "e.g., Tokyo, Japan"}
              className="flex-1 w-full bg-slate-50 border-2 border-black rounded-xl px-6 py-3 text-lg font-bold outline-none focus:bg-white transition-colors placeholder:text-slate-400 placeholder:font-medium"
            />

            {/* Search Button */}
            <BrutalButton onClick={() => handleSearch()} disabled={loading} variant="dark" className="w-full md:w-auto">
              {loading ? 'LOADING...' : 'LET\'S GO'}
            </BrutalButton>
          </div>

          {/* Decorative Elements */}
          <div className="hidden md:block absolute -top-12 right-12 bg-lime-400 text-black px-4 py-1 font-mono text-sm font-bold border-2 border-black transform rotate-6">
            AI POWERED
          </div>
        </div>

        {/* --- Default State Content (Vibes & Trending) --- */}
        {!destination && !loading && (
          <div className="mt-12 animate-fade-in-up">
            
            {/* Vibe Filter Bar */}
            <div 
              className="flex gap-4 overflow-x-auto pb-8 mb-12 [&::-webkit-scrollbar]:hidden" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {vibes.map((vibe) => (
                <button 
                  key={vibe}
                  onClick={() => handleSearch(vibe, true)}
                  className="flex-shrink-0 px-6 py-3 rounded-full border-2 border-black bg-white font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-[#a6f756] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none whitespace-nowrap"
                >
                  {vibe}
                </button>
              ))}
            </div>

            {/* Trending Masonry Grid */}
            <div className="mb-8">
              <h2 className="text-4xl font-black mb-8 flex items-center gap-3">
                TRENDING NOW <span className="text-lime-500 animate-pulse">●</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trending.map((place) => (
                  <div 
                    key={place.id}
                    onClick={() => handleSearch(place.name, false)}
                    className="group relative h-[400px] rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden cursor-pointer"
                  >
                      <img src={`${place.image}?auto=format&fit=crop&w=800&q=80`} alt={place.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-white border-2 border-black px-3 py-1 font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">
                        {place.price}
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <h3 className="text-4xl font-black text-white tracking-tighter italic uppercase">{place.name}</h3>
                      </div>

                      {/* Plan Trip Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                        <button className="bg-[#a6f756] text-black font-black text-xl px-8 py-3 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform translate-y-10 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                            PLAN TRIP <Plane size={24} strokeWidth={3} />
                        </button>
                      </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {loading && (
        <div className="max-w-5xl mx-auto py-20 text-center">
            <div className="inline-block animate-spin mb-4">
                <Sparkles size={48} className="text-lime-500" />
            </div>
            <h2 className="text-2xl font-black">CURATING YOUR TRIP...</h2>
            <p className="text-slate-500 font-bold">Asking the locals (AI)</p>
        </div>
      )}

      {destination && (
        <div className="max-w-7xl mx-auto animate-fade-in-up">
          
          {/* --- Navigation Tabs --- */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
            {['overview', 'itinerary', 'budget'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-8 py-3 rounded-xl font-black text-xl border-2 border-black transition-all uppercase tracking-wide
                  ${activeTab === tab 
                    ? 'bg-black text-white shadow-[4px_4px_0px_0px_#84cc16] -translate-y-1' 
                    : 'bg-white text-slate-500 hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
              >
                {tab}
              </button>
            ))}
            {/* Back Button */}
            <button 
                onClick={() => setDestination(null)}
                className="px-8 py-3 rounded-xl font-bold text-lg border-2 border-black bg-white hover:bg-red-50 text-red-600 transition-all ml-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
                CLOSE
            </button>
          </div>

          {/* --- Content Area --- */}
          <div className="bg-[#FDFCF8]">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Main Image Card */}
                <BrutalCard className="md:col-span-2 !p-0 overflow-hidden relative group min-h-[400px]">
                  <img 
                    src={`https://picsum.photos/800/600?random=${Math.random()}`} 
                    alt="Destination" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h2 className="text-6xl font-black mb-2 tracking-tighter">{destinationName.toUpperCase()}</h2>
                    <div className="flex gap-2">
                       {destination.culturalTips.slice(0,2).map((tip, i) => (
                         <span key={i} className="bg-lime-400 text-black px-3 py-1 text-xs font-bold border border-black transform -rotate-1">
                           {tip.substring(0, 30)}...
                         </span>
                       ))}
                    </div>
                  </div>
                </BrutalCard>

                {/* Info Stack */}
                <div className="space-y-6">
                  <BrutalCard className="bg-purple-100">
                    <div className="flex items-center gap-3 mb-2 text-purple-600">
                      <Sun strokeWidth={3} />
                      <h3 className="font-black text-xl">WEATHER</h3>
                    </div>
                    <p className="font-bold text-slate-800 leading-tight">{destination.weather}</p>
                  </BrutalCard>
                  
                  <BrutalCard className="bg-blue-100">
                    <div className="flex items-center gap-3 mb-2 text-blue-600">
                      <Calendar strokeWidth={3} />
                      <h3 className="font-black text-xl">BEST TIME</h3>
                    </div>
                    <p className="font-bold text-slate-800 leading-tight">{destination.bestTime}</p>
                  </BrutalCard>

                  <BrutalCard className="bg-lime-100">
                    <div className="flex items-center gap-3 mb-2 text-lime-700">
                      <Tag strokeWidth={3} />
                      <h3 className="font-black text-xl">VISA</h3>
                    </div>
                    <p className="font-bold text-slate-800 leading-tight">{destination.visaRequirements}</p>
                  </BrutalCard>
                </div>
                
                {/* Long Description */}
                <BrutalCard className="md:col-span-3">
                   <h3 className="font-black text-2xl mb-4 uppercase">The Vibe Check</h3>
                   <p className="text-lg font-medium text-slate-600 leading-relaxed max-w-4xl">
                     {destination.description}
                   </p>
                </BrutalCard>
              </div>
            )}

            {/* ITINERARY TAB */}
            {activeTab === 'itinerary' && (
              <div className="overflow-x-auto pb-8">
                <div className="flex gap-6 min-w-max">
                  {itinerary.map((day, dIdx) => (
                    <div 
                      key={day.day} 
                      className="w-80 bg-white border-2 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, dIdx)}
                    >
                      {/* Day Header */}
                      <div className="bg-black text-white p-4 flex justify-between items-center">
                        <h4 className="font-black text-2xl tracking-tight">DAY 0{day.day}</h4>
                        <div className="w-8 h-8 rounded-full bg-lime-400 border-2 border-white flex items-center justify-center text-black font-bold text-sm">
                          {day.activities.length}
                        </div>
                      </div>

                      {/* Activities List */}
                      <div className="p-4 space-y-3 bg-slate-50 flex-1">
                        {day.activities.map((act, aIdx) => (
                          <div
                            key={act.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, dIdx, aIdx)}
                            className="bg-white border-2 border-black p-3 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-move hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all group active:scale-95"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-mono text-xs font-bold bg-slate-200 px-2 py-0.5 rounded border border-black/10">
                                {act.time}
                              </span>
                              <Move size={14} className="text-slate-300 group-hover:text-black" />
                            </div>
                            <p className="font-bold text-sm leading-tight mb-2">{act.activity}</p>
                            <div className="flex gap-1">
                               <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border border-black 
                                 ${act.type === 'food' ? 'bg-orange-200' : 
                                   act.type === 'relax' ? 'bg-blue-200' : 
                                   act.type === 'adventure' ? 'bg-red-200' : 'bg-lime-200'}`}>
                                 {act.type}
                               </span>
                            </div>
                          </div>
                        ))}
                        {day.activities.length === 0 && (
                          <div className="h-24 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm font-bold">
                            Free Day
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BUDGET TAB */}
            {activeTab === 'budget' && (
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Controls */}
                <div className="space-y-6">
                  <BrutalCard>
                     <h3 className="font-black text-2xl mb-6 flex items-center gap-2">
                       <DollarSign className="text-lime-500" strokeWidth={3} /> ESTIMATOR
                     </h3>
                     
                     <div className="space-y-4">
                       <div>
                         <label className="block text-sm font-black mb-2 uppercase">Travelers</label>
                         <input 
                            type="number" 
                            min="1" 
                            value={travelers} 
                            onChange={(e) => setTravelers(parseInt(e.target.value))}
                            className="w-full border-2 border-black rounded-xl p-3 font-bold text-lg outline-none focus:bg-slate-50"
                          />
                       </div>
                       
                       <div>
                         <label className="block text-sm font-black mb-2 uppercase">Vibe Level</label>
                         <div className="grid grid-cols-2 gap-2">
                            <button 
                              onClick={() => setTravelStyle('Budget')}
                              className={`p-3 border-2 border-black rounded-xl font-bold transition-all
                                ${travelStyle === 'Budget' ? 'bg-lime-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-slate-500'}`}
                            >
                              BROKE STUDENT
                            </button>
                            <button 
                              onClick={() => setTravelStyle('Luxury')}
                              className={`p-3 border-2 border-black rounded-xl font-bold transition-all
                                ${travelStyle === 'Luxury' ? 'bg-purple-400 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-slate-500'}`}
                            >
                              BALLER
                            </button>
                         </div>
                       </div>
                     </div>
                  </BrutalCard>

                  <div className="bg-black text-white p-8 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_#84cc16]">
                     <p className="font-mono text-lime-400 text-sm mb-1">TOTAL ESTIMATED COST</p>
                     <p className="text-6xl font-black tracking-tighter">${totalCost.toLocaleString()}</p>
                     <p className="text-sm text-slate-400 mt-2 font-medium">Includes flights, hotels, and vibing.</p>
                  </div>
                </div>

                {/* Chart */}
                <BrutalCard className="min-h-[400px] flex flex-col">
                   <h3 className="font-black text-xl mb-4">BREAKDOWN</h3>
                   <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={costData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {costData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="black" strokeWidth={2} />
                            ))}
                          </Pie>
                          <Legend 
                            layout="vertical" 
                            verticalAlign="middle" 
                            align="right"
                            iconType="square"
                            formatter={(value) => <span className="font-bold text-black ml-2">{value}</span>}
                          />
                          <RechartTooltip 
                            contentStyle={{ borderRadius: '12px', border: '2px solid black', boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)', fontWeight: 'bold' }}
                            itemStyle={{ color: 'black' }}
                            formatter={(value) => `$${value}`} 
                          />
                        </PieChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                      {costData.map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b border-dashed border-slate-300 py-1">
                          <span>{item.name}</span>
                          <span className="font-bold">${item.value}</span>
                        </div>
                      ))}
                   </div>
                </BrutalCard>

              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};