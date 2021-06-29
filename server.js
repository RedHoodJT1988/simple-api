const http = require('http');

const port = process.env.PORT || 8080;

const respondText = (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from Node!');
}

const respondJson = (req, res) => {
    res.setHeader('Content-Type', 'applicaiton/json');
    res.end(JSON.stringify({ message: 'Riddle me this Batman.', luckyNumbers: [42, 3, 27]}));
}

const respondNotFound = (req, res) => {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
}

const server = http.createServer((req, res) => {
    if (req.url === '/') return respondText(req, res);
    if (req.url === '/message') return respondJson(req, res);

    respondNotFound(req, res);
  });

server.listen(port);
console.log(`Server listening on port ${port}`);
