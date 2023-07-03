# Mulit Stage Docker Build according to
# https://stackoverflow.com/questions/61108021/gradle-and-docker-how-to-run-a-gradle-build-within-docker-container

# gradle image to use gradle build
FROM gradle:5.3.0-jdk-alpine AS TEMP_BUILD_IMAGE
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY build.gradle $APP_HOME

COPY gradle $APP_HOME/gradle
COPY --chown=gradle:gradle . /home/gradle/src
USER root
RUN chown -R gradle /home/gradle/src

RUN gradle build || return 0
COPY . .

# Build real container
FROM eclipse-temurin:17-jdk-alpine
ENV BUILD_NAME="backend-0.0.1-SNAPSHOT.jar"
ENV APP_HOME=/usr/app/
WORKDIR $APP_HOME
COPY --from=TEMP_BUILD_IMAGE $APP_HOME/build/libs/$BUILD_NAME .
ENTRYPOINT java -jar $BUILD_NAME
