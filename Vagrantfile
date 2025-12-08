Vagrant.configure("2") do |config|
  # Box de base (Ubuntu ici)
  config.vm.box = "ubuntu/focal64"

  # VM 1
  config.vm.define "user_server" do |vm1|
    vm1.vm.hostname = "user_server"
    vm1.vm.network "private_network", ip: "10.10.10.11"
    vm1.vm.provider "virtualbox" do |vb|
      vb.name = "vm1"
      vb.memory = 1024
      vb.cpus = 2
    end
  end

  # VM 2
  config.vm.define "task_server" do |vm2|
    vm2.vm.hostname = "task_server"
    vm2.vm.network "private_network", ip: "10.10.10.12"
    vm2.vm.provider "virtualbox" do |vb|
      vb.name = "vm2"
      vb.memory = 1024
      vb.cpus = 2
    end
  end

  # VM 3
  config.vm.define "notification_server" do |vm3|
    vm3.vm.hostname = "notification_server"
    vm3.vm.network "private_network", ip: "10.10.10.13"
    vm3.vm.provider "virtualbox" do |vb|
      vb.name = "vm3"
      vb.memory = 1024
      vb.cpus = 2
    end
  end
end

