#!/bin/bash

# Update package list
sudo apt update -y

# Install curl and git
sudo apt install -y curl git

# Setup Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Go to project directory
cd /home/vagrant/Task-Manager/task-manager/frontend-service

# Install frontend dependencies
npm install

# Start frontend service accessible from Vagrant host
npm run dev -- --host 0.0.0.0
