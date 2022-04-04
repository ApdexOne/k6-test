#!/bin/sh

set -e

#k6 run /tmp/script.js -o output-prometheus-remote -e MY_HOSTNAME=${HOSTNAME}
k6 run /tmp/script.js --out influxdb=http://monitoring-influxdb.monitoring-influxdb.svc/demo

exec "$@"
