#!/bin/sh
set -e

host="$1"
user="$2"
password="$3"
cmd="$4"

until PGPASSWORD=$password psql -h "$host" -U "$user" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 2
done

>&2 echo "Postgres is up - executing command"
exec $cmd
