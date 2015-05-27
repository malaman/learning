module.exports = function(grunt) {


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    


    protractor: {
      options: {
        keepAlive: true,
        configFile: "protractor.conf.js",
        defaultTimeoutInterval: 3600000000,
        args: {
          params: {
            user: grunt.option("user") || "some_user",
            password: grunt.option("password") || "some_password",
            host: grunt.option("host") || "example.com", 
          }
        }
      },
      run: {}
    },
    shell: {
        options: {
            stderr: false
        },
        target: {
            command: 'node_modules/protractor/bin/webdriver-manager update'
        }
    }
  });


  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-shell');


  grunt.registerTask('default', ['shell', 'protractor:run']);

};
