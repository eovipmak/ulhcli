pipeline {
  agent {
    label 'docker'
  }
  environment {
    NETWORK_NAME = 'my_network'
    MYSQL_CONTAINER = 'mysql'
    WORDPRESS_CONTAINER = 'wordpress'
    NGINX_CONTAINER = 'nginx'
  }
  stages {
    stage('Create Network') {
      steps {
        echo 'Creating user-defined bridge network...'
        script {
          try {
            sh "docker network create ${NETWORK_NAME}"
          } catch (Exception e) {
            echo "Network creation failed: ${e}"
            error "Stopping pipeline due to network creation failure."
          }
        }
      }
    }
    stage('Setup MySQL Container') {
      steps {
        echo 'Setting up MySQL container...'
        script {
          try {
            sh """
              docker run --name ${MYSQL_CONTAINER} --network ${NETWORK_NAME} -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=wordpress -e MYSQL_USER=wpuser -e MYSQL_PASSWORD=password -v mysql_data:/var/lib/mysql -d mysql:5.7
            """
          } catch (Exception e) {
            echo "MySQL container setup failed: ${e}"
            error "Stopping pipeline due to MySQL container setup failure."
          }
        }
      }
    }
    stage('Setup WordPress Container') {
      steps {
        echo 'Setting up WordPress container...'
        script {
          try {
            sh """
              docker run --name ${WORDPRESS_CONTAINER} --network ${NETWORK_NAME} -e WORDPRESS_DB_HOST=${MYSQL_CONTAINER}:3306 -e WORDPRESS_DB_USER=wpuser -e WORDPRESS_DB_PASSWORD=password -e WORDPRESS_DB_NAME=wordpress -v wordpress_data:/var/www/html -d wordpress:latest
            """
          } catch (Exception e) {
            echo "WordPress container setup failed: ${e}"
            error "Stopping pipeline due to WordPress container setup failure."
          }
        }
      }
    }
    stage('Setup Nginx Container') {
      steps {
      echo 'Setting up Nginx container...'
      script {
        try {
        sh '''
          cat <<EOF > /tmp/wordpress.conf
          server {
          listen 80;
          server_name localhost;

          root /usr/share/nginx/html/wordpress;
          index index.php index.html index.htm;

          try_files $uri $uri/ /index.php?$args;
          try_files "$uri" "$uri/" /index.php?$args;

          include fastcgi_params;
          fastcgi_pass wordpress:80;
          fastcgi_index index.php;
          fastcgi_param SCRIPT_FILENAME "$document_root$fastcgi_script_name";
            
          location ~ /\\.ht {
            deny all;
          }
          }
          EOF
        '''
        sh "docker run --name ${NGINX_CONTAINER} --network ${NETWORK_NAME} -v /tmp/wordpress.conf:/etc/nginx/conf.d/default.conf:ro -d nginx:latest"
        sh "sleep 10 && docker exec ${NGINX_CONTAINER} nginx -t && docker exec ${NGINX_CONTAINER} nginx -s reload"
        } catch (Exception e) {
        echo "Nginx container setup failed: ${e}"
        error "Stopping pipeline due to Nginx container setup failure."
        }
      }
      }
    }
  }
  post {
    always {
      echo 'Cleaning up resources...'
      sh "docker rm -f ${MYSQL_CONTAINER} ${WORDPRESS_CONTAINER} ${NGINX_CONTAINER} || true"
      sh "docker network rm ${NETWORK_NAME} || true"
    }
    success {
      mail (
      to: 'tt7887418@gmail.com',
      subject: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' succeeded.</p><p>Check console output at <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>""",
      mimeType: 'text/html'
      )
    }
    failure {
      mail (
      to: 'tt7887418@gmail.com',
      subject: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed.</p><p>Check console output at <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>""",
      mimeType: 'text/html'
      )
    }
  }
}
