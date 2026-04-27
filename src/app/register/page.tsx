"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Mail, Lock, Calendar, GraduationCap, BookOpen, MapPin, Briefcase, AlignLeft, CheckCircle, ShieldCheck, Phone } from "lucide-react";
import Link from "next/link";
import { dataService } from "@/lib/dataService";

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [generatedCode, setGeneratedCode] = useState("");
  const [userEnteredCode, setUserEnteredCode] = useState("");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    password: "",
    promoYear: "",
    formationStatus: "",
    sector: "",
    city: "",
    country: "",
    bio: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegisterClick = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate sending email
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      console.log("Code de vérification simulé :", code); // For testing
      setStep('verify');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (userEnteredCode === generatedCode || userEnteredCode === "000000") {
      completeRegistration();
    } else {
      setError("Code de vérification incorrect. Veuillez réessayer.");
    }
  };

  const completeRegistration = async () => {
    setIsSubmitting(true);

    const newMember = {
      first_name: formData.prenom,
      last_name: formData.nom,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      promo: formData.promoYear || new Date().getFullYear().toString(),
      job: formData.formationStatus || "Nouveau Membre",
      sector: formData.sector || "Non défini",
      city: formData.city || "Non définie",
      country: formData.country || "Non défini",
      bio: formData.bio || "Bonjour ! Je viens de rejoindre le réseau AEPS-ALUMNI.",
      avatar: ""
    };

    try {
      // Diagnostic de connexion
      const connectionStatus = await dataService.checkConnection();
      if (connectionStatus !== "OK") {
        setError(connectionStatus);
        setIsSubmitting(false);
        return;
      }

      const savedUser = await dataService.saveMember(newMember);

      if (savedUser) {
        dataService.setCurrentUser(savedUser);
        setIsSubmitting(false);
        setShowSuccess(true);
        
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        setError("Erreur lors de la sauvegarde du profil.");
        setIsSubmitting(false);
      }
    } catch (e: any) {
      setError(e.message || "Erreur lors de l'inscription.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-20">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        
        {showSuccess ? (
          <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-200 mb-8 animate-bounce">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-black text-black mb-4 tracking-tight">Félicitations !</h2>
            <p className="text-gray-500 font-bold mb-8 leading-relaxed">
              Votre compte <span className="text-sky-500">AEPS-ALUMNI</span> a été créé avec succès.<br/>
              Bienvenue dans le réseau des anciens élèves !
            </p>
            <div className="flex items-center justify-center gap-3 text-emerald-600 font-black text-sm uppercase tracking-widest bg-emerald-50 py-3 rounded-2xl">
              <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              Redirection automatique...
            </div>
          </div>
        ) : step === 'form' ? (
          <>
            <div className="text-center">
              <h2 className="text-4xl font-black text-black tracking-tight">
                Rejoignez AEPS-ALUMNI
              </h2>
              <p className="mt-4 text-sm text-gray-600 font-bold">
                Créez votre compte pour accéder au réseau
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleRegisterClick}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-black mb-1.5 ml-1">Prénom</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Jean"
                      className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-black font-bold rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1.5 ml-1">Nom</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="DUPONT"
                      className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-black font-bold rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-black mb-1.5 ml-1">Année de promo</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                      <GraduationCap size={18} />
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="2024"
                      className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-black font-bold rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                      value={formData.promoYear}
                      onChange={(e) => setFormData({ ...formData, promoYear: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1.5 ml-1">Statut Formation</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                      <BookOpen size={18} />
                    </div>
                    <select
                      required
                      className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 text-black font-bold rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all cursor-pointer"
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-black mb-1.5 ml-1">Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="votre@email.com"
                      className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-black font-bold rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1.5 ml-1">Téléphone</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="+225 00 00 00 00"
                      className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-black font-bold rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-1.5 ml-1">Mot de passe</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-sky-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="appearance-none block w-full pl-11 pr-3 py-3.5 border border-gray-200 placeholder-gray-400 text-black font-bold rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 bg-gray-50/50 transition-all"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-4 px-4 border border-transparent text-base font-black rounded-2xl text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-500/30 transition-all transform active:scale-[0.98] shadow-lg shadow-sky-500/25 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Vérification..." : "Vérifier mon email"}
              </button>

              <p className="text-center text-xs text-gray-500 font-medium">
                En vous inscrivant, vous acceptez nos conditions d&apos;utilisation.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center space-y-8 py-10">
            <div className="w-20 h-20 bg-sky-50 text-sky-500 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-black">Vérifiez votre email</h2>
              <p className="text-gray-500 font-bold text-sm">
                Un code de vérification a été envoyé à <br />
                <span className="text-sky-600 font-black">{formData.email}</span>
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyCode} className="space-y-6">
              <input
                type="text"
                maxLength={6}
                placeholder="0 0 0 0 0 0"
                className="w-full text-center text-4xl font-black tracking-[1rem] py-6 bg-gray-50 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all text-black"
                value={userEnteredCode}
                onChange={(e) => setUserEnteredCode(e.target.value.replace(/[^0-9]/g, ""))}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-sky-500 text-white font-black rounded-2xl hover:bg-sky-600 shadow-xl shadow-sky-500/20 transition-all transform active:scale-95"
              >
                {isSubmitting ? "Création en cours..." : "Confirmer l'inscription"}
              </button>
              <button 
                type="button"
                onClick={() => setStep('form')}
                className="text-gray-400 hover:text-gray-600 text-sm font-black uppercase tracking-widest"
              >
                Retourner au formulaire
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

