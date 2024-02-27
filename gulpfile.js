const { src, dest, watch, series } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function html( done ) {
    src('src/*.html')
        .pipe( dest('build') )
    done();
}

function css( done ) {
    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )

    done();
}

function js( done ) {
    src('src/js/*.js')
        .pipe( dest('build/js'))
    done();
}

function bootstrapJs( done ) {
    src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
        .pipe( dest('build/js') )
    done();
}

function imagenes() {
    return src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )
}

function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg,jpeg}')
        .pipe( webp( opciones ) )
        .pipe( dest('build/img') )
}


function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', imagenes );
    watch( 'src/js/**/*', js );
    watch( 'src/*.html', html );

}

exports.html = html;
exports.css = css;
exports.js = js;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.bootstrapJs = bootstrapJs;

exports.default = series( imagenes, versionWebp, html, css, js, bootstrapJs, dev  );
