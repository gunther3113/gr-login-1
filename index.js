const express = require('express');
const path = require('path');
const { Client } = require('pg');
const { v4 } = require('uuid');
const bodyParser = require('body-parser');



const result = require('dotenv').config();
if (result.error) {
  throw result.error
}

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const client = new Client({
	connectionString: process.env.DATABASE_URL
});

async function query (q, params) {
  await client.connect()
  let res
  try {
    await client.query('BEGIN')
    try {
      res = await client.query(q, params)
      await client.query('COMMIT')
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    }
  } finally {
    client.end()
  }
  return res
}


// An api endpoint that returns a short list of items
app.get('/api/getList', async (req,res) => {
	const dbInfo = await query("select * from postgres.public.users");
	var list = ["item1", "item2", "item3", JSON.stringify(dbInfo.rows) ];
	res.json(list);
	console.log('Sent list of items');
});


app.post('/api/signup', async (req,res) => {
    console.log(req.body);
	await query('INSERT INTO postgres.public.users (id, firstName, lastName, email, password) VALUES ($1, $2, $3, $4, $5)',
        [v4(), req.body.firstName, req.body.lastName, req.body.email, req.body.password]);
	res.end();
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
