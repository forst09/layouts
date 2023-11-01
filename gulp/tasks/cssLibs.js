import concat from 'gulp-concat';

export const cssLibs = () => {
    return app.gulp.src(app.path.src.cssLibs, { soursemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'cssLibs',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(concat('libs.css'))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}