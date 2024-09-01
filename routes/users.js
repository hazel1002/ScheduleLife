import express from 'express';
const router = express.Router();
import db from "../db/conn.js"
import { ObjectId } from 'mongodb';

// Mock database
const users = [
  {
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
  },
  {
    first_name: 'Alice',
    last_name: 'Smith',
    email: 'alicesmith@example.com',
  },
];

// Getting the list of users
router.get('/', async (req, res) => {
    //res.send(users);
    let collection = await db.collection("PlayList");
    let results = await collection.find({})
      .limit(50)
      .toArray();
    res.send(results).status(200);
})

// Get a single user
router.get("/:id", async (req, res) => {
  let collection = await db.collection("PlayList");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Add a user
router.post('/', async (req, res) => {
  let collection = await db.collection("PlayList");
  let newUser = req.body;
  newUser.date = new Date();
  let result = await collection.insertOne(newUser);
  res.send(result).status(204);
}) 



export default router