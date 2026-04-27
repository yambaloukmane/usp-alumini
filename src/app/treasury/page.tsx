"use client";

import { useState, useEffect } from "react";
import { Wallet, Clock, TrendingUp, History, Download, CreditCard, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { dataService } from "@/lib/dataService";

export default function Treasury() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = dataService.getCurrentUser();
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const mockContributions = [
    { id: 1, date: "15 Mai 2026", amount: "5 000 FCFA", status: "Validé", label: "Cotisation Annuelle 2026" },
    { id: 2, date: "10 Avr 2026", amount: "2 000 FCFA", status: "Validé", label: "Don Projet Biblio" },
    { id: 3, date: "02 Mar 2026", amount: "5 000 FCFA", status: "En attente", label: "Cotisation Annuelle 2025" },
  ];

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-8">
        <div>
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight">Trésorerie</h1>
          <p className="text-gray-500 font-medium text-lg mt-2 italic">Gérez vos contributions et suivez l&apos;impact de vos dons.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-sky-500 text-white px-8 py-5 rounded-[2rem] shadow-2xl shadow-sky-500/30 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-sky-100">Total Contribué</p>
              <p className="text-2xl font-black">7 000 FCFA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content: History */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                <History className="text-sky-500" />
                Historique des paiements
              </h3>
              <button className="text-sky-500 font-black text-sm flex items-center gap-2 hover:underline">
                <Download size={18} />
                Exporter
              </button>
            </div>

            <div className="space-y-4">
              {mockContributions.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-sky-200 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sky-500 shadow-sm">
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <p className="font-black text-gray-900">{c.label}</p>
                      <p className="text-xs text-gray-400 font-bold">{c.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900">{c.amount}</p>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${c.status === 'Validé' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 p-10 rounded-[3rem] border border-amber-100 flex items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="w-20 h-20 bg-amber-200 rounded-3xl flex items-center justify-center text-amber-600 flex-shrink-0 relative z-10 shadow-xl shadow-amber-200/20">
              <Clock size={32} />
            </div>
            <div className="relative z-10">
              <h4 className="text-xl font-black text-amber-900 mb-2">Module de Paiement en ligne</h4>
              <p className="text-amber-700/70 font-bold leading-relaxed">
                Nous intégrons actuellement des solutions de paiement sécurisées (Mobile Money, Carte) pour faciliter vos cotisations. Disponible prochainement.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar: Status & Info */}
        <div className="space-y-8">
          <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <h3 className="text-xl font-black mb-8 relative z-10">Statut Membre</h3>
            
            <div className="space-y-6 relative z-10">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Cotisation 2026</p>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-black flex items-center gap-2">
                    <ShieldCheck size={18} />
                    À jour
                  </span>
                  <span className="text-2xl font-black text-white">100%</span>
                </div>
                <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 w-full"></div>
                </div>
              </div>

              <button className="w-full py-5 bg-sky-500 text-white rounded-2xl font-black hover:bg-sky-600 transition-all shadow-xl shadow-sky-900/40 flex items-center justify-center gap-3 transform active:scale-95">
                <Wallet size={20} />
                Faire un don
              </button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl">
            <h3 className="text-xl font-black text-gray-900 mb-6">À quoi servent vos fonds ?</h3>
            <ul className="space-y-4">
              {[
                "Bourses d'excellence",
                "Événements de networking",
                "Maintenance plateforme",
                "Projets humanitaires"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                  <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
