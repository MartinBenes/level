const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json', {
    outFile: 'kimera.js'
});

// task defecto (When execute `gulp` comand in the console)

gulp.task('default', () => {
    gulp.watch('ts/*.ts', ['compile:ts', 'minify']);
});

// Task that compiles typescript

gulp.task('compile:ts', function() {
    var tsResult = gulp.src("ts/*.ts")
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('js/'));
});


// Minify kimera.js

gulp.task('minify', () => {
    return gulp.src('js/kimera.js')
        .pipe(uglify({ compress: { drop_console: true }, mangle: false }).on('error', function(e) {
            console.log('Error uglify: ' + e);
        }))
        .pipe(gulp.dest('js/'));
});