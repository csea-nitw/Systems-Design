const  httpRequest = {
    host: 'loaclhost',
    port: 8080,
    method: 'POST', // GET, PUT, DELETE, etc.
    path: '/payments',
    headers: {
        'content-type': 'application/json',
        'content-length': 51,
    },
    body: '{"data": "This is a piece of data in JSON format."}'
};

const httpResponse = {
    statusCode: 200,
    headers: {
        'access-control-allow-origin': 'http://divas-jindal.github.io',
        'content-type': 'application/json'
    },
    body: '{}'
};