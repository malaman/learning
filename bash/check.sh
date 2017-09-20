#!/bin/bash
while read LINE; do
  curl -o /dev/null --silent --head --write-out '%{time_total}' -H 'x-dreamlines-api-token: d9b76ae64276ade97756e28fe8aea0d73a937c0f' -H 'cache-control: no-cache' "$LINE"
  echo " $LINE"
done < url-list.txt

