const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

// db config file
require("./config/db");

const poll = require('./routes/poll'); // poll is the route component

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());

app.use('/poll',poll);

const port = 3001;

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));