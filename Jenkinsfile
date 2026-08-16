pipeline {
    agent any

    environment {
        API_URL = 'http://host.docker.internal:5001'
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Narendraa-J/employee-management-system-devops.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'cd backend && npm install'
            }
        }

        stage('Start Application') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('API Test') {
            steps {
                sh 'cd backend && npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker compose build'
            }
        }
    }

    post {
        always {
            sh 'docker compose down'
        }

        success {
            echo 'CI Pipeline completed successfully!'
        }

        failure {
            echo 'CI Pipeline failed!'
        }
    }
}