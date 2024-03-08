const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;
async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("blog");
}

function getDb() {
  if (!database) {
    throw { message: "Database connection is Not Established" };
  }
  return database;
}

module.exports = { connectToDatabase, getDb };
