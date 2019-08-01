const process = require('process');
const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const yaml = require('gulp-yaml');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const named = require('vinyl-named');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config');

const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';

const files = {
  // 开发
  pug: 'src/**/*.pug',
  sass: 'src/**/*.sass',
  es: 'src/**/*.js',
  webpackEntry: [
    'src/scripts/popup.js',
    'src/scripts/content.js'
  ],
  yaml: 'src/**/*.yml',
  image: 'src/**/*.{png,jpg}',
  // 生产
  html: 'dist/**/*.html',
  css: 'dist/**/*.css',
  js: 'dist/**/*.js',
  json: 'dist/**/*.json',
  buildImage: 'dist/**/*.{png,jpg}',
  build: 'dist',
  // 依赖库
  buildJs: 'dist/scripts',
  react: `node_modules/react/umd/react.${ NODE_ENV }${ isDevelopment ? '' : '.min' }.js`,
  reactDom: `node_modules/react-dom/umd/react-dom.${ NODE_ENV }${ isDevelopment ? '' : '.min' }.js`
};

/* 开发环境 */
// pug
function devPugProject() {
  return gulp.src(files.pug)
    .pipe(changed(files.html))
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(files.build));
}

// sass
function devSassProject() {
  return gulp.src(files.sass)
    .pipe(changed(files.css))
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(files.build));
}

// webpack
function devWebpackProject() {
  return gulp.src(files.webpackEntry)
    .pipe(changed(files.js))
    .pipe(plumber())
    .pipe(named())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(files.buildJs));
}

// yaml
function devYamlProject() {
  return gulp.src(files.yaml)
    .pipe(changed(files.json))
    .pipe(plumber())
    .pipe(yaml({
      space: 2
    }))
    .pipe(gulp.dest(files.build));
}

// watch
function devWatch() {
  gulp.watch(files.pug, devPugProject);
  gulp.watch(files.sass, devSassProject);
  gulp.watch(files.es, devWebpackProject);
  gulp.watch(files.yaml, devYamlProject);
}

/* 生产环境 */
// pug
function proPugProject() {
  return gulp.src(files.pug)
    .pipe(pug())
    .pipe(gulp.dest(files.build));
}

// sass
function proSassProject() {
  return gulp.src(files.sass)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest(files.build));
}

// webpack
function proWebpackProject() {
  return gulp.src(files.webpackEntry)
    .pipe(named())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(files.buildJs));
}

// yaml
function proYamlProject() {
  return gulp.src(files.yaml)
    .pipe(yaml())
    .pipe(gulp.dest(files.build));
}

/* 拷贝图片 */
function copyImage() {
  return gulp.src(files.image)
    .pipe(changed(files.buildImage))
    .pipe(gulp.dest(files.build));
}

/* 拷贝依赖库 */
function createCopyProject(projectName, file, name) {
  const fn = function() {
    return gulp.src(file)
      .pipe(changed(files.js))
      .pipe(plumber())
      .pipe(rename(function(p) {
        if (name) {
          p.basename = name;
        }
      }))
      .pipe(gulp.dest(files.buildJs));
  };

  Object.defineProperty(fn, 'name', {
    value: `copy: ${ projectName }`
  });

  return fn;
}

const copyProject = [
  createCopyProject('react', files.react, 'react'),
  createCopyProject('react-dom', files.reactDom, 'react-dom')
];

exports.default = isDevelopment
  ? gulp.series(gulp.parallel(
    devPugProject,
    devSassProject,
    devWebpackProject,
    devYamlProject,
    copyImage,
    ...copyProject
  ), devWatch)
  : gulp.parallel(
    proPugProject,
    proSassProject,
    proWebpackProject,
    proYamlProject,
    copyImage,
    ...copyProject
  );