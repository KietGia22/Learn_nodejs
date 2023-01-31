const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

//connect with database
//connecting and then storing the connection to the database
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://kietng:yukino103@cluster0.ycresv7.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
    console.log('Connected');
    //store access to the databasse here
    _db = client.db( );
    //truyen vao callback sau khi ta da ket noi
    //the result will be the client so basically a client object thich gives us access to the database
     callback();
  }).catch(err => {
    console.log(err);  
    throw err;
  });
};

//return access to that conected database if it exists
const getDb = () =>{
  if(_db){
    return _db;
  }
  throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
