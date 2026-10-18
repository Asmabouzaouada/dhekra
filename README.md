# Invitation de mariage — Yassine & Dhekra

Carte numérique interactive créée avec React + Vite. L'enveloppe s'ouvre au clic, puis la page présente les détails, le lieu, le dress code et une réponse RSVP.

## Lancer en local
1. Installe Node.js si nécessaire : https://nodejs.org/
2. Ouvre ce dossier dans VS Code.
3. Dans le terminal :
   ```bash
   npm install
   npm run dev
   ```
4. Ouvre l'adresse locale affichée par Vite.

## Avant de publier
Dans `src/main.jsx`, remplace :
- `[HEURE]` par l'heure de la célébration.
- `[NOM DE LA SALLE]` par le nom de la salle.
- Le lien Google Maps par le lien exact de votre salle.
- `VOTRE-EMAIL-ICI` par l'adresse qui recevra les réponses RSVP.
- Vérifie l'année et le jour de la semaine.

Le formulaire RSVP ouvre le logiciel de messagerie du invité (aucune réponse n'est stockée sur un serveur).

## Déployer sur Vercel
1. Crée un dépôt GitHub et envoie-y le contenu de ce projet.
2. Sur https://vercel.com, choisis **Add New → Project** et importe le dépôt.
3. Vercel détecte Vite. Build command : `npm run build`; output directory : `dist`.
4. Clique sur **Deploy**, puis partage le lien généré aux invités.
