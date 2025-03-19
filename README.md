# Backend autenticacion usuarios

## Inicializar el repositorio

1. Hemos creado la carpeta
2. Iniciamos y subimos los primeros archivos al repo local

``` bash
git init
git add .
git commit -m "build"
```

3. Crear el repo en Github
   
```bash
gh repo create
```

## Empezamos a crear proyecto npm y node.js

1. Para arrancar el proyecto npm:
   
```bash
npm init -y
```

2. Descargamos las dependencias

```bash
npm i express
```

3. Creamos un .gitignore para node_modules

## Creamos el server

1. Creamos un 'hola mundo'

2. Añadimos un 'better-sqlite3'

3. Lo integramos en el server

```js
// Conectar a la base de datos
const db = betterSqlite3('database.db');

// obtenemos la ruta absoluta a init.sql
const initSqlPath = path.join(__dirname, 'init.sql');
// leemos el archivo init.sql
const initSql = fs.readFileSync(initSqlPath, 'utf-8');
// ejecutamos el contenido de init.sql
// exec solo funciona para querys que no devuelven datos
db.exec(initSql);
// para consultas que si devuelven datos usamos prepare
// y luego lo ejecutamos con .all() o .get(<numero>)
const query = db.prepare('SELECT * FROM users');
const users = query.all();
console.log(users);
```
