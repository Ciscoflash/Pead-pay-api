// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config();

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.MONGODB_URI, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// console.log(process.env.MONGODB_Uri)

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }

// run().catch(console.dir);
const mongoose = require("mongoose");

const connectDb = () => {
  const config = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  // const url = "mongodb+srv://WEB3IQ:33bYAOgWrpVFZgNW@cluster1.ebin1dx.mongodb.net/Web3IQDb"
  // const uri = 'mongodb://127.0.0.1:27017/testCase'
  mongoose.connect(process.env.MONGODB_URI, config);
  mongoose.connection.on("open", () => {
    console.log("Server Connected");
  });
  mongoose.connection.on("error", (e) => {
    console.log(e);
  });
};

module.exports = connectDb;
