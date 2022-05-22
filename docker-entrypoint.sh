#!/bin/sh

set -e

k6 run /tmp/script.js --out influxdb=http://monitoring-influxdb.monitoring.svc:8086/jam3

exec "$@"
