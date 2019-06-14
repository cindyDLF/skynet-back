"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = process.env.PORT || 3000;

app.get("/", function (req, res) {
  return res.json({ res: "Coucou" });
});

app.post("/talk", function (req, res) {
  return res.json({ res: "talk" });
});

app.listen(port, function () {
  console.log("connected to port " + port);
});
//# sourceMappingURL=server.js.map