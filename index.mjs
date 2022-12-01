//import { json } from 'body-parser';
import pg from 'body-parser'
const {json} = pg
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
CREATE TABLE IF NOT EXISTS users (
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
  //client.end();
});

/*for (let user of users){
  client.query((`INSERT INTO 
  users (id, firstname, lastName, email, ip)
  VALUES ($1, $2, $3, $4, $5)`), [user.id, user.firstName, user.lastName, user.email, user.ip])
 // .catch ((e)=> console.error(e.stack))
  //.then (()=> client.end())
}*/

export const createUser = (request, response) => {

  const {
    id,
    firstname,
    lastname,
    email,
    ip
  } = request.body
  
  client.query(`INSERT INTO users (id, firstName, lastName, email, ip) VALUES ($1, $2, $3, $4, $5)`, 
  [id, firstname, lastname, email, ip], (error, results) => {
    
      if (error) {
          throw error
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
  })
}

export const updateUser = (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  
const {
      firstname,
      lastname,
      email,
      ip
  } = request.body

  client.query(
      `UPDATE users SET firstName = $1, lastName = $2, email = $3, ip = $4 WHERE id = $5`,
      [firstname, lastname, email, ip, id],
      (error, results) => {
          if (error) {
              throw error
          }
          response.status(200).send(`User modified with ID: ${id}`)
      }
  )
}

export const getUsers = (request, response) => {
  client.query('SELECT * FROM users', (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

export const getUserById = (request, response) => {
  const id = Number(request.params.id)

  client.query('SELECT DISTINCT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows) 
      
  })
}

