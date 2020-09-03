"use strict";
const { MongoClient, ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const authenticatePatient = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const _id = req.body.authentication;
  try {
    await client.connect();

    const db = client.db("final_project");
    console.log("connected");

    await db.collection("doctors").findOne({ _id: ObjectID(_id) });

    res
      .status(201)
      .json({ status: 201, data: { _id }, message: "found doctor" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
  client.close();
};

module.exports = { authenticatePatient };
