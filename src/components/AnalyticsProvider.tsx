import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackScroll, trackTimeSpent } from '../lib/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const location = useLocation();
  const timeSpentInterval = useRef<number>();

  // Suivi des vues de page
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  // Suivi du scroll
  useEffect(() => {
    let lastScrollDepth = 0;
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const scrollDepth = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
      
      if (scrollDepth % 25 === 0 && scrollDepth > lastScrollDepth) {
        lastScrollDepth = scrollDepth;
        trackScroll(scrollDepth);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Suivi du temps passé
  useEffect(() => {
    let timeSpent = 0;
    timeSpentInterval.current = window.setInterval(() => {
      timeSpent += 30;
      trackTimeSpent(timeSpent);
    }, 30000); // Toutes les 30 secondes

    return () => {
      if (timeSpentInterval.current) {
        clearInterval(timeSpentInterval.current);
      }
    };
  }, []);

  return <>{children}</>;
};