Vagrant.configure("2") do |config|
  # Box de base (Ubuntu ici)
  config.vm.box = "ubuntu/focal64"
  config.vm.boot_timeout = 600
  config.ssh.insert_key = true

  # VM 1
  config.vm.define "user_server" do |vm1|
    vm1.vm.hostname = "user-server"
    vm1.vm.network "private_network", ip: "10.10.10.11"
    vm1.vm.provider "virtualbox" do |vb|
      vb.name = "vm1"
      vb.memory = 1024
      vb.cpus = 2
    end
    vm1.vm.provision "shell", inline: <<-SHELL
      echo "Provisioning started"
      apt update -y
      apt install -y nodejs npm
      apt install -y jenkins
      node -v
      npm -v
    SHELL

  end

  # VM 2
  config.vm.define "task_server" do |vm2|
    vm2.vm.hostname = "task-server"
    vm2.vm.network "private_network", ip: "10.10.10.12"
    vm2.vm.provider "virtualbox" do |vb|
      vb.name = "vm2"
      vb.memory = 1024
      vb.cpus = 2
    end
    vm2.vm.provision "shell", inline: <<-SHELL
      echo "Provisioning started"
      apt update -y
      apt install -y nodejs npm
      apt install -y jenkins
      node -v
      npm -v
    SHELL

  end

  # VM 3
  config.vm.define "notification_server" do |vm3|
    vm3.vm.hostname = "notification-server"
    vm3.vm.network "private_network", ip: "10.10.10.13"
    vm3.vm.provider "virtualbox" do |vb|
      vb.name = "vm3"
      vb.memory = 1024
      vb.cpus = 2
    end
    vm3.vm.provision "shell", inline: <<-SHELL
      echo "Provisioning started"
      apt update -y
      apt install -y nodejs npm
      apt install -y jenkins
      node -v
      npm -v
    SHELL

  end
  config.vm.define "frontend_server" do |vm4|
    vm4.vm.hostname = "frontend-server"
    vm4.vm.network "private_network", ip: "10.10.10.14"
    vm4.vm.provider "virtualbox" do |vb|
      vb.name = "vm4"
      vb.memory = 1024
      vb.cpus = 2
    end
    vm4.vm.provision "shell", inline: <<-SHELL
      echo "Provisioning started"
      apt update -y
      apt install -y nodejs npm
      apt install -y jenkins
      node -v
      npm -v
    SHELL

  end
  config.vm.define "Jenkins_Master" do |vm5|
    vm5.vm.hostname = "jenkins-master"
    vm5.vm.network "private_network", ip: "10.10.10.10"
    vm5.vm.provider "virtualbox" do |vb|
      vb.name = "vm5"
      vb.memory = 1024
      vb.cpus = 2
    end
    vm5.vm.provision "shell", inline: <<-SHELL
      echo "Provisioning started"
      apt update -y
      apt install -y nodejs npm
      apt install -y jenkins
      node -v
      npm -v
    SHELL

  end
end
