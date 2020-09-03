"use strict";
const assert = require("assert");

const { MongoClient, ObjectId, ObjectID } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createDoctor = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("final_project");

    const { email, phone, firstName, lastName, userName, practice } = req.body;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    console.log(email);

    //find user email
    //if user email exists
    //send bad
    //if good,
    //keep going :)

    await db.collection("doctors").insertOne({
      email,
      firstName,
      lastName,
      phone,
      practice,
      hashedPassword,
    });
    res.status(201).json({
      status: 201,
      user: { email, firstName, lastName, userName, practice },
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: 404, message: err.message });
  }
  client.close();
};

const getDoctor = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const { _id } = req.body;

    const db = client.db("final_project");
    console.log("connected");

    await db.collection("patients").findOne({ _id: ObjectId(_id) });

    res.status(200).json({ status: 200, data: _id });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
  client.close();
};

const getDoctors = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const _id = req.params.user;

  try {
    await client.connect();

    const db = client.db("final_project");
    console.log("connected");

    const patient = await db
      .collection("patients")
      .findOne({ _id: ObjectId(_id) });

    const doctorsArray = patient.doctors;

    const doctors = [];

    const findDoctor = async (id) => {
      const doctor = await db
        .collection("doctors")
        .findOne({ _id: ObjectID(id) });
      return doctor;
    };

    for (let doctorId of doctorsArray) {
      console.log(doctorId);
      const doctor = await findDoctor(doctorId);
      doctors.push(doctor);
    }

    res.status(200).json({ status: 200, doctors });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
    console.log(err.message);
  }
  client.close();
  console.log("disconnected");
};

const updateDoctor = async (req, res) => {
  const { _id } = req.body._id;
  const newValues = { $set: req.body.patient };

  console.log(newValues);
  const query = { _id };
  console.log(query);
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("final_project");
    console.log("connected");

    const r = await db.collection("doctors").updateOne(query, newValues);

    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);
    res.status(200).json({ status: 200, _id, ...req.body });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
  client.close();
};

const addDoctor = async (req, res) => {
  const patient = req.params.user;
  const doctor = req.body.key;
  console.log(doctor);
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("final_project");
    console.log("connected");

    await db
      .collection("patients")
      .updateOne(
        { _id: ObjectID(patient) },
        { $addToSet: { doctors: ObjectID(doctor) } }
      );

    await db.collection("doctors").updateOne(
      {
        _id: ObjectID(doctor),
      },
      { $addToSet: { patients: ObjectID(patient) } }
    );

    res.status(201).json({
      status: 201,
      message: "doctor successfuly added",
    });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
    console.log(err.message);
  }
  client.close();
  console.log("disconnected");
};

module.exports = {
  createDoctor,
  getDoctor,
  getDoctors,
  updateDoctor,
  addDoctor,
};
