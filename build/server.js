"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _data = require("../data.json");

var _data2 = _interopRequireDefault(_data);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var token = "5GYRTTPGLSHSDDIYQ5K6SMVYUFADQIZO";

var witCall = function witCall(message) {
  _axios2.default.get("https://api.wit.ai/message?v=20190618&q=" + message, {
    headers: { Authorization: "Bearer " + token }
  }).then(function (response) {
    console.log(response.data.entities);
  }).catch(function (error) {
    // handle error
    console.log(error);
  });
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var port = process.env.PORT || 3000;
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.get("/", function (req, res) {
  return res.json({ res: "Coucou" });
});

app.post("/talk", function (req, res) {
  var intent = void 0;
  var query = void 0;

  _axios2.default.get("https://api.wit.ai/message?v=20190618&q=" + req.body.text, {
    headers: { Authorization: "Bearer " + token }
  }).then(function (response) {
    var value = response.data.entities.intent[0].value;
    console.log(value);
    var name = response.data.entities.intent[1].value;
    console.log(name);
    var obj = _data2.default.find(function (o) {
      return o.name === name;
    });
    //console.log(obj[value]);

    var messageRepsonse = void 0;

    messageRepsonse = JSON.stringify(obj[intent]);

    console.log(messageRepsonse);
    return res.json({ res: "talk" });
  }).catch(function (error) {
    // handle error
    console.log(error);
    return res.json({ res: "not found" });
  });
});

app.listen(port, function () {
  console.log("connected to port " + port);
});
//# sourceMappingURL=server.js.map