const express = require('express')
const app = express()

const hostname = 'node';
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const create_db = "CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key(id))"
connection.query(create_db)

const sql = `INSERT INTO people(name) VALUES ('Teste')`
connection.query(sql)

app.get('/', (req,res) => {
  const sql = "SELECT name FROM people"
  connection.query(sql, function(err, data, fields){
    if (err) throw err;
    const ret = JSON.stringify(data)
    res.send('<h1>Full Cycle Rocks!</h1>' + ret)
  })
})

app.listen(port, () => {
  console.log("Rodando na porta " + port)
})