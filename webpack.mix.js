const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');

mix.js("resources/js/scripts.js",'public/js')
    .sass('resources/sass/style.scss','public/css').options({
    processCssUrls: false
});
mix.js('resources/js/add_products.js','public/js')
    .sass('resources/sass/busket.scss','public/css').options({
    processCssUrls: false});

mix.js('resources/js/busket.js','public/js');
mix.js('resources/js/product.js','public/js');
mix.js('resources/js/order.js','public/js');
mix.js('resources/js/check_transaction.js','public/js');

mix.js('resources/js/index.js','public/js')
    .sass('resources/sass/index.scss','public/css').options({
    processCssUrls: false});
