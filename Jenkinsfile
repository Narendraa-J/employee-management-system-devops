pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'cd backend && npm install'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Start Application') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Initialize Database') {
            steps {
                sh '''
                    docker compose exec -T mysql mysql -uroot -proot123 -e "
                    CREATE DATABASE IF NOT EXISTS employee_db;
                    USE employee_db;

                    CREATE TABLE IF NOT EXISTS employees (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        department VARCHAR(100) NOT NULL
                    );
                    "
                '''
            }
        }

        stage('API Test') {
            steps {
                sh '''
                    docker compose exec -T backend npm test || {
                        echo "===== BACKEND LOGS ====="
                        docker compose logs backend --tail=100

                        echo "===== MYSQL LOGS ====="
                        docker compose logs mysql --tail=100

                        exit 1
                    }
                '''
            }
        }
    }

    post {
        always {
            sh 'docker compose down -v'
        }

        success {
            echo 'CI Pipeline completed successfully!'
        }

        failure {
            echo 'CI Pipeline failed!'
        }
    }
}