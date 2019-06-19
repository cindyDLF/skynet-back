import express from "express";
import bodyParser from "body-parser";
import data from "../data.json";
import axios from "axios";

const app = express();

const token = "5GYRTTPGLSHSDDIYQ5K6SMVYUFADQIZO";

const witCall = message => {
  axios
    .get(`https://api.wit.ai/message?v=20190618&q=${message}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function(response) {
      console.log(response.data.entities);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => res.json({ res: "Coucou" }));

app.post("/talk", (req, res) => {
  let intent;
  let query;

  axios
    .get(`https://api.wit.ai/message?v=20190618&q=${req.body.text}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function(response) {
      const value = response.data.entities.intent[0].value;
      console.log(value);
      const name = response.data.entities.intent[1].value;
      console.log(name);
      let obj = data.find(o => o.name === name);
      //console.log(obj[value]);

      let messageRepsonse;

      messageRepsonse = JSON.stringify(obj[intent]);

      console.log(messageRepsonse);
      return res.json({ res: "talk" });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
      return res.json({ res: "not found" });
    });
});

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
