 composer install
  config .env 
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=testedb
     DB_USERNAME=root
     DB_PASSWORD=

  php artisan key:generate
  php artisan migrate  
  php artisan serve
