pipeline {
    agent any

    environment {
        // Remplacez par votre nom d'utilisateur Docker Hub
        DOCKER_IMAGE = 'devcker18/tp4-app'
        registryCredential = 'docker-hub-credentials'
    }

    stages {
        stage('Clone') {
            steps {
                // Le clone est automatique si configuré dans le Job, 
                // mais on peut le forcer ici si besoin.
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build(DOCKER_IMAGE + ":$BUILD_NUMBER")
                }
            }
        }

        stage('Test App') {
            steps {
                // On lance un test simple dans le conteneur
                sh 'npm test' 
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                sh '''
                # Arrêter l'ancien conteneur s'il existe
                docker stop tp4-staging || true
                docker rm tp4-staging || true
                
                # Lancer le nouveau conteneur
                docker run -d -p 3000:3000 --name tp4-staging ${DOCKER_IMAGE}:${BUILD_NUMBER}
                '''
            }
        }
    }
    
    // Étape 11 : Notifications
    post {
        always {
            echo 'Pipeline terminé.'
        }
        success {
            echo 'Succès ! Application déployée.'
            // Exemple email (nécessite configuration SMTP) :
            // mail to: 'admin@example.com', subject: 'Succès Pipeline', body: "Le build ${BUILD_NUMBER} a réussi."
        }
        failure {
            echo 'Échec du pipeline.'
        }
    }
}
