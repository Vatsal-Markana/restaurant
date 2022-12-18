// const MigrationJob = require('mysql-mongodb-migrate');
 
// let sourceConnectionOptions = {
//     host: "localhost",
//     user: "root",
//     password: "",
// };
// let targetConnectionOptions = {
//     host: "mongodb://localhost:27017",
// };
 
// const migrationJob = new MigrationJob("restaurant", "item", "restaurant", "item", sourceConnectionOptions, targetConnectionOptions);
 
// migrationJob.run()


var MongoClient = require('mongodb').MongoClient;
var sql = require('mysql');

const config = require('./assets/config');

var pool  = sql.createPool({
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'restaurant'
});

async function transaction() {
  try{
    const mongodbUrl = 'mongourl';
    const client = await MongoClient.connect(mongodbUrl, {useNewUrlParser: true}, {useUnifiedTopology: true});
    const db = client.db();
    const collection = client.db('mongodbName').collection(config.mongoCollection);

    //Map your query list to an array of runSql promises
    //this will complete when all queries return, and jump to the catch if any fail
    let results = await Promise.all(config.queryList.map(runSql))
    
    //Map the results to an array of mongo inserts
    let inserts = await Promise.all(results.map(r=>collection.insertMany(r.recordset)))
    
    //Close all connections
    pool.end((err)=>err?console.err(err):console.log('MySQL Closed'))
    client.close((err)=>err?console.err(err):console.log('MongoDB Closed'))
  }
  catch(err){
    console.error(err)
  }
};

transaction();

function runSql(queryStr){
    return new Promise((resolve, reject)=>{
        pool.query(queryStr, function (error, results, fields){
            error?reject(error):resolve(results)
        })  
    })
}