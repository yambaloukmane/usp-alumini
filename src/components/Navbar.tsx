"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from "react";
import { Home, Users, ShieldCheck, LogIn, UserPlus, User as UserIcon, Newspaper, MessageSquare, Wallet, Briefcase } from 'lucide-react';
import { dataService } from '@/lib/dataService';

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mounted, setMounted] = useState(false);

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
    
    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed w-full z-40 top-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <nav className="max-w-7xl mx-auto bg-sky-400 border border-sky-300 rounded-[2.5rem] shadow-2xl shadow-sky-900/20 pointer-events-auto overflow-visible">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center gap-4 group" title="AEPS-ALUMNI - Accueil">
                <div className="relative w-14 h-14 overflow-hidden rounded-[1.25rem] border-2 border-white bg-white p-0.5 shadow-xl transition-transform group-hover:scale-110 group-active:scale-95 duration-300">
                  <Image 
                    src="https://sc01.alicdn.com/kf/A078326496bde42748f875c714f6ab1888.jpeg" 
                    alt="AEPS-ALUMNI Logo" 
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-lg sm:text-xl font-black text-white tracking-tighter transition-all group-hover:tracking-normal hidden md:inline">AEPS-ALUMNI</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
                <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar max-w-[50vw] sm:max-w-none px-1">
                  <Link href="/responsable" className="text-white hover:bg-white/10 p-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center transition-all group/link" title="Admin">
                    <ShieldCheck size={18} className="sm:w-5 sm:h-5" />
                  </Link>
                  {user && (
                    <>
                      <Link href="/" className="text-white hover:bg-white/10 p-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center transition-all group/link" title="Accueil">
                        <Home size={18} className="sm:w-5 sm:h-5" />
                      </Link>
                      <Link href="/news" className="text-white hover:bg-white/10 p-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center transition-all group/link" title="Actualités">
                        <Newspaper size={18} className="sm:w-5 h-5" />
                      </Link>
                      <Link href="/jobs" className="text-white hover:bg-white/10 p-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl flex items-center transition-all group/link" title="Emplois">
                        <Briefcase size={18} className="sm:w-5 h-5" />
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
                    </>
                  )}
                </div>

              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/20">
                {user ? (
                  <Link href="/profile" className="p-1 bg-white hover:shadow-xl rounded-2xl transition-all transform active:scale-95 shadow-lg shadow-sky-900/10 flex items-center overflow-hidden" title="Mon Profil">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-sky-50 flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Profil" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon size={20} className="text-sky-600" />
                      )}
                    </div>
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
