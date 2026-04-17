"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, ArrowRight, Briefcase, Info, Clock, Sparkles, Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  desc: string;
  img: string;
}

interface JobOffer {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
}

export default function News() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [jobs, setJobs] = useState<JobOffer[]>([]);

  const defaultEvents = [
    { id: 1, type: "Événement", title: "Gala de Charité USP 2026", date: "15 Juin 2026", location: "Grand Palais, Paris", icon: <Calendar size={20} /> },
    { id: 2, type: "Webinaire", title: "L'IA dans le monde de demain", date: "22 Avril 2026", location: "En ligne (Zoom)", icon: <Info size={20} /> },
  ];

  const defaultJobs: JobOffer[] = [
    { id: 1, title: "Développeur Fullstack Senior", company: "TechCorp", location: "Lyon (Hybride)", salary: "55k - 70k €", type: "CDI" },
    { id: 2, title: "Product Manager (Alumni USP)", company: "Innov'Est", location: "Strasbourg", salary: "45k - 60k €", type: "CDI" },
  ];

  const defaultNews: NewsItem[] = [
    { 
      id: 1, 
      title: "L'USP élue meilleure école d'innovation 2026", 
      date: "Il y a 2 jours", 
      desc: "Pour la troisième année consécutive, notre école a été récompensée pour son excellence académique et son réseau d'anciens élèves.",
      img: "https://images.unsplash.com/photo-1523050335392-9af560c12bb1?q=80&w=400&h=250&auto=format&fit=crop"
    },
  ];

  useEffect(() => {
    const currentUser = localStorage.getItem("usp_current_user");
    if (!currentUser) {
      router.push("/login");
      return;
    }

    const storedNews = JSON.parse(localStorage.getItem("usp_news") || "[]");
    const storedJobs = JSON.parse(localStorage.getItem("usp_jobs") || "[]");
    
    setNews([...storedNews, ...defaultNews]);
    setJobs([...storedJobs, ...defaultJobs]);
  }, [router]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Actualités & Opportunités</h2>
        <p className="mt-4 text-xl text-gray-500 font-medium">Restez informé des derniers événements et des offres du réseau.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Section News */}
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Newspaper className="text-sky-500" size={24} />
              <h3 className="text-2xl font-black text-gray-900">À la une</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {news.map(item => (
                <div key={item.id} className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 group transition-all hover:shadow-2xl hover:scale-[1.02]">
                  <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-8">
                    <div className="flex items-center gap-2 text-sky-500 text-xs font-black mb-3">
                      <Clock size={14} />
                      {item.date}
                    </div>
                    <h4 className="text-xl font-black text-gray-900 mb-4 group-hover:text-sky-500 transition-colors">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{item.desc}</p>
                    <button className="flex items-center gap-2 text-sky-600 font-black text-sm hover:gap-4 transition-all">
                      Lire l'article
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Briefcase className="text-sky-500" size={24} />
              <h3 className="text-2xl font-black text-gray-900">Offres d'Emploi</h3>
            </div>
            <div className="space-y-4">
              {jobs.map(job => (
                <div key={job.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-lg hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-all">
                      <Briefcase size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-gray-900">{job.title}</h4>
                      <p className="text-sky-600 font-bold text-sm">{job.company} • {job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 md:text-right">
                    <div>
                      <p className="text-gray-900 font-black">{job.salary}</p>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{job.type}</p>
                    </div>
                    <button className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-sky-500 transition-all shadow-lg shadow-gray-200">
                      Postuler
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Events */}
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Calendar className="text-sky-500" size={24} />
              <h3 className="text-2xl font-black text-gray-900">Événements</h3>
            </div>
            <div className="space-y-6">
              {defaultEvents.map(event => (
                <div key={event.id} className="bg-white p-8 rounded-[2rem] border-2 border-sky-50 shadow-xl space-y-4 hover:border-sky-500 transition-all group">
                  <div className="flex items-center justify-between">
                    <span className="bg-sky-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{event.type}</span>
                    <div className="text-sky-400 group-hover:text-sky-500 transition-colors">
                      {event.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-black text-gray-900 leading-tight">{event.title}</h4>
                  <div className="space-y-2 text-sm text-gray-500 font-bold">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-sky-300" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-sky-300" />
                      {event.location}
                    </div>
                  </div>
                  <button className="w-full py-3 bg-gray-50 text-sky-600 rounded-2xl font-black text-sm hover:bg-sky-500 hover:text-white transition-all">
                    S'inscrire
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
