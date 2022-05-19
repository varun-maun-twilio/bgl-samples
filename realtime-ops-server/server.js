require('dotenv').config()

const Redis = require("ioredis");
const redis = new Redis({
  host:process.env.REDIS_HOST,
  port:process.env.REDIS_PORT,
  password:process.env.REDIS_PASSWORD
});


const express = require('express')
const app = express()
const port = 8888




app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  const allWorkers = await redis.hgetall("worker-status");
  const statusStats = Object.entries(allWorkers)
                            .reduce((prev,curr)=>{
                              let cs = curr[1]; 
                              let no = {...prev}; 
                              if(no[cs]==null){
                                  no[cs]=1
                              }
                              else{
                                no[cs]=no[cs]+1
                              } 
                              return no},{})



  res.send(JSON.stringify(statusStats))
})

app.get('/worker-status-list', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  const all = await redis.hgetall("worker-status");
  res.send(JSON.stringify(all))
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})