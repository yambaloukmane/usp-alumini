import { GraduationCap, Users, Globe, Target, Sparkles, ShieldCheck } from "lucide-react";

export default function About() {
  const values = [
    { icon: <Target className="text-sky-500" />, title: "Excellence", desc: "Nous visons les plus hauts standards académiques et professionnels." },
    { icon: <Users className="text-sky-500" />, title: "Solidarité", desc: "L'entraide entre les générations de diplômés est notre force." },
    { icon: <Globe className="text-sky-500" />, title: "Impact", desc: "Nos alumni transforment le monde à travers leurs innovations." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
        <div className="space-y-10 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-sky-100 shadow-xl shadow-sky-500/10">
            <ShieldCheck size={14} />
            Notre Mission
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-none">
            Unir l'élite de <br />
            <span className="text-sky-500 text-6xl lg:text-8xl italic">Demain.</span>
          </h1>
          <p className="text-xl text-gray-500 font-bold leading-relaxed max-w-xl">
            Depuis 2020, USP-ALUMINI s'est imposé comme le réseau d'excellence pour les anciens élèves de l'USP, favorisant la collaboration et l'innovation à l'échelle mondiale.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 font-black text-gray-700">
              <Sparkles size={18} className="text-sky-500" />
              Réseau Privé
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100 font-black text-gray-700">
              <Globe size={18} className="text-sky-500" />
              Impact Global
            </div>
          </div>
        </div>
        
        <div className="relative order-1 lg:order-2">
          <div className="absolute -inset-4 bg-sky-500/10 rounded-[3rem] blur-3xl -z-10 rotate-6 transform"></div>
          <div className="relative bg-white p-4 rounded-[3.5rem] shadow-2xl border border-gray-100 transform -rotate-2 hover:rotate-0 transition-all duration-500 group">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&h=600&auto=format&fit=crop" 
              alt="Alumni Community" 
              className="rounded-[2.5rem] w-full h-[450px] object-cover group-hover:scale-[1.02] transition-transform duration-700" 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
        {values.map((v, i) => (
          <div key={i} className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-sky-100 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-8 text-sky-500 relative z-10">
              {v.icon}
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10 text-gray-900">{v.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed relative z-10">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden text-center lg:text-left">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -mr-32 -mb-32"></div>
        <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-grow space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black leading-tight tracking-tighter">Votre parcours <br />ne s'arrête pas au <br /><span className="text-sky-400 italic">Diplôme.</span></h2>
            <p className="text-sky-100/60 text-lg font-medium leading-relaxed max-w-lg">
              Devenir membre d'USP-ALUMINI, c'est s'assurer un soutien constant et un accès direct aux meilleures opportunités du marché, portées par une communauté qui partage vos valeurs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center">
              <div className="text-4xl font-black text-sky-400 mb-2">+100</div>
              <p className="text-gray-400 font-black text-xs uppercase tracking-widest">Partenariats</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center">
              <div className="text-4xl font-black text-sky-400 mb-2">24h</div>
              <p className="text-gray-400 font-black text-xs uppercase tracking-widest">Support Membres</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
