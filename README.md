# one

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# Install JSON Server
npm install -g json-server

# Start JSON Server
json-server --watch db.json

В приложении страницы:

Вход - http://localhost:8080/login
Регистрация - http://localhost:8080/register

Страница пользователя с данными доспутна только после регистрации или через страницу входа- http://localhost:8080/content/(id - рользователя)