import { ArrowRight, CheckCircle, Globe, GraduationCap, Users, Zap, Briefcase, Newspaper, Sparkles, Quote, Heart } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-white">
          <img 
            src="https://sc04.alicdn.com/kf/A828d107947df4ea0be8bff74858715a0m.jpeg" 
            alt="Campus Background" 
            className="w-full h-full object-cover opacity-60 transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-white"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="bg-gray-900/90 backdrop-blur-md text-white px-8 py-3 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3 mb-6 group hover:scale-105 transition-all">
              <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping"></div>
              <p className="text-sm md:text-base font-black tracking-tight leading-tight uppercase italic">
                 De la 4ème promo                 <br className="hidden md:block" />
              </p>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest border border-sky-100 shadow-xl shadow-sky-500/10">
              <Sparkles size={14} className="animate-pulse" />
              L&apos;excellence continue
            </div>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Un réseau qui <br /> 
            <span className="text-sky-500 italic">vous ressemble.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-gray-500 font-bold leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            Rejoignez AEPS-ALUMNI, la plateforme dédiée aux anciens élèves de la Prépa de San-Pédro. Connectez-vous, partagez et grandissez ensemble.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <Link 
              href="/register" 
              className="group bg-sky-500 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-sky-600 transition-all shadow-2xl shadow-sky-500/30 flex items-center gap-3 transform active:scale-95"
            >
              Rejoindre le réseau
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link 
              href="/login" 
              className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-100 rounded-[2rem] font-black text-lg hover:border-sky-500 hover:text-sky-500 transition-all shadow-xl shadow-gray-100/50 transform active:scale-95"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sky-50/50 rounded-[4rem] p-8 lg:p-20 border border-sky-100 shadow-2xl shadow-sky-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start relative z-10">
              <div className="lg:col-span-2 space-y-8">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-sky-500/20 rounded-[3.5rem] blur-2xl group-hover:bg-sky-500/30 transition-all duration-500"></div>
                  <div className="relative aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-700">
                    <img 
                      src="https://avatar.iran.liara.run/public/boy" 
                      alt="Fondateur AEPS" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 p-4"
                    />
                  </div>
                </div>
                
                <div className="p-10 bg-white rounded-[2.5rem] border border-sky-100 shadow-xl shadow-sky-500/5 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/30">
                      <Heart size={24} fill="currentColor" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">À mes amis...</h3>
                  </div>
                  <p className="text-gray-500 font-bold leading-relaxed italic">
                    "Je tiens à exprimer ma profonde gratitude à tous mes amis et collaborateurs qui ont cru en ce projet dès le premier jour. Votre soutien indéfectible et vos précieux conseils ont été le moteur de cette aventure. Merci de faire partie de cette famille."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-10">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-sky-500 text-white rounded-3xl shadow-xl shadow-sky-500/20 transform -rotate-12">
                    <Quote size={32} fill="currentColor" />
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-none">
                    L&apos;Esprit de <br />
                    <span className="text-sky-500 italic underline decoration-sky-100 underline-offset-8">Communauté.</span>
                  </h2>
                </div>

                <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed">
                  <p>
                    Le réseau AEPS (Anciens Élèves de la Prépa de San-Pédro) a été créé dans le but de renforcer les liens entre les différentes générations d&apos;étudiants ayant suivi leur formation à la Prépa de San-Pédro. Conscients de l&apos;importance de préserver cet esprit de communauté au-delà du parcours académique, nous avons développé un système numérique dédié à la gestion et à l&apos;animation de ce réseau d&apos;anciens élèves.
                  </p>
                  <p>
                    Cette initiative est née de la volonté de disposer d&apos;une plateforme moderne permettant de faciliter les échanges, le partage d&apos;expériences et la collaboration entre les membres de l&apos;AEPS. Grâce à ce système, les anciens élèves peuvent maintenir le contact, élargir leur réseau professionnel, partager des opportunités de stages et d&apos;emplois, ainsi que participer aux différentes activités organisées par l&apos;association.
                  </p>
                  <p>
                    L&apos;importance de cette plateforme réside également dans son rôle de pont entre les anciens et les étudiants actuellement en formation. En mettant à disposition leurs expériences académiques et professionnelles, les alumni peuvent guider, conseiller et inspirer les nouvelles promotions dans leurs choix d&apos;études et leurs projets de carrière. Cette transmission de connaissances contribue à renforcer l&apos;excellence et la réputation de la Prépa de San-Pédro.
                  </p>
                  <p>
                    Par ailleurs, le système permet une gestion efficace des informations relatives aux membres du réseau, facilitant la communication, l&apos;organisation d&apos;événements, le suivi des parcours professionnels et le développement d&apos;initiatives collectives au profit de toute la communauté.
                  </p>
                  <p className="font-bold text-gray-900 border-l-4 border-sky-500 pl-6 py-2 bg-sky-50/50 rounded-r-2xl">
                    À travers cette plateforme, l&apos;AEPS affirme sa volonté de construire un réseau dynamique, solidaire et durable, capable de valoriser les réussites de ses membres et de contribuer activement au développement personnel, académique et professionnel des générations présentes et futures de la Prépa de San-Pédro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Gallery Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tighter mb-6">
              Un Cadre d&apos;Apprentissage <br />
              <span className="text-sky-500 italic">Unique.</span>
            </h2>
            <p className="text-gray-500 font-bold text-lg max-w-2xl mx-auto">
              Découvrez l&apos;environnement d&apos;excellence de la Prépa de San-Pédro, là où tout a commencé.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl h-[500px]">
              <img 
                src="https://sc04.alicdn.com/kf/A3b1d5312ae584258a41d3bc8f2e99285m.jpeg" 
                alt="Campus San-Pédro Building" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
                <p className="text-white font-black text-2xl tracking-tight">Infrastructures Modernes</p>
              </div>
            </div>
            
            <div className="relative group overflow-hidden rounded-[3rem] shadow-2xl h-[500px]">
              <img 
                src="https://sc04.alicdn.com/kf/A58e9cda3f1f245a89e6a588d688287b81.jpg" 
                alt="Campus San-Pédro Life" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
                <p className="text-white font-black text-2xl tracking-tight">Vie Étudiante & Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: <Users className="text-sky-500" />, 
                title: "Réseautage", 
                desc: "Connectez-vous avec les autres diplômés et échangez sur vos parcours professionnels.",
                link: "/members"
              },
              { 
                icon: <Briefcase className="text-sky-500" />, 
                title: "Offres d'Emploi", 
                desc: "Consultez les opportunités de carrière partagées au sein de la communauté.",
                link: "/feed"
              },
              { 
                icon: <Newspaper className="text-sky-500" />, 
                title: "Actualités", 
                desc: "Restez informé des derniers événements et nouvelles du réseau.",
                link: "/feed"
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
          <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-none">Prêt à rejoindre <br />le réseau ?</h2>
          <p className="text-sky-100 text-xl font-bold mb-12 max-w-2xl mx-auto">Inscrivez-vous dès aujourd&apos;hui et explorez les possibilités offertes par AEPS-ALUMNI.</p>
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
