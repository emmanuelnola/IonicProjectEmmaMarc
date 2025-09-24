import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-menu-app',
  webDir: 'www',
   plugins: {
      // Configuration pour ignorer CORS
      CapacitorHttp: {
        enabled: true
      }
    },
    server: {
      androidScheme: 'https',
      // Important pour le développement
      cleartext: true,
      // Autoriser les origines multiples
      allowNavigation: [
        'presi.lab-123.com',
        '*.lab-123.com',
        'prod.lab-123.com'
      ]
    }
};

export default config;
