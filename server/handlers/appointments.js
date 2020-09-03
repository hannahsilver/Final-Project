"use strict";
const { MongoClient, ObjectID } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createAppointment = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  console.log(req.body);
  const doctor = req.body.doctor;
  const patient = req.body.patient;
  const date = req.body.date;
  try {
    await client.connect();

    const db = client.db("final_project");
    console.log("connected");

    (await db.collection("appointments").insertOne({
      patient: ObjectID(patient),
      doctor: ObjectID(doctor),
      date: new Date(date),
    })) + res.status(201).json({ status: 201, message: "appointment added" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
  client.close();
  console.log("disconnected");
};

const getAppointments = async (req, res) => {
  console.log(req.params);
  const client = await MongoClient(MONGO_URI, options);
  const doctor = req.params.doctor;
  const patient = req.params.patient;
  try {
    await client.connect();
    const db = client.db("final_project");
    console.log("connected");

    const dates = await db
      .collection("appointments")
      .find({ patient: ObjectID(patient), doctor: ObjectID(doctor) })
      .sort({ date: 1 })
      .toArray();

    //date-fns
    //moment

    console.log(dates);

    res.status(200).json({ status: 200, dates });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
    console.log(err.message);
  }
  client.close();
  console.log("disconnected");
};

module.exports = { createAppointment, getAppointments };
