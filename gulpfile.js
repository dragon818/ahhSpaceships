const {src, watch, dest, parallel} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const imgmin = require('gulp-imagemin');


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


exports.style = style;
exports.img = img;
