const fs = require('fs');
const http = require('http');
const querystring = require('querystring');

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

const respondStatic = (req, res) => {
    const filename = `${__dirname}/public${req.url.split('/static')[1]}`;
    fs.createReadStream(filename)
        .on('error', () => respondNotFound(req, res))
        .pipe(res);
}

const respondEcho = (req, res) => {
    const { input = '' } = querystring.parse(
        req.url
            .split('?')
            .slice(1)
            .join('')
    )

    res.setHeader('Content-Type', 'application/json');
    res.end(
        JSON.stringify({
            normal: input,
            shouty: input.toUpperCase(),
            characterCount: input.length,
            backwards: input
                .split('')
                .reverse()
                .join('')
        })
    )
}

const server = http.createServer((req, res) => {
    if (req.url === '/') return respondText(req, res);
    if (req.url === '/message') return respondJson(req, res);
    if (req.url.match(/^\/echo/)) return respondEcho(req, res);
    if (req.url.match(/^\/static/)) return respondStatic(req, res)

    respondNotFound(req, res);
  });

server.listen(port);
console.log(`Server listening on port ${port}`);
