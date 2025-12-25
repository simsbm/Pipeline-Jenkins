pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-credentials')
        IMAGE_NAME = "devcker18/jenkins-tp-app"
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
        // Remplacez votre stage Push par celui-ci pour plus de robustesse :
stage('Push to Docker Hub') {
    steps {
        script {
            withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                sh "echo $PASS | docker login -u $USER --password-stdin"
                sh "docker push devcker18/jenkins-tp-app:1"
            }
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
