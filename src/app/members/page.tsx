"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, User as UserIcon, Sparkles, MapPin, Briefcase, Filter, X, ChevronDown } from "lucide-react";
import { dataService } from "@/lib/dataService";

interface Member {
  id: string;
  first_name: string;
  last_name: string;
  promo: string;
  job: string;
  sector?: string;
  city?: string;
  country?: string;
  bio?: string;
  avatar?: string;
  isNew?: boolean;
}

export default function Members() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  // États des filtres
  const [filterPromo, setFilterPromo] = useState("");
  const [filterSector, setFilterSector] = useState("");
  const [filterCountry, setFilterCountry] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const storedMembers = await dataService.getMembers();
        setMembers(storedMembers);
      } catch (error) {
        console.error("Erreur lors de la récupération des membres:", error);
      }
    };

    fetchMembers();
  }, [router]);

  const filteredMembers = members.filter(m => {
    const matchesSearch = `${m.first_name} ${m.last_name} ${m.job} ${m.sector || ""} ${m.city || ""} ${m.country || ""}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPromo = filterPromo === "" || m.promo === filterPromo;
    const matchesSector = filterSector === "" || (m.sector && m.sector.toLowerCase().includes(filterSector.toLowerCase()));
    const matchesCountry = filterCountry === "" || (m.country && m.country.toLowerCase().includes(filterCountry.toLowerCase()));
    
    return matchesSearch && matchesPromo && matchesSector && matchesCountry;
  });

  // Extraire les promos uniques pour le filtre
  const uniquePromos = Array.from(new Set(members.map(m => m.promo))).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Annuaire des Membres</h2>
        <p className="mt-4 text-xl text-gray-500 font-medium">Connectez-vous avec l&apos;élite de l&apos;AEPS-ALUMNI à travers le monde.</p>
      </div>

      <div className="max-w-4xl mx-auto mb-16 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-grow group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
              <Search size={22} />
            </div>
            <input
              type="text"
              placeholder="Rechercher par nom, ville, métier..."
              className="block w-full pl-12 pr-4 py-4.5 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-white shadow-xl shadow-gray-100 transition-all font-medium outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-4.5 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-gray-100 border ${showFilters ? 'bg-sky-500 text-white border-sky-500' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
          >
            <Filter size={20} />
            <span className="hidden sm:inline">Filtres</span>
            <ChevronDown size={18} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Panneau de Filtres */}
        {showFilters && (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Promotion</label>
                <select 
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  value={filterPromo}
                  onChange={(e) => setFilterPromo(e.target.value)}
                >
                  <option value="">Toutes les promos</option>
                  {uniquePromos.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Secteur</label>
                <input 
                  type="text"
                  placeholder="Ex: Informatique"
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  value={filterSector}
                  onChange={(e) => setFilterSector(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-black text-gray-700 mb-2">Pays</label>
                <input 
                  type="text"
                  placeholder="Ex: France"
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => {
                  setFilterPromo("");
                  setFilterSector("");
                  setFilterCountry("");
                }}
                className="text-sm font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
              >
                <X size={16} />
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredMembers.map((member) => (
          <div key={member.id} className={`bg-white rounded-[2rem] shadow-xl hover:shadow-2xl border-2 ${member.isNew ? 'border-sky-500' : 'border-gray-50'} transition-all group overflow-hidden relative flex flex-col`}>
            {member.isNew && (
              <div className="absolute top-4 right-4 bg-sky-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg z-10 animate-pulse">
                <Sparkles size={12} />
                NOUVEAU
              </div>
            )}
            
            {/* Bannière Card */}
            <div className="h-24 bg-gradient-to-r from-sky-400/20 to-sky-600/20 group-hover:from-sky-400/30 group-hover:to-sky-600/30 transition-all"></div>
            
            {/* Contenu Card */}
            <div className="px-6 pb-8 -mt-12 flex-grow">
              <div className="w-24 h-24 bg-sky-50 rounded-3xl p-1 shadow-lg mb-4 ring-4 ring-white relative overflow-hidden flex items-center justify-center text-sky-500">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.first_name} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={40} />
                )}
              </div>
              
              <h3 className="text-xl font-black text-gray-900 group-hover:text-sky-600 transition-colors leading-tight">
                {member.first_name} {member.last_name}
              </h3>
              <p className="text-sky-600 font-black text-sm mb-4">
                Promotion {member.promo}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-gray-600 text-sm font-medium">
                  <Briefcase size={16} className="text-sky-400" />
                  <span className="truncate">{member.job}</span>
                </div>
                {(member.city || member.country) && (
                  <div className="flex items-center gap-2.5 text-gray-600 text-sm font-medium">
                    <MapPin size={16} className="text-sky-400" />
                    <span className="truncate">{member.city}{member.city && member.country ? ', ' : ''}{member.country}</span>
                  </div>
                )}
              </div>

              {member.bio && (
                <p className="mt-4 text-gray-500 text-xs italic line-clamp-2 leading-relaxed">
                  "{member.bio}"
                </p>
              )}
            </div>

            <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 mt-auto">
              <button className="w-full py-3 bg-white text-sky-600 border-2 border-sky-100 rounded-2xl font-black hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all transform active:scale-95 shadow-sm text-sm">
                Voir le profil complet
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredMembers.length === 0 && (
        <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-4 border-dashed border-gray-100">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-gray-300">
            <Search size={40} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 mb-2">Aucun résultat</h3>
          <p className="text-gray-500 font-medium">Réessayez avec d&apos;autres critères de recherche.</p>
        </div>
      )}
    </div>
  );
}
