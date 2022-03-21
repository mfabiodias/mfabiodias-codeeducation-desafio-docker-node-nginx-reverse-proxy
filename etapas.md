1. Rodei um container temporário para iniciar meu projeto node com volume externo para persistencia do projeto:
   - docker run --rm -it -v $(pwd)/:/usr/src/app -p 3000:3000 node:14 bash
   - cd /usr/src/app
   - npm init -y
   - npm install express mysql --save
   - touch index.js
2. Adicionando script base para roda o express

```JAVASCRIPT
// index.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Full Cycle Rocks!</h1>');
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
```

3. Executei o app para conferir se estava tudo correto:

   - node index.js

4. Com o projeto base criado e testado segui para a criação dos Dockerfile e docker-compose.yaml

```JAVASCRIPT
/* Estrutura de pastas
    - mysql
    - nginx
        - Dockerfile
        - nginx.conf
    - node
        - Dockerfile
        - Dockerfile.dev
        - index.js
    - docker-compose.yaml
    - docker-compose.dev.yaml
-
*/
```

5. Criei o Dockerfile e nginx.conf do NGINX;
6. Criei o Dockerfile do NODE;
7. Criei o docker-compose.yaml
8. Subi os serviços com o comando:
   - docker-compose up -d
9. Verifiquei se todos os serviços estavam de pé:
   - docker ps
10. Acessei o container do MySQL e criei a tabela people:
    - mysql -uroot -proot
    - use nodedb;
    - create table if not exists people(id int primary key auto_increment, name varchar(255);
11. Acessei o container do Node e rodei o APP para testar:
    - cd /usr/src/app
    - node index.js
12. Depois alterei o scripy do Node adicionando a conexão com o banco de dados, insert e get dos dados;

```JAVASCRIPT
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
```

13. Referencias:

- https://github.com/jwilder/dockerize
- https://www.mysqltutorial.org/mysql-nodejs/create-table/
- https://blog.logrocket.com/how-to-run-a-node-js-server-with-nginx/
- https://gobyexample.com/hello-world
- https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose-pt

14. Opções

- docker exec -it node bash (Acessa o container Node)
- docker exec -it nginx bash (Acessa o container NGINX)
- docker exec -it nginx db (Acessa o container MySQL)
- docker logs nginx -f (Segura o processo para visualizar os logs do NGINX)
- docker logs node -f (Segura o processo para visualizar os logs do Node)
- docker logs db -f (Segura o processo para visualizar os logs do MySQL)

15. Adicionando o git e subindo app no GitHub

```GIT
git init
git add .
git commit -m "Start Project"
git remote add origin git@github.com:mfabiodias/mfabiodias-codeeducation-desafio-docker-node-nginx-reverse-proxy.git
git branch -M main
git push -u origin main
```
