"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from "react";
import { Home, Info, Users, ShieldCheck, LogIn, UserPlus, User as UserIcon, Newspaper, Bell, Sparkles, MessageSquare, Clock, Wallet } from 'lucide-react';
import { dataService } from '@/lib/dataService';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mounted, setMounted] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, title: "Nouveau membre", desc: "Marc DUPUIS vient de rejoindre le réseau.", time: "Il y a 5 min", icon: <UserPlus size={16} />, color: "bg-emerald-50 text-emerald-500" },
    { id: 2, title: "Événement à venir", desc: "Le gala annuel approche ! Inscrivez-vous.", time: "Hier", icon: <Sparkles size={16} />, color: "bg-sky-50 text-sky-500" },
    { id: 3, title: "Nouveau message", desc: "Vous avez reçu un message de l&apos;admin.", time: "Il y a 2h", icon: <MessageSquare size={16} />, color: "bg-amber-50 text-amber-500" },
  ];

  const checkUser = async () => {
    const currentUser = dataService.getCurrentUser();
    setUser(currentUser);
    
    if (currentUser) {
      const count = await dataService.getUnreadCount(currentUser.email);
      setUnreadCount(count);
    } else {
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    setMounted(true);
    checkUser();
    window.addEventListener("storage", checkUser);
    
    // Fermer les notifications au clic en dehors
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("storage", checkUser);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed w-full z-40 top-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <nav className="max-w-7xl mx-auto bg-sky-400 border border-sky-300 rounded-[2.5rem] shadow-2xl shadow-sky-900/20 pointer-events-auto overflow-visible">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center gap-4 group" title="USP-ALUMNI - Accueil">
                <div className="relative w-14 h-14 overflow-hidden rounded-[1.25rem] border-2 border-white bg-white p-0.5 shadow-xl transition-transform group-hover:scale-110 group-active:scale-95 duration-300">
                  <Image 
                    src="https://sc01.alicdn.com/kf/A10cd1516dd12456686a3ce544d201eccS.jpeg" 
                    alt="USP-ALUMNI Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-lg sm:text-xl font-black text-white tracking-tighter transition-all group-hover:tracking-normal hidden md:inline">USP-ALUMNI</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              {user && (
                <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar max-w-[50vw] sm:max-w-none px-1">
                  <Link href="/" className="text-white hover:bg-white/10 p-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center transition-all group/link" title="Accueil">
                    <Home size={18} className="sm:w-5 sm:h-5" />
                  </Link>
                  <Link href="/news" className="text-white hover:bg-white/10 p-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center transition-all group/link" title="Actualités">
                    <Newspaper size={18} className="sm:w-5 h-5" />
                  </Link>
                  <Link href="/jobs" className="text-white hover:bg-white/10 p-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center transition-all group/link" title="Emplois">
                    <Briefcase size={18} className="sm:w-5 h-5" />
                  </Link>
                  <Link href="/about" className="text-white hover:bg-white/10 p-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center transition-all group/link" title="À propos">
                    <Info size={18} className="sm:w-5 h-5" />
                  </Link>
                  <Link href="/messages" className="text-white hover:bg-white/10 p-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center transition-all group/link relative" title="Messages">
                    <MessageSquare size={18} className="sm:w-5 sm:h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 min-w-[14px] h-[14px] sm:min-w-[18px] sm:h-[18px] bg-red-500 text-white text-[8px] sm:text-[10px] font-black flex items-center justify-center rounded-full border-2 border-sky-400 px-0.5">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                  <Link href="/members" className="text-white hover:bg-white/10 p-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center transition-all group/link" title="Membres">
                    <Users size={18} className="sm:w-5 sm:h-5" />
                  </Link>
                  <Link href="/treasury" className="text-white hover:bg-white/10 p-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center transition-all group/link" title="Trésorerie">
                    <Wallet size={18} className="sm:w-5 sm:h-5" />
                  </Link>
                  <Link href="/responsable" className="text-white hover:bg-white/10 p-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center transition-all group/link" title="Admin">
                    <ShieldCheck size={18} className="sm:w-5 sm:h-5" />
                  </Link>
                </div>
              )}

              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
                {/* Notification Bell */}
                {user && (
                  <div className="relative" ref={notificationRef}>
                    <button 
                      onClick={() => setShowNotifications(!showNotifications)}
                      className={`relative p-3 rounded-2xl text-white transition-all hover:bg-white/10 active:scale-90 ${showNotifications ? 'bg-white/20' : ''}`}
                    >
                      <Bell size={22} />
                      <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-red-500 border-2 border-sky-400 rounded-full animate-ping"></span>
                      <span className="absolute top-2 right-2 w-3.5 h-3.5 bg-red-500 border-2 border-sky-400 rounded-full"></span>
                    </button>

                    {showNotifications && (
                      <div className="absolute top-16 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                        <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                          <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Notifications</h4>
                          <span className="text-[10px] bg-sky-500 text-white px-2 py-0.5 rounded-full font-bold">3 Nouvelles</span>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                          {notifications.map(n => (
                            <div key={n.id} className="p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
                              <div className="flex gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${n.color}`}>
                                  {n.icon}
                                </div>
                                <div className="space-y-1">
                                  <h5 className="text-sm font-black text-gray-900 group-hover:text-sky-500 transition-colors">{n.title}</h5>
                                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{n.desc}</p>
                                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-1">
                                    <Clock size={10} />
                                    {n.time}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button className="w-full py-4 text-xs font-black text-sky-500 hover:bg-sky-50 transition-colors bg-gray-50 border-t border-gray-100">
                          VOIR TOUTES LES NOTIFICATIONS
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {user ? (
                  <Link href="/profile" className="bg-white text-sky-600 hover:shadow-xl px-4 py-3 rounded-2xl transition-all transform active:scale-95 shadow-lg shadow-sky-900/10 flex items-center gap-2" title="Mon Profil">
                    <UserIcon size={20} />
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="text-white hover:bg-white/10 px-4 py-3 rounded-2xl transition-all flex items-center gap-2" title="Connexion">
                      <LogIn size={20} />
                      <span className="hidden sm:inline text-xs font-black">Connexion</span>
                    </Link>
                    <Link href="/register" className="bg-white text-sky-600 hover:shadow-xl px-4 py-3 rounded-2xl transition-all transform active:scale-95 shadow-lg shadow-sky-900/10 flex items-center gap-2" title="Inscription">
                      <UserPlus size={20} />
                      <span className="hidden sm:inline text-xs font-black">Inscription</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
