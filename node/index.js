const express = require('express');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};
const mysql = require('mysql');
const conn = mysql.createConnection(config);

const createTablePeople = () => {
  console.log('createTablePeople');
  const sql = `create table if not exists people(
    id int primary key auto_increment,
    name varchar(255)
  )`;

  conn.query(sql, function (err, results, fields) {
    if (err) throw err;
  });
};

const storePeople = () => {
  console.log('storePeople');
  const names = [
    'Fabio',
    'Talita',
    'Gustavo',
    'Guilherme',
    'Victor',
    'Isabela',
  ];
  const name = names[Math.floor(Math.random() * names.length)];
  const sql = `INSERT INTO people(name) VALUES ("${name}")`;
  conn.query(sql);
};

const getPeople = res => {
  console.log('getPeople');
  const sql = 'SELECT * FROM people ORDER BY id desc';
  let people;
  conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    people = result.map(e => {
      return `<li>ID:${e.id} - Name: ${e.name}</li>`;
    });

    if (!people || people.length === 0) return;
    res.send(`
      <h1>Full Cycle Rocks!!</h1>
      <ul>${people.join('')}</ul>
    `);
  });
};

const syncPeople = res => {
  console.log('----- People -----');
  createTablePeople();
  storePeople();
  getPeople(res);
  console.log('---------------');
};

app.get('/', (req, res) => {
  syncPeople(res);
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
