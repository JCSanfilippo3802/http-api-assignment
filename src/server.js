const http = require('http');
const url = require('url');

const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/favicon.ico': htmlHandler.getIndex,
  '/style.css': htmlHandler.getStyle,
  'application/json': {
    '/success': jsonHandler.success,
    '/badRequest': jsonHandler.badRequest,
    '/unauthorized': jsonHandler.unauthorized,
    '/forbidden': jsonHandler.forbidden,
    '/internal': jsonHandler.internal,
    '/notImplemented': jsonHandler.notImplemented,
    notFound: jsonHandler.notFound,
  },
  'text/xml': {
    '/success': xmlHandler.success,
    '/badRequest': xmlHandler.badRequest,
    '/unauthorized': xmlHandler.unauthorized,
    '/forbidden': xmlHandler.forbidden,
    '/internal': xmlHandler.internal,
    '/notImplemented': xmlHandler.notImplemented,
    notFound: xmlHandler.notFound,
  },
};

const onRequest = (request, response) => {
  // It strikes out parse due to being depricated. Doesn't break anything, just kind of annoying.
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else if (urlStruct[acceptedTypes[0]][parsedUrl.pathname]) {
    urlStruct[acceptedTypes[0]][parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

// start HTTP server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
