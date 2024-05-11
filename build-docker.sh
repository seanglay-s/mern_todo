#!/bin/bash

# Run 'pnpm build' in the 'client' directory in the background
(cd client/ && pnpm build) &

# Run 'pnpm build' in the 'server' directory
cd server/ && pnpm build

# Wait for the background process (client build) to finish
wait

# Run docker-compose build with --no-cache option
docker compose build --no-cache