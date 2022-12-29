const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000 ;

const app = express();


app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ojgvcnk.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const PostsCollection = client.db("dbMedia").collection("posts");
        const usersCollection = client.db("dbMedia").collection("users")

        app.post('/posts', async(req, res)=>{
            const posts = req.body;
            const result= await PostsCollection.insertOne(posts);
            res.send(result)
        })

        app.get('/posts', async(req, res)=>{
            const query = {};
            const options = await PostsCollection.find(query).toArray();
            res.send(options);
        })
        
        app.post('/user', async(req, res)=>{
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })
    }
    finally{

    }
}
run().catch(console.log);

app.get('/', async(req, res)=>{
    res.send('media server is running');
})

app.listen(port, ()=>console.log(`Media is running on: ${port}`))