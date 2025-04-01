const express = require('express');
const app = express();
const betterSqlite3 = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const port = 3000;

const http = require("http");
const { Server } = require("socket.io");

const db = betterSqlite3('aparcamiento.db');

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json()); // Middleware para manejar JSON en requests
app.use(express.static('public'));

const initSqlPath = path.join(__dirname, 'init-aparcamiento.sql');
const initSql = fs.readFileSync(initSqlPath, 'utf-8');
db.exec(initSql);

// Conexión de Socket.IO
io.on("connection", (socket) => {
    console.log("Usuario conectado");
    socket.emit("connected", "Conexión establecida");
    socket.on("disconnect", () => {
        console.log("Usuario desconectado");
    });
});

// Emitir información de plazas cada 2 segundos
setInterval(() => {
    const rows = db.prepare("SELECT * FROM plazas").all();
    io.emit("parkingData", rows);
}, 2000);

server.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});

// Endpoint para obtener todas las plazas
app.get("/plazas", (req, res) => {
    const query = db.prepare('SELECT * FROM plazas');
    const plazas = query.all();
    res.json(plazas);
});

// Endpoint para obtener una plaza por ID
app.get("/plazas/:id", (req, res) => {
    const query = db.prepare('SELECT * FROM plazas WHERE id = ?');
    const id = req.params.id;
    const plaza = query.get(id);
    res.json(plaza);
});

// Endpoint para alternar el estado de "ocupado" de una plaza
app.patch("/plazas/:id/ocupado", (req, res) => {
    const id = req.params.id;

    // Obtener el estado actual de la plaza
    const selectQuery = db.prepare('SELECT ocupado FROM plazas WHERE id = ?');
    const plaza = selectQuery.get(id);

    if (!plaza) {
        res.status(404).send('Plaza no encontrada');
        return;
    }

    // Alternar el estado de "ocupado"
    const nuevoEstado = plaza.ocupado === 0 ? 1 : 0;

    // Actualizar la plaza en la base de datos
    const updateQuery = db.prepare('UPDATE plazas SET ocupado = ? WHERE id = ?');
    updateQuery.run(nuevoEstado, id);

    res.json({ id, ocupado: nuevoEstado });
});

// Función para obtener todas las plazas disponibles
app.get("/plazasdisponibles", (req, res) => {
    const query = db.prepare('SELECT * FROM plazas WHERE ocupado = false');
    const plazasDisponibles = query.all();
    res.json(plazasDisponibles);
});

// Función para obtener todas las plazas ocupadas
app.get("/plazasocupadas", (req, res) => {
    const query = db.prepare('SELECT * FROM plazas WHERE ocupado = true');
    const plazasOcupadas = query.all();
    res.json(plazasOcupadas);
});

// Función para obtener todas las plazas disponibles
function getPlazasDisponibles() {
    const query = db.prepare('SELECT * FROM plazas WHERE ocupado = false');
    return query.all();
}

// Función para obtener todas las plazas ocupadas
function getPlazasOcupadas() {
    const query = db.prepare('SELECT * FROM plazas WHERE ocupado = true');
    return query.all();
}

// Función para obtener todas las plazas públicas disponibles
function getPlazasPublicasDisponibles() {
    const query = db.prepare('SELECT * FROM plazas WHERE tipo = "publicas" AND ocupado = false');
    return query.all();
}

// Función para obtener todas las plazas públicas ocupadas
function getPlazasPublicasOcupadas() {
    const query = db.prepare('SELECT * FROM plazas WHERE tipo = "publicas" AND ocupado = true');
    return query.all();
}

// Función para obtener todas las plazas privadas disponibles
function getPlazasPrivadasDisponibles() {
    const query = db.prepare('SELECT * FROM plazas WHERE tipo = "privadas" AND ocupado = false');
    return query.all();
}

// Función para obtener todas las plazas privadas ocupadas
function getPlazasPrivadasOcupadas() {
    const query = db.prepare('SELECT * FROM plazas WHERE tipo = "privadas" AND ocupado = true');
    return query.all();
}

// Función para obtener la cantidad de plazas disponibles
function getCantidadPlazasDisponibles() {
    const query = db.prepare('SELECT COUNT(*) AS cantidad FROM plazas WHERE ocupado = false');
    return query.get();
}

// Función para obtener la cantidad de plazas ocupadas
function getCantidadPlazasOcupadas() {
    const query = db.prepare('SELECT COUNT(*) AS cantidad FROM plazas WHERE ocupado = true');
    return query.get();
}

// Función para obtener la cantidad de plazas públicas disponibles
function getCantidadPlazasPublicasDisponibles() {
    const query = db.prepare('SELECT COUNT(*) AS cantidad FROM plazas WHERE tipo = "publicas" AND ocupado = false');
    return query.get();
}

// Función para obtener la cantidad de plazas públicas ocupadas
function getCantidadPlazasPublicasOcupadas() {
    const query = db.prepare('SELECT COUNT(*) AS cantidad FROM plazas WHERE tipo = "publicas" AND ocupado = true');
    return query.get();
}

// Función para obtener la cantidad de plazas privadas disponibles
function getCantidadPlazasPrivadasDisponibles() {
    const query = db.prepare('SELECT COUNT(*) AS cantidad FROM plazas WHERE tipo = "privadas" AND ocupado = false');
    return query.get();
}

// Función para obtener la cantidad de plazas privadas ocupadas
function getCantidadPlazasPrivadasOcupadas() {
    const query = db.prepare('SELECT COUNT(*) AS cantidad FROM plazas WHERE tipo = "privadas" AND ocupado = true');
    return query.get();
}
