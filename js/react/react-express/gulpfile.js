var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack-build');
var path = require('path');
var del = require('del');
var sass = require('gulp-sass');
var webpackConfigPath = './webpack.config.js';
var autoprefixer = require('gulp-autoprefixer');


gulp.task('default', ['clean', 'nodemon:app','build-cli-dev', 'sass', 'watch']);

gulp.task('clean', function (cb) {
    del(['build'], cb);
});

gulp.task('nodemon:app', ['clean'], function () {
    nodemon({
      script: './start.js',
      ignore: ['build/**'],
      ext: 'js'
    });
});

gulp.task('webpack:dev', ['clean'], function() {
    gulp.src(path.resolve(webpackConfigPath))
        .pipe(webpack.run());
});

gulp.task('sass', function () {
  gulp.src('style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('style/css'));
});

gulp.task('watch', function() {
  gulp.watch(['stores/**/*.js', 'components/**/*.js', 'pages/**/*.js', 'actions/**/*.js',
    'services/**/*.js', 'utils/**/*.js'], ['webpack:dev']);
  gulp.watch('style/**/*.scss',['sass']);

});



gulp.task('build-cli-dev', ['webpack:dev'], function() {
});
