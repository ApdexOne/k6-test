FROM norgefajardo/k6:v0.37.0

ADD docker-entrypoint.sh /docker-entrypoint.sh

WORKDIR /tmp

ADD PerfTestSmokeTest.js ./script.js
ADD add_all.csv ./add_all.csv
ADD users_stg.csv ./users_stg.csv
ADD papaparse.min.js ./papaparse.min.js

ENTRYPOINT ["/docker-entrypoint.sh"]
