const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

const api = require('./server/routes/api');

//Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Serve Static files
app.use(express.static(path.join(__dirname, 'dist')));

//Set API routes
app.use('/api', api);

//Return other routes to Angular index file..
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

//Create HTTP server
const server = http.createServer(app);

server.listen(port, () => console.log('Running on localhost:${port}'));