const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  const uri =
    'mongodb+srv://nminh:120797@to-do-app.xra9h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

  MongoClient.connect(uri, { useUnifiedTopology: true })
    .then((client) => {
      console.log('Connected');
      _db = client.db();
      callback(client);
    })
    .catch((error) => {
      console.log('Can not connect', error);
      throw error;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No Database Found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
