const express = require('express')
const app = express()


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

