const express = require('express');
const app = express();
const betterSqlite3 = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const port = 3000;

const db = betterSqlite3('aparcamiento.db');

app.use(express.static('public'));

const initSqlPath = path.join(__dirname, 'init-aparcamiento.sql');
const initSql = fs.readFileSync(initSqlPath, 'utf-8');
db.exec(initSql);
/*
const query = db.prepare('SELECT * FROM plazas');
const plazas = query.all();
console.log(plazas);
*/
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});
/*
app.post("/users", (req, res) => {
    const query = db.prepare('INSERT INTO users (name, pass) VALUES (?, ?)');
    const name = req.body.name;
    const pass = req.body.pass;
    query.run(name, pass);
    res.send('Usuario creado');
});
*/
app.get("/plazas", (req, res) => {
    const query = db.prepare('SELECT * FROM plazas');
    const plazas = query.all();
    res.json(plazas);
});

app.get("/plazas/:id", (req, res) => {
    const query = db.prepare('SELECT * FROM plazas WHERE id = ?');
    const id = req.params.id;
    const plaza = query.all(id);
    res.json(plaza);
});

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});

