pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        EC2_USER = 'ubuntu'
        SSH_KEY = credentials('ssh-key-ec2')
        PORT = credentials('port')
        SECRET_KEY = credentials('secret-key')
        NUMBER_SALTS = credentials('number-salts')
        DB_HOST = credentials('db_host')
        DB_USER = credentials('db_user')
        DB_PASSWORD = credentials('db_password')
        DB_NAME = credentials("db_name")
        DEV_IP = '52.1.107.36'
        QA_IP  = '3.211.128.84'
        PROD_IP = '3.95.45.237'
        REMOTE_PATH = '/home/ubuntu/service-auth'
    }

    stages {
        stage('Detect Branch') {
            steps {
                script {
                    env.ACTUAL_BRANCH = env.GIT_BRANCH?.replaceFirst(/^origin\//, '') ?: 'master'
                    echo "🔍 Rama activa: ${env.ACTUAL_BRANCH}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def ip = env.ACTUAL_BRANCH == 'develop' ? DEV_IP :
                             env.ACTUAL_BRANCH == 'qa'      ? QA_IP :
                             env.ACTUAL_BRANCH == 'master'    ? PROD_IP : null

                    def pm2_name = "${env.ACTUAL_BRANCH}-health"

                    if (ip == null) {
                        error "Branch ${env.ACTUAL_BRANCH} no está configurada para despliegue."
                    }

                    sh """
                    ssh -i $SSH_KEY -o StrictHostKeyChecking=no $EC2_USER@$ip '
                        echo "📦 Actualizando sistema..."
                        sudo apt-get update -y &&
                        sudo apt-get upgrade -y

                        echo "📥 Verificando Node.js..."
                        if ! command -v node > /dev/null; then
                            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
                            sudo apt-get install -y nodejs
                        fi

                        echo "📥 Verificando PM2..."
                        if ! command -v pm2 > /dev/null; then
                            sudo npm install -g pm2
                        fi

                        echo "📁 Verificando carpeta de app..."
                        if [ ! -d "$REMOTE_PATH/.git" ]; then
                            git clone https://github.com/AlbertoSMC72/GeradorTokens.git $REMOTE_PATH
                        fi

                        echo "Creado credenciales .env..."
                        if [ ! -f "$REMOTE_PATH/.env" ]; then
                            echo "URL_DB=$DB_URL" > $REMOTE_PATH/.env
                            echo "SECRET_JWT=$SECRET_KEY" >> $REMOTE_PATH/.env
                        fi

                        echo "🔁 Pull y deploy..."
                        cd $REMOTE_PATH &&
                        git pull origin ${env.ACTUAL_BRANCH} &&
                        npm ci &&
                        pm2 restart ${pm2_name} || pm2 start app.js --name ${pm2_name}
                    '
                    """
                }
            }
        }
    }
}