const mix = require("laravel-mix");

mix.js(
    "frontend/dashboard/main.js",
    "public/modules/dashboard/assets/js/dashboard.js"
);
