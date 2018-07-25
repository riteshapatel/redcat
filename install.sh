#/bin/sh

###################################################################################
# script to install php and dependencies 
# @author ritesh.patel
# @email ritesh@tocotou.com
###################################################################################
service httpd stop
sleep 5s

yum remove -y httpd* php*
sleep 5s

# Install Apache 2.4
yum install -y httpd24

# Install PHP 7.1 
# automatically includes php71-cli php71-common php71-json php71-process php71-xml
yum install -y php71

# Install additional commonly used php packages
yum install -y php71-gd
yum install -y php71-imap
yum install -y php71-mbstring
yum install -y php71-mysqlnd
yum install -y php71-opcache
yum install -y php71-pdo
yum install -y php71-pecl-apcu
yum install -y php71-intl
yum install -y php71-mcrypt
yum install -y php71-oauth
yum install -y php71-xml
yum install -y php71-gettext

# modify config directory index for php
sed -i 's/DirectoryIndex index.html/DirectoryIndex index.php index.html/' /etc/httpd/conf/httpd.conf

# create a default php page
echo '<?php echo "hello alecia" ?>' | tee --append /var/www/html/index.php

# create php info page
echo '<?php print phpinfo();' | tee --append /var/www/html/phpinfo.php

# install php pear / pecl for mongodb setup
sudo yum -y install php7-pear
sudo yum -y install php71-devel.x86_64
sudo yum -y install gcc
sudo yum install -y mod24_ssl

# install mongodb
sudo pecl7 install mongodb

# modify php ini file with mongodb extension
echo "extension=mongodb.so" >> `php --ini | grep "Loaded Configuration" | sed -e "s|.*:\s*||"`

# install composer 
sudo curl -sS https://getcomposer.org/installer | sudo php
sudo mv composer.phar /usr/local/bin/composer
sudo ln -s /usr/local/bin/composer /usr/bin/composer

# start apache
service httpd start

# configure apache to turn on reboot
chkconfig httpd on
