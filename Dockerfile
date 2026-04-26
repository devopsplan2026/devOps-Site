# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 – Build
#   Uses the official Node 20 Alpine image to install dependencies and
#   produce an optimised production bundle via `vite build`.
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

# Set working directory inside the container
WORKDIR /app

# Copy dependency manifests first (leverages Docker layer caching)
# This ensures dependencies are cached separately from source code changes
COPY package.json package-lock.json ./

# Install dependencies using npm ci for deterministic builds
# --only=prod would skip devDeps, but we need them for the build
RUN npm ci --prefer-offline --no-audit

# Copy the rest of the source code
COPY . .

# Build the production bundle → output goes to /app/dist
# Add NODE_ENV for optimal builds
RUN NODE_ENV=production npm run build

# Prune devDependencies to reduce image size (optional, but helpful)
RUN npm prune --production

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 – Serve
#   Copies only the compiled static assets into a tiny Nginx image.
#   No Node.js, no source code, no devDependencies in the final image.
# ─────────────────────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove the default Nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the production build from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health-check so orchestrators (Docker Compose / Kubernetes) can monitor the container
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

# Start Nginx in the foreground (required for Docker)
CMD ["nginx", "-g", "daemon off;"]
