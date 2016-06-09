'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();
var webpack = require("webpack");
var gutil = require("gulp-util");

var webpackConfig = require("./webpack.config.js");
var jest = require('jest-cli');

var jestConfig = require('./jest.config.js')

gulp.task("webpack", function (callback) {
  var myConfig = Object.create(webpackConfig);

  webpack(myConfig, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString());
    callback();
  });

});


gulp.task('test', function (done) {
  jest.runCLI({ config: jestConfig }, ".", function () {
    done();
  });
});

gulp.task('tdd', function (done) {
  gulp.watch(["app/**/*.jsx"], ['test']);
});

gulp.task('watch', function () {
  gulp.watch(['app/**', 'assets/less/**', 'index.html', 'main.js'], ['webpack']);
  electron.start();
});

gulp.task('serv', ['webpack', 'watch']);
