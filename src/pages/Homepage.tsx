import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Rocket, ShieldCheck, Award, ArrowRight, Globe, Instagram, Smartphone, Clock, Zap, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Homepage() {
  return (
    <>
      <Helmet>
        <title>Accueil | Agence Orbit</title>
        <meta name="description" content="Agence Orbit - Votre partenaire pour la création de sites web, gestion de réseaux sociaux et développement d'applications sur mesure." />
      </Helmet>
      
      <div className="min-h-screen pt-24 pb-16">
        {/* 1. Hero Section – Impact immédiat */}
       <section className="relative min-h-[calc(100vh-6rem)] flex items-center overflow-hidden -mt-24">
  {/* Vidéo d'arrière-plan */}
  <div className="absolute inset-0 z-0">
    <video 
      autoPlay 
      muted 
      loop 
      playsInline
      className="w-full h-full object-cover"
    >
      <source src="https://res.cloudinary.com/agence-orbit/video/upload/v1741712025/planet-earth-orbit_xe79ic.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/40"></div> {/* Assombri légèrement la vidéo */}
  </div>
  
  <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
    {/* ✅ Amélioration du style du titre */}
    <h1 className="text-4xl md:text-6xl font-bold mb-6 hero-title gradient-text">
      Un site web, une image, <span className="text-[#B026FF]">une transformation.</span>
    </h1>

    {/* ✅ Meilleur espacement et lisibilité */}
    <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
      Votre présence en ligne mérite le meilleur, et nous le créons pour vous.
    </p>

    {/* ✅ Boutons CTA améliorés */}
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <Link 
        to="/contact" 
        className="px-8 py-4 bg-[#B026FF] text-white rounded-full text-lg font-medium hover:bg-[#B026FF]/80 transition"
      >
        Créer mon site web
      </Link>
      <Link 
        to="/creation-site-web#portfolio" 
        className="px-8 py-4 bg-white/5 rounded-full text-lg font-medium hover:bg-white/10 transition"
      >
        Voir nos réalisations
      </Link>
    </div>
  </div>
</section>

        {/* 2. Preuve sociale & crédibilité */}
        <section className="py-12 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-semibold mb-8 text-[#B026FF]">
              Ils nous ont fait confiance pour leur présence digitale
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center mb-12">
              <div className="flex justify-center items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
                <img src="https://images.unsplash.com/photo-1614680376739-414d95ff43df?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Client logo" className="max-h-12" />
              </div>
              <div className="flex justify-center items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
                <img src="https://images.unsplash.com/photo-1614680376408-16impressivelogo?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Client logo" className="max-h-12" />
              </div>
              <div className="flex justify-center items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
                <img src="https://images.unsplash.com/photo-1614680376573-15corporate?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Client logo" className="max-h-12" />
              </div>
              <div className="flex justify-center items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
                <img src="https://images.unsplash.com/photo-1614680376218-16modernlogo?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="Client logo" className="max-h-12" />
              </div>
            </div>

            {/* Témoignages */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/5 p-6 rounded-2xl border border-[#B026FF]/20">
                <p className="text-gray-300 italic mb-4">
                  "Orbit a transformé notre site en un outil puissant. Plus de visibilité, plus de clients, et un service client exceptionnel du début à la fin."
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Client" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold">Thomas Renaud</p>
                    <p className="text-sm text-[#B026FF]">CEO, Entreprise XYZ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Les services en un clin d'œil */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 neon-title">Nos solutions digitales</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Création de Site Web */}
              <div className="bg-white/5 rounded-2xl p-8 border border-[#B026FF]/20 hover:border-[#B026FF]/50 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 mb-6 bg-[#B026FF]/20 rounded-xl flex items-center justify-center">
                  <Globe className="w-8 h-8 text-[#B026FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Création de Site Web</h3>
                <p className="text-gray-400 mb-6">
                  Des sites performants, modernes et optimisés SEO pour augmenter votre visibilité et convertir vos visiteurs.
                </p>
                <Link to="/creation-site-web" className="inline-flex items-center text-[#B026FF] hover:text-white">
                  Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Réseaux Sociaux */}
              <div className="bg-white/5 rounded-2xl p-8 border border-[#B026FF]/20 hover:border-[#B026FF]/50 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 mb-6 bg-[#B026FF]/20 rounded-xl flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-[#B026FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Réseaux Sociaux</h3>
                <p className="text-gray-400 mb-6">
                  Développez votre audience avec des stratégies puissantes et du contenu engageant pour construire votre communauté.
                </p>
                <Link to="/reseaux-sociaux" className="inline-flex items-center text-[#B026FF] hover:text-white">
                  Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Applications Web & Mobiles */}
              <div className="bg-white/5 rounded-2xl p-8 border border-[#B026FF]/20 hover:border-[#B026FF]/50 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 mb-6 bg-[#B026FF]/20 rounded-xl flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-[#B026FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Applications Web & Mobiles</h3>
                <p className="text-gray-400 mb-6">
                  Des solutions digitales sur-mesure pour vos projets, développées avec les technologies les plus récentes.
                </p>
                <Link to="/creation-application" className="inline-flex items-center text-[#B026FF] hover:text-white">
                  Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Section "Pourquoi choisir Orbit ?" */}
        <section className="py-16 bg-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 neon-title">Pourquoi choisir Orbit ?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Point 1 */}
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-[#B026FF]/20">
                <div className="w-12 h-12 mb-4 bg-[#B026FF]/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#B026FF]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Un accompagnement 360°</h3>
                <p className="text-gray-400">
                  Du design au référencement, notre équipe s'occupe de tout pour vous offrir une expérience sans stress.
                </p>
              </div>

              {/* Point 2 */}
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-[#B026FF]/20">
                <div className="w-12 h-12 mb-4 bg-[#B026FF]/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#B026FF]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sites 100% optimisés</h3>
                <p className="text-gray-400">
                  Rapides, responsive et prêts pour la conversion, nos sites respectent les dernières normes du web.
                </p>
              </div>

              {/* Point 3 */}
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-[#B026FF]/20">
                <div className="w-12 h-12 mb-4 bg-[#B026FF]/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#B026FF]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Approche sur-mesure</h3>
                <p className="text-gray-400">
                  Votre projet, vos besoins, nos solutions adaptées. Chaque site est unique, comme votre entreprise.
                </p>
              </div>

              {/* Point 4 */}
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-[#B026FF]/20">
                <div className="w-12 h-12 mb-4 bg-[#B026FF]/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#B026FF]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Un service humain</h3>
                <p className="text-gray-400">
                  Un interlocuteur unique, de la conception à la mise en ligne, pour un suivi personnalisé de qualité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Portfolio – Nos réalisations en action */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-6 neon-title">Nos réalisations</h2>
            <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
              Des entreprises de toutes tailles nous font confiance. Découvrez nos dernières créations.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Projet 1 */}
              <div className="group rounded-2xl overflow-hidden portfolio-card relative">
                <img 
                  src="https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Projet E-commerce" 
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">E-commerce Premium</h3>
                    <p className="text-sm text-gray-300">Site de vente en ligne</p>
                  </div>
                </div>
              </div>

              {/* Projet 2 */}
              <div className="group rounded-2xl overflow-hidden portfolio-card relative">
                <img 
                  src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Projet Immobilier" 
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">Résidences Élégance</h3>
                    <p className="text-sm text-gray-300">Site immobilier</p>
                  </div>
                </div>
              </div>

              {/* Projet 3 */}
              <div className="group rounded-2xl overflow-hidden portfolio-card relative">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Projet Application" 
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">TaskFlow App</h3>
                    <p className="text-sm text-gray-300">Application de productivité</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/creation-site-web#portfolio" className="inline-flex items-center bg-white/5 px-6 py-3 rounded-full hover:bg-white/10 transition">
                Voir tous nos projets <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 6. "Parlons de votre projet" – Incitation à l'action */}
        <section className="py-16 bg-[#B026FF]/10 backdrop-blur-sm border-y border-[#B026FF]/20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Votre projet mérite le meilleur</h2>
            <p className="text-xl text-gray-300 mb-8">
              Échangeons dès maintenant et créons ensemble votre succès digital.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-[#B026FF] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#B026FF]/80 transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(176,38,255,0.4)]"
            >
              Obtenir un devis gratuit <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

       {/* Team Section */}
      <section id="team" className="py-20 bg-gradient-to-b from-transparent to-[#B026FF]/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 gradient-text">Qui sommes-nous ?</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Une équipe passionnée par l'innovation et déterminée à faire briller votre entreprise sur le web
          </p>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Océane's Profile */}
            <div className="group">
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img 
                  src="https://i.imgur.com/Fgukxs3.png" 
                  alt="Océane Pougea" 
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#B026FF] name-glow">Océane Pougea</h3>
                <p className="text-lg font-medium text-gray-300">Votre Experte en Organisation & Processus</p>
                <p className="text-gray-400 leading-relaxed text-justify">
                  Passionnée par l'optimisation et la gestion, Océane a fondé Orbit pour simplifier la vie des petites entreprises 
                  et libérer leur potentiel. Forte d'un parcours international en marketing et en management, elle met son expertise 
                  au service d'une structure claire et efficace. Son approche : combiner une écoute empathique, un sens du détail et 
                  des solutions pratiques pour un impact durable.
                </p>
              </div>
            </div>

            {/* Steven's Profile */}
            <div className="group">
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <img 
                  src="https://i.imgur.com/iarHiKC.png" 
                  alt="Steven C. K. Eldring" 
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#B026FF] name-glow">Steven C. K. Eldring</h3>
                <p className="text-lg font-medium text-gray-300">Votre Stratège Digital</p>
                <p className="text-gray-400 leading-relaxed text-justify">
                  Avec plus de dix ans d'expérience dans la création de sites web, Steven met à profit ses nombreux voyages 
                  et son parcours international pour apporter une vision unique à chaque projet. Originaire de Genève, il allie 
                  sens du design, expertise marketing et écoute attentive pour offrir des solutions simples, efficaces et accessibles. 
                  Son ambition ? Permettre à chaque entreprise de se démarquer et de booster sa présence en ligne, sans risque ni complexité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
}

export default Homepage;