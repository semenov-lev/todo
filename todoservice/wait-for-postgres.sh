#!/bin/sh
# wait-for-postgres.sh

set -e

host="$1"
shift

until PGPASSWORD="django" psql -h "$host" -d "todo" -U "lev" -c '\q'; do
  >&2 echo "Postgres is unavaible - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec "$@"