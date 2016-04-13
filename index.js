'use strict';
var path = require('path');
var fs = require('fs');
var through = require('through2');
var gutil = require('gulp-util');
var Promise = require('pinkie-promise');
var cordovaLib = require('cordova-lib').cordova;
var cordova = cordovaLib.raw;

module.exports = function (options) {
	options = options || {};

	return through.obj(function (file, enc, cb) {
		// Change the working directory
		process.env.PWD = file.path;

		// Pipe the file to the next step
		this.push(file);

		cb();
	}, function (cb) {
		var exists = fs.existsSync(path.join(cordovaLib.findProjectRoot(), 'platforms', 'windows'));

		Promise.resolve()
			.then(function () {
				if (options.reAdd) {
					// First remove the platform if we have to re-add it
					return cordova.platforms('rm', 'windows');
				}
			})
			.then(function () {
				if (exists === false || options.reAdd) {
					// Add the iOS platform if it does not exist or we have to re-add it
					return cordova.platforms('add', 'windows' + (options.version ? ('@' + options.version) : ''));
				}
			})
			.then(function () {
				// Build the platform
				return cordova.build({platforms: ['windows']});
			})
			.then(function () {
				cb();
			})
			.catch(function (err) {
				// Return an error if something happened
				cb(new gutil.PluginError('gulp-cordova-build-windows', err.message));
			});
	});
};
