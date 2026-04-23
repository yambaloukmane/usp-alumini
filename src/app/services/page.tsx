import { Code, Layout, Server, Shield } from "lucide-react";

export default function Services() {
  const services = [
    { icon: <Layout />, title: "Design UI/UX", desc: "Création d&apos;interfaces intuitives et attrayantes." },
    { icon: <Code />, title: "Développement Web", desc: "Sites dynamiques robustes avec Next.js." },
    { icon: <Server />, title: "Hébergement", desc: "Solutions cloud performantes et sécurisées." },
    { icon: <Shield />, title: "Maintenance", desc: "Support technique et mises à jour continues." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900">Nos Services</h2>
        <p className="mt-4 text-xl text-gray-500">Des solutions sur mesure pour vos besoins.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s, i) => (
          <div key={i} className="flex gap-6 p-8 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition border border-transparent hover:border-gray-100">
            <div className="flex-shrink-0 text-indigo-600 w-12 h-12">
              {s.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
