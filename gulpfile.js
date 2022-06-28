// Vars
const { notify } = require('browser-sync')
const fs = require('fs')

const {src, dest} = require("gulp"),
	gulp = require("gulp"),
	browsersync = require("browser-sync").create(),
	fileinclude = require("gulp-file-include"),
	panini = require("panini"),
	htmlmin = require("gulp-htmlmin"),
	plumber = require("gulp-plumber"),
	del = require("del"),
	scss = require("gulp-sass"),
	rename = require("gulp-rename"),
	autoprefixer = require("gulp-autoprefixer"),
	gcmq = require('gulp-group-css-media-queries'),
	cssnano = require("gulp-cssnano"),
	uglify = require("gulp-uglify-es").default,
	imagemin = require("gulp-imagemin"),
	ttf2woff2 = require("gulp-ttf2woff2");

// Paths
const project_folder = require("path").basename(__dirname);
const source_folder = "#src";

const path = {
	build:{
		html: 	project_folder + "/",
		json: 	project_folder + "/",
		css: 		project_folder + "/css/",
		js: 		project_folder + "/js/",
		img: 		project_folder + "/images/",
		fonts: 	project_folder + "/fonts/"
	},
	src:{
		html: 	source_folder + "/*.html",
		json: 	source_folder + "/*.json",
		css: 		source_folder + "/assets/scss/style.scss",
		js: 		source_folder + "/assets/js/app.js",
		img: 		source_folder + "/assets/images/**/*.+(png|jpg|gif|ico|svg|webp)",
		fonts: 	source_folder + "/assets/fonts/**/*.+(eot|woff|woff2|ttf|svg)"
	},
	watch:{
		html: 	source_folder + "/**/*.html",
		json: 	source_folder + "/*.json",
		css: 		source_folder + "/assets/scss/**/*.scss",
		js: 		source_folder + "/assets/js/**/*.js",
		img: 		source_folder + "/assets/images/**/*.+(png|jpg|gif|ico|svg|webp)",
		fonts: 	source_folder + "/assets/fonts/**/*.+(eot|woff|woff2|ttf|svg)"
	},
	clean: "./" + project_folder
}

// Reload Browser
function browserSync() {
	browsersync.init({
		server: {
			baseDir: "./" + project_folder + "/"
		},
		port: 3000,
		notify: false
	})
}

// HTML
function html() {
	panini.refresh();
	return src(path.src.html)
		.pipe(plumber())
		.pipe(panini({
			root: 			source_folder + '/*.html',
			layouts:		source_folder + '/layouts/',
			partials: 	source_folder + '/partials/'
		}))
		.pipe(htmlmin({
			removeComments: true
		}))
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

function htmlWatch() {
	panini.refresh();
	return src(path.src.html)
	.pipe(plumber())
	.pipe(panini({
		root: 			source_folder,
		layouts:		source_folder + '/layouts/',
		partials: 	source_folder + '/partials/'
	}))
	.pipe(dest(path.build.html))
	.pipe(browsersync.stream())
}

// CSS
function css() {
	return src(path.src.css)
		.pipe(plumber({
			errorHandler : function(err) {
				notify.onError({
					title: "SCSS Error",
					message: "Error: <%= error.message %>"
				})(err);
				this.emit('end')
			}
		}))
		.pipe(scss())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 5 versions'],
			cascade: true
		}))
		.pipe(gcmq())
		.pipe(dest(path.build.css))
		.pipe(cssnano({
			zindex: false,
			discardComments: {
					removeAll: true
			}
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function cssWatch(){
	return src(path.src.css)
		.pipe(plumber({
			errorHandler : function(err) {
				notify.onError({
					title: "SCSS Error",
					message: "Error: <%= error.message %>"
				})(err);
				this.emit('end')
			}
		}))
		.pipe(scss())
		.pipe(rename({suffix: '.min'}))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())		
}

// Javascript
function js() {
	return src(path.src.js)
		.pipe(plumber({
			errorHandler : function(err) {
				notify.onError({
					title: "JS Error",
					message: "Error: <%= error.message %>"
				})(err);
				this.emit('end')
			}
		}))
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

// Images
function images() {
	return src(path.src.img)
		.pipe(
			imagemin([
				imagemin.gifsicle({interlaced: true}),
				imagemin.mozjpeg({quality: 80, progressive: true}),
				imagemin.optipng({optimizationLevel: 5}),
				imagemin.svgo({
						plugins: [
								{ removeViewBox: true },
								{ cleanupIDs: false }
						]
				})
		]))
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream())
}

// Fonts
function fonts() {
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts))
}

// fontsStyle
function fontsStyle(cb) {
	let file_content = fs.readFileSync(source_folder + '/assets/scss/untils/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source_folder + '/assets/scss/untils/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(source_folder + '/assets/scss/untils/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
				}
		})
	}
	cb()
}

// JSON
function json() {
	return src(path.src.json)
	.pipe(dest(path.build.json))
}

// Cleaner
function clean() {
	return del(path.clean);
}

// Watcher
function watchFiles() {
	gulp.watch([path.watch.html], htmlWatch);
	gulp.watch([path.watch.css], cssWatch);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
	gulp.watch([path.watch.fonts], fonts);
	gulp.watch([path.watch.json], json);
}

// Exports
const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts, json));
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.json = json;
exports.fontsStyle = fontsStyle;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;