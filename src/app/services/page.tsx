import { Users, Briefcase, Newspaper, GraduationCap, HeartHandshake, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function Services() {
  const services = [
    { 
      icon: <Users className="text-sky-500" />, 
      title: "Réseautage", 
      desc: "Accédez à un annuaire exclusif et connectez-vous avec des milliers de diplômés à travers le monde.",
      link: "/members"
    },
    { 
      icon: <Briefcase className="text-sky-500" />, 
      title: "Opportunités de Carrière", 
      desc: "Consultez et publiez des offres d'emploi réservées aux membres du réseau AEPS-ALUMNI.",
      link: "/jobs"
    },
    { 
      icon: <Newspaper className="text-sky-500" />, 
      title: "Actualités & Événements", 
      desc: "Restez informé des conférences, webinaires et rencontres organisés par l'association.",
      link: "/news"
    },
    { 
      icon: <GraduationCap className="text-sky-500" />, 
      title: "Mentorat", 
      desc: "Bénéficiez de l'expérience des anciens ou guidez les nouveaux diplômés dans leur carrière.",
      link: "/members"
    },
    { 
      icon: <HeartHandshake className="text-sky-500" />, 
      title: "Solidarité", 
      desc: "Participez aux projets d'entraide et soutenez les initiatives de la communauté.",
      link: "/treasury"
    },
    { 
      icon: <Lightbulb className="text-sky-500" />, 
      title: "Innovation", 
      desc: "Partagez vos projets innovants et trouvez des partenaires au sein du réseau.",
      link: "/"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
      <div className="text-center mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-sky-100 rounded-full blur-3xl -z-10 opacity-50"></div>
        <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-8 border border-sky-100 shadow-xl shadow-sky-500/10">
          Nos Services
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-none mb-6">
          Plus qu&apos;un simple <br />
          <span className="text-sky-500 italic">Réseau.</span>
        </h1>
        <p className="mt-8 text-xl text-gray-500 font-bold max-w-2xl mx-auto leading-relaxed">
          AEPS-ALUMNI vous accompagne tout au long de votre vie professionnelle avec des services dédiés à votre réussite.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((s, i) => (
          <Link key={i} href={s.link} className="p-12 bg-white rounded-[3rem] border border-gray-100 shadow-xl hover:shadow-2xl hover:border-sky-500 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-8 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all transform group-hover:rotate-6 relative z-10">
              {s.icon}
            </div>
            <h3 className="text-2xl font-black mb-4 relative z-10 text-gray-900 group-hover:text-sky-500 transition-colors">{s.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-6 relative z-10">{s.desc}</p>
            <div className="w-12 h-1 bg-gray-100 group-hover:w-full group-hover:bg-sky-500 transition-all duration-500 rounded-full relative z-10"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
