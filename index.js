const express = require('express')
const app = express()

const connectionURL='mongodb://localhost:27017'
const databaseName='taskmanager'
const MongoClient = require('mongodb').MongoClient

app.use(
    express.urlencoded({
        extended:true
    })
)
app.get('', (req, res)=> {
    res.send('Hello')
})

app.get('/task', (req, res)=> {
   MongoClient.connect(connectionURL, (error, client) => {
       if(error){
           return console.log('Unable to connect')
       }
       console.log('Connection successful')
       let filter={};
       if(req.query.done){
           if(req.query.done=='true')
                 filter.done=true;
           else
                filter.done=false;
       }else if(req.query.priority){
       filter.priority=parseInt(req.query.priority);
    }
    console.log(filter)
    const db=client.db(databaseName)

    db.collection('tasks').find(filter).toArray( (err, result)=> {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
   })
})

app.listen(3000, ()=>{
    console.log('Server is running')
})


app.get('/task/new', (req, res)=> {
  const data = req.body;
  const name = data.name;
  const priority = data.priority;
  let price = 'undefined';
  if(data.price){
      price=data.price;
  }
  console.log(name, '', priority, '', price);
})
