const {src, watch, dest, parallel} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');


function style () {
  return src('./src/css/**/*.css')
  .pipe(autoprefixer())
  .pipe(cleanCss())
  .pipe(dest('./dest/css'))
}

exports.style = style;
