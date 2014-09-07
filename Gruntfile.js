"use strict";

var minifyify = require('minifyify');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration.
    jshint: {
      files: ['Gruntfile.js',
              './app/app.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    browserify: {
      release: {
        files: { './dist/bundle.min.js':[ './app/app.js' ]},
		options: { 
		  browserifyOptions: { debug: true },
          preBundleCB: function (b) {
            b.plugin( minifyify,
              { output: './dist/bundle.map',
                map:'bundle.map'
              });
          }
        }		  
	  }
    }	
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask("default",["jshint","browserify:release"]);

};