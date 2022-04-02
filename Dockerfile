FROM norgefajardo/k6:v0.37.0

ADD docker-entrypoint.sh /docker-entrypoint.sh

WORKDIR /tmp

ADD script.js .

ENTRYPOINT ["/docker-entrypoint.sh"]
