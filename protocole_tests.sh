#!/bin/bash

sudo service apache2 stop
docker stop -t 0 nextcloud database

echo "Start container MYSQL"
docker run -d --rm --network next --name database -p 3306:3306 -e MYSQL_DATABASE=nextcloud -e MARIADB_ROOT_PASSWORD=nextcloud -e MYSQL_USER=nextcloud -e MYSQL_PASSWORD=nextcloud mariadb
# docker run -d --rm --network next --name database -p 5432:5432 -e POSTGRES_DB=nextcloud -e POSTGRES_PASSWORD=nextcloud -e POSTGRES_USER=nextcloud postgres

sleep 5
echo "Start nextcloud"
docker run -d --rm --network next --name nextcloud -p 80:80 nextcloud:23-apache

echo "Installation"
docker exec -it nextcloud bash -c "apt update ; apt install -y git make nodejs npm firefox-esr unzip"
#docker exec -it nextcloud bash -c "cd /tmp; wget https://github.com/mozilla/geckodriver/releases/download/v0.30.0/geckodriver-v0.30.0-linux64.tar.gz ; tar xvzf geckodriver-v0.30.0-linux64.tar.gz -C /tmp/ ;  chown -R root:root /tmp/geckodriver* ; mv /tmp/geckodriver* /opt/ ; ln -s /opt/geckodriver/geckodriver /usr/local/bin/geckodriver"

docker exec -it nextcloud bash -c "git clone https://github.com/baimard/gestion.git /var/www/html/apps/gestion ; cd /var/www/html/apps/gestion ; git checkout dev-2.0.9 ; chown www-data:root -R /var/www/html/apps/gestion"
docker exec -u www-data -it nextcloud bash -c "cd apps/gestion ; make npm-init ; make composer;"

echo "Initialisation de la base de données"
docker exec -u www-data -it nextcloud bash -c "cd apps/gestion ; php tests/Unit/Panther/initMysqlTest.php"
# docker exec -u www-data -it nextcloud bash -c "cd apps/gestion ; php tests/Unit/Panther/initPgsqlTest.php"

sleep 10

echo "Tests installation app"
docker exec -u www-data -it nextcloud bash -c "cd apps/gestion ; php tests/Unit/Panther/initAppTest.php"

# sleep 10

echo "Chargement de la base de données"
docker exec -i database sh -c 'exec mysql -uroot -p"$MARIADB_ROOT_PASSWORD" nextcloud' < ./tests/dataset.sql
# docker exec -i database /bin/bash -c 'PGPASSWORD=$POSTGRES_PASSWORD psql --username $POSTGRES_USER $POSTGRES_DB' < ./tests/datasetpgsql.sql

docker exec -u www-data -it nextcloud bash -c "cd apps/gestion ; make testPanther"

docker exec -u www-data -it nextcloud bash -c "cd apps/gestion ; make test"

docker cp nextcloud:/var/www/html/apps/gestion/tests/Unit/Panther/screens tests/Unit/Panther/screens
