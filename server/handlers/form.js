"use strict";
const assert = require("assert");

const { MongoClient, ObjectId, ObjectID } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const postForm = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  console.log(req.params);
  console.log(req.body);
  const _id = req.params.user;
  try {
    await client.connect();

    const db = client.db("final_project");

    console.log("connected");

    const patient = ObjectID(_id);
    const { feeling, sleep } = req.body;
    const doctor = ObjectID(req.body.doctor);

    const form = await db
      .collection("forms")
      .insertOne({ feeling, sleep, patient, doctor });

    res.status(201).json({
      status: 201,
      form,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: 404, message: err.message });
  }
  client.close();
  console.log("disconnected");
};

const getForms = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const _id = req.params.user;

  try {
    await client.connect();

    const db = client.db("final_project");

    console.log("connected");

    console.log(req.params);
    console.log(_id);

    const forms = await db
      .collection("forms")
      .findOne({ patient: ObjectID(_id) });
    console.log(forms);

    res.status(201).json({
      status: 201,
      forms,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: 404, message: err.message });
  }
  client.close();
  console.log("disconnected");
};

module.exports = { postForm, getForms };
