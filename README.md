# Mounir Holding
Laravel &amp; Angular authentication with user Finding thier Positions On Google Map

# Steps to make it works
1. Clone this repository
2. Install laravel project dependencies
```
cd test-mounir-holding-back
composer install
```
3. Install angular project dependencies
```
cd test-mounir-holding-front
npm install
```
4. Create an `.env` file and configure your database access
5. Migrate and configure laravel/passport
```
cd test-mounir-holding-back
php artisan migrate
php artisan passport:install
```
6. Copy Second passport client id and secret to your .env PASSPORT_PERSONAL_ACCESS_CLIENT_ID and PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET

7. Configure laravel/passport on Angular
```
Get the password grant client token generated by the above command (php artisan passport:install) and update the file
laravel-angular-auth-front/src/app/services/auth.service.ts
by editing the login() method

```
8. Add sample user
```
cd test-mounir-holding-back
php artisan db:seed
```
This command will add a sample user with the following information to your database:
- Name: **Leonardo**
- Email: **leonardo@findme.com**
- Password: **password**
9. Run application
Run laravel application, by executing the following command:
```
cd test-mounir-holding-back
php artisan serve
```
Run angular application, by executing the following command:
```
cd test-mounir-holding-front
ng serve
```

PS. Use the sample user email and password in the authentication form.