import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the users.
router.get("/", async (req, res) => {
  let collection = db.collection("users");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = db.collection("users");
  let query = { _id: req.params.id };
  let result = await collection.findOne(query);

  if (!result) res.sendStatus(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  let newDocument = {
    _id: req.body._id,
    _type: req.body._type,
    userName: req.body.userName,
    email: req.body.email,
    image: req.body.image,
    projects: req.body.projects,
  };
  let collection = db.collection("users");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: req.params.id };
  const updates = {
    $set: {
      _id: req.body._id,
      _type: req.body._type,
      userName: req.body.userName,
      email: req.body.email,
      image: req.body.image,
      projects: req.body.projects,
    },
  };

  let collection = db.collection("users");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: req.params.id };

  const collection = db.collection("users");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
