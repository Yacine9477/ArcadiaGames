# Utilise Node.js 18 comme base
FROM node:18-alpine

# Définit le répertoire de travail
WORKDIR /app

# Copie package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le code source
COPY . .

# Expose le port 3000
EXPOSE 3000

# Commande pour démarrer l'app
CMD ["npm", "start"]