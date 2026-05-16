"use client";

import { Construction, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Treasury() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl shadow-sky-900/5 border border-gray-100 p-12 lg:p-20 text-center relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="w-24 h-24 bg-sky-50 rounded-[2.5rem] flex items-center justify-center text-sky-500 mx-auto shadow-xl shadow-sky-500/10 transform -rotate-6">
            <Construction size={48} />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter">
              Page en <br />
              <span className="text-sky-500 italic">Développement.</span>
            </h1>
            <p className="text-gray-500 font-bold text-lg leading-relaxed max-w-sm mx-auto">
              Nous préparons un espace sécurisé pour la gestion des cotisations et des dons de l&apos;AEPS-ALUMNI.
            </p>
          </div>

          <div className="pt-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/20 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Retour à l&apos;accueil
            </Link>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-50 rounded-full -ml-24 -mb-24 blur-3xl opacity-50"></div>
      </div>
    </div>
  );
}
