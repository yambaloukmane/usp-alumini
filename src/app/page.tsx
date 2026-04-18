import { ArrowRight, CheckCircle, Globe, GraduationCap, Users, Zap, Briefcase, Newspaper, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-40 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-sky-500/5 -skew-y-6 transform origin-top-left -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-8 border border-sky-100 shadow-xl shadow-sky-500/10">
            <Sparkles size={14} />
            Le réseau d&apos;excellence de l&apos;USP
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9]">
            Propulsez votre <br />
            <span className="text-sky-500">Carrière avec USP</span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 font-bold max-w-2xl mx-auto leading-relaxed">
            Rejoignez la plateforme officielle des anciens élèves. <br />
            Partagez, connectez et accédez à des opportunités uniques.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              href="/register" 
              className="px-10 py-5 bg-sky-500 text-white font-black rounded-3xl hover:bg-sky-600 hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-sky-500/40 text-lg group"
            >
              Rejoindre l&apos;Alumni
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              href="/news" 
              className="px-10 py-5 bg-white text-gray-900 font-black rounded-3xl border-2 border-gray-100 hover:border-sky-200 hover:bg-gray-50 hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-100 text-lg"
            >
              Actualités & Emplois
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white relative z-10 -mt-10 mx-4 sm:mx-8 lg:mx-24 rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-sky-500/10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-20">
          <div>
            <div className="text-4xl lg:text-5xl font-black text-sky-400 mb-2">+2500</div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Membres Actifs</p>
          </div>
          <div>
            <div className="text-4xl lg:text-5xl font-black text-sky-400 mb-2">+450</div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Entreprises Partenaires</p>
          </div>
          <div>
            <div className="text-4xl lg:text-5xl font-black text-sky-400 mb-2">+120</div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Événements / An</p>
          </div>
          <div>
            <div className="text-4xl lg:text-5xl font-black text-sky-400 mb-2">95%</div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Insertion Pro</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none mb-6">
                Un réseau, <br />
                <span className="text-sky-500">Mille opportunités.</span>
              </h2>
              <p className="text-gray-500 font-bold text-lg leading-relaxed">
                USP-ALUMNI n&apos;est pas qu&apos;un annuaire. C&apos;est un accélérateur de réussite pour tous ses membres.
              </p>
            </div>
            <Link href="/about" className="px-8 py-4 bg-sky-50 text-sky-600 rounded-2xl font-black text-sm hover:bg-sky-500 hover:text-white transition-all border border-sky-100 mb-2">
              Découvrir notre mission
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: <Users className="text-sky-500" />, 
                title: "Réseautage Élite", 
                desc: "Connectez-vous avec des experts du secteur et échangez sur vos projets.",
                link: "/members"
              },
              { 
                icon: <Briefcase className="text-sky-500" />, 
                title: "Job Board Privé", 
                desc: "Accédez à des offres d&apos;emploi exclusives partagées par les anciens pour les anciens.",
                link: "/jobs"
              },
              { 
                icon: <Newspaper className="text-sky-500" />, 
                title: "News & Événements", 
                desc: "Restez au courant des dernières tendances et ne manquez aucun gala ou webinaire.",
                link: "/news"
              }
            ].map((feature, i) => (
              <Link key={i} href={feature.link} className="p-10 border-2 border-gray-50 rounded-[2.5rem] hover:border-sky-500 hover:shadow-2xl transition-all group bg-white shadow-xl shadow-gray-100">
                <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-sky-500 group-hover:text-white transition-all transform group-hover:rotate-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-sky-500 transition-colors">{feature.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-6">{feature.desc}</p>
                <div className="w-12 h-1 bg-gray-100 group-hover:w-full group-hover:bg-sky-500 transition-all duration-500 rounded-full"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-sky-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="max-w-5xl mx-auto px-4 text-center text-white relative z-10">
          <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-none">Prêt à faire partie <br />de l&apos;aventure ?</h2>
          <p className="text-sky-100 text-xl font-bold mb-12 max-w-2xl mx-auto">Inscrivez-vous dès aujourd&apos;hui et commencez à explorer les possibilités du réseau USP.</p>
          <Link 
            href="/register" 
            className="inline-flex px-12 py-5 bg-white text-sky-600 font-black rounded-[2rem] hover:bg-sky-50 hover:scale-105 transition-all shadow-2xl shadow-sky-900/20 text-xl"
          >
            S&apos;inscrire maintenant
          </Link>
        </div>
      </section>
    </div>
  );
}
