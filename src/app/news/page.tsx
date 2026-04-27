"use client";

import { useState, useEffect } from "react";
import { Hammer, Sparkles, Clock, Newspaper, ArrowRight } from "lucide-react";
import { dataService } from "@/lib/dataService";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  desc: string;
  img: string;
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await dataService.getNews();
      setNews(data);
      setLoading(false);
    };
    fetchNews();
  }, []);

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
        <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-6 border border-sky-100 shadow-xl shadow-sky-500/10">
          <Newspaper size={14} />
          Actualités du Réseau
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">Dernières Nouvelles</h1>
        <p className="mt-4 text-xl text-gray-500 font-medium">Restez informé des activités de l&apos;AEPS-ALUMNI et de ses diplômés.</p>
      </div>

      {news.length === 0 ? (
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Sparkles size={40} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Pas encore d&apos;actualités</h2>
          <p className="text-gray-500 font-medium">Revenez bientôt pour découvrir les nouveautés de notre communauté.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.img || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&h=400&auto=format&fit=crop"} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={item.title} 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {item.date}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-gray-900 mb-4 line-clamp-2">{item.title}</h3>
                <p className="text-gray-500 font-medium line-clamp-3 mb-6">{item.desc}</p>
                <button className="flex items-center gap-2 text-sky-500 font-black text-sm uppercase tracking-widest group/btn">
                  Lire la suite
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
