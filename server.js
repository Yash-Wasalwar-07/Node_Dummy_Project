const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/Person');
const MenuItem = require('./models/Menu');

app.get('/', function (req, res) { 
    res.send('Welcome to my hotel');
});

const personRoutes = require('./routes/personRoutes');
const menuitemRoutes = require('./routes/menuitemRoutes');

app.use('/person', personRoutes);
app.use('/menuitem', menuitemRoutes);

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});