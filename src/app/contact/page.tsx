import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900">Parlons de votre projet</h2>
          <p className="mt-4 text-lg text-gray-500">
            Remplissez le formulaire ou utilisez nos coordonnées directes. 
            Nous vous répondrons sous 24h ouvrées.
          </p>

          <div className="mt-12 space-y-6 text-gray-600">
            <div className="flex items-center gap-4">
              <Mail className="text-indigo-600" />
              <span>contact@dynamicsite.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-indigo-600" />
              <span>+33 1 23 45 67 89</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-indigo-600" />
              <span>123 Avenue du Web, 75000 Paris</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 bg-gray-50"></textarea>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition">
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
