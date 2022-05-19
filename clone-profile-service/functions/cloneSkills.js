
async function applySkills(client, workspaceSid, workerSid, skillsAttributes) {
  const existingAttributes = await client.taskrouter.workspaces(workspaceSid)
    .workers(workerSid)
    .fetch().then(worker => worker.attributes);


  const updatedAttributes = {
    ...JSON.parse(existingAttributes),
    ...skillsAttributes
  }


  await client.taskrouter
    .workspaces(workspaceSid)
    .workers(workerSid)
    .update({ attributes: JSON.stringify(updatedAttributes) });

}


exports.handler = async function (context, event, callback) {

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.appendHeader('Content-Type', 'application/json');

  const client = context.getTwilioClient();

  const { sourceWorkerSid, targerWorkerSidList } = event;
  const workspaceSid = context.TWILIO_TASKROUTER_WORKSPACE_SID;

  const sourceAttributeString = await client.taskrouter.workspaces(workspaceSid)
    .workers(sourceWorkerSid)
    .fetch().then(worker => worker.attributes);

  const sourceAttributes = JSON.parse(sourceAttributeString);




  const skillsPayload = {
    routing: sourceAttributes.routing,
    disabled_skills: sourceAttributes.disabled_skills
  };


  for (let wIter = 0; wIter < targerWorkerSidList.length; wIter++) {
    workerSid = targerWorkerSidList[wIter];
    try {
      await applySkills(client, workspaceSid, workerSid, skillsPayload)
    } catch (e) {
      console.error(e);
    }
  }





  response.setBody({ "message": "success" });
  return callback(null, response);

};