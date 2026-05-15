FROM nginx:alpine

# Copy built assets from your local dist directory
# (Make sure to run 'npm run build' on your laptop first)
COPY dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

