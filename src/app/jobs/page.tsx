"use client";

import { useState, useEffect } from "react";
import { Briefcase, MapPin, DollarSign, Clock, Sparkles, ArrowRight, Filter, Search } from "lucide-react";
import { dataService } from "@/lib/dataService";

interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await dataService.getJobs();
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6 border border-emerald-100 shadow-xl shadow-emerald-500/10">
          <Briefcase size={14} />
          Carrières & Opportunités
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">Espace Emploi</h1>
        <p className="mt-4 text-xl text-gray-500 font-medium">Découvrez les meilleures opportunités proposées par le réseau.</p>
      </div>

      {/* Search & Filter */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Poste, entreprise, ville..." 
              className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-transparent focus:border-sky-500 focus:bg-white rounded-[1.5rem] outline-none font-bold transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-8 py-4 bg-gray-900 text-white font-black rounded-[1.5rem] hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl">
            <Filter size={18} />
            Filtres
          </button>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sparkles size={40} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Aucune offre trouvée</h2>
          <p className="text-gray-500 font-medium">Réessayez avec d&apos;autres critères de recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 hover:border-sky-200 hover:shadow-2xl transition-all group flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center text-sky-500 shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                <Briefcase size={32} />
              </div>
              
              <div className="flex-grow space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-black text-gray-900">{job.title}</h3>
                  <span className="px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    {job.type || "CDI"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-6 text-gray-500 font-bold text-sm">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-sky-500" />
                    {job.company}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-sky-500" />
                    {job.location}
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-sky-500" />
                      {job.salary}
                    </div>
                  )}
                </div>
              </div>

              <button className="w-full md:w-auto px-8 py-4 bg-sky-500 text-white font-black rounded-2xl hover:bg-sky-600 shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 group/btn">
                Postuler
                <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
