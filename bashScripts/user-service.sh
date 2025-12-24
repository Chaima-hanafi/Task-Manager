#!/bin/bash

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
sudo git clone -b Ayoub_Branch https://github.com/Chaima-hanafi/Task-Manager.git 
PWD="${pwd}"
sudo rm -rf "$PWD/Task-Manager/task-manager/task-service/" "$PWD/Task-Manager/task-manager/notification-service/"  "$PWD/Task-Manager/task-manager/frontend-service/"
cd "$PWD/Task-Manager/task-manager/user-service/"
### install node packages 
sudo npm install -g npm@11.7.0
sudo npm install -y 
echo "### node packages installed"
sudo npm install -g nodemon 
echo "### add .env"
sudo touch .env
sudo cat <<EOF > .env
PORT=4000
FRONTEND_IP=10.10.10.14
EOF

### End of config
### Start the user-service 
sudo nohup nodemon index.js > user-service.log 2>&1 &



