FROM norgefajardo/k6:v0.37.0

ADD docker-entrypoint.sh /docker-entrypoint.sh

WORKDIR /tmp

ADD PerfTestSmokeTest.js ./script.js

ENTRYPOINT ["/docker-entrypoint.sh"]
