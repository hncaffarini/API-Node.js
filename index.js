const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
require('dotenv/config');

const config = {
	user: "testUser",
	password: "test",
	server: "localhost",
	database: "test",
	options: {
	    enableArithAbort: true
	}
}

const ejecutarQuery = (query, res) => {

	sql.connect(config, function(err) {
		if (err){
			console.log(err);	
		} else {

			let request = new sql.Request();

			request.query(query, function(err, recordset) {
				if (err){
					console.log(err);
				} else {
					res.send(recordset);
				}
			});
		}
	});
}

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get("/", (req, res) => {
	res.send("Holis");
});

app.get("/traer/:id", (req, res) => {
	const { id } = req.params;
	ejecutarQuery(`SELECT * FROM tareas WHERE id = '${id}'`, res);
});

app.get("/traerTodos", (req, res) => {
	ejecutarQuery(`SELECT * FROM tareas`, res);
});

app.delete("/borrar/:id", (req, res) => {
	ejecutarQuery(`DELETE FROM tareas WHERE id = '${id}'`, res);
});

app.post("/insertar", (req, res) => {
	ejecutarQuery(`INSERT INTO tareas VALUES ('${req.body.nombre}', '${req.body.descripcion}', '${req.body.completado}')`, res);
});

app.put("/actualizar", (req, res) => {
	ejecutarQuery(`UPDATE tareas SET nombre = '${req.body.nombre}', descripcion = '${req.body.descripcion}', completado = '${req.body.completado}' WHERE id = '${req.body.id}'`, res);
});


app.listen(3000, () => {
	console.log("Server iniciado en el puerto 3000")
});