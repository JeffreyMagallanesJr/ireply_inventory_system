# iReply Inventory System

iReply Inventory System is a software system for tracking equipment and borrowing within iReply's office.

## Installation

Ensure that you have the following installed before attempting installation:
1. PHP
2. Composer
3. Laravel Installer
4. Node
5. NPM
6. git
7. xampp

Start XAMPP

Go to your computer's xampp/htdocs directory

Create a folder named IReply_Inventory

```bash
mkdir IReply_Inventory
```

Enter the folder
```bash
cd IReply_Inventory
```

Use the following command to clone the app into the file.

```bash
git clone https://github.com/JeffreyMagallanesJr/ireply_inventory_system.git .
```

Once the app has been cloned, run the following to install app dependencies.

```bash
composer install
```
Go to phpmyadmin and create an empty database named 'eidb'.

After that, run the following command to migrate database which automatically creates tables inside the eidb database and create a dev environment.

```bash
php artisan migrate
npm install && npm run build
composer run dev
```

## Credits
Czar Evan Gasper - Project Lead / Quality Assurance

Aisha Japitana - Project Analyst / Quality Assurance

Marlou Paduua - User Interface and User Experience Analyst

Kurt Jules Sicat - Fullstack Developer

Jeffrey Magallanes Jr - Software Lead