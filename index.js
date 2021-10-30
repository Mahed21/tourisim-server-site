const express = require('express')
const { MongoClient } = require('mongodb');
const cors=require('cors');
const ObjectId=require('mongodb').ObjectId;
require('dotenv').config() 
const app = express()
const port =5000
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pszjp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      const database = client.db("trouble");
      const userCollection = database.collection("user");
      //get all api
      app.get('/products',async(req,res)=>
      {
        const cursor=userCollection.find({});
        const products=await cursor.toArray();
        res.send(products);
      })
      //get single api
      app.get('/products/:id',async(req,res)=>
      {
        const id =req.params.id;
        console.log('getting specifiq services');
        const query={_id: ObjectId(id)};
        const user =await userCollection.findOne(query);
        res.send(user);
      })
      //console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      //await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log('port is',port);
})

//mydatatrouble
//K8X3GGt9GBO2gld0
//DB_USER=mydatatrouble
//DB_PASS=K8X3GGt9GBO2gld0