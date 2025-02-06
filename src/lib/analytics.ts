// Types pour les événements Google Analytics
type GAEventParams = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

// Fonction principale pour envoyer des événements à GA
export const trackEvent = ({ action, category = 'engagement', label, value, ...customParams }: GAEventParams) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParams,
    });
  }
};

// Événements de navigation
export const trackPageView = (path: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
    });
  }
};

// Événements de conversion
export const trackConversion = (type: string, value?: number) => {
  trackEvent({
    action: 'conversion',
    category: 'conversion',
    label: type,
    value: value,
    send_to: [
      'G-TZCN5ECS5C',
      type === 'contact_form_submission' ? 'G-TZCN5ECS5C/contact_form_complete' : undefined,
      type === 'order_form_submission' ? 'G-TZCN5ECS5C/order_form_complete' : undefined,
      type === 'partnership_form_submission' ? 'G-TZCN5ECS5C/partnership_form_complete' : undefined
    ].filter(Boolean)
  });
};

// Événements d'engagement
export const trackEngagement = (element: string, action: string) => {
  trackEvent({
    action: action,
    category: 'engagement',
    label: element,
    non_interaction: action === 'view' || action === 'scroll'
  });
};

// Événements de formulaire
export const trackFormInteraction = (formName: string, action: 'start' | 'complete' | 'abandon') => {
  trackEvent({
    action: `form_${action}`,
    category: 'form',
    label: formName,
    send_to: action === 'complete' ? [
      'G-TZCN5ECS5C',
      `G-TZCN5ECS5C/${formName}_${action}`
    ] : undefined
  });
};

// Événements de scroll
export const trackScroll = (depth: number) => {
  trackEvent({
    action: 'scroll_depth',
    category: 'engagement',
    value: depth,
  });
};

// Événements de temps passé
export const trackTimeSpent = (seconds: number) => {
  trackEvent({
    action: 'time_spent',
    category: 'engagement',
    value: seconds,
  });
};

// Événements de CTA
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent({
    action: 'cta_click',
    category: 'conversion',
    label: ctaName,
    location: location,
  });
};

// Événements de contenu
export const trackContentView = (contentType: string, contentId: string, contentName: string) => {
  trackEvent({
    action: 'content_view',
    category: 'content',
    label: contentType,
    content_id: contentId,
    content_name: contentName,
  });
};