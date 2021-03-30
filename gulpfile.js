const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// pug
gulp.task('pug-panda', () => {
  return gulp.src('src/pug/panda/index.pug').pipe(pug({pretty:true}))
    .pipe(gulp.dest('pages/zoos/panda/')).pipe(browserSync.stream())
});

gulp.task('pug-gorilla', () => {
  return gulp.src('src/pug/gorilla/index.pug').pipe(pug({pretty:true}))
    .pipe(gulp.dest('pages/zoos/gorilla/')).pipe(browserSync.stream())
});

// pug BU
// gulp.task('pug-panda', () => {
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

gulp.task('sass-zoo', () => {
  return gulp.src('src/pug/**/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('pages/zoos/'))
    .pipe(browserSync.stream())
});

// при изменении компонента, шаблона или scss в папке
const pugWatch = [
  'src/pug/components/**/*.*',
  'src/pug/templates/zoo.pug',
  'src/**/*.scss',
]

gulp.task('default', () => {
  browserSync.init({
    server: './',
    port: 3010
  });
  gulp.watch([...pugWatch, 'src/pug/panda/index.pug'], gulp.series('pug-panda'));
  gulp.watch([...pugWatch, 'src/pug/gorilla/index.pug'], gulp.series(['pug-gorilla', 'sass-zoo']));
  gulp.watch('src/scss/landing.scss', gulp.series('sass-landing'));
  gulp.watch('src/scss/map.scss', gulp.series('sass-map'));
  gulp.watch('**/*.html').on('change', browserSync.reload);
});
