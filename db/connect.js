const db = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const MongoClient = db.MongoClient;
const uri = process.env.MONGODB_URI;

let _db;

const connectDB = callback => {
    if (_db) {
        console.log('Already connected to database');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
            console.log('Connected to database');
        })
        .catch((err) => {
            console.error('Failed to connect to database', err);
            callback(err);
        });
};


const getDB = () => {
  if (!_db) {
    throw new Error('Database not initialized');
  }
  return _db;
};

module.exports = {
  connectDB,
  getDB,
};
