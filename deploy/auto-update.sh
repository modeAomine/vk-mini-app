#!/bin/bash

# Script for auto-deploy from Git
set -e

echo "Starting auto-deploy process..."

# Configuration
GIT_REPO="https://github.com/modeAomine/vk-mini-app"
BRANCH="main"
CHECK_INTERVAL=30 # seconds
APP_DIR="/app"
LOG_FILE="/app/logs/deploy.log"

# Create logs directory
mkdir -p $(dirname $LOG_FILE)

log() {
    echo "$(date): $1" >> $LOG_FILE
    echo "$1"
}

cd $APP_DIR

# Initial clone if not exists
if [ ! -d ".git" ]; then
    log "Cloning repository..."
    git clone $GIT_REPO .
fi

while true; do
    log "Checking for updates..."
    
    # Fetch latest changes
    git fetch origin
    
    # Check if there are new commits
    LOCAL_COMMIT=$(git rev-parse HEAD)
    REMOTE_COMMIT=$(git rev-parse origin/$BRANCH)
    
    if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
        log "New changes detected! Updating from $LOCAL_COMMIT to $REMOTE_COMMIT"
        
        # Pull changes
        git pull origin $BRANCH
        
        # Install dependencies
        log "Installing dependencies..."
        npm ci
        
        # Build application
        log "Building application..."
        npm run build
        
        # Restart application (if using process manager)
        log "Deployment completed successfully!"
        
        # You can add application restart logic here
        # For example, if using PM2:
        # pm2 restart vk-mini-app
        
    else
        log "No changes detected"
    fi
    
    # Wait before next check
    sleep $CHECK_INTERVAL
done