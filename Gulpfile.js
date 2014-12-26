var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	run = require('gulp-run'),
	livereload = require('gulp-livereload'),
	browserify = require('browserify'),
	transform = require('vinyl-transform');

gulp.task('sass', function() {
	gulp.src('./styles/scss/main.scss')
		.pipe(sass())
		.pipe(gulp.dest('./public'));
});

gulp.task('browserify', function() {
	var browserified = transform(function(filename) {
		var b = browserify(filename, {debug: true});

		return b.bundle();
	});

	gulp.src('./scripts/bundle.js')
		.pipe(browserified)
		.pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
	gulp.watch('./styles/scss/**/*.scss', ['sass']).on('change', livereload.changed);
	gulp.watch('./scripts/**/*.js', ['browserify']).on('change', livereload.changed);

	livereload.listen();
});
