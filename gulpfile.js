const {src, watch, dest, parallel} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const imgmin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');



function style () {
  return src('./src/css/**/*.css')
  .pipe(autoprefixer())
  .pipe(cleanCss())
  .pipe(dest('./dest/css'))
}

function img () {
  return src('./src/images/**/*')
  .pipe(imgmin([imgmin.jpegtran({progressive: true}, imgmin.optipng({optimizationLevel: 5}))]))
  .pipe(dest('./dest/images'))
}

function js () {
  return src(['./src/js/resources.js' ,'./src/js/app.js' ,'./src/js/engine.js'])
  .pipe(babel({
    presets: [['@babel/env',{modules: false}]]
  }))
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(dest('./dest/js'))
}

function copyhtml () {
  return src('./src/index.html')
  .pipe(dest('./dest/'))
}

function watcher () {
  watch('./src/images/**/*', img)
  watch('./src/index.html', copyhtml)
  watch('./src/js/**/*.js', js)
  watch('./src/css/**/*.css', style)
}

exports.style = style;
exports.img = img;
exports.js = js;
exports.copyhtml = copyhtml;
exports.watcher = watcher;

exports.all = parallel(watcher, style,img, js, copyhtml);