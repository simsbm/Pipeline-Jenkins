pipeline {
    agent any
    environment {
        // On définit le nom de l'image une seule fois
        DOCKER_IMAGE = "devcker18/jenkins-tp-app:${env.BUILD_NUMBER}"
    }
    stages {
        // ... (Clonage)
        
        stage('Build Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }
        
        stage('Test App') {
            steps {
                sh "docker run --rm ${DOCKER_IMAGE} npm test"
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                        sh 'echo $PASS | docker login -u $USER --password-stdin'
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    sh "docker stop staging-app || true"
                    sh "docker rm staging-app || true"
                    sh "docker run -d -p 3005:3000 --name staging-app ${DOCKER_IMAGE}"
                }
            }
        }
    }
}
