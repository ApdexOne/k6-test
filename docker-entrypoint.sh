#!/bin/sh

set -e

k6 run /tmp/script.js -o xk6-influxdb=http://influxdb.observability.svc:8086

exec "$@"
