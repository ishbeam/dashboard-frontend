var gulp = require('gulp'),
	pkg = require('./package.json'),
	autoprefixer = require('gulp-autoprefixer'),
	less = require('gulp-less'),
	cssmin = require('gulp-cssmin'),
	uglify = require('gulp-uglify');
sequence = require('run-sequence'),

	// gulp.task('default', function () {
	//     return gulp.src('src/app.css')
	//         .pipe(autoprefixer({
	//             browsers: ['last 2 versions'],
	//             cascade: false
	//         }))
	//         .pipe(gulp.dest('dist'));
	// });

	gulp.task('less', function() {
		return gulp.src('./src/less/main.less')
			.pipe(less({
				paths: ['./src/less']
			}))
			.pipe(autoprefixer())
			.pipe(gulp.dest('./src/css'));
	});

gulp.task('cssmin', function() {
	return gulp.src('./src/css/main.css')
		.pipe(cssmin())
		.pipe(gulp.dest('./src/css'))
});

gulp.task('css', function() {
	sequence('less', 'cssmin');
});

gulp.task('watch', function() {
	gulp.watch('./src/less/**/*.less', function() {
		return gulp.src('./src/less/main.less')
			.pipe(less({
				paths: ['./src/less']
			}))
			.pipe(autoprefixer())
			.pipe(gulp.dest('./src/css'));
	});
});

// This was the OG watch function
// gulp.task('watch', ['css'])