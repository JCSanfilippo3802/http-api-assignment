// function to send a json object
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// function to show a success status code
const success = (request, response) => {
  // message to send
  const responseJSON = {
    message: 'This is a successful response',
  };
  console.log(responseJSON);
  // send our json with a success status code
  respondJSON(request, response, 200, responseJSON);
};

// function to show a bad request without the correct parameters
const badRequest = (request, response, params) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseJSON.id = 'badRequest';

    console.log(responseJSON);
    return respondJSON(request, response, 400, responseJSON);
  }

  console.log(responseJSON);
  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // set our error message
    responseJSON.message = 'Unauthorized to view page';
    // give the error a consistent id
    responseJSON.id = 'unauthorized';

    console.log(responseJSON);
    return respondJSON(request, response, 401, responseJSON);
  }

  console.log(responseJSON);
  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  // message and id to send
  const responseJSON = {
    message: 'Forbidden from viewing this information',
    id: 'forbidden',
  };

  console.log(responseJSON);
  return respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  // message and id to send
  const responseJSON = {
    message: 'An error with the server occured, please contact support or check server status',
    id: 'internal',
  };

  console.log(responseJSON);
  return respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  // message and id to send
  const responseJSON = {
    message: 'Feature not implemented',
    id: 'notImplemented',
  };

  console.log(responseJSON);
  return respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  // message and id to send
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  console.log(responseJSON);
  respondJSON(request, response, 404, responseJSON);
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
