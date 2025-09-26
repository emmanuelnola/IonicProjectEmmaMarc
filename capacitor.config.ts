import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'API_2025',
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
        'paulbiya2025.cm',

      ]
    }
};

export default config;
