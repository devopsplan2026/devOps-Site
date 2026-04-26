pipeline {
 agent any
 triggers {
   githubPush()
 }
 environment {
   IMAGE = "hello-world"
 }
 stages {
   stage('Checkout') {
     steps {
       git branch: 'main',
           url: 'https://github.com/devopsplan2026/devOps-Site.git'
     }
   }
   stage('Build') {
     steps {
       script {
         def VERSION = sh(script: "date +%Y%m%d%H%M", returnStdout: true).trim()
         env.VERSION = VERSION
       }
       sh "docker build -t $IMAGE:${env.VERSION} ."
     }
   }
   stage('Login & Push') {
     steps {
       withCredentials([usernamePassword(
             credentialsId: 'DOCKERHUB_CRAD',
         usernameVariable: 'DOCKER_USER',
         passwordVariable: 'DOCKER_PASS'
       )]) {
         sh """
         echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
         docker tag $IMAGE:${env.VERSION} \$DOCKER_USER/$IMAGE:${env.VERSION}
         docker push \$DOCKER_USER/$IMAGE:${env.VERSION}
         """
       }
     }
   }
 }
}
