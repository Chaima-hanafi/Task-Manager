#!/bin/bash


REPO_URL="https://github.com/Chaima-hanafi/Task-Manager.git"
APP_DIR="Task-Manager/task-manager/frontend-service"

echo "### Install necessary packages"
sudo apt upgrade -y 
sudo apt update -y 
sudo apt install -y git curl build-essential
echo "git , curl and build-essential installed"
echo "### Install node and npm"
sudo curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs 
sudo echo "node and npm successfuly installed"
VERSION=`node -v`
echo "      ### $VERSION of nodejs installed"
echo "      ### Clone for repository"

if [ ! -d "$APP_DIR" ]; then
  git clone "$REPO_URL"
else
  echo "Directory $APP_DIR already exists, skipping clone"
fi

cd "$APP_DIR" 

# ===== CREATE .env FILE =====
cat <<EOF > .env
TASK_IP=10.10.10.12
USER_IP=10.10.10.11
EOF

echo ".env file created"

# ===== INSTALL DEPENDENCIES =====
npm install

# ===== RUN DEV SERVER =====
nohup npm run dev &