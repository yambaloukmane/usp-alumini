import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest mb-8 border border-sky-100 shadow-xl shadow-sky-500/10">
              Contactez-nous
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-none">
              Restons en <br />
              <span className="text-sky-500 italic">Contact.</span>
            </h1>
            <p className="text-xl text-gray-500 font-bold leading-relaxed max-w-xl">
              Une question sur le réseau ? Un problème technique ? <br />
              Notre équipe est là pour vous aider.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 group hover:border-sky-500 transition-all">
              <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all transform group-hover:rotate-6">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Email</p>
                <p className="text-lg font-black text-gray-900">yambaloukmane1@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 group hover:border-sky-500 transition-all">
              <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all transform group-hover:rotate-6">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Téléphone</p>
                <p className="text-lg font-black text-gray-900">+225 74 70 35 88</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 group hover:border-sky-500 transition-all">
              <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all transform group-hover:rotate-6">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Localisation</p>
                <p className="text-lg font-black text-gray-900">San-Pédro, Côte d&apos;Ivoire</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 lg:p-16 rounded-[3.5rem] shadow-2xl border border-gray-100 relative group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl opacity-50 group-hover:scale-110 transition-transform"></div>
          
          <form className="space-y-8 relative z-10">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Nom Complet</label>
              <input 
                type="text" 
                placeholder="Votre nom"
                className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 font-bold transition-all text-black" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Adresse Email</label>
              <input 
                type="email" 
                placeholder="votre@email.com"
                className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 font-bold transition-all text-black" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Votre Message</label>
              <textarea 
                rows={4} 
                placeholder="Comment pouvons-nous vous aider ?"
                className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 font-bold transition-all resize-none text-black"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-sky-500 text-white font-black py-6 rounded-[2rem] hover:bg-sky-600 transition-all shadow-2xl shadow-sky-500/30 flex items-center justify-center gap-3 text-lg transform active:scale-95 group/btn">
              Envoyer le message
              <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
