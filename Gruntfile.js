/* globals module, require */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    sass: {
      global: {
        options: {
          style: "compressed"
        },
        files: {
          "css/global-unprefixed.css": "scss/global.scss"
        }
      }
    },

    autoprefixer: {
      global: {
        src: "css/global-unprefixed.css",
        dest: "css/global.css"
      }
    },

    shell: {
      jekyllServe: {
        command: "jekyll serve --baseurl=http://localhost:4000"
      },
      jekyllBuild: {
        command: "jekyll build --baseurl=http://localhost:4000"
      }
    },

    watch: {
      options: {
        livereload: true
      },
      site: {
        files: ["index.html", "_layouts/*.html", "_posts/*.md", "_projects/*.md"],
        tasks: ["shell:jekyllBuild"]
      },
      css: {
        files: ["scss/*.scss"],
        tasks: ["sass", "autoprefixer", "shell:jekyllBuild"]
      },
      svg: {
        files: ["svg/*.svg"],
        tasks: ["svgstore", "shell:jekyllBuild"]
      }
    },

    svgstore: {
      options: {
        prefix : "shape-",
        cleanup: false,
        svg: {
          style: "display: none;"
        }
      },
      default: {
        files: {
          "_includes/svg-defs.svg": ["svg/*.svg"]
        }
      }
    }

  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("default", ["sass", "autoprefixer", "svgstore", "shell:jekyllBuild", "watch"]);

};
