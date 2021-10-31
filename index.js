const express = require('express')
const { MongoClient } = require('mongodb');
const cors=require('cors');
const ObjectId=require('mongodb').ObjectId;
require('dotenv').config() 
const app = express()
const port =process.env.PORT || 5000
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pszjp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      const database = client.db("trouble");
      const userCollection = database.collection("user");
      const userOrder = database.collection("client");
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
        const query={_id: ObjectId(id)};
        const user =await userCollection.findOne(query);
        res.send(user);
      })
      //post client to server
      app.post('/order', async (req,res)=>
      {
        //console.log(req.body);
        const newUser=req.body;
        const result = await userOrder.insertOne(newUser);
        res.json(result);
     }) 

      app.get('/order',async(req,res)=>
      {
        const cursor=userOrder.find({});
        const products=await cursor.toArray();
        res.send(products);
      })
      //add services from client 
      app.post('/products',async (req,res)=>
      {
        const newUser=req.body;
        //console.log(newUser);
        const result=await userCollection.insertOne(newUser);
        res.json(result);

      })
      app.delete('/order/:id' , async (req,res)=>
      {
        const id =req.params.id;
        const query ={_id : ObjectId(id)};
        const result =await userOrder.deleteOne(query);
        res.json(result);
        
      })
      app.get('/order/:email' , async (req,res)=>
      {
        const userEmail =req.params.email;
        const query ={email:{$in :[userEmail]}};
      
        const result =await userOrder.find(query).toArray();
        res.json(result);
        
      })
      app.put('/order/:id', async(req,res)=>
      {
        
        const id=req.params.id;
        
        const UpdateUser= req.body;
        const filter ={_id:ObjectId(id)};
        const option={upset:true}
        const updateDoc={
          $set:{
            
            status:'Active',
           

          },
        };
        const result= await userOrder.updateOne(filter,updateDoc,option);
        res.send(result);
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