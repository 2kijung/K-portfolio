# Multi-stage build
FROM maven:3.9.4-eclipse-temurin-17 AS builder

WORKDIR /build

# Copy pom.xml
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build application
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy JAR from builder
COPY --from=builder /build/target/portfolio-backend-1.0.0.jar app.jar

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/auth/health || exit 1

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
