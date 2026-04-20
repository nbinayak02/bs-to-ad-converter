const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const pkg = require("nepali-date-converter");
const NepaliDate = pkg.NepaliDate || pkg.default;
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Hello world! Welcome to bs-to-ad-converter" });
});

app.get("/toAdTimestamp/:bsYear/:bsMonth/:bsDay", (req, res) => {
  const { bsYear, bsMonth, bsDay } = req.params;
  if (!bsYear || !bsMonth || !bsDay)
    return res
      .status(422)
      .json({ message: "Please provide BS year, month and date" });

  try {
    const date = new NepaliDate(`${bsYear}-${bsMonth}-${bsDay}`).toJsDate();
    return res.status(200).json({ timestamp: date });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
app.listen(PORT, () => console.log("Server started"));
