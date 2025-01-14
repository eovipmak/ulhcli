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
          // Add steps to execute within the directory
          sh 'echo "Running inside /root directory"'
        }
      }
    }

  }
}