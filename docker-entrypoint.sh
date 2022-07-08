#!/bin/sh

set -e

k6 run /tmp/script.js -o influxdb="http://${INFLUXDB_SERVICE_HOST}:${INFLUXDB_SERVICE_PORT}/jam3"

exec "$@"
