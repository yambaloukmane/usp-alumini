"use client";

import { useState } from "react";
import { User, Mail, Lock, Calendar, GraduationCap, BookOpen, MapPin, Briefcase, AlignLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dob: "",
    email: "",
    password: "",
    promoYear: "",
    formationStatus: "",
    sector: "",
    city: "",
    country: "",
    bio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newMember = {
      id: Date.now(),
      firstName: formData.prenom,
      lastName: formData.nom,
      email: formData.email,
      promo: formData.promoYear || new Date().getFullYear().toString(),
      job: formData.formationStatus || "Nouveau Membre",
      sector: formData.sector,
      city: formData.city,
      country: formData.country,
      bio: formData.bio,
      isNew: true,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`
    };

    const existingMembers = JSON.parse(localStorage.getItem("usp_members") || "[]");
    localStorage.setItem("usp_members", JSON.stringify([newMember, ...existingMembers]));

    setIsSubmitting(false);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Rejoignez USP-ALUMINI
          </h2>
          <p className="mt-2 text-sm text-gray-600 font-medium">
            Déjà membre ?{" "}
            <Link href="/login" className="text-sky-600 hover:text-sky-500 underline decoration-sky-200 underline-offset-4">
              Connectez-vous ici
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prénom */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Prénom</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Jean"
                  className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                />
              </div>
            </div>
            {/* Nom */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Nom</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="DUPONT"
                  className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Promo */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Année de promo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                  <GraduationCap size={18} />
                </div>
                <input
                  type="number"
                  required
                  placeholder="2024"
                  className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                  value={formData.promoYear}
                  onChange={(e) => setFormData({ ...formData, promoYear: e.target.value })}
                />
              </div>
            </div>
            {/* Formation */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Statut Formation</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                  <BookOpen size={18} />
                </div>
                <select
                  required
                  className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all cursor-pointer"
                  value={formData.formationStatus}
                  onChange={(e) => setFormData({ ...formData, formationStatus: e.target.value })}
                >
                  <option value="">Sélectionnez</option>
                  <option value="Étudiant (En cours)">Étudiant (En cours)</option>
                  <option value="Diplômé (Achevée)">Diplômé (Achevée)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Secteur */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Secteur</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                  <Briefcase size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Informatique..."
                  className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                />
              </div>
            </div>
            {/* Ville */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Ville</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Paris..."
                  className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>
            {/* Pays */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Pays</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  placeholder="France..."
                  className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Biographie */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Biographie</label>
            <div className="relative group">
              <div className="absolute top-3.5 left-3.5 pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                <AlignLeft size={18} />
              </div>
              <textarea
                rows={3}
                placeholder="Parlez-nous un peu de vous..."
                className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="votre@email.com"
                  className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Mot de passe</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-gray-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-4 px-4 border border-transparent text-base font-black rounded-2xl text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-500/30 transition-all transform active:scale-[0.98] shadow-lg shadow-sky-500/25 ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Création du compte..." : "Créer mon profil d'Alumni"}
          </button>
        </form>
      </div>
    </div>
  );
}
