const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const handleLogin = async (req, res) => {
  // create client
  const client = await MongoClient(MONGO_URI, options);

  try {
    // connect client
    await client.connect();

    // connect db
    const db = client.db("final_project");
    console.log("Connected!");

    // deconstruct req.body
    const { email, password } = req.body;

    // find user in collection

    const doctorInfo = await db.collection("doctors").findOne({ email });
    console.log(doctorInfo);

    const patientInfo = await db.collection("patients").findOne({ email });

    console.log(patientInfo, "patientInfo");

    if (doctorInfo === null) {
      const { _id, firstName, email, hashedPassword } = patientInfo;
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        res.status(200).json({
          status: 200,
          user: { _id, firstName, email, role: "patient" },
          message: "Successful login",
        });
        console.log("Successful login");
      } else {
        res.status(400).json({
          status: 400,
          message: "Your password is incorrect.",
        });
      }
    } else if (patientInfo === null) {
      const { _id, firstName, email, hashedPassword } = doctorInfo;
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        res.status(200).json({
          status: 200,
          user: { _id, firstName, email, role: "doctor" },
          message: "Successful login",
        });
        console.log("Successful login");
      } else {
        res.status(400).json({
          status: 400,
          message: "Your password is incorrect.",
        });
      }
    } else {
      res
        .status(404)
        .json({ status: 404, message: "No user found with that email." });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
    console.log(err.message);
  }

  // close connection
  client.close();
  console.log("Disconnected!");
};

module.exports = { handleLogin };
