import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Clock, Rocket } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative overflow-hidden border-t border-[#B026FF]/20 bg-gradient-to-b from-black to-[#B026FF]/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30 footer-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(176,38,255,0.1),transparent_50%)]" />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-6">
            <img src="https://i.imgur.com/aM3st2Q.png" alt="Orbit Logo" className="h-32" />
            <p className="text-gray-400">
              Votre partenaire de confiance pour une présence en ligne qui vous ressemble.
              Créons ensemble votre succès digital.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#B026FF]">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#why-choose-us"
                  className="text-gray-400 hover:text-white transition"
                >
                  Pourquoi Nous
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="text-gray-400 hover:text-white transition"
                >
                  Processus
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition"
                >
                  Notre Offre
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-white transition"
                >
                  Tarifs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-[#B026FF]">Contact</h3>
            <ul className="space-y-4">
              <li className="text-gray-400 flex items-center">
                <Mail className="inline-block w-5 h-5 mr-2 text-[#B026FF]" />
                <a
                  href="mailto:info@agence-orbit.fr"
                  className="hover:text-white transition"
                >
                  info@agence-orbit.ch
                </a>
              </li>
              <li className="text-gray-400 flex items-center">
                <Clock className="inline-block w-5 h-5 mr-2 text-[#B026FF]" />
                <span>
                  Lun-Ven: 9h-18h
                  <br />
                  Sam: 9h-15h
                </span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-[#B026FF]">Prêt à décoller ?</h3>
            <Link
              to="/contact"
              className="w-full bg-[#B026FF] py-3 px-6 rounded-full hover:bg-[#B026FF]/80 transition flex items-center justify-center gap-2 group hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)] active:scale-95"
            >
              <span>Décoller maintenant</span>
              <Rocket className="w-5 h-5 transform transition-transform group-hover:-rotate-45" />
            </Link>
            <p className="text-sm text-gray-400">
              Pas d'engagement, satisfaction garantie
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#B026FF]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Orbit. Tous droits réservés.
            </p>
            <div className="flex gap-6 relative z-20">
              <Link
                to="/mentions-legales"
                className="text-gray-400 hover:text-white text-sm transition"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => {
                    navigate('/mentions-legales');
                  }, 500);
                }}
              >
                Mentions légales
              </Link>
              <Link
                to="/politique-de-confidentialite"
                className="text-gray-400 hover:text-white text-sm transition"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => {
                    navigate('/politique-de-confidentialite');
                  }, 500);
                }}
              >
                Politique de confidentialité
              </Link>
              <Link
                to="/devenir-partenaire"
                className="text-gray-400 hover:text-white text-sm transition"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => {
                    navigate('/devenir-partenaire');
                  }, 500);
                }}
              >
                Devenir partenaire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;