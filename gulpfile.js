// =========================
// Modules
// =========================

var gulp 				= require('gulp'),
		stylus 			= require('gulp-stylus'),
		poststylus	= require('poststylus'),
		cssmin			= require('gulp-cssmin'),
		prefixer 		= require('autoprefixer-stylus'),
		plumber			= require('gulp-plumber'),
		rupture			= require('rupture'),
		koutoSwiss 	= require('kouto-swiss')
		uglify 			= require('gulp-uglify'),
		concat			= require('gulp-concat'),
		imagemin		= require('gulp-imagemin'),
		pngquant		= require('imagemin-pngquant'),
		gcmq 				= require('gulp-group-css-media-queries'),
		rename			= require('gulp-rename'),
		browserSync = require('browser-sync');

// Directories
path = {
	dev		: 'app/src',
	prod	: 'app/assets'
}

// =========================
// Tasks
// =========================

// Call Browser-Sync
gulp.task('browser-sync', function() {
	browserSync.init(['app/assets/styles/*.css', 'app/assets/scripts/*.js', 'app/*.html'], {
		notify: {
			styles: {
				top: 'auto',
				bottom: '0'
			}
		},
		server: {
			 baseDir: 'app'
		}
	})
});

// Call Stylus
gulp.task('stylus', function() {
	gulp.src( path.dev + '/stylus/main.styl')
		.pipe(plumber())
		.pipe(stylus({
			use:[prefixer(), rupture(), koutoSwiss(), poststylus('lost')]
		}))
		.pipe(gcmq())
		.pipe(gulp.dest(path.prod + '/styles'));
});

// Call CSS minify
gulp.task('css-min', function() {
	gulp.src( path.prod + '/styles/main.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.prod + '/styles'));
});

// Call javascript uglify and concat
gulp.task('js', function(){
	return gulp.src(path.dev + '/scripts/**/*.js')
		.pipe(plumber())
		.pipe(concat('main.js'))
		// .pipe(uglify())
		.pipe(gulp.dest(path.prod + '/scripts'))
});

// Call task Imagemin
gulp.task('imagemin', function() {
	return gulp.src(path.dev + '/images/**/*')
		.pipe(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest(path.prod + '/images/'));
});

// Call Watch
gulp.task('watch', ['stylus', 'browser-sync'], function() {
	gulp.watch( path.dev + '/stylus/**/**.styl', ['stylus']);
	gulp.watch( path.dev + '/scripts/**/*.js', ['js']);
	gulp.watch( path.dev + '/images/**/*.{jpg,png,gif}', ['imagemin']);
	gulp.watch('./app/*.html');
	gulp.watch( path.prod + '/styles/main.css', ['css-min'])
});

//Default Task
gulp.task('default', ['js','stylus', 'css-min', 'browser-sync', 'watch']);
