var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	csso = require('gulp-csso'),
	rename = require('gulp-rename'),
	jade = require('gulp-jade'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	notify = require('gulp-notify'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	gulpif = require('gulp-if'),
	wiredep = require('gulp-wiredep'),
	useref = require('gulp-useref'),
	ftp = require('vinyl-ftp');

gulp.task('ftp', function () {

    var conn = ftp.create({
        host: 'rock.all4site.com.ua',
        user: 'xalkall4site',
        password: 'Kjpjdcrbq1',
        parallel: 10,
    });

    var globs = [
        'dist/**',
        
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src(globs, { base: './dist/', buffer: false })
        .pipe(conn.newer('/www/all4site.com.ua')) // only upload newer files
        .pipe(conn.dest('/www/all4site.com.ua'));

});

gulp.task('build', ['clean', 'img', 'jadebuild', 'test'], function () {
	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))
	var buildFonts = gulp.src('app/js/xalk-font-awesome/fonts/*')
		.pipe(gulp.dest('dist/fonts/'))
		return gulp.src('app/mail/mail.php')
		.pipe(gulp.dest('dist/mail'))
		return gulp.src('app/collback.html')
		.pipe(gulp.dest('dist'))
});

gulp.task('test', function(){
			return gulp.src(['app/*.html','!app/index.html'])
		.pipe(gulp.dest('dist'))
	});

gulp.task('jadebuild', function () {
	return gulp.src('app/index.jade')
		.pipe(jade({
			pretty: true
		}))
		.on('error', notify.onError({
			message: "<%= error.message %>",
			title: "Jade Error!"
		}))
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', csso()))
		.pipe(gulp.dest('dist'))
});

gulp.task('clean', function () {
	return del.sync('dist');
});

gulp.task('img', function () {
	return gulp.src('app/img/**/*')
		.pipe(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('sass', function () {
	return gulp.src('app/sass/main.min.sass')
		.pipe(sass.sync())
		.on('error', notify.onError({
			message: "<%= error.message %>",
			title: "Sass Error!"
		}))
		.pipe(autoprefixer(['last 2 versions', '> 1%', 'ie 8'], {
			cascade: true
		}))
		.pipe(gulp.dest('app/css/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('jade', function () {
	gulp.src('app/index.jade')
		.pipe(jade({
			pretty: true
		}))
		.on('error', notify.onError({
			message: "<%= error.message %>",
			title: "Jade Error!"
		}))
		.pipe(gulp.dest('app'))
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('bower', function () {
	gulp.src('app/index.jade')
		.pipe(wiredep({
			diewctory: 'app/js'
		}))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({
			stream: true
		}))
})

gulp.task('default', ['browser-sync', 'jade','bower'], function () {
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/*.jade', ['jade']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/**/*.css', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
	gulp.watch('bower.json', ['bower']);
});