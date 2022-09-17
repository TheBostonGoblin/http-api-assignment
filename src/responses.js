const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);
const respondFunction = (request, response, status, content, contentType) => {
  response.writeHead(status, { 'Content-Type': contentType });
  response.write(content);
  response.end();
};

const getIndex = (request, response) => respondFunction(request, response, 200, index, 'text/html');

const getCSS = (request, response) => respondFunction(request, response, 200, css, 'text/css');

const success = (request, response, acceptedTypes) => {
  const respond = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${respond.message}</message></response>`;
    return respondFunction(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(respond);
  return respondFunction(request, response, 200, responseJSON, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  if (!params.valid || params.valid !== 'true') {
    const respond = {
      message: 'Missing valid query parameter set to true',
      id: 'badRequest',
    };

    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `<response><message>${respond.message}</message><id>${respond.id}</id></response>`;
      return respondFunction(request, response, 400, responseXML, 'text/xml');
    }

    const responseJSON = JSON.stringify(respond);
    return respondFunction(request, response, 400, responseJSON, 'application/json');
  }

  const respond = {
    message: 'This request has the required parameters',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${respond.message}</message></response>`;
    return respondFunction(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(respond);
  return respondFunction(request, response, 200, responseJSON, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    const respond = {
      message: 'Missing loggedIn query paramter set to yes',
      id: 'unauthorized',
    };

    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `<response><message>${respond.message}</message><id>${respond.id}</id></response>`;
      return respondFunction(request, response, 401, responseXML, 'text/xml');
    }

    const responseJSON = JSON.stringify(respond);
    return respondFunction(request, response, 401, responseJSON, 'application/json');
  }

  const respond = {
    message: 'You have successfully viewed the content',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${respond.message}</message></response>`;
    return respondFunction(request, response, 200, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(respond);
  return respondFunction(request, response, 200, responseJSON, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const respond = {
    message: 'You do not have access to tihs content.',
    id: 'forbidden',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${respond.message}</message></response>`;
    return respondFunction(request, response, 403, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(respond);
  return respondFunction(request, response, 403, responseJSON, 'application/json');
};

const internalServerErr = (request, response, acceptedTypes) => {
  const respond = {
    message: 'Internal Server Error, Something went wrong',
    id: 'internalError',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${respond.message}</message></response>`;
    return respondFunction(request, response, 500, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(respond);
  return respondFunction(request, response, 500, responseJSON, 'application/json');
};

const notImplimented = (request, response, acceptedTypes) => {
  const respond = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplimented',
  };
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${respond.message}</message></response>`;
    return respondFunction(request, response, 501, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(respond);
  return respondFunction(request, response, 501, responseJSON, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const respond = {
    message: 'The page you are lookng for was not found',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${respond.message}</message></response>`;
    return respondFunction(request, response, 404, responseXML, 'text/xml');
  }

  const responseJSON = JSON.stringify(respond);
  return respondFunction(request, response, 404, responseJSON, 'application/json');
};

module.exports = {
  getIndex,
  getCSS,
  success,
  badRequest,
  unauthorized,
  forbidden,
  internalServerErr,
  notImplimented,
  notFound,
};
