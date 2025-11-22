FROM maven:3.9.11-amazoncorretto-21-debian AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM maven:3.9.11-amazoncorretto-21-debian AS runtime
WORKDIR /app
COPY --from=builder /app/target/jobyte-api-0.0.1-SNAPSHOT.jar ./app.jar
EXPOSE 8000
CMD ["java", "-jar", "app.jar"]