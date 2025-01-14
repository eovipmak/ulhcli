pipeline {
  agent {
    docker {
      image 'debian:bookworm-slim'
    }
  }
  stages {
    stage('Create Network') {
      steps {
        echo 'Creating user-defined bridge network...'
        sh 'docker network create my_network'
      }
    }
    stage('Setup MySQL Container') {
      steps {
        echo 'Setting up MySQL container...'
        sh '''
          docker run --name mysql --network my_network -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=wordpress -e MYSQL_USER=wpuser -e MYSQL_PASSWORD=password -v mysql_data:/var/lib/mysql -d mysql:5.7
        '''
      }
    }
    stage('Setup WordPress Container') {
      steps {
        echo 'Setting up WordPress container...'
        sh '''
          docker run --name wordpress --network my_network -e WORDPRESS_DB_HOST=mysql:3306 -e WORDPRESS_DB_USER=wpuser -e WORDPRESS_DB_PASSWORD=password -e WORDPRESS_DB_NAME=wordpress -v wordpress_data:/var/www/html -d wordpress:latest
        '''
      }
    }
    stage('Setup Nginx Container') {
      steps {
        echo 'Setting up Nginx container...'
        sh '''
          docker run --name nginx --network my_network -v wordpress_data:/usr/share/nginx/html -v /etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro -p 80:80 -d nginx:latest
        '''
        echo 'Creating Nginx configuration file...'
        sh '''
          cat <<EOF > /tmp/wordpress.conf
          server {
            listen 80;
            server_name localhost;

            root /usr/share/nginx/html/wordpress;
            index index.php index.html index.htm;

            location / {
              try_files "$uri" "$uri/" /index.php?$args;
            }

            location ~ \\.php$ {
              include fastcgi_params;
              fastcgi_pass wordpress:80;
              fastcgi_index index.php;
              fastcgi_param SCRIPT_FILENAME "$document_root$fastcgi_script_name";
            }

            location ~ /\\.ht {
              deny all;
            }
          }
          EOF
        '''
        sh 'docker cp /tmp/wordpress.conf nginx:/etc/nginx/conf.d/'
        sh 'docker exec nginx nginx -t && docker exec nginx nginx -s reload'
      }
    }
  }
  post {
    success {
      emailext (
        to: 'tt7887418@gmail.com',
        subject: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
        body: """<p>Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' succeeded.</p><p>Check console output at <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>""",
        mimeType: 'text/html'
      )
    }
    failure {
      emailext (
        to: 'tt7887418@gmail.com',
        subject: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
        body: """<p>Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed.</p><p>Check console output at <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>""",
        mimeType: 'text/html'
      )
    }
  }
}
