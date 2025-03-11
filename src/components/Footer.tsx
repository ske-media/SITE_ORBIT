import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone, Send } from 'lucide-react';

function Footer() {
  return (
    <footer className="py-16 bg-black/70 backdrop-blur-sm border-t border-[#B026FF]/20 relative">
      <div className="footer-background absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/90"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Colonne 1 - Logo et infos */}
          <div className="space-y-6">
            <img src="https://i.imgur.com/aM3st2Q.png" alt="Orbit Logo" className="h-20" />
            <p className="text-gray-400 text-sm">
              Agence digitale spécialisée dans la création de sites web, la gestion des réseaux sociaux et le développement d'applications sur mesure.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-full hover:bg-[#B026FF]/20 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-full hover:bg-[#B026FF]/20 transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-full hover:bg-[#B026FF]/20 transition">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-full hover:bg-[#B026FF]/20 transition">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div>
            <h3 className="text-lg font-bold mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link>
              </li>
              <li>
                <Link to="/devenir-partenaire" className="text-gray-400 hover:text-white transition">Devenir Partenaire</Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-gray-400 hover:text-white transition">Mentions légales</Link>
              </li>
              <li>
                <Link to="/politique-de-confidentialite" className="text-gray-400 hover:text-white transition">Politique de confidentialité</Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 - Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#B026FF]" />
                <span className="text-gray-400">Genève</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#B026FF]" />
                <a href="tel:+41228860069" className="text-gray-400 hover:text-white transition">022 886 00 69</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#B026FF]" />
                <a href="mailto:info@agence-orbit.ch" className="text-gray-400 hover:text-white transition">info@agence-orbit.ch</a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 - Formulaire rapide */}
          <div>
            <h3 className="text-lg font-bold mb-6">Besoin d'un conseil ?</h3>
            <form className="space-y-4">
              <div>
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="w-full p-3 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white placeholder-gray-500"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Votre message" 
                  rows={3}
                  className="w-full p-3 bg-white/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B026FF] text-white placeholder-gray-500 resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="flex items-center gap-2 bg-[#B026FF] px-4 py-2 rounded-lg hover:bg-[#B026FF]/80 transition w-full justify-center"
              >
                Envoyer
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#B026FF]/20 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Agence Orbit - Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;