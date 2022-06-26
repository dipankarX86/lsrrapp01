<h1>How to start the project after cloning?</h1>
<ul>
    <li>Install and run <a href="https://wampserver.aviatechno.net/?lang=en&prerequis=afficher">wamp server</a> withe these: <a href="https://www.wampserver.com/">Files and Addons</a>. Or install <a href="https://www.apachefriends.org/">Xampp Server.</a></li>
    <li>have PHP in the path.</li>
    <li>Install <a href="https://getcomposer.org/download/">Composer</a> Globally.</li>
    <li>Clone the project to the wamp server <strong>www</strong> folder.</li>
    <li>now run: <strong>composer install</strong> if PHP is in path and composer installed globally. If php is not in path and composer installed in www folder run:  something like: <strong>C:/wamp64/bin/php/php7.4.26/php.exe composer.phar install</strong> from the project's base folder.</li>
    <li>Run <strong>npm install</strong> in the the project's base folder.</li>
    <li>Run <strong>npm install</strong> in the the <strong>/resources/dashboard</strong> folder.</li>
    <li>Go to the PhpMyadmin/MySql-workbench and create an empty database with a User-Id and Password</li>
    <li>Go to the base/root folder of the project, copy .env.example file, rename it to .env and change the credentials for MySql database in lines 14, 15, 16</li>
    <li>In the package.json file of <strong>/resources/dashboard</strong> folder, change the proxy server at line 4, and homepage at line 48</li>
    <li><strong>php artisan migrate</strong> from root folder.</li>
    <li><strong>exe artisan db:seed</strong> from root folder.</li>
    <li><strong>import the linked .mysql file to the user table, in phpMyAdmin</strong></li>
</ul>
<h1>How to run it?</h1>
<ul>
    <li>For frontend in development: <strong>npm run client</strong> from base folder, or <strong>npm start</strong> from '/resources/dashboard'/</li>
    <li>For backend run <strong>php artisan serve</strong></li>
</ul>
<h1>Other useful commonds for backend:</h1>
<ul>
    <li>composer --version</li>
    <li>php artisan route :list</li>
    <li>php artisan make:migration ModelName</li>
    <li>php artisan migrate</li>
    <li>php artisan migrate:refresh</li>
    <li>php artisan migrate:refresh --seed</li>
    <li>php artisan make:controller ControllerName</li>
    <li>php artisan make:controller ProductController --api</li>
    <li>php artisan tinker</li>
    <li>php artisan route:list</li>
</ul>
    



<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Cubet Techno Labs](https://cubettech.com)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[Many](https://www.many.co.uk)**
- **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
- **[DevSquad](https://devsquad.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[OP.GG](https://op.gg)**
- **[WebReinvent](https://webreinvent.com/?utm_source=laravel&utm_medium=github&utm_campaign=patreon-sponsors)**
- **[Lendio](https://lendio.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
