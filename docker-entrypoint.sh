#!/bin/sh

set -e

k6 run /tmp/script.js -o influxdb="http://${INFLUXDBV1_SERVICE_HOST}:${INFLUXDBV1_SERVICE_PORT}/jam3"

exec "$@"
