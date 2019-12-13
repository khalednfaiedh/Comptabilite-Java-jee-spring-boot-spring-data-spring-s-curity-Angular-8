FROM java:8-jre

# Install JAR file
COPY target/ms-server-auth.jar /app/application.jar

# Start Application
ENTRYPOINT exec java $JAVA_OPTS -jar /app/application.jar

