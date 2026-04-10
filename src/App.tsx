/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { 
  Dumbbell, 
  Utensils, 
  Zap, 
  Heart, 
  ChevronRight, 
  Info, 
  Activity,
  CheckCircle2,
  ArrowLeft,
  MessageSquare,
  Send,
  Loader2
} from 'lucide-react';
import { cn } from './lib/utils';
import { plans, type BodyType, type Plan } from './data/plans';
import { askExpert } from './services/gemini';

export default function App() {
  const [selectedType, setSelectedType] = useState<BodyType | null>(() => {
    const saved = localStorage.getItem('fitexpert_body_type');
    return saved ? (saved as BodyType) : null;
  });
  const [age, setAge] = useState(() => localStorage.getItem('fitexpert_age') || '');
  const [weight, setWeight] = useState(() => localStorage.getItem('fitexpert_weight') || '');
  const [height, setHeight] = useState(() => localStorage.getItem('fitexpert_height') || '');
  const [chatOpen, setChatOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', text: string }[]>(() => {
    const saved = localStorage.getItem('fitexpert_chat_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAsking, setIsAsking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Persistence Effects
  useEffect(() => {
    if (selectedType) localStorage.setItem('fitexpert_body_type', selectedType);
    else localStorage.removeItem('fitexpert_body_type');
  }, [selectedType]);

  useEffect(() => {
    localStorage.setItem('fitexpert_age', age);
  }, [age]);

  useEffect(() => {
    localStorage.setItem('fitexpert_weight', weight);
  }, [weight]);

  useEffect(() => {
    localStorage.setItem('fitexpert_height', height);
  }, [height]);

  useEffect(() => {
    localStorage.setItem('fitexpert_chat_history', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleSelect = (type: BodyType) => {
    setSelectedType(type);
    setChatHistory([]);
    setChatOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua data dan kembali ke awal?')) {
      setSelectedType(null);
      setAge('');
      setWeight('');
      setHeight('');
      setChatHistory([]);
      localStorage.clear();
    }
  };

  const currentPlan = selectedType ? plans[selectedType] : null;

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !selectedType || !currentPlan || isAsking) return;

    const userQ = question;
    setQuestion('');
    setChatHistory(prev => [...prev, { role: 'user', text: userQ }]);
    setIsAsking(true);

    const response = await askExpert(
      selectedType, 
      `Meal: ${currentPlan.mealPlan}\nWorkout: ${currentPlan.workoutSchedule}`, 
      userQ,
      age,
      weight,
      height
    );

    setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
    setIsAsking(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-maroon selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-maroon rounded-xl flex items-center justify-center shadow-lg shadow-maroon/20">
              <Activity className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight uppercase leading-none text-slate-900">
                SMA Genesis Medicare
              </h1>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                by farhan dan yumna
              </span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">Nutrisi</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Latihan</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Gaya Hidup</a>
            <button 
              onClick={handleReset}
              className="text-xs bg-slate-100 hover:bg-red-50 hover:text-red-600 px-3 py-1.5 rounded-lg transition-all font-bold uppercase tracking-wider"
            >
              Reset Data
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!selectedType ? (
            <motion.section
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-5xl md:text-7xl font-black uppercase leading-none tracking-tighter text-slate-900"
                >
                  Pilih Tipe <span className="text-maroon">Tubuh Anda</span>
                </motion.h2>
                <p className="text-slate-500 text-lg md:text-xl">
                  Dapatkan rencana makan dan jadwal olahraga yang dipersonalisasi oleh pakar profesional.
                </p>
              </div>

              {/* User Info Inputs */}
              <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Umur (Thn)</label>
                  <input 
                    type="number" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="25"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Berat (Kg)</label>
                  <input 
                    type="number" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Tinggi (Cm)</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="170"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(Object.keys(plans) as BodyType[]).map((type) => (
                  <BodyTypeCard 
                    key={type}
                    type={type}
                    plan={plans[type]}
                    onClick={() => handleSelect(type)}
                  />
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="plan"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedType(null)}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Kembali ke Pemilihan
                </button>
                
                <button
                  onClick={() => setChatOpen(!chatOpen)}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full text-sm font-bold transition-all text-slate-900"
                >
                  <MessageSquare className="w-4 h-4" />
                  Tanya Pakar AI
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Sidebar Info */}
                <div className="lg:col-span-1 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-black uppercase tracking-tighter text-maroon">
                      {currentPlan?.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {currentPlan?.description}
                    </p>
                    {(age || weight || height) && (
                      <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
                        {age && <span>Umur: {age}</span>}
                        {weight && <span>Berat: {weight}kg</span>}
                        {height && <span>Tinggi: {height}cm</span>}
                      </div>
                    )}
                  </div>

                  {/* BMI Recommendation */}
                  {weight && height && (
                    <BMIRecommendation weight={Number(weight)} height={Number(height)} bodyType={selectedType!} />
                  )}

                  {/* Macros Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Rasio Makronutrisi
                    </h3>
                    <div className="space-y-4">
                      <MacroBar label="Karbohidrat" value={currentPlan?.macros.carbs || 0} color="bg-maroon" />
                      <MacroBar label="Protein" value={currentPlan?.macros.protein || 0} color="bg-blue-500" />
                      <MacroBar label="Lemak" value={currentPlan?.macros.fat || 0} color="bg-yellow-500" />
                    </div>
                  </div>

                  {/* Lifestyle Tips */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <Heart className="w-4 h-4" /> Tips Gaya Hidup
                    </h3>
                    <ul className="space-y-4">
                      {currentPlan?.lifestyleTips.map((tip, i) => (
                        <li key={i} className="flex gap-3 text-slate-700">
                          <CheckCircle2 className="w-5 h-5 text-maroon shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 prose prose-slate max-w-none">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-maroon/10 rounded-2xl flex items-center justify-center">
                        <Utensils className="text-maroon w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold m-0 text-slate-900">Rencana Nutrisi</h3>
                    </div>
                    <div className="markdown-body">
                      <ReactMarkdown>{currentPlan?.mealPlan || ''}</ReactMarkdown>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 prose prose-slate max-w-none">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                        <Dumbbell className="text-blue-500 w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold m-0 text-slate-900">Jadwal Olahraga</h3>
                    </div>
                    <div className="markdown-body">
                      <ReactMarkdown>{currentPlan?.workoutSchedule || ''}</ReactMarkdown>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 prose prose-slate max-w-none">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center">
                        <Zap className="text-yellow-500 w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold m-0 text-slate-900">Olahraga di Rumah</h3>
                    </div>
                    <div className="markdown-body">
                      <ReactMarkdown>{currentPlan?.homeWorkout || ''}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Overlay */}
              <AnimatePresence>
                {chatOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="fixed bottom-8 right-8 w-full max-w-md h-[600px] bg-white border border-slate-200 rounded-3xl shadow-2xl z-[60] flex flex-col overflow-hidden"
                  >
                    <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-maroon rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">Tanya Pakar AI</h4>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Konsultasi Personal</p>
                        </div>
                      </div>
                      <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-slate-900">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {chatHistory.length === 0 && (
                        <div className="text-center py-12 space-y-4">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                            <Info className="w-8 h-8 text-slate-200" />
                          </div>
                          <p className="text-slate-400 text-sm px-8">
                            Tanyakan apa saja tentang rencana makan atau latihan Anda. Contoh: "Apa alternatif protein selain ayam?"
                          </p>
                        </div>
                      )}
                      {chatHistory.map((msg, i) => (
                        <div key={i} className={cn(
                          "flex flex-col gap-2",
                          msg.role === 'user' ? "items-end" : "items-start"
                        )}>
                          <div className={cn(
                            "max-w-[85%] p-4 rounded-2xl text-sm",
                            msg.role === 'user' 
                              ? "bg-maroon text-white rounded-tr-none" 
                              : "bg-slate-100 border border-slate-200 text-slate-700 rounded-tl-none prose prose-slate prose-sm"
                          )}>
                            {msg.role === 'user' ? msg.text : <ReactMarkdown>{msg.text}</ReactMarkdown>}
                          </div>
                        </div>
                      ))}
                      {isAsking && (
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Pakar sedang mengetik...
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleAsk} className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
                      <input 
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Tulis pertanyaan Anda..."
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-maroon/20 focus:border-maroon transition-all text-slate-900"
                      />
                      <button 
                        type="submit"
                        disabled={!question.trim() || isAsking}
                        className="w-10 h-10 bg-maroon rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-colors text-white"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 mt-20 text-center text-slate-400 text-sm">
        <p>© 2026 FitExpert. Didesain untuk performa maksimal.</p>
      </footer>
    </div>
  );
}

function BodyTypeCard({ type, plan, onClick }: { type: BodyType, plan: Plan, onClick: () => void }) {
  const icons = {
    ectomorph: <Zap className="w-8 h-8 text-maroon" />,
    mesomorph: <Activity className="w-8 h-8 text-blue-500" />,
    endomorph: <Dumbbell className="w-8 h-8 text-yellow-500" />
  };

  const colors = {
    ectomorph: 'hover:border-maroon/50 bg-maroon/5',
    mesomorph: 'hover:border-blue-500/50 bg-blue-50/30',
    endomorph: 'hover:border-yellow-500/50 bg-yellow-50/30'
  };

  return (
    <motion.button
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative border border-slate-200 rounded-[2.5rem] p-10 text-left transition-all duration-300",
        colors[type]
      )}
    >
      <div className="space-y-6">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm border border-slate-100">
          {icons[type]}
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900">{plan.title}</h3>
          <p className="text-slate-500 leading-relaxed line-clamp-3">
            {plan.description}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
          Lihat Rencana <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.button>
  );
}

function MacroBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-900">{value}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
    </div>
  );
}

function BMIRecommendation({ weight, height, bodyType }: { weight: number, height: number, bodyType: BodyType }) {
  const bmi = weight / ((height / 100) ** 2);
  let status = '';
  let recommendation = '';
  let colorClass = '';

  if (bmi < 18.5) {
    status = 'Underweight (Kekurangan Berat Badan)';
    colorClass = 'text-blue-600 bg-blue-50 border-blue-100';
    recommendation = bodyType === 'ectomorph' 
      ? 'Fokus pada surplus kalori yang lebih agresif (tambah 500-700 kkal/hari). Tingkatkan asupan protein dan karbohidrat kompleks. Kurangi aktivitas kardio.'
      : 'Tingkatkan porsi makan harian dan pastikan asupan protein mencukupi untuk membangun massa otot.';
  } else if (bmi >= 18.5 && bmi < 25) {
    status = 'Normal (Ideal)';
    colorClass = 'text-green-600 bg-green-50 border-green-100';
    recommendation = 'Berat badan Anda sudah ideal. Fokus pada pemeliharaan (maintenance) dan peningkatan kualitas otot melalui latihan beban rutin.';
  } else if (bmi >= 25 && bmi < 30) {
    status = 'Overweight (Kelebihan Berat Badan)';
    colorClass = 'text-yellow-600 bg-yellow-50 border-yellow-100';
    recommendation = bodyType === 'endomorph'
      ? 'Kurangi asupan karbohidrat olahan dan gula. Tingkatkan durasi kardio LISS menjadi 45-60 menit dan lakukan latihan sirkuit lebih intens.'
      : 'Lakukan defisit kalori moderat dan tingkatkan aktivitas fisik harian (NEAT).';
  } else {
    status = 'Obese (Obesitas)';
    colorClass = 'text-maroon bg-red-50 border-red-100';
    recommendation = 'Sangat disarankan untuk melakukan defisit kalori yang konsisten. Fokus pada protein tinggi untuk menjaga otot saat membakar lemak. Konsultasikan dengan dokter untuk program yang lebih spesifik.';
  }

  return (
    <div className={cn("p-6 rounded-3xl border space-y-3", colorClass)}>
      <div className="flex items-center gap-2">
        <Info className="w-5 h-5" />
        <h4 className="font-bold text-sm uppercase tracking-widest">Analisis Berat Badan</h4>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold opacity-70 uppercase">BMI: {bmi.toFixed(1)} — {status}</p>
        <p className="text-sm leading-relaxed font-medium">{recommendation}</p>
      </div>
    </div>
  );
}
