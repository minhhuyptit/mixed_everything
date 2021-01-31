const dotenvExpand = require('dotenv-expand');
dotenvExpand(require('dotenv').config({ path: '../../.env'/*, debug: true*/}));

const mix = require('laravel-mix');
require('laravel-mix-merge-manifest');

// mix.js(__dirname + '/frontend/assets/dashboard/main.js', __dirname + '/public/modules/dashboard/index.js')
// mix.js(__dirname + '/Resources/assets/js/app.js', 'js/dashboard.js')
//     .sass( __dirname + '/Resources/assets/sass/app.scss', 'css/dashboard.css');


// if (mix.inProduction()) {
//     mix.version();
// }
// console.log(__dirname);
// 
// let mix = require('laravel-mix');
// require('laravel-mix-merge-manifest');
// mix.setPublicPath('../../public').mergeManifest();
// const publicPath = `${__dirname}/public/modules`
// const resourcePath = './platform/plugins/backup';

mix.js('frontend/dashboard/main.js', 'public/modules/dashboard/assets/js/index.js')
// 
// mix
//     .js(resourcePath + '/resources/assets/js/backup.js', publicPath + '/js')
//     .copy(publicPath + '/js/backup.js', resourcePath + '/public/js')

//     .sass(resourcePath + '/resources/assets/sass/backup.scss', publicPath + '/css')
//     .copy(publicPath + '/css/backup.css', resourcePath + '/public/css');