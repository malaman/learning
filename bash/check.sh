#!/bin/bash
while read LINE; do
  curl -o /dev/null --silent --head --write-out '%{time_total}' -H 'cache-control: no-cache' "$LINE"
  echo " $LINE"
done < url-list.txt

