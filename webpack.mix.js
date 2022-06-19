const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);


// following part is for react
// mix.options({
//     postCss: [
//         require('autoprefixer'),
//     ],
// });

// mix.setPublicPath('public');

// mix.webpackConfig({
//     resolve: {
//         extensions: ['.js', '.vue'],
//         alias: {
//             '@': __dirname + 'resources'
//         }
//     },
//     output: {
//         chunkFilename: 'js/chunks/[name].js',
//     },
// }).react();

// // used to run app using reactjs
// mix.js('resources/react-app/src/index.js', 'public/js/app.js').version();
// mix.copy('resources/react-app/src/assets', 'public/assets');