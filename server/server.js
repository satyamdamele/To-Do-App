// Express Server setup -start

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 8081

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded(
        {
            extended: true,
        }
    )
)

// (Setting headers to allow access to client w.r.t. CORS policy)
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

// Express Server setup -end


// Database setup and connection - start

const {Client} = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'to_do_list_proj_db',
  password: 'invalid-password',     // Enter correct password here to connect
  port: 5432,
});

client.connect();

// Database setup and connection - end

// Endpoints setup for CRUD operations - start

// (Post a new to-do)
const addToDo = (request, response) => {
  const description = request.body['task']
  console.log(request.body)

  client.query('INSERT INTO tasks (description, status_id) VALUES ($1, 0)', [description], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(results.rows)
  })
}
app.post('/addtodo', addToDo)

// (Get unfinished tasks)
const getUnfinishedTasks = (request, response) => {
  client.query('SELECT task_id, description FROM tasks WHERE status_id = 0 ORDER BY status_id, task_id DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(results.rows)
  })
}
app.get('/getunfinishedtasks', getUnfinishedTasks)

// (Get finished tasks)
const getFinishedTasks = (request, response) => {
  client.query('SELECT task_id, description FROM tasks WHERE status_id = 1 ORDER BY status_id, task_id DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(results.rows)
  })
}
app.get('/getfinishedtasks', getFinishedTasks)
  
// (Change task status)
const changeStatus = (request, response) => {
  const taskId = request.body['task_id'] 
  const statusId = request.body['status_id'] 
  console.log(request.body);

  if (statusId == 0){
    client.query('UPDATE tasks SET status_id=1 WHERE task_id = $1;', [taskId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(results.rows)
    })
  }
  else if (statusId == 1){
    client.query('UPDATE tasks SET status_id=0 WHERE task_id = $1;', [taskId], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(results.rows)
    })
  }
}
app.put('/changestatus', changeStatus)

// (Delete task)
const deleteThis = (request, response) => {
  const taskId = request.body['task_id']
  console.log(request.body);
  
  client.query('DELETE FROM tasks WHERE task_id = $1;', [taskId], (error, results) => {
    if (error) {
      throw error
    }
    
    response.status(201).send(results.rows)
  })
}
app.put('/deletethis', deleteThis)

// (Edit task)
const editThis = (request, response) => {
  const taskId = request.body['task_id']
  const newTask = request.body['new_task']
  console.log(request.body);
  
  client.query('UPDATE tasks SET description=$1 WHERE task_id = $2;', [newTask, taskId], (error, results) => {
    if (error) {
      throw error
    }

    response.status(201).send(results.rows)
  })
}
app.put('/editthis', editThis)

// Endpoints setup for CRUD operations - end