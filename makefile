//version des outils
Ionic CLI :7.2.1
version du framework Ionic Angular: 8.0.0
version intellij: 2025

// Variables
IONIC = npx ionic
NG = npx ng

// Cible par défaut
all: serve

// Lancer le serveur de développement
serve:
	$(IONIC) serve

// Compiler l’application (mode dev)
build:
	$(NG) build

// Compiler en production
build-prod:
	$(NG) build --configuration production

// Ajouter la plateforme Android
add-android:
	npx cap add android

// Synchroniser le code Angular avec Capacitor
sync:
	npx cap sync

// Ouvrir Android Studio
open-android:
	npx cap open android

// Nettoyer le projet (supprimer node_modules et dist)
clean:
	rm -rf node_modules dist

// Réinstaller les dépendances
install:
	npm install

