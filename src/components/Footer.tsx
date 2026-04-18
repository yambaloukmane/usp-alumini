import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 overflow-hidden rounded-md border border-gray-200 bg-white p-0.5">
                <Image 
                  src="https://sc01.alicdn.com/kf/A10cd1516dd12456686a3ce544d201eccS.jpeg" 
                  alt="USP-ALUMNI Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase">USP-ALUMNI</h3>
            </div>
            <p className="text-base text-gray-500 text-center md:text-left">
              Le réseau dynamique des anciens élèves de l&apos;USP.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/" className="text-base text-gray-500 hover:text-gray-900">Accueil</a></li>
              <li><a href="/about" className="text-base text-gray-500 hover:text-gray-900">À propos</a></li>
              <li><a href="/services" className="text-base text-gray-500 hover:text-gray-900">Services</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
            <p className="mt-4 text-base text-gray-500">
              Email: yambaloukmane1@gmail.com<br />
              Tél: +225 74 70 35 88
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-base text-gray-400">&copy; 2026 USP-ALUMNI Inc. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
