#!/bin/bash

# Check if the container is already running
if [ "$(docker ps -q -f name=todo_app)" ]; then
    echo "Container is already running. Stopping..."
    docker-compose -f docker-compose.yml down --remove-orphans
else
    echo "Container is not running. Starting..."
    docker-compose -f docker-compose.yml up -d
fi