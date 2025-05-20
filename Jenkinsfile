pipeline {
    agent any

    environment {
        EC2_USER = 'ubuntu'
        SSH_KEY = credentials('ssh-key-ec2-auth')
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
                    def ip = env.ACTUAL_BRANCH == 'dev' ? DEV_IP :
                             env.ACTUAL_BRANCH == 'qa'      ? QA_IP :
                             env.ACTUAL_BRANCH == 'main'    ? PROD_IP : null

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

                        echo "📥 Verificando TypeScript y ts-node..."
                        if ! command -v tsc > /dev/null; then
                            sudo npm install -g typescript
                        fi
                        if ! command -v ts-node > /dev/null; then
                            sudo npm install -g ts-node
                        fi

                        echo "📁 Verificando carpeta de app..."
                        if [ ! -d "$REMOTE_PATH/.git" ]; then
                            git clone https://github.com/diegobejar1011/service-auth.git $REMOTE_PATH
                        fi

                        echo "Creando archivo .env..."
                        if [ ! -f "$REMOTE_PATH/.env" ]; then
                            cat > $REMOTE_PATH/.env << "EOL"
# PORT 
PORT=${PORT}
# Auth  
JWT_SECRET_KEY=${SECRET_KEY}
# Bcrypt 
NUMBER_SALTS=${NUMBER_SALTS}
# DB credentials 
DB_HOST=${DB_HOST}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DB_NAME=${DB_NAME}
EOL
                            echo "Archivo .env creado exitosamente."
                        else
                            echo "El archivo .env ya existe. No se ha sobrescrito."
                        fi

                        echo "🔁 Pull y deploy..."
                        cd $REMOTE_PATH &&
                        git pull origin ${env.ACTUAL_BRANCH} &&
                        npm ci &&
                        pm2 restart ${pm2_name} || pm2 start app.ts --name ${pm2_name} --interpreter ts-node-esm
                    '
                    """
                }
            }
        }
    }
}
