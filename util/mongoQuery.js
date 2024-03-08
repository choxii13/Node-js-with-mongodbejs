const mongodb = require("mongodb");
const db = require("../data/database");
const ObjectId = mongodb.ObjectId;

let database;
async function findOne(collection, id, argument = null) {
  database = await db
    .getDb()
    .collection(collection)
    .findOne({ _id: new ObjectId(id) }, argument);
  return database;
}

async function find(collection) {
  database = await db.getDb().collection(collection).find().toArray();
  return database;
}

async function insertOne(collection, data) {
  database = await db.getDb().collection(collection).insertOne(data);
  return database;
}

async function updateOne(id, data) {
  await db
    .getDb()
    .collection("posts")
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
  return database;
}

async function deleteOne(collection, id) {
  await db
    .getDb()
    .collection(collection)
    .deleteOne({ _id: new ObjectId(id) });
  return database;
}

module.exports = { findOne, find, insertOne, updateOne, deleteOne };
