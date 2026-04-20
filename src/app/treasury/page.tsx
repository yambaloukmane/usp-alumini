"use client";

import { useState, useEffect } from "react";
import { Wallet, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Treasury() {
  const router = useRouter();

  useEffect(() => {
    const currentUser = localStorage.getItem("usp_current_user");
    if (!currentUser) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40 min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-16 rounded-[3rem] shadow-2xl border border-gray-100 text-center max-w-2xl relative overflow-hidden group">
        {/* Background Sparkles */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-50 transition-all group-hover:scale-110"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-50 transition-all group-hover:scale-110"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-sky-500 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-10 shadow-xl shadow-sky-500/20 transform group-hover:rotate-12 transition-transform">
            <Wallet size={48} />
          </div>
          
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-6 uppercase tracking-widest">Trésorerie</h2>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-xs font-black uppercase tracking-widest border border-amber-100 mb-8">
            <Clock size={16} />
            En cours de développement
          </div>
          
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Nous travaillons activement sur cet espace pour vous offrir une gestion transparente et sécurisée de vos cotisations.
          </p>
          
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
