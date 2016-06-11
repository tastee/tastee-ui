'use strict';

const gulp = require('gulp');
const electron = require('electron-connect').server.create();
const webpack = require("webpack");
const gutil = require("gulp-util");
const webpackConfig = require("./webpack.config.js");
const jest = require('jest-cli');
const jestConfig = require('./jest.config.js')
const codacy = require('gulp-codacy');

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

gulp.task('codacy', function sendToCodacy() {
  return gulp
    .src(['coverage/lcov.info'])
    .pipe(codacy({
      token: '3b1715aad08a4c4b95b3643b1652447f'
    }));
});

gulp.task('serv', ['webpack', 'watch']);
gulp.task('default', ['webpack','test','codacy']);
