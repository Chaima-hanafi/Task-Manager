
 Update the package list
sudo apt update

#  Install curl 
sudo apt install -y curl

 Download and execute the official script to set up Node.js 1
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

 Install Node.js and np
sudo apt install -y nodejs

 Clone the project from GitHu
git clone https://github.com/Chaima-hanafi/Task-Manager.git
cd Task-Manager/task-manager

 Install project dependencie
npm install

 Remove services that are not needed on this V
rm -rf task-service notification-service frontend-service
sudo touch .env
cat <<EOF > .env
PORT=4002
EOF

echo "Setup completed. .env file created and project ready."
