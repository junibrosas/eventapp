var gulp = require('gulp'),
	cssnano = require('gulp-cssnano'),
	concat = require('gulp-concat'),
	browserSync = require('browser-sync').create();

gulp.task('default', [
	'minify-css',
	//'browser-sync'
]);

gulp.task('minify-css', function() {
	return gulp.src([
			'./source/styles/bootstrap.css',
			'./source/styles/style.css',
			'./source/styles/default.css',
		])
		.pipe(concat('all.css'))
		.pipe(cssnano())
		.pipe(gulp.dest('./public/css/'));
});

gulp.task('browser-sync', function () {
	// Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on("change", browserSync.reload );
});