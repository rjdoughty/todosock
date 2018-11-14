
// ===========================================================
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
//const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const PORT = process.env.PORT || 8080;



//Initialize Express

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Connect to the Mongo DB using the database (will be created if it doesn't exist)
//mongoose.connect('mongodb://localhost/tasklist', { useNewUrlParser: true });
mongoose.connect('mongodb://todosock:abc123@ds163013.mlab.com:63013/heroku_cwbrfx0x', { useNewUrlParser: true });

// Import our routes and pass it 'app' as an argument
require('./sockets/task-sockets.js')(io);
require('./routes/routes.js')(app);



// Listener
// ===========================================================
server.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
  });