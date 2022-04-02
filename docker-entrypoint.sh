#!/bin/sh

set -e

k6 run /tmp/script.js -o output-prometheus-remote -e MY_HOSTNAME=${HOSTNAME}

exec "$@"
