const express = require('express');
const app = express();
const betterSqlite3 = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const port = 3000;

const db = betterSqlite3('database.db');

const initSqlPath = path.join(__dirname, 'init.sql');
const initSql = fs.readFileSync(initSqlPath, 'utf-8');
db.exec(initSql);

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});

