const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


app.use(cors());
app.use(express.json());








const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4h8ai.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    try{
        await client.connect();
        const projectsCollection=client.db('portfolio-projects').collection('projects');  
     
        //get
        app.get('/project', async(req, res) =>{
         const query = {};
         console.log(query);
         const cursur = projectsCollection.find(query);
         const project = await cursur.toArray();
         res.send(project);

        })

        //post

        app.get('/project/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const project = await projectsCollection.findOne(query);
            res.send(project);
        });


    }
    finally{

    }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send('Server is running')
})

app.listen(port,() =>{
    console.log('Listening to port', port);
})