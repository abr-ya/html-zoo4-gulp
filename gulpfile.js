const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// pug отключаю пока
// gulp.task('pug-compile', () => {
//   return gulp.src([
//     'src/**/*.pug',
//     '!src/components/**/*.pug',
//     '!src/config/**/*.pug',
//     '!src/templates/**/*.pug',
//   ])
//     .pipe(pug({pretty:true}))
//     .pipe(gulp.dest('dist'))
//     .pipe(browserSync.stream())
// });

gulp.task('sass-landing', () => {
  return gulp.src('src/scss/landing.scss')
    .pipe(sass()).pipe(concat('style.css')).pipe(gulp.dest('pages/landing'))
    .pipe(browserSync.stream())
});

gulp.task('sass-map', () => {
  return gulp.src('src/scss/map.scss')
    .pipe(sass()).pipe(concat('style.css')).pipe(gulp.dest('pages/map'))
    .pipe(browserSync.stream())
});

gulp.task('default', () => {
  browserSync.init({
    server: './',
    port: 3010
  });
  // gulp.watch('src/**/*.pug', gulp.series('pug-compile'));
  gulp.watch('src/scss/landing.scss', gulp.series('sass-landing'));
  gulp.watch('src/scss/map.scss', gulp.series('sass-map'));
  gulp.watch('**/*.html').on('change', browserSync.reload);
});
