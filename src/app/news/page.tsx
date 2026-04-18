"use client";

import { Hammer, Sparkles, Clock } from "lucide-react";

export default function News() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-24">
      <div className="max-w-2xl w-full text-center space-y-8 bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -mr-16 -mt-16 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50 rounded-full -ml-16 -mb-16 animate-pulse"></div>

        <div className="relative">
          <div className="w-24 h-24 bg-sky-500 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-sky-500/20 mb-8 transform rotate-3">
            <Hammer size={48} />
          </div>
          
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6 border border-amber-100">
            <Clock size={14} />
            Mise à jour prochaine
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
            Cette page est en cours de construction
          </h1>
          
          <p className="text-xl font-bold text-gray-500 mt-6 italic">
            hellosalut
          </p>

          <div className="pt-10 flex justify-center gap-4">
            <div className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 font-black text-gray-400 text-sm">
              <Sparkles size={18} className="text-sky-500" />
              USP-ALUMNI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
