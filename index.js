const express = require('express');
const path = require('path');
const { Client } = require('pg');
const result = require('dotenv').config();
if (result.error) {
  throw result.error
}

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

async function query (q) {
  const client = await client.connect()
  let res
  try {
    await client.query('BEGIN')
    try {
      res = await client.query(q)
      await client.query('COMMIT')
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    }
  } finally {
    client.release()
  }
  return res
}


async function getDatabaseInfo()
{

	let result = "";


	await client.connect();

	await client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
		if (err) throw err;

		for (let row of res.rows) {
			result += (JSON.stringify(row)) + "\n";
		}

		client.end();

	}).then(result => {return result;});
}

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
	const dbInfo =  getDatabaseInfo();
	const value = dbInfo.then(result => {result.subString(0,20);}) ;
	var list = ["item1", "item2", "item3", ];
	res.json(list);
	console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
