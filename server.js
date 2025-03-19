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

const query = db.prepare('SELECT * FROM users');
const users = query.all();
// console.log(users);

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

app.get("/users", (req, res) => {
    const query = db.prepare('SELECT * FROM users');
    const users = query.all();
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const query = db.prepare('SELECT id, name FROM users WHERE id = ?');
    const id = req.params.id;
    const user = query.all(id);
    res.json(user);
});

app.post("/users", (req, res) => {
    const query = db.prepare('INSERT INTO users (name, pass) VALUES (?, ?)');
    const name = req.body.name;
    const pass = req.body.pass;
    query.run(name, pass);
    res.send('Usuario creado');
});

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});

