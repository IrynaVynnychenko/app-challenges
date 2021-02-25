var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    babel = require("gulp-babel"),
    minifyCSS = require("gulp-minify-css"),
    sass = require("gulp-sass"),
    htmlmin = require("gulp-htmlmin"),
    clean = require("gulp-clean"),
    autoprefixer = require("gulp-autoprefixer"),
    image = require("gulp-image"),
    svgSprite = require("gulp-svg-sprites"),
    svgmin = require("gulp-svgmin"),
    cheerio = require("gulp-cheerio"),
    replace = require("gulp-replace"),
    connect = require("gulp-connect"),
    rename = require("gulp-rename"),
    htmlreplace = require("gulp-html-replace"),
    ftp = require("vinyl-ftp"),
    gutil = require("gulp-util"),
    fs = require("fs"),
    open = require("gulp-open"),
    fileinclude = require('gulp-file-include');

gulp.task("svg-sprite", function () {
    return (
        gulp
        .src("./src/images/svg/*.svg")
        .pipe(
            cheerio({
                run: function ($) {},
                parserOptions: {
                    xmlMode: true
                }
            })
        )
        // cheerio plugin create unnecessary string '>', so replace it.
        .pipe(replace("&gt;", ">"))
        // build svg sprite
        .pipe(
            svgSprite({
                mode: "symbols",
                preview: false,
                selector: "icon-%f",
                svg: {
                    symbols: "symbol_sprite.html"
                }
            })
        )
        .pipe(
            svgmin({
                plugins: [{
                        removeComments: true
                    },
                    {
                        removeMetadata: true
                    },
                    {
                        removeEditorsNSData: true
                    },
                    {
                        removeAttrs: {
                            attrs: "data.*"
                        }
                    },
                    {
                        removeStyleElement: true
                    },
                    {
                        removeDesc: true
                    },
                    {
                        cleanupIDs: false
                    }
                ]
            })
        )
        .pipe(gulp.dest("./dist/images/"))
    );
});

gulp.task("image-min", () =>
    gulp
    .src("./src/images/*",
    )
    .pipe(image())
    .pipe(rename({ dirname: "" }))
    .pipe(gulp.dest("./dist/images/"))
    .pipe(connect.reload())
);

gulp.task("compile-sass", function () {
    return gulp
        .src([
            "node_modules/bootstrap/dist/css/bootstrap.min.css",
            "./src/scss/*.css",
            "./src/scss/*.scss"
        ])
        .pipe(sass())
        .pipe(concat("style.css"))
        .pipe(gulp.dest("./dist/css/"));
});

gulp.task("compile-sass-components", function () {
    return gulp
        .src([
            "./src/components/**/*.scss"
        ])
        .pipe(sass())
        .pipe(gulp.dest(file => file.base.replace('src', 'dist')));
});

gulp.task("minify-css", function () {
    return gulp
        .src([
            "./src/css/*.css",
        ])
        .pipe(
            autoprefixer({
                cascade: false
            })
        )
        .pipe(concat("style.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest("./dist/css"))
        .pipe(connect.reload());
});

gulp.task("minifyhtml", function () {
    return gulp
        .src(["./src/components/**/*.html"])
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
          }))
        .pipe(gulp.dest(file => file.base.replace('src', 'dist')))
        .pipe(connect.reload());
});

gulp.task("pageHtml", function () {
    return gulp
        .src(["./src/*.html"])
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
          }))
        .pipe(gulp.dest("./dist/"))
        .pipe(connect.reload());
});

const js = [
    "./src/js/common.js"
];

gulp.task("minify-main-js", function () {
    return gulp
        .src(js)
        .pipe(
            babel({
                presets: ["env"]
            })
        )
        .pipe(uglify())
        .pipe(concat("common.min.js"))
        .pipe(gulp.dest("./src/js/"));
});

gulp.task("scripts", function () {
    return gulp
        .src([
            "./src/js/jquery-1.11.0.min.js",
            "./src/js/jquery-migrate-1.2.1.min.js",
            "./src/js/slick.min.js",
            "./src/js/common.min.js"
        ])
        .pipe(concat("main.js"))
        .pipe(gulp.dest("./dist/js/"))
        .pipe(connect.reload());
});

gulp.task("copy-scripts", function () {
    return gulp.src(["./src/js/*"]).pipe(gulp.dest("./dist/js/"));
});

gulp.task("copy-fonts", function () {
    return gulp.src(["./src/fonts/*"]).pipe(gulp.dest("./dist/fonts/"));
});

// Чистим директорию назначения и делаем ребилд, чтобы удаленные из проекта файлы не остались
gulp.task("clean", function () {
    return gulp
        .src(["./src/css/style.css"], {
            read: false,
            allowEmpty: true
        })
        .pipe(clean());
});

gulp.task("clean-js", function () {
    return gulp
        .src(["./src/js/common.min.js"], {
            read: false,
            allowEmpty: true
        })
        .pipe(clean());
});

gulp.task("clean-old-css", function () {
    return gulp.src(["./dist/css"], {
        read: false,
        allowEmpty: true
    }).pipe(clean());
});
gulp.task("clean-old-js", function () {
    return gulp.src(["./dist/js"], {
        read: false,
        allowEmpty: true
    }).pipe(clean());
});

gulp.task("connect", function () {
    var server = connect.server({
        root: "./dist/",
        livereload: true
    });

    return gulp.src("./dist/").pipe(
        open({
            uri: "http://" + server.host + ":" + server.port
        })
    );
});

function watchFiles() {
    gulp.watch(
        "./src/**/*.scss",
        gulp.series([
            "clean-old-css",
            "compile-sass",
            "compile-sass-components",
            "minify-css",
            "clean",
            "minifyhtml",
            "pageHtml"
        ])
    );
    gulp.watch("./src/**/*.html", gulp.series(["minifyhtml", "pageHtml"]));
    gulp.watch("./src/images/svg/*.svg", gulp.series(["svg-sprite"]));
    gulp.watch(
        js,
        gulp.series([
            "clean-old-js",
            "copy-scripts",
            "minify-main-js",
            "scripts",
            "clean-js",
            "minifyhtml",
            "pageHtml"
        ])
    );
    gulp.watch(
        "./src/images/*",
        gulp.series(["image-min", "svg-sprite"])
    );
}

const build = gulp.series(
    "clean-old-css",
    "clean-old-js",
    "compile-sass",
    "compile-sass-components",
    "minify-css",
    "minify-main-js",
    "scripts",
    "minifyhtml",
    "pageHtml",
    "clean",
    "clean-js",
    "copy-scripts",
    "copy-fonts",
    "image-min",
    "svg-sprite"
);

const min_images = gulp.series("image-min");
const watch = gulp.parallel("connect", watchFiles);

exports.build = build;
exports.default = gulp.series(build, watch);
exports.min_images = min_images;
