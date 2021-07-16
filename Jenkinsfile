node {
    try {
        def branchname = 'main'
        stage('Clone repository') {
            git([url: 'https://github.com/dileepbapat/sample-opensaber-rc-partner-app', branch: "${branchname}"])
        }

        stage('Build') {
            sh 'npm install'
            sh 'ng build'
            // dist folder will be created
        }

        stage('Deploy') {
            sh 'echo $WORKSPACE'
            sh 'scp -r $WORKSPACE/dist/ kesavan@10.4.0.6:/var/www/html/learn-app'
        }
    }
    catch (err) {
        currentBuild.result = "FAILURE"
        throw err
    }

}
