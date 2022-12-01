import pkg from 'pg';
const { Client } = pkg;



const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'anna',
  password: '123',
  port: 5432,
});
client.connect();


 export const getUsers = (request, response) => {
  client.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
}

