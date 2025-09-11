# Base image
FROM node:22

# Set working directory
WORKDIR /usr/src/app

# Copy only package files to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Gera o Prisma Client
RUN npx prisma generate
# RUN npx prisma db push


# Build the app
RUN npm run build

# Expose port
EXPOSE 3002

# Start the server
# CMD ["npm", "run", "start"]
CMD npx prisma db push && npm run start