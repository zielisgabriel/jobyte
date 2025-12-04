FROM quay.io/keycloak/keycloak:26.4.2
COPY ./keycloak.conf /opt/keycloak/conf/keycloak.conf
COPY ./themes/jobyte /opt/keycloak/themes/jobyte
EXPOSE 8080
CMD ["start-dev"]