"use client";

import { useState, useEffect } from "react";
import { Briefcase, Newspaper, Sparkles, ArrowRight, MapPin, DollarSign, Search, Clock, Filter } from "lucide-react";
import { dataService } from "@/lib/dataService";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  desc: string;
  img: string;
}

interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
}

export default function Feed() {
  const [activeTab, setActiveTab] = useState<'news' | 'jobs'>('news');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const newsData = await dataService.getNews();
      const jobsData = await dataService.getJobs();
      setNews(newsData);
      setJobs(jobsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-sky-100 rounded-full blur-3xl -z-10 opacity-50"></div>
        <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-8 border border-sky-100 shadow-xl shadow-sky-500/10">
          <Sparkles size={14} />
          Actualités & Opportunités
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-none mb-6">
          Restez au cœur du <br />
          <span className="text-sky-500 italic text-6xl lg:text-8xl">Réseau.</span>
        </h1>
      </div>

      {/* Tabs & Search */}
      <div className="max-w-4xl mx-auto mb-16 space-y-8">
        <div className="flex p-2 bg-gray-100 rounded-[2.5rem] relative overflow-hidden">
          <button 
            onClick={() => setActiveTab('news')}
            className={`flex-1 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all relative z-10 flex items-center justify-center gap-3 ${activeTab === 'news' ? 'bg-white text-gray-900 shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Newspaper size={18} />
            Actualités
          </button>
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`flex-1 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all relative z-10 flex items-center justify-center gap-3 ${activeTab === 'jobs' ? 'bg-white text-gray-900 shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Briefcase size={18} />
            Offres d&apos;emploi
          </button>
        </div>

        <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder={activeTab === 'news' ? "Rechercher une actualité..." : "Poste, entreprise, ville..."}
              className="w-full pl-16 pr-6 py-4 bg-gray-50 border border-transparent focus:border-sky-500 focus:bg-white rounded-[1.5rem] outline-none font-bold transition-all text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        {activeTab === 'news' ? (
          filteredNews.length === 0 ? (
            <div className="bg-white p-20 rounded-[4rem] shadow-2xl border border-gray-100 text-center max-w-2xl mx-auto">
              <Sparkles size={64} className="text-gray-200 mx-auto mb-8" />
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Rien pour le moment</h2>
              <p className="text-gray-500 font-bold text-lg">Revenez bientôt pour les dernières nouvelles du réseau.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredNews.map((item) => (
                <div key={item.id} className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group flex flex-col">
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={item.img || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&h=400&auto=format&fit=crop"} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      alt={item.title} 
                    />
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                      {item.date}
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-sky-500 transition-colors">{item.title}</h3>
                    <p className="text-gray-500 font-bold leading-relaxed line-clamp-3 mb-8 flex-grow">{item.desc}</p>
                    <button className="flex items-center gap-3 text-sky-500 font-black text-sm uppercase tracking-widest group/btn">
                      En savoir plus
                      <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          filteredJobs.length === 0 ? (
            <div className="bg-white p-20 rounded-[4rem] shadow-2xl border border-gray-100 text-center max-w-2xl mx-auto">
              <Sparkles size={64} className="text-gray-200 mx-auto mb-8" />
              <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Aucune opportunité</h2>
              <p className="text-gray-500 font-bold text-lg">Le réseau prépare de nouvelles offres pour vous.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 hover:border-sky-500 hover:shadow-2xl transition-all group flex flex-col md:flex-row items-start md:items-center gap-10">
                  <div className="w-24 h-24 bg-sky-50 rounded-[2rem] flex items-center justify-center text-sky-500 shrink-0 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 shadow-inner transform group-hover:-rotate-6">
                    <Briefcase size={40} />
                  </div>
                  
                  <div className="flex-grow space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <h3 className="text-3xl font-black text-gray-900 tracking-tight">{job.title}</h3>
                      <span className="px-6 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                        {job.type || "CDI"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-8 text-gray-500 font-bold text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-sky-500">
                          <Sparkles size={16} />
                        </div>
                        {job.company}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-sky-500">
                          <MapPin size={16} />
                        </div>
                        {job.location}
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-sky-500">
                            <DollarSign size={16} />
                          </div>
                          {job.salary}
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="w-full md:w-auto px-10 py-5 bg-sky-500 text-white font-black rounded-2xl hover:bg-sky-600 shadow-2xl shadow-sky-500/30 transition-all flex items-center justify-center gap-3 group/btn transform active:scale-95">
                    Postuler
                    <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
