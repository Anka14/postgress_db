import pkg from 'pg';
const { Client } = pkg;
import {users} from './users.mjs'

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'anna',
  password: '123',
  port: 5432,
});

client.connect();

const query = `
CREATE TABLE users (
    id varchar,
    firstName varchar,
    lastName varchar,
    email varchar,
    ip varchar
);
`;

client.query(query, (err, res) => {
  if (err) {
      console.error(err);
      return;
  }
  console.log('Table is successfully created');
  client.end();
});

for (let user of users){
  client.query((`INSERT INTO 
  users (id, firstname, lastName, email, ip)
  VALUES ($1, $2, $3, $4, $5)`), [user.id, user.firstName, user.lastName, user.email, user.ip])
 // .catch ((e)=> console.error(e.stack))
  //.then (()=> client.end())
}



