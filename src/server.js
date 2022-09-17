const http = require('http');
const url = require('url');

const query = require('querystring');

const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getCSS,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internalServerErr,
  '/notImplemented': responseHandler.notImplimented,
  notFound: responseHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);

  const acceptedTypes = request.headers.accept.split(',');

  const params = query.parse(parsedURL.query);
  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
