FROM 169893196636.dkr.ecr.us-east-1.amazonaws.com/k6:1.0

ADD docker-entrypoint.sh /docker-entrypoint.sh

WORKDIR /tmp

ADD script.js ./script.js
ADD users.csv ./users.csv
ADD papaparse.min.js ./papaparse.min.js

ENTRYPOINT ["/docker-entrypoint.sh"]
