import  express  from "express";
const app = express()

import bodyParser from "body-parser";
import {getUsers} from './index.mjs'
import {getUserById} from './index.mjs'
import { createUser } from "./index.mjs";
import {updateUser} from "./index.mjs"


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
        extended: true,
    })

)

app.get('/', (request, response) => {
  response.json({
      info: 'Node.js, Express, and Postgres API'
  })
})


const PORT = process.env.PORT || 3000


app.listen(PORT, ()=> {
  console.log(`server is running on ${PORT}`)
})


app.post('/users', createUser)
app.patch ('/users/:id', updateUser)
app.get('/users', getUsers)
app.get('/users/:id', getUserById)