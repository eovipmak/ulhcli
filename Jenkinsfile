pipeline {
  agent {
    docker {
      image 'debian:bookworm-slim'
    }
  }
  stages {
    stage('Start') {
      steps {
        dir(path: '/root') {
          sh 'echo "Running inside /root directory"'
        }
      }
    }
    stage('Setup MySQL') {
      steps {
        sh '''
          docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=wordpress -e MYSQL_USER=wpuser -e MYSQL_PASSWORD=password -d mysql:5.7
        '''
      }
    }
    stage('Setup Nginx and WordPress') {
      steps {
        sh '''
          docker run --name wordpress --link mysql:mysql -e WORDPRESS_DB_HOST=mysql:3306 -e WORDPRESS_DB_USER=wpuser -e WORDPRESS_DB_PASSWORD=password -e WORDPRESS_DB_NAME=wordpress -d wordpress:latest
          docker run --name nginx --link wordpress:wordpress -v /var/www/html:/usr/share/nginx/html -v /etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro -p 80:80 -d nginx:latest
        '''
      }
    }
    stage('Configure Nginx for WordPress') {
      steps {
        sh '''
          docker exec nginx bash -c 'cat <<EOF > /etc/nginx/conf.d/wordpress.conf
          server {
            listen 80;
            server_name localhost;

            root /usr/share/nginx/html/wordpress;
            index index.php index.html index.htm;

            location / {
              try_files $uri $uri/ /index.php?$args;
            }

            location ~ \\\\.php\\$ {
              include fastcgi_params;
              fastcgi_pass wordpress:9000;
              fastcgi_index index.php;
              fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            }

            location ~ /\\.ht {
              deny all;
            }
          }
          EOF'
          docker exec nginx nginx -s reload
        '''
      }
    }
  }
}
