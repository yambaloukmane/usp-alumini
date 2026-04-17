"use client";

import { useState } from "react";
import { Wallet, CreditCard, History, TrendingUp, Download, ShieldCheck, AlertCircle, PieChart, Sparkles } from "lucide-react";

export default function Treasury() {
  const [activeTab, setActiveTab] = useState("overview");

  const payments = [
    { id: 1, type: "Cotisation Annuelle", amount: "50 €", date: "10/04/2026", status: "Payé" },
    { id: 2, type: "Don Fondation USP", amount: "100 €", date: "05/03/2026", status: "Payé" },
    { id: 3, type: "Gala 2026 (Réservation)", amount: "75 €", date: "20/02/2026", status: "Payé" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Service Trésorerie</h2>
        <p className="mt-4 text-xl text-gray-500 font-medium">Gérez vos cotisations, dons et suivez l'utilisation des fonds du réseau.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-sky-400 to-sky-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl transition-all group-hover:bg-white/20"></div>
              <Wallet size={32} className="mb-6 opacity-80" />
              <h3 className="text-lg font-bold opacity-90">Ma Cotisation 2026</h3>
              <div className="text-4xl font-black mt-2">À Jour</div>
              <p className="text-sky-100 text-sm mt-4 font-medium">Valable jusqu'au 31/12/2026</p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <TrendingUp size={32} className="text-emerald-500" />
                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">Impact</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mt-4">Total Dons Réseau</h3>
                <div className="text-4xl font-black text-gray-900 mt-2">12 450 €</div>
              </div>
              <p className="text-gray-400 text-sm mt-4 font-medium">Finançant 5 bourses d'études</p>
            </div>
          </div>

          {/* History Table */}
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
              <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                <History className="text-sky-500" size={24} />
                Historique des Paiements
              </h3>
              <button className="text-sky-500 font-black text-xs hover:underline flex items-center gap-1">
                <Download size={14} />
                TOUT EXPORTER
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Montant</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {payments.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-8 py-5 font-bold text-gray-900">{p.type}</td>
                      <td className="px-8 py-5 font-black text-sky-600">{p.amount}</td>
                      <td className="px-8 py-5 text-gray-500 text-sm font-medium">{p.date}</td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-8">
            <h3 className="text-2xl font-black text-gray-900">Actions Rapides</h3>
            
            <button className="w-full p-6 bg-sky-50 hover:bg-sky-500 group transition-all rounded-[2rem] border-2 border-sky-100 flex items-center gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-sky-500 shadow-lg transition-transform group-hover:scale-110">
                <CreditCard size={24} />
              </div>
              <div className="text-left">
                <p className="font-black text-gray-900 group-hover:text-white transition-colors">Payer Cotisation</p>
                <p className="text-xs text-gray-500 font-bold group-hover:text-sky-100 transition-colors">Année 2026 - 50 €</p>
              </div>
            </button>

            <button className="w-full p-6 bg-emerald-50 hover:bg-emerald-500 group transition-all rounded-[2rem] border-2 border-emerald-100 flex items-center gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-lg transition-transform group-hover:scale-110">
                <Sparkles size={24} />
              </div>
              <div className="text-left">
                <p className="font-black text-gray-900 group-hover:text-white transition-colors">Faire un Don</p>
                <p className="text-xs text-gray-500 font-bold group-hover:text-emerald-100 transition-colors">Soutenez les projets USP</p>
              </div>
            </button>

            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="flex items-center gap-3 mb-4 text-amber-600 font-black text-sm">
                <ShieldCheck size={20} />
                Paiements Sécurisés
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Toutes les transactions sont chiffrées et sécurisées. Les fonds sont exclusivement utilisés pour le développement du réseau et le soutien aux étudiants.
              </p>
            </div>
          </div>

          <div className="bg-gray-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl -mr-24 -mb-24"></div>
            <PieChart className="text-sky-400 mb-6" size={32} />
            <h4 className="text-xl font-black mb-4">Transparence Totale</h4>
            <p className="text-gray-400 text-sm font-medium mb-6">Consultez le rapport financier annuel détaillé du réseau USP-ALIMNI.</p>
            <button className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
              Consulter le rapport
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
