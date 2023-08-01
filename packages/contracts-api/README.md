# Contracts API

Our API for the contracts, with TRPC support.

# Development
## Express server
```bash
pnpm run build && pnpm run express
```

## Expose local server online
```bash
pnpm run express
# In a seperate terminal
pnpm run ngrok
```
* Note: requires [ngrok](https://ngrok.com/download) installed
* Useful to test webhook with ReadMe

## Build Docker image
From the workspace root:
```bash
docker build . -f Dockerfile -t vulcanlink/contracts-api:${VERSION:-test} --target contracts-api
```

