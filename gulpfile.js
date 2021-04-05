const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// pug
gulp.task('pug-landing', () => {
  return gulp.src('src/pug/landing/index.pug').pipe(pug({pretty:true}))
    .pipe(gulp.dest('pages/landing/')).pipe(browserSync.stream())
});

gulp.task('pug-map', () => {
  return gulp.src('src/pug/map/index.pug').pipe(pug({pretty:true}))
    .pipe(gulp.dest('pages/map/')).pipe(browserSync.stream())
});

gulp.task('pug-alligator', () => {
  return gulp.src('src/pug/alligator/index.pug').pipe(pug({pretty:true}))
    .pipe(gulp.dest('pages/zoos/alligator/')).pipe(browserSync.stream())
});

gulp.task('pug-panda', () => {
  return gulp.src('src/pug/panda/index.pug').pipe(pug({pretty:true}))
    .pipe(gulp.dest('pages/zoos/panda/')).pipe(browserSync.stream())
});

gulp.task('pug-eagle', () => {
  return gulp.src('src/pug/eagle/index.pug').pipe(pug({pretty:true}))
    .pipe(gulp.dest('pages/zoos/eagle/')).pipe(browserSync.stream())
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
  return gulp.src(['src/scss/landing.scss', 'src/pug/components/**/*.scss'])
    .pipe(sass()).pipe(concat('style.css')).pipe(gulp.dest('pages/landing'))
    .pipe(browserSync.stream())
});

gulp.task('sass-map', () => {
  return gulp.src(['src/scss/map.scss', 'src/pug/components/**/*.scss'])
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

gulp.task('js-zoo', () => {
  return gulp.src('src/pug/**/*.js')
    // .pipe(babel({
    //   presets: ['@babel/env']
    // }))
    // .pipe(uglify()) // min
    .pipe(concat('script.js'))
    .pipe(gulp.dest('pages/zoos/'))
    .pipe(browserSync.stream())
});

// при изменении компонента, шаблона или scss в папке
const pugWatch = [
  'src/pug/components/**/*.*',
  'src/pug/templates/*.*',
  'src/**/*.scss',
];

gulp.task('default', () => {
  browserSync.init({
    server: './',
    port: 3010
  });
  gulp.watch(
    [...pugWatch, 'src/pug/landing/index.pug'],
    gulp.series(['pug-landing', 'sass-landing'])
  );
  gulp.watch(
    [...pugWatch, 'src/pug/map/index.pug'],
    gulp.series(['pug-map', 'sass-map'])
  );
  gulp.watch([...pugWatch, 'src/pug/alligator/index.pug'], gulp.series(['pug-alligator', 'sass-zoo', 'js-zoo']));
  gulp.watch([...pugWatch, 'src/pug/panda/index.pug'], gulp.series(['pug-panda', 'sass-zoo', 'js-zoo']));
  gulp.watch([...pugWatch, 'src/pug/eagle/index.pug'], gulp.series(['pug-eagle', 'sass-zoo', 'js-zoo']));
  gulp.watch([...pugWatch, 'src/pug/gorilla/index.pug'], gulp.series(['pug-gorilla', 'sass-zoo', 'js-zoo']));
  gulp.watch('src/scss/landing.scss', gulp.series('sass-landing'));
  gulp.watch('src/scss/map.scss', gulp.series('sass-map'));
  gulp.watch('**/*.html').on('change', browserSync.reload);
});
