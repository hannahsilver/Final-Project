const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUser = async (req, res) => {
  // deconstruct req.body
  const { _id } = req.body;

  // create client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect client
    await client.connect();

    // connect db
    const db = client.db("final_project");
    console.log("Connected!");

    // find user in users collection
    const doctorUser = await db
      .collection("doctors")
      .findOne({ _id: ObjectId(_id) });
    console.log(doctorUser);

    const patientUser = await db
      .collection("patients")
      .findOne({ _id: ObjectId(_id) });
    console.log(patientUser);

    if (doctorUser === null) {
      const { _id, firstName, email, doctors } = patientUser;
      res
        .status(200)
        .json({ status: 200, user: { _id, firstName, email, doctors } });
    } else if (patientUser === null) {
      const { _id, firstName, email } = doctorUser;
      res.status(200).json({ status: 200, user: { _id, firstName, email } });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "No user found with that id." });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }

  // close connection
  client.close();
  console.log("Disconnected!");
};

module.exports = { getUser };
