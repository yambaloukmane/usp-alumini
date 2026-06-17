import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-gray-200 bg-white p-0.5 shadow-sm">
                <Image 
                  src="https://sc04.alicdn.com/kf/A5ab3ad97a8484f7981e0d7642485f16e0.jpg" 
                  alt="AEPS-ALUMNI Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase">AEPS-ALUMNI</h3>
            </div>
            <p className="text-base text-gray-500 text-center md:text-left">
              Le réseau dynamique des anciens élèves de l&apos;Université Polytechnique de San-Pédro (AEPS-ALUMNI).
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="/" className="text-base text-gray-500 hover:text-gray-900">Accueil</a></li>
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
          <p className="text-base text-gray-400">&copy; 2026 AEPS-ALUMNI Inc. Tous droits réservés.</p>
          <p className="mt-2 text-sm text-gray-400 font-medium italic">Développé par YAMBA Loukmane.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
