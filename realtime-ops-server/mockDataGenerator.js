const fs = require('fs')
const ejs = require('ejs');
require('dotenv').config()


const workerCreatedTemplateString = fs.readFileSync('./templates/worker-created.json', 'utf8');
const workerCreatedTemplate = ejs.compile(workerCreatedTemplateString, {});

const workerActivityUpdateTemplateString = fs.readFileSync('./templates/worker-activity-update.json', 'utf8');
const workerActivityUpdateTemplate = ejs.compile(workerActivityUpdateTemplateString, {});


const reservationAcceptedTemplateString = fs.readFileSync('./templates/reservation-accepted.json', 'utf8');
const reservationAcceptedTemplate = ejs.compile(reservationAcceptedTemplateString, {});

const reservationCompletedTemplateString = fs.readFileSync('./templates/reservation-completed.json', 'utf8');
const reservationCompletedTemplate = ejs.compile(reservationCompletedTemplateString, {});



const Redis = require("ioredis");
const redis = new Redis({
  host:process.env.REDIS_HOST,
  port:process.env.REDIS_PORT,
  password:process.env.REDIS_PASSWORD

});

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}


function emitEvent(payloadString){
    processEvent(JSON.parse(payloadString));
}


async function processEvent(eventPayload){

    const eventWorkerSid = eventPayload.data.payload.worker_sid;
    const newActivity = eventPayload.data.payload.worker_activity_name
    switch(eventPayload.type) {
        
        case 'com.twilio.taskrouter.worker.created':
            await redis.hset("worker-status", {[eventWorkerSid]:'created'});
          break;
        case 'com.twilio.taskrouter.worker.activity.update':
            
            await redis.hset("worker-status", {[eventWorkerSid]:newActivity});
          break;
          case 'com.twilio.taskrouter.reservation.accepted':
            await redis.hset("worker-status", {[eventWorkerSid]:'On a call'});
            break;
        case 'com.twilio.taskrouter.reservation.completed':
                
                await redis.hset("worker-status", {[eventWorkerSid]:newActivity});
            break;
        default:
          // code block
      }

}


const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function main(){
    const ITERATION_COUNT = 1000;
    const WORKER_COUNT = 1000;

    let workerArr = [];


    //Create 100 workers
    for(let i=0;i<WORKER_COUNT;i++){
        workerArr.push(`WK${i}`);

        emitEvent(workerCreatedTemplate(
            {workerSid:`WK${i}`}))
    }

  

  //Set all of them as available 
  for(let i=0;i<WORKER_COUNT;i++){
    emitEvent(workerActivityUpdateTemplate(
        {workerSid:`WK${i}`,
        newActivityName:'Available'
    }))
}





for(let iter=0;iter<ITERATION_COUNT;iter++){
    // take sample set of workers
    let iterationWorkersSet = getRandomSubarray(workerArr,workerArr.length*Math.random());
     console.log(iterationWorkersSet);
//Accept Reservations for workers
     iterationWorkersSet.forEach(element => {
        emitEvent(reservationAcceptedTemplate(
            {workerSid:element,
        }))
     });

     await delay(1000);

  //Complete Reservations for workers
     iterationWorkersSet.forEach(element => {
        emitEvent(reservationCompletedTemplate(
            {workerSid:element,
        }))
     });



}





}


main();
