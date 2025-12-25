pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-credentials')
        IMAGE_NAME = "votre-user-dockerhub/jenkins-tp-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Clone Repository') {
            steps {
                // Le clone est automatique avec un pipeline SCM, 
                // mais on peut le forcer ou l'afficher
                checkout scm
            }
        }
        
        stage('Build Image') {
            steps {
                script {
                    sh "docker build -t $IMAGE_NAME:$IMAGE_TAG ."
                }
            }
        }
        
        stage('Test App') {
            steps {
                // Lancer un conteneur temporaire pour tester
                sh "docker run --rm $IMAGE_NAME:$IMAGE_TAG npm test"
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    sh "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin"
                    sh "docker push $IMAGE_NAME:$IMAGE_TAG"
                }
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                script {
                    // Nettoyage de l'ancien conteneur s'il existe
                    sh "docker stop staging-app || true"
                    sh "docker rm staging-app || true"
                    // Déploiement du nouveau
                    sh "docker run -d -p 3005:3000 --name staging-app $IMAGE_NAME:$IMAGE_TAG"
                }
            }
        }
    }
}
