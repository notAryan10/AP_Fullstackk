const mysql = require("mysql2/promise");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173"  
}));

let db;

app.get("/contacts", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM contacts");
    res.json(rows);
  } catch (err) {
    res.status(500).send("Error fetching contacts");
  }
});

app.post("/contacts", async (req, res) => {
  try {
    await db.query(
      "INSERT INTO contacts(fullname, phoneno, email) VALUES (?, ?, ?)",
      [req.body.fullname, req.body.phoneno, req.body.email]
    );
    res.send("Contact added successfully");
  } catch (err) {
    res.status(500).send("Error inserting contact");
  }
});

mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "contact_db",
  password: "pass",
}).then((connection) => {
  db = connection;
  console.log("Database connected successfully");
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});
