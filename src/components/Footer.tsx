// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

// Fonction utilitaire pour récupérer un cookie par nom
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { label: 'Contact', to: '/contact' },
    { label: 'Devenir Partenaire', to: '/devenir-partenaire' },
    { label: 'Mentions légales', to: '/mentions-legales' },
    { label: 'Politique de confidentialité', to: '/politique-de-confidentialite' },
  ];
  
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, url: 'https://www.facebook.com/profile.php?id=61572616630632', label: 'Facebook' },
    { icon: <Instagram className="h-5 w-5" />, url: 'https://www.instagram.com/agenceorbit.ch/', label: 'Instagram' },
    { icon: <Linkedin className="h-5 w-5" />, url: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  // Lecture du cookie "selectedCountry"
  const selectedCountry = getCookie('selectedCountry');
  // Par défaut, le numéro est celui que vous aviez. Si le cookie vaut "fr", on affiche le numéro français.
  const phoneContent = selectedCountry === 'fr' ? '+33 6 06 44 88 37' : '022 886 00 69';
  const phoneUrl = selectedCountry === 'fr' ? 'tel:+336060448837' : 'tel:+41228860069';

  const contactInfo = [
    { icon: <MapPin className="h-5 w-5 text-neon-purple" />, content: 'Genève', label: 'Adresse' },
    { icon: <Phone className="h-5 w-5 text-neon-purple" />, content: phoneContent, url: phoneUrl, label: 'Téléphone' },
    { icon: <Mail className="h-5 w-5 text-neon-purple" />, content: 'info@agence-orbit.ch', url: 'mailto:info@agence-orbit.ch', label: 'Email' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-neon-purple/20">
      {/* Grid background and animations */}
      <div className="absolute inset-0 grid-background opacity-10"></div>
      <div className="scanning-line"></div>
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
      
      {/* Gradient effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] -z-10 opacity-60"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] -z-10 opacity-40"></div>
      
      <div className="futuristic-container py-16">
        <div className="grid md:grid-cols-4 gap-x-12 gap-y-10">
          {/* Column 1: Logo & Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img src="https://i.imgur.com/aM3st2Q.png" alt="Orbit Logo" className="h-20" />
              <div className="absolute -inset-1 bg-neon-purple/20 blur-xl rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-surface-300 text-sm leading-relaxed"
            >
              Agence digitale spécialisée dans la création de sites web futuristes, 
              la gestion des réseaux sociaux et le développement d'applications innovantes sur mesure.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex space-x-3"
            >
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="p-2 bg-dark-300/50 rounded-full hover:bg-neon-purple/20 transition-colors text-surface-300 hover:text-white hover:shadow-neon"
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Column 2: Links */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold mb-6"
            >
              Liens rapides
            </motion.h3>
            
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-surface-300 hover:text-white transition-colors inline-flex items-center gap-1.5 group hover:text-neon-purple"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold mb-6"
            >
              Contact
            </motion.h3>
            
            <motion.ul 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <span className="mt-0.5 group-hover:text-neon-purple transition-colors">{item.icon}</span>
                  {item.url ? (
                    <a 
                      href={item.url} 
                      className="text-surface-300 hover:text-neon-purple transition-colors"
                      aria-label={item.label}
                    >
                      {item.content}
                    </a>
                  ) : (
                    <span className="text-surface-300 group-hover:text-white transition-colors">{item.content}</span>
                  )}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Column 4: Quick Contact */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold mb-6"
            >
              Besoin d'un conseil ?
            </motion.h3>
            
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <div>
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="w-full p-3 bg-dark-300/50 rounded-lg border border-neon-purple/30 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder:text-surface-400"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Votre message" 
                  rows={3}
                  className="w-full p-3 bg-dark-300/50 rounded-lg border border-neon-purple/30 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent text-white placeholder:text-surface-400 resize-none"
                ></textarea>
              </div>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                icon={<Send className="h-4 w-4" />}
                iconPosition="right"
                glowing
              >
                Envoyer
              </Button>
            </motion.form>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-neon-purple/20 text-center"
        >
          <p className="text-surface-400 text-sm">
            © {currentYear} Agence Orbit - Tous droits réservés. <span className="text-neon-purple/80">Propulsez votre avenir digital.</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;