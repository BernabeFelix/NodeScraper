module.exports = function (grunt) {

  grunt.initConfig({
    // JS TASKS ================================================================
    // check all js files for errors
    jshint: {
      all: ['public/src/js/**/*.js']
    },

    // configure nodemon
    nodemon: {
      dev: {
        script: 'server.js'
      }
    }
  });

  // load nodemon
  grunt.loadNpmTasks('grunt-nodemon');

  // register the nodemon task when we run grunt
  grunt.registerTask('default', ['nodemon']);
};