import React, { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Rocket, Globe, Instagram, Smartphone, Shield, Zap, Users, Star, ExternalLink, ChevronDown, BarChart, Activity, Cpu, Target } from 'lucide-react';
import Button from '../components/ui/Button';
import gsap from 'gsap';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedCounter from '../components/AnimatedCounter';
import AnimatedInfographic from '../components/AnimatedInfographic';
import ProcessFlow from '../components/ProcessFlow';
import TechCircuit from '../components/TechCircuit';
import VisibilityRadar from '../components/VisibilityRadar';

function Homepage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const whyUsRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Animation hooks
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const servicesInView = useInView(servicesRef, { once: true, amount: 0.2 });
  const whyUsInView = useInView(whyUsRef, { once: true, amount: 0.2 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 });
  const clientsInView = useInView(clientsRef, { once: true, amount: 0.3 });
  const processInView = useInView(processRef, { once: true, amount: 0.2 });
  const radarInView = useInView(radarRef, { once: true, amount: 0.2 });
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Handle video loading
  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.readyState >= 3) {
        setVideoLoaded(true);
      } else {
        videoRef.current.addEventListener('loadeddata', () => {
          setVideoLoaded(true);
        });

        // Fallback in case video takes too long
        const timeout = setTimeout(() => {
          setVideoLoaded(true);
        }, 3000);

        return () => clearTimeout(timeout);
      }
    }
  }, []);
  
  const handleStartClick = () => {
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        action_category: 'engagement',
        action_label: 'start_project',
      });
    }
    navigate('/contact');
  };

  // Handle scroll to next section
  const scrollToNext = () => {
    if (radarRef.current) {
      const offset = radarRef.current.offsetTop - 80;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  // Infographic data
  const websiteMetricsData = [
    { label: 'Visibilité', value: 85, color: '#B026FF' },
    { label: 'Conversion', value: 65, color: '#2F73FF' },
    { label: 'Expérience', value: 92, color: '#05D9E8' },
    { label: 'Performance', value: 78, color: '#36F9C5' }
  ];

  const processSteps = [
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "1. Consultation Gratuite",
      description: "Discussion approfondie pour comprendre votre vision, vos objectifs et votre public cible."
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "2. Design & Prototype",
      description: "Création de maquettes interactives pour vous donner un aperçu concret de votre futur site."
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "3. Développement",
      description: "Codage soigné avec les technologies les plus récentes pour un site robuste et performant."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "4. Lancement & Optimisation",
      description: "Publication de votre site et ajustements pour maximiser son efficacité et sa visibilité."
    }
  ];

  // Client testimonials data
  const testimonials = [
    {
      content: "Orbit a transformé notre présence en ligne. Non seulement notre site est magnifique, mais les résultats sont bien au-delà de nos attentes.",
      author: "Thomas Renaud",
      role: "CEO, Entreprise XYZ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
      content: "Un travail d'une qualité exceptionnelle. L'équipe a su capturer l'essence de notre marque et la transposer dans un site web élégant et performant.",
      author: "Sophia Martin",
      role: "Directrice Marketing, Studio Créatif",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
      content: "Ce qui m'a impressionné, c'est l'accompagnement personnalisé et la réactivité. Chaque détail a été soigné et le résultat est simplement parfait.",
      author: "Alexandre Dubois",
      role: "Fondateur, Startup Innovante",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Agence Orbit | Votre site web sur mesure</title>
        <meta name="description" content="Agence Orbit - Votre partenaire pour la création de sites web, gestion de réseaux sociaux et développement d'applications sur mesure." />
      </Helmet>
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background video with overlay */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {!videoLoaded && (
            <div className="absolute inset-0 bg-dark-900 flex items-center justify-center">
              <div className="loader"></div>
            </div>
          )}
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          >
            <source src="https://res.cloudinary.com/agence-orbit/video/upload/v1741712025/planet-earth-orbit_xe79ic.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#1a1a1a]/60 backdrop-blur-sm"></div>
        </div>
        
        {/* Particle effect */}
        <ParticleBackground className="absolute inset-0 z-1" />
        
        {/* Grid background and scanning effect */}
        <div className="absolute inset-0 grid-background opacity-10"></div>
        <div className="scanning-line"></div>
        
        {/* Gradient effects */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-neon-purple/20 mix-blend-soft-light rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[400px] h-[400px] bg-neon-purple/20 mix-blend-soft-light rounded-full blur-[100px] opacity-40"></div>
        
        {/* Hero content */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="futuristic-container relative z-10 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="futuristic-title mb-6 max-w-4xl mx-auto"
          >
            Un site web, une image, <span className="text-gradient-purple">une transformation.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-surface-300 mb-12 max-w-2xl mx-auto"
          >
            Votre présence en ligne mérite ce qu'il y a de mieux, et nous le créons pour vous.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={handleStartClick}
              size="lg"
              glowing
            >
              Créer mon site web
            </Button>
            
            <Button
              to="/creation-site-web#portfolio"
              variant="secondary"
              size="lg"
            >
              Voir nos réalisations
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={scrollToNext}
        >
          <span className="text-surface-300 text-sm mb-2">Découvrir</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-8 h-8 text-neon-purple"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </section>

      {/* Visibility Radar Section */}
      <section ref={radarRef} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/10 to-transparent"></div>
        <div className="scanning-line-reverse"></div>
        
        <div className="futuristic-container relative">
          <AnimatePresence>
            {radarInView && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <motion.div className="inline-block mb-4">
                    <Target className="h-8 w-8 text-neon-purple inline-block mr-2" />
                    <span className="text-sm uppercase tracking-widest text-neon-purple">Positionnement digital</span>
                  </motion.div>
                </div>
                
                <VisibilityRadar />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Stats Section */}
      <section ref={statsRef} className="py-20 relative">
        {/* Gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent"></div>
        <div className="scanning-line-reverse"></div>
        
        <div className="futuristic-container relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: 98, text: "de clients satisfaits", suffix: "%" },
              { number: 7, text: "pour la première version", suffix: " jours" },
              { number: 0, text: "si vous n'êtes pas satisfait", suffix: "€" }
            ].map((stat, index) => (
              <AnimatePresence key={index}>
                {statsInView && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 * index }}
                    className="futuristic-card text-center"
                  >
                    <AnimatedCounter 
                      end={stat.number} 
                      suffix={stat.suffix}
                    />
                    <div className="text-xl font-medium">{stat.text}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
          
          {/* Tech Circuit Effect */}
          <div className="mt-16 relative h-40">
            <TechCircuit className="absolute inset-0" />
          </div>

          {/* Infographic Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-center">Impact d'un site web professionnel</h3>
            <AnimatedInfographic 
              data={websiteMetricsData} 
              maxValue={100} 
            />
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section ref={processRef} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-purple/5"></div>
        <div className="futuristic-container relative">
          <div className="text-center mb-16">
            <h2 className="futuristic-subtitle mb-4 text-gradient-purple">Notre Process</h2>
            <p className="text-surface-300 max-w-2xl mx-auto">
              Une approche structurée pour transformer votre vision en réalité digitale
            </p>
          </div>
          
          <ProcessFlow steps={processSteps} />
        </div>
      </section>
      
      {/* Social Proof */}
      <section ref={clientsRef} className="py-20 relative">
        <div className="absolute inset-0 bg-dark-500/5"></div>
        <div className="futuristic-container relative">
          <AnimatePresence>
            {clientsInView && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="futuristic-subtitle mb-4 text-gradient-purple">Ils nous font confiance</h2>
                <p className="text-surface-300 max-w-2xl mx-auto">
                  Rejoignez nos clients satisfaits et transformez votre présence en ligne.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Logo cloud */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center mb-16">
            {Array.from({ length: 4 }).map((_, index) => (
              <AnimatePresence key={index}>
                {clientsInView && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="flex justify-center items-center grayscale hover:grayscale-0 transition opacity-60 hover:opacity-100"
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-161468037${6300 + index}?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80`}
                      alt={`Client logo ${index + 1}`} 
                      className="max-h-12"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
          
          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <AnimatePresence key={index}>
                {clientsInView && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                    className="futuristic-card relative overflow-hidden group"
                  >
                    {/* Quote mark */}
                    <div className="absolute -top-2 -left-2 text-6xl text-neon-purple/20 font-serif">"</div>
                    
                    {/* Testimonial content */}
                    <div className="relative z-10">
                      <p className="text-surface-300 italic mb-6 relative z-10">
                        {testimonial.content}
                      </p>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-neon-purple/30 group-hover:ring-neon-purple/60 transition-all">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.author} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold group-hover:text-neon-purple transition-colors">{testimonial.author}</p>
                          <p className="text-sm text-neon-purple/80">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover glow effect */}
                    <div className="absolute -z-10 inset-0 bg-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section ref={servicesRef} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-purple/5"></div>
        <div className="scanning-line"></div>
        
        <AnimatePresence>
          {servicesInView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="futuristic-container"
            >
              <div className="text-center mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="futuristic-subtitle mb-4 text-gradient-purple"
                >
                  Nos solutions digitales
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-surface-300 max-w-2xl mx-auto"
                >
                  Des services premium qui mettent votre entreprise en valeur et génèrent des résultats concrets.
                </motion.p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Globe className="w-8 h-8 text-neon-purple" />,
                    title: "Création de Site Web",
                    description: "Des sites performants, modernes et optimisés SEO pour augmenter votre visibilité et convertir vos visiteurs.",
                    link: "/creation-site-web"
                  },
                  {
                    icon: <Instagram className="w-8 h-8 text-neon-purple" />,
                    title: "Réseaux Sociaux",
                    description: "Développez votre audience avec des stratégies puissantes et du contenu engageant pour construire votre communauté.",
                    link: "/reseaux-sociaux"
                  },
                  {
                    icon: <Smartphone className="w-8 h-8 text-neon-purple" />,
                    title: "Applications Web & Mobiles",
                    description: "Des solutions digitales sur-mesure pour vos projets, développées avec les technologies les plus récentes.",
                    link: "/creation-application"
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                    whileHover={{ y: -8 }}
                    className="futuristic-card group border border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300"
                  >
                    <div className="p-3 bg-neon-purple/10 rounded-xl w-fit mb-6">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-neon-purple transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-surface-300 mb-6">
                      {service.description}
                    </p>
                    <Button to={service.link} variant="text" className="p-0 text-neon-purple">
                      Découvrir <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      
      {/* Why Choose Us Section */}
      <section ref={whyUsRef} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-neon-purple/5 to-transparent"></div>
        <div className="scanning-line-reverse"></div>
        
        <div className="futuristic-container">
          <AnimatePresence>
            {whyUsInView && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="futuristic-subtitle mb-4 text-gradient-purple">Pourquoi choisir Orbit ?</h2>
                <p className="text-surface-300 max-w-2xl mx-auto">
                  Notre approche unique et notre expertise nous distinguent des autres agences.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Users className="w-6 h-6 text-neon-purple" />,
                title: "Un accompagnement 360°",
                description: "Du design au référencement, notre équipe s'occupe de tout pour vous offrir une expérience sans stress."
              },
              {
                icon: <Zap className="w-6 h-6 text-neon-purple" />,
                title: "Sites 100% optimisés",
                description: "Rapides, responsive et prêts pour la conversion, nos sites respectent les dernières normes du web."
              },
              {
                icon: <Shield className="w-6 h-6 text-neon-purple" />,
                title: "Garantie satisfaction",
                description: "Vous ne payez que si vous êtes pleinement satisfait de votre site, sans risque ni engagement."
              },
              {
                icon: <Star className="w-6 h-6 text-neon-purple" />,
                title: "Approche sur-mesure",
                description: "Chaque solution est unique, conçue spécifiquement pour répondre à vos besoins et objectifs."
              }
            ].map((feature, index) => (
              <AnimatePresence key={index}>
                {whyUsInView && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    whileHover={{ y: -5 }}
                    className="futuristic-card border border-neon-purple/20 hover:border-neon-purple/40 transition-all"
                  >
                    <div className="p-3 bg-neon-purple/10 rounded-xl w-fit mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-surface-300 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Preview Section */}
      <section className="py-20 relative">
        <div className="futuristic-container">
          <div className="text-center mb-16">
            <h2 className="futuristic-subtitle mb-4 text-gradient-purple">Nos réalisations</h2>
            <p className="text-surface-300 max-w-2xl mx-auto">
              Des projets dont nous sommes fiers, pour des clients qui le sont tout autant.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                title: "E-commerce Premium",
                category: "Site de vente en ligne",
              },
              {
                image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                title: "Résidences Élégance",
                category: "Site immobilier",
              },
              {
                image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                title: "TaskFlow App",
                category: "Application de productivité",
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
                className="group overflow-hidden rounded-2xl border border-neon-purple/20 hover:border-neon-purple/40 transition-all"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent flex items-end">
                    <div className="p-6 w-full transform transition-transform duration-300 group-hover:-translate-y-2">
                      <h3 className="text-xl font-bold mb-1 group-hover:text-neon-purple transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-surface-300 flex items-center gap-1">
                        {project.category}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Button to="/creation-site-web#portfolio" variant="secondary">
              Voir tous nos projets <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Gradient effects */}
        <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute right-1/4 bottom-1/4 w-72 h-72 bg-neon-purple/15 rounded-full blur-[100px] -z-10"></div>
        <div className="scanning-line"></div>
        
        <div className="futuristic-container relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="futuristic-card-highlight text-center py-16 max-w-4xl mx-auto"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="futuristic-subtitle mb-6 text-gradient-purple">Votre projet mérite le meilleur</h2>
              <p className="text-xl text-surface-300 mb-8">
                Échangeons dès maintenant et créons ensemble votre succès digital.
              </p>
              <Button
                onClick={handleStartClick}
                size="lg"
                icon={<Rocket className="w-5 h-5" />}
                glowing
              >
                Obtenir un devis gratuit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Team Section */}
      <section ref={teamRef} className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/5 to-transparent"></div>
        <div className="scanning-line-reverse"></div>
        
        <div className="futuristic-container">
          <AnimatePresence>
            {teamInView && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="futuristic-subtitle mb-4 text-gradient-purple">Qui sommes-nous ?</h2>
                <p className="text-surface-300 max-w-2xl mx-auto">
                  Une équipe passionnée par l'innovation et déterminée à faire briller votre entreprise sur le web
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Océane's Profile */}
            <AnimatePresence>
              {teamInView && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group"
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl border border-neon-purple/20 group-hover:border-neon-purple/40 transition-colors">
                    <img 
                      src="https://i.imgur.com/Fgukxs3.png" 
                      alt="Océane Pougea" 
                      className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-2xl font-bold mb-1 text-gradient-purple">Océane Pougea</h3>
                      <p className="text-lg font-medium text-white">Experte en Organisation & Processus</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-surface-300 leading-relaxed text-justify">
                      Passionnée par l'optimisation et la gestion, Océane a fondé Orbit pour simplifier la vie des petites entreprises 
                      et libérer leur potentiel. Forte d'un parcours international en marketing et en management, elle met son expertise 
                      au service d'une structure claire et efficace. Son approche : combiner une écoute empathique, un sens du détail et 
                      des solutions pratiques pour un impact durable.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Steven's Profile */}
            <AnimatePresence>
              {teamInView && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="group"
                >
                  <div className="relative mb-6 overflow-hidden rounded-2xl border border-neon-purple/20 group-hover:border-neon-purple/40 transition-colors">
                    <img 
                      src="https://i.imgur.com/iarHiKC.png" 
                      alt="Steven C. K. Eldring" 
                      className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent"></div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-2xl font-bold mb-1 text-gradient-purple">Steven C. K. Eldring</h3>
                      <p className="text-lg font-medium text-white">Stratège Digital</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-surface-300 leading-relaxed text-justify">
                      Avec plus de dix ans d'expérience dans la création de sites web, Steven met à profit ses nombreux voyages 
                      et son parcours international pour apporter une vision unique à chaque projet. Originaire de Genève, il allie 
                      sens du design, expertise marketing et écoute attentive pour offrir des solutions simples, efficaces et accessibles. 
                      Son ambition ? Permettre à chaque entreprise de se démarquer et de booster sa présence en ligne, sans risque ni complexité.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

export default Homepage;