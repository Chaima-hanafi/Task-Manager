#!/bin/bash
### Install necessary packages 
sudo apt update >> /dev/null && apt install -y git curl build-essential >> /dev/null
sudo echo "git , curl and build-essential installed"
### Install node and npm 
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs >> /dev/null
sudo echo "node and npm successfuly installed"
VERSION=`node -v`
sudo echo "$VERSION installed"
### Clone for repository 
sudo git clone -b Ayoub_Branch  https://github.com/Chaima-hanafi/Task-Manager.git 
PWD=$(pwd)
sudo rm -rf "$PWD/Task-Manager/task-manager/user-service/"  "$PWD/Task-Manager/task-manager/notification-service/" "$PWD/Task-Manager/task-manager/frontend-service/"
cd "$PWD/Task-Manager/task-manager/task-service"
### install node packages 
sudo npm install -y >> /dev/null
sudo echo "node packages installed" 
sudo npm install -g nodemon >> /dev/null
### add .env
sudo touch .env
sudo cat <<EOF > .env
PORT=4001
FRONTEND_IP=10.10.10.14
NOTIFICATION_IP=10.10.10.13
EOF
### End of config
### Start the task-service 
sudo nohup nodemon index.js > task-service.log 2>&1 &