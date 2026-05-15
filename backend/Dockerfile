FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built jar from your local target directory
# (Make sure to run 'mvn clean package' on your laptop first)
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose port 5000
EXPOSE 5000

# Start the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
