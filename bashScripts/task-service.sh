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
git clone -b chaima_branch https://github.com/Chaima-hanafi/Task-Manager.git

# Go to project directory
cd Task-Manager/task-manager 

# Keep only task service
rm -rf notification-service user-service frontend-service

# Go to task directory
cd task-service 

# Install task dependencies
npm install
sudo touch .env
sudo cat <<EOF > .env
PORT=4001
NOTIFICATION_IP=10.10.10.13
FRONTEND_IP=10.10.10.14
EOF
# Start task service
nohup node index.js > index.log 2>&1 &