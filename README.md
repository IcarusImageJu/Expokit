# Application mobile & Web

## setup du projet
Installer le projet avec `npm i` ou `yarn`.

Nom de la librairie | Version
---------|----------
 Node | 12.18.8
 npm | 6.13.3
 yarn | 1.21.1
 expo | 3.11.7

## Demarrage du projet en local (tant qu'il n'est pas eject)
1. Demarrer le projet avec `npm start` ou `yarn start`.
2. Installer expo sur le terminal.
3. Scanner ensuite le QRCode avec votre application expo pour Android ou directement avec l'appareil photo iOS.

## Demarrage du projet en local (eject)
1. Demarrer le projet avec `npm start` ou `yarn start` ou en mode production `expo start --no-dev --minify`.

### Android
2. Ouvrir le projet `./android` dans Android studio.
3. Build projet.
4. Lancer le projet sur un terminal brancher en USB en mode developpement ou un simulateur.

### iOS (Apple only)
2. Ouvrir le projet `./ios` dans XCode
3. Lancer le projet sur un un simulateur.

## Deployer

### Sans modification dans les librairies utilisées

#### En dev
Deploiement de la version de dev sur le channel de dev expo : `yarn publish:dev` ou `npm run publish:dev`

#### En staging
Deploiement de la version de staging sur le channel de staging expo : `yarn publish:staging` ou `npm run publish:staging`

#### En prod
Deploiement de la version de production sur expo : `yarn publish:prod` ou `npm run publish:prod`

### Avec modification des librairies utilisées
1. Effectuer le meme deploimenet sur Expo avec les commandes de la section precedente.
2. Renvoyer une nouvelle version de l'application sur les stores respectifs

## Call Pour les notifications
curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
  "to": "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
  "title":"hello",
  "body": "world"
}'
