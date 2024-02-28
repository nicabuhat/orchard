const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const terser = require("gulp-terser");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const replace = require("gulp-replace");
const browsersync = require("browser-sync").create();

// File Paths
const files = {
  scssPath: "app/scss/**/*.scss",
  jsPath: "app/js/**/*.js",
};

// Sass Task
function scssTask() {
  return src(files.scssPath, { sourcemaps: true })
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("dist", { sourcemaps: "." }));
}

// JS Task
function jsTask() {
  return src([files.jsPath], { sourcemaps: true })
    .pipe(concat("all.js"))
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: "." }));
}

// Cachebust
function cacheBustTask() {
  var cbString = new Date().getTime();
  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + cbString))
    .pipe(dest("."));
}

// Browsersync to spin up a local server
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// watch SCSS and JS files for changes
function watchTask() {
  watch(
    [files.scssPath, files.jsPath],
    { interval: 1000, usePolling: true },
    series(parallel(scssTask, jsTask), cacheBustTask)
  );
}

// Browsersync Watch task
function bsWatchTask() {
  watch("index.html", browserSyncReload);
  watch(
    [files.scssPath, files.jsPath],
    { interval: 1000, usePolling: true },
    series(parallel(scssTask, jsTask), cacheBustTask, browserSyncReload)
  );
}

exports.default = series(parallel(scssTask, jsTask), cacheBustTask, watchTask);

exports.bs = series(
  parallel(scssTask, jsTask),
  cacheBustTask,
  browserSyncServe,
  bsWatchTask
);
