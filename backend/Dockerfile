# Mulit Stage Docker Build according to
# https://stackoverflow.com/questions/61108021/gradle-and-docker-how-to-run-a-gradle-build-within-docker-container

# gradle image to use gradle build
FROM gradle:8.2.0-jdk17-alpine AS GRADLE_BUILD_IMAGE
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY build.gradle $APP_HOME
COPY src $APP_HOME/src
RUN gradle bootjar

# Build real container
FROM eclipse-temurin:17-jdk-alpine
ENV BUILD_NAME="backend.jar"
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY --from=GRADLE_BUILD_IMAGE $APP_HOME/build/libs/*.jar $APP_HOME/$BUILD_NAME
ENTRYPOINT java -jar $BUILD_NAME