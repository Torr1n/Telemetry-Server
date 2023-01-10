#### Formula UBC Wireless Telemetry Server

To start this server, clone to your device and navigate to the src folder using cd in the linux terminal, then use the command "npm start"

# Routes

## Healthcheck
checks that the server's status is "OK"

## Upload
Recieves a post request with JSON data in the request body, then persists this data locally in a CSV file and saves it to the cache.

## Download
Get request that fetches the current data from the cache