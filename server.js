const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const Person = require('./models/Person');
const MenuItem = require('./models/Menu');

app.get('/', function (req, res) { 
    res.send('Welcome to my hotel');
});

const personRoutes = require('./routes/personRoutes');
const menuitemRoutes = require('./routes/menuitemRoutes');

app.use('/person', personRoutes);
app.use('/menuitem', menuitemRoutes);

app.listen(PORT, ()=>{
    console.log('Server is running on port 3000');
});