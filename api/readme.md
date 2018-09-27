 API - Laravel 5.5
=================

Requisito
---------------
Ter instalado composer, mysql e PHP > 7.0

Instalação
---------------
Após clonar o projeto, voce vai entrar no repositório api e rodar o comando:
```
composer install
```
Após instalar todas as depencias pelo composer, vc deve configurar o arquivo .env e não esquecer de criar um banco.

```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=teste
     DB_USERNAME=root
     DB_PASSWORD=root
```

Vamos gerar uma nova chave para laravel rodando o comando 
```
php artisan key:generate
```
Vamos gerar todas as nossas tabelas 
```
php artisan migrate  
```
Rodar o servidor com o comando 
``` 
php artisan serve
```
Vamos testar 
  
 [http://localhost:8000/](http://localhost:8000/)
 
 Rotas da API
 ``` 
GET    - /api/task
GET    - /api/task/123
POST   - /api/task
PUT    - /api/task/123
DELETE - /api/task/123
```
 
