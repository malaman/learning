#!/bin/bash
for i in {1..1000}; do \
  curl --silent --write-out '%{http_code}' '%{time_total}' -H "Content-Type: application/json" -H 'cache-control: no-cache' -d '{"number":"'$i'"}' -X POST "http://localhost:8080/search?cb='$i'" > /dev/null
  curl -o /dev/null --silent --head --write-out '%{http_code}' '%{time_total}' -H 'cache-control: no-cache' "http://localhost:8080/details?cb='$i'"
done
