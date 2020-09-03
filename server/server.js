"use strict";

if (process.env.NODE_ENV !== "production") {
  require("dotenv");
}

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const {
  createDoctor,
  getDoctor,
  getDoctors,
  updateDoctor,
  addDoctor,
} = require("./handlers/doctors");
const {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
} = require("./handlers/patients");

const { getUser } = require("./handlers/getUser");

const { postForm, getForms } = require("./handlers/form");

const { handleLogin } = require("./handlers/Login");
const { authenticatePatient } = require("./handlers/authentication");
const {
  createAppointment,
  getAppointments,
} = require("./handlers/appointments");

require("dotenv").config();
const PORT = 4000;

express()
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  .get("/:user/doctors", getDoctors)
  .post("/:user/doctors", addDoctor)

  .post("/doctors", createDoctor)
  .put("/doctors", updateDoctor)

  .post("/doctor", authenticatePatient)

  .post("/patients", createPatient)
  .get("/patients/:id", getPatient)
  .put("/patients/:_id", updatePatient)
  .delete("/patients/:_id", deletePatient)

  .get("/:user/patients", getPatients)

  .post("/:user/form", postForm)
  .get("/:user/form", getForms)

  .post("/appointment", createAppointment)
  .get("/appointment/:doctor/:patient", getAppointments)

  .post("/login", handleLogin)
  .post("/getUser", getUser)

  .get("/bacon", (req, res) => res.status(200).json("🥓"))

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
