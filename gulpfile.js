const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

const cssFiles = [
    './src/css/main.css',
    './src/css/media.css'
];

function styles() {
    return gulp.src(cssFiles)
        .pipe(concat('style.css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('images', images);
gulp.task('build', gulp.parallel(images, styles));
gulp.task('start', gulp.series('build','watch'));