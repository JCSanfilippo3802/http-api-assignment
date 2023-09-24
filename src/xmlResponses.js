// function to send a XML object
const respondXML = (request, response, status, xmlText) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(xmlText);
  response.end();
};

// function to show a success status code
const success = (request, response) => {
  // message to send
  const responseXML = '<response><message>\'This is a successful response\'</message></response>';

  console.log(responseXML);
  // send our XML with a success status code
  respondXML(request, response, 200, responseXML);
};

const badRequest = (request, response, params) => {
  // message to send
  let responseXML = '<response><message>\'This request has the required parameters\'</message></response>';

  if (!params.valid || params.valid !== 'true') {
    // set our error message and id
    responseXML = '<response><id>\'badRequest\'</id><message>\'Missing valid query parameter set to true\'</message></response>';

    console.log(responseXML);
    return respondXML(request, response, 400, responseXML);
  }

  console.log(responseXML);
  // if the parameter is here, send XML with a success status code
  return respondXML(request, response, 200, responseXML);
};

const unauthorized = (request, response, params) => {
  // message to send
  let responseXML = '<response><message>\'This request has the required parameters\'</message></response>';

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // set our error message and id
    responseXML = '<response><message>\'Unauthorized to view page\'<id>\'unauthorized\'</id></response>';
    
    console.log(responseXML);
    // return our XML with a 400 bad request code
    return respondXML(request, response, 401, responseXML);
  }

  console.log(responseXML);
  // if the parameter is here, send XML with a success status code
  return respondXML(request, response, 200, responseXML);
};

const forbidden = (request, response) => {
  // message and id to send
  const responseXML = '<response><message>\'Forbidden from viewing this information\'</message><id>\'forbidden\'</id></response>';

  console.log(responseXML);
  return respondXML(request, response, 403, responseXML);
};

const internal = (request, response) => {
  // message and id to send
  const responseXML = '<response><message>\'An error with the server occured, please contact support or check server status\'</message><id>\'internal\'</id></response>';

  console.log(responseXML);
  return respondXML(request, response, 500, responseXML);
};

const notImplemented = (request, response) => {
  // message and id to send
  const responseXML = '<response><message>\'Feature not implemented\'</message><id>\'internal\'</id></response>';

  console.log(responseXML);
  return respondXML(request, response, 501, responseXML);
};

const notFound = (request, response) => {
  // error message with a description and consistent error id
  const responseXML = '<response><message>\'The page you are looking for was not found.\'</message><id>\'notFound\'</id></section>';

  console.log(responseXML);
  return respondXML(request, response, 404, responseXML);
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
