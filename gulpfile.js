const {
  watch,
  series,
  parallel,
  src,
  dest
} = require("gulp");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass");
const browserSync = require('browser-sync').create();

function styles() {
  return src('sass/styles.scss', {
      sourcemaps: true
    })
    .pipe(
      sass({
        outputStyle: "expanded",
        indentType: "space",
        indentWidth: "4",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer("last 2 versions", "> 1%")]))
    .pipe(dest('./', {
      sourcemaps: true
    }))
}

function server() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './'
    }
  });
}

//watch(sassWatch, styles)
watch('sass/**/*', styles);
watch('./**/*').on('change', browserSync.reload);

exports.default = series(styles, server)