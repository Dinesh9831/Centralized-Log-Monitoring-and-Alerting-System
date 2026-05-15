# Centralized Log Monitoring System

This is a full-stack DevOps demonstration project featuring a Java Spring Boot backend and a React (Vite) frontend. The entire application is containerized using Docker and features a Continuous Integration pipeline via GitHub Actions.

## Tech Stack
* **Backend:** Java 17, Spring Boot, Maven 3.9
* **Frontend:** React, Tailwind CSS, Vite
* **DevOps:** Docker, Docker Compose, GitHub Actions

## Project Architecture

### 1. Backend (Java/Spring Boot)
The backend service automatically generates randomized system logs (INFO, WARN, ERROR) every 5 seconds. It exposes REST API endpoints for the frontend to consume.
* **Port:** `5000`
* **API Endpoints:**
  * `GET /api/logs`: Returns all recent system logs.
  * `GET /api/alerts`: Returns only the critical `ERROR` level logs.

### 2. Frontend (React)
A real-time DevOps dashboard displaying system health metrics, a live-updating log stream, and a dedicated alerts page for critical errors.
* **Port:** `80` (when running via Docker)

## How to Run Locally

### Prerequisites
* Java 17
* Maven 3.9
* Docker & Docker Compose

### Step 1: Build the Applications (Local Compile)
Because the Docker containers are optimized to just run the compiled artifacts, you must build both the Java application and the React application locally first.

**Build the Backend:**
```bash
cd backend
mvn clean package -DskipTests
cd ..
```

**Build the Frontend:**
```bash
cd frontend
npm install
npm run build
cd ..
```

### Step 2: Run with Docker Compose
Use Docker Compose to build the frontend image and launch both containers together.
```bash
docker-compose up --build -d
```

### Step 3: Access the Application
* Open your browser and navigate to: `http://localhost`
* To stop the application, run: `docker-compose down`

## Continuous Integration (CI)
This repository includes a `.github/workflows/ci.yml` file. Every time code is pushed to the `main` branch, GitHub Actions will automatically:
1. Set up Java 17 and Maven.
2. Compile the backend.
3. Build the frontend using Node.js.
4. Build the Docker images to verify everything is working perfectly.
