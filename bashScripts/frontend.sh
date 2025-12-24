#!/bin/bash

# Update package list curl and git
sudo apt update -y && sudo apt install -y curl git

# Setup Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Clone the project (specific branch)
git clone -b Ayoub_Branch https://github.com/Chaima-hanafi/Task-Manager.git
# Go to project directory
cd Task-Manager/task-manager
# Keep only frontend service
rm -rf notification-service user-service task-service
cd frontend-service
# Install frontend dependencies
npm install
sudo touch .env
sudo cat <<EOF > .env
VITE_USER_IP=10.10.10.11
VITE_TASK_IP=10.10.10.12
EOF
# Start frontend service accessible from Vagrant host
npm run dev -- --host 0.0.0.0