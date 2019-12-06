const {src, watch, dest, parallel} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');

function style () {
  return src('./src/css/**/*.css')
  .pipe(autoprefixer())
  .pipe(dest('./dest/css'))
}

exports.style = style;
