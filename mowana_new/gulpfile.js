// gulp.js configuration

// include gulp and plugins
var
gulp 				= require('gulp'),
del 				= require('del'),
newer 			= require('gulp-newer'),
htmlclean 	= require('gulp-htmlclean'),
concat 			= require('gulp-concat'),
preprocess 	= require('gulp-preprocess'),
pkg					= require('./package.json'),
size				= require('gulp-size'),
sass 				= require('gulp-sass'),
pleeease 		= require('gulp-pleeease'),
deporder 		= require('gulp-deporder'),
stripdebug 	= require('gulp-strip-debug'),
uglify 			= require('gulp-uglify'),
browsersync = require('browser-sync'),
imagemin 		= require('gulp-imagemin');

// file locations
var
devBuild 	= (
	(process.env.NODE_ENV || 'development')
	.trim()
	.toLowerCase() !== 'production'),

source		= 'source/',
dest			= 'build/',

html 			= {
	in: 			source + '*.html',
	watch:  	[source + '*.html', source + 'includes/**/*'],
	out: 			dest,
	context: 	{
		devBuild: devBuild,
		author: 	pkg.author,
		version: 	pkg.version
	}
},

images 		= {
	in: 	[source + 'images/*.*'],
	out:	dest + 'images/'
},


css 			= {
	in: 				source + 'sass/main.scss',
	watch: 			[source + 'sass/**/*'],
	out: 				dest + 'css/',
	sassOpts: 	{
		outputStyle: 			'nested',
		imagePath: 				'../images',
		precision: 				3,
		errLogToConsole: 	true
	},
	pleeeaseOpts: {
		autoprefixer: 		{browsers: ['last 2 versions', '> 2%']},
		rem: 							['16px'],
		pseudoElements: 	true,
		mqpacker: 				false,
		minifier: 				!devBuild
	},
},
js = {
	in: 				source + 'js/**/*',
	out: 				dest + 'js/',
	filename: 	'main.js'
},
syncOpts = {
	server: {
		baseDir: 	dest,
		index: 		'index.html'
	},
	open: 			false,
	notify: 		true
};

// show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');

// clean the build folder
gulp.task('clean', function() {
	del([
		dest + '*'
		]);
});

// build html files
gulp.task('html', function() {
	var page = gulp.src(html.in).pipe(preprocess({context: html.context}));
	if (!devBuild) {
		page =	page
		.pipe(size({title: 'HTML in'}))
		.pipe(htmlclean())
		.pipe(size({title: 'HTML out'}));
	}
	return page.pipe(gulp.dest(html.out));
});

// manages images
gulp.task('images', function() {
	return gulp.src(images.in)
	.pipe(newer(images.out))
	.pipe(imagemin())
	.pipe(gulp.dest(images.out));
});

// compile Sass
gulp.task('sass', function(){
	return gulp.src(css.in)
	.pipe(sass(css.sassOpts))
	.pipe(size({title: 'css in '}))
	.pipe(pleeease(css.pleeeaseOpts))
	.pipe(size({title: 'css out '}))
	.pipe(gulp.dest(css.out))
	.pipe(browsersync.reload({stream: true}));
});

gulp.task('js', function() {
	if (devBuild) {
		return gulp.src(js.in)
		.pipe(newer(js.out))
		.pipe(deporder())
		.pipe(gulp.dest(js.out));
	}
	else {
		del ([
			dest + 'js/*'
		]);
		return gulp.src(js.in)
		.pipe(deporder())
		.pipe(concat(js.filename))
		.pipe(size({title: 'JS in '}))
		.pipe(stripdebug())
		.pipe(uglify())
		.pipe(size({title: 'JS out '}))
		.pipe(gulp.dest(js.out));
	}
});

// browser sync
gulp.task('browsersync', function() {
	browsersync(syncOpts);
});

// default task
gulp.task('default', ['html', 'images', 'sass', 'js', 'browsersync'], function() {

	// html changes
	gulp.watch(html.watch, ['html', browsersync.reload]);

	//sass.watch
	gulp.watch([css.watch], ['sass']);

	// images changes
	gulp.watch([images.in], ['images']);

	// javascript changes
	gulp.watch([js.in], ['js', browsersync.reload]);
});


