"use strict";
const { MongoClient, ObjectID } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const bcrypt = require("bcrypt");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createPatient = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("final_project");

    console.log(req.body);

    const { email, firstName, lastName } = req.body;

    const doctor = ObjectID(req.body.doctor);

    const doctors = [];

    const newDoctor = (doctor) => {
      doctors.push(doctor);
    };

    newDoctor(doctor);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await db.collection("patients").insertOne({
      email,
      firstName,
      lastName,
      hashedPassword,
      doctors,
    });

    try {
      await db
        .collection("doctors")
        .updateOne(
          { _id: doctor },
          { $addToSet: { patients: user.insertedId } }
        );
    } catch (err) {
      console.log(err.message, "doctor message");
    }

    res.status(201).json({
      status: 201,
      user: { email, firstName, lastName },
    });
  } catch (err) {
    res.status(400).json({ status: 404, message: err.message });
    console.log(err.message);
  }
  client.close();
};

const getPatients = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const _id = req.params.user;
  try {
    await client.connect();

    const db = client.db("final_project");
    console.log("connected");

    const doctor = await db
      .collection("doctors")
      .findOne({ _id: ObjectID(_id) });

    const patientsArray = doctor.patients;

    console.log(patientsArray);

    const patients = [];

    const findPatient = async (id) => {
      const patient = await db
        .collection("patients")
        .findOne({ _id: ObjectID(id) });
      return patient;
    };

    for (let patientId of patientsArray) {
      console.log(patientId);
      const patient = await findPatient(patientId);
      patients.push(patient);
    }

    console.log(patients);

    res.status(201).json({
      status: 201,
      patients,
    });
  } catch (err) {
    res.status(400).json({ status: 404, message: err.message });
    console.log(err.message);
  }
  client.close();
};

const getPatient = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  console.log(req.params);
  const _id = req.params.id;
  try {
    await client.connect();

    const db = client.db("final_project");
    console.log("connected");

    const patient = await db
      .collection("patients")
      .findOne({ _id: ObjectID(_id) });

    console.log(patient);

    res.status(201).json({
      status: 201,
      patient,
    });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
    console.log(err.message);
  }
  client.close();
};

const updatePatient = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  console.log(req.body);
  const query = req.body;
  const _id = req.params._id;
  try {
    await client.connect();
    const db = client.db("final_project");
    console.log("connected");

    await db
      .collection("patients")
      .updateOne({ _id: ObjectID(_id) }, { $set: query });
    res.status(201).json({
      status: 201,
      _id,
      query,
    });
  } catch (err) {
    res.status(400).json({ status: 404, message: err.message });
    console.log(err.message);
  }
  client.close();
  console.log("disconnected");
};

const deletePatient = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  const { _id } = req.params;

  try {
    // to do: fix
    await client.connect();
    const db = client.db("final_project");
    console.log("connected");

    await db.collection("doctors").deleteOne({ _id: ObjectID(_id) });
    res.status(204).json({ status: 204, data: _id });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: "error" });
  }
  client.close();
  console.log("disconnected");
};

module.exports = {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
};
