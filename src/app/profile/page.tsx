"use client";

import { useState, useEffect } from "react";
import { User, Mail, GraduationCap, BookOpen, Save, LogOut, CheckCircle, MapPin, Briefcase, AlignLeft, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    promo: "",
    job: "",
    sector: "",
    city: "",
    country: "",
    bio: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("usp_current_user") || "null");
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        promo: currentUser.promo || "",
        job: currentUser.job || "",
        sector: currentUser.sector || "",
        city: currentUser.city || "",
        country: currentUser.country || "",
        bio: currentUser.bio || "",
      });
    }
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const storedMembers = JSON.parse(localStorage.getItem("usp_members") || "[]");
    const updatedMembers = storedMembers.map((m: any) => {
      if (m.email === user.email) {
        return { ...m, ...formData };
      }
      return m;
    });
    localStorage.setItem("usp_members", JSON.stringify(updatedMembers));

    const updatedUser = { ...user, ...formData };
    localStorage.setItem("usp_current_user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    setIsSaving(false);
    setMessage("Profil mis à jour !");
    
    window.dispatchEvent(new Event("storage"));
  };

  const handleLogout = () => {
    localStorage.removeItem("usp_current_user");
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsSaving(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updatedUser = { ...user, avatar: base64String };
        setUser(updatedUser);
        localStorage.setItem("usp_current_user", JSON.stringify(updatedUser));
        
        // Update in members list
        const storedMembers = JSON.parse(localStorage.getItem("usp_members") || "[]");
        const updatedMembers = storedMembers.map((m: any) => 
          m.email === user.email ? { ...m, avatar: base64String } : m
        );
        localStorage.setItem("usp_members", JSON.stringify(updatedMembers));
        
        setIsSaving(false);
        setMessage("Photo mise à jour !");
        window.dispatchEvent(new Event("storage"));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-24">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        {/* Header Profil */}
        <div className="bg-gradient-to-r from-sky-400 to-sky-600 p-10 text-white relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-xl overflow-hidden border-4 border-white/30 p-1">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  <User size={60} className="text-sky-200" />
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 bg-white text-sky-600 p-2.5 rounded-2xl shadow-lg hover:scale-110 transition-transform active:scale-95 cursor-pointer">
                <Camera size={20} />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-4xl font-black tracking-tight">{user.firstName} {user.lastName}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold border border-white/20">
                  Promo {user.promo}
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold border border-white/20">
                  {user.email}
                </span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="md:ml-auto flex items-center gap-2 bg-white text-sky-600 hover:bg-sky-50 px-6 py-3 rounded-2xl font-black transition-all text-sm shadow-lg shadow-sky-900/10 transform active:scale-95"
            >
              <LogOut size={20} />
              Se déconnecter
            </button>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-black">Informations Personnelles</h2>
            {message && (
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl font-bold border border-emerald-100 animate-bounce">
                <CheckCircle size={20} />
                {message}
              </div>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Prénom & Nom */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-black mb-2 ml-1">Prénom</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-sky-500">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-bold text-black"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-2 ml-1">Nom</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-sky-500">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-bold text-black"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Promo & Statut */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-black mb-2 ml-1">Promotion</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-sky-500">
                      <GraduationCap size={18} />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-bold text-black"
                      value={formData.promo}
                      onChange={(e) => setFormData({ ...formData, promo: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-2 ml-1">Statut / Métier</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-sky-500">
                      <BookOpen size={18} />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-bold text-black"
                      value={formData.job}
                      onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Secteur & Ville */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-black mb-2 ml-1">Secteur d'activité</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-sky-500">
                      <Briefcase size={18} />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-bold text-black"
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-2 ml-1">Ville</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-sky-500">
                      <MapPin size={18} />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-bold text-black"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Pays & Bio */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-black mb-2 ml-1">Pays</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 group-focus-within:text-sky-500">
                      <MapPin size={18} />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-bold text-black"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-2 ml-1">Biographie</label>
                  <div className="relative group">
                    <div className="absolute top-4 left-4 text-gray-400 group-focus-within:text-sky-500">
                      <AlignLeft size={18} />
                    </div>
                    <textarea
                      rows={3}
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-bold text-black"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-100">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full md:w-auto px-10 py-4 bg-sky-500 text-white font-black rounded-2xl hover:bg-sky-600 shadow-xl shadow-sky-500/20 transition-all flex items-center justify-center gap-3 transform active:scale-95"
              >
                {isSaving ? (
                  "Mise à jour..."
                ) : (
                  <>
                    <Save size={22} />
                    Enregistrer les modifications
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
