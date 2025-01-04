const mongoose = require('mongoose');

// Define the mongodb url
const mongoURL = 'mongodb://localhost:27017/newtestDB';

//Setup MongoDB connection
mongoose.connect(mongoURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.log('MongoDB connection error: ', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;