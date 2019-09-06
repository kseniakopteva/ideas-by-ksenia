const { watch, series, parallel, src, dest } = require("gulp");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

function styles() {
  return src("sass/styles.scss", {
    sourcemaps: true
  })
    .pipe(
      sass({
        outputStyle: "expanded",
        indentType: "space",
        indentWidth: "4"
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer("last 2 versions", "> 1%")]))
    .pipe(
      dest("./dist", {
        sourcemaps: true
      })
    );
}

function build() {
  return src("sass/styles.scss", {
    sourcemaps: false
  })
    .pipe(
      sass({
        outputStyle: "expanded",
        indentType: "space",
        indentWidth: "4"
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer("last 2 versions", "> 1%")]))
    .pipe(
      dest("./dist", {
        sourcemaps: false
      })
    );
}

function server() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "./dist"
    }
  });
}

//watch(sassWatch, styles)
watch("sass/**/*", styles);
watch("./**/*").on("change", browserSync.reload);

exports.build = build;
exports.default = series(styles, server);
