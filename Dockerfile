FROM grafana/k6:0.38.3

ADD docker-entrypoint.sh /docker-entrypoint.sh

WORKDIR /tmp

ADD script.js ./script.js
ADD users.csv ./users.csv
ADD papaparse.min.js ./papaparse.min.js

ENTRYPOINT ["/docker-entrypoint.sh"]
