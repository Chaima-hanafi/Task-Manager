#!/bin/bash

# Update package list
sudo apt update 

# Install curl and git
sudo apt install -y curl git

# Setup Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js and npm
sudo apt install -y nodejs

# Clone the project (specific branch)
git clone -b Ayoub_Branch https://github.com/Chaima-hanafi/Task-Manager.git

# Go to project directory
cd Task-Manager/task-manager 

# Keep only notification service
rm -rf frontend-service user-service task-service

# Go to notification directory
cd notification-service 

# Install notification dependencies
npm install
# set up environment variables for task service
sudo touch .env
sudo cat <<EOF > .env
PORT=4002
EOF
# Start notification service
nohup node index.js > index.log 2>&1 &