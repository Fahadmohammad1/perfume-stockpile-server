const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bbmxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const perfumeCollection = client
      .db("perfumeWarhouse")
      .collection("perfume");

    app.get("/perfume", async (req, res) => {
      const query = {};
      const cursor = perfumeCollection.find(query);
      const perfumes = await cursor.toArray();
      res.send(perfumes);
    });

    app.get("/perfume/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const perfume = await perfumeCollection.findOne(query);
      res.send(perfume);
      console.log(perfume);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hey iam running");
});

app.listen(port, () => {
  console.log("listening", port);
});
