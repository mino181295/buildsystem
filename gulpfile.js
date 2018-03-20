var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

var browserSync = require("browser-sync").create();

gulp.task('html', function () {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('app/'));
    gulp.start('reload');
});

gulp.task('javascript', function () {
    gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/js'));
    gulp.start('reload');
});

gulp.task('less', function () {
    gulp.src('src/less/**/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/css'));
    gulp.start('reload');
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './app/'
        }
    })
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('import', function() {
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('app/css'));
    gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest('app/js'));
    gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('app/js'));
})

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/js/**/*.js', ['javascript']);
    gulp.watch('src/less/**/*.less', ['less']);
});

gulp.task('default', ['import', 'html', 'javascript', 'less', 'browser-sync', 'watch']);