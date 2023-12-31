//main module
import gulp from 'gulp';
//importing paths
import { path } from './gulp/config/path.js';
//importing common plugins
import { plugins } from './gulp/config/plugins.js';

//passing values to a global variable
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

//import tasks
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { cssLibs } from './gulp/tasks/cssLibs.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff } from './gulp/tasks/fonts.js';
// import { sprite } from './gulp/tasks/svgSprite.js';
import { server } from './gulp/tasks/server.js';
import { zip } from './gulp/tasks/zip.js';

//file change watcher
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.cssLibs, cssLibs);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const fonts = gulp.series(otfToTtf, ttfToWoff);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, cssLibs, js, images));

//building task execution scenarios
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);

export { dev };
export { build };
export { deployZip };

//default script execution
gulp.task('default', dev);