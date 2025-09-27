import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cm.paulbiya2025.www',
  appName: 'BIYA 2025',
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
        'prod.lab-123.com',
        '*.paulbiya2025.cm'
      ]
    }
};

export default config;
