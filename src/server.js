import express from "express";

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.json({ res: "Coucou" }));

app.post("/talk", (req, res) => res.json({ res: "talk" }));

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
