/// <reference types="vite/client" />

interface Window {
  gtag: (command: string, action: string, params?: any) => void;
  dataLayer: any[];
  grecaptcha: {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
  };
}