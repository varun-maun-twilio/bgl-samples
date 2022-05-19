const PAGE_SIZE = 900;

async function fetchAllWorkers(client,workspaceSid){
    const workerList = [];
    let pageToken = null;    
    while (true) {
      const { nextPageUrl, instances = [] } = await client.taskrouter.workspaces(workspaceSid)
      .workers
      .page({ pageSize:PAGE_SIZE, pageToken });
      workerList.push(...instances.map(w=>{return {
        activityName:w.activityName,
        attributes:JSON.parse(w.attributes||{}),
        available:w.available,
        friendlyName:w.friendlyName,
        sid:w.sid
      }}));
      if (nextPageUrl == null) {
        break;
      }
      pageToken = url.parse(nextPageUrl, true).query.PageToken;
    }
    return workerList;
}


exports.handler =  async function(context, event, callback) {

    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
    response.appendHeader('Content-Type', 'application/json');

    const client = context.getTwilioClient();
    const workerList = await fetchAllWorkers(client,context.TWILIO_TASKROUTER_WORKSPACE_SID);
    response.setBody(workerList);
    return callback(null, response);

    };