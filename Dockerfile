# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend code
COPY backend ./backend

# Set working directory to backend
WORKDIR /app/backend

# Install dependencies
RUN npm install

# Expose the port (default 8080, can be overridden)
ENV PORT=8080
EXPOSE $PORT

# Start the server
CMD ["npm", "start"] 