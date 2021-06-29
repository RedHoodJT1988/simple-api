const fs = require('fs');
const express = require('express');

const port = process.env.PORT || 8080;

const app = express();

const respondText = (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from Node!');
}

const respondJson = (req, res) => {
    res.json({ text: 'Riddle me this Batman.', luckyNumbers: [42, 3, 27]});
}

const respondNotFound = (req, res) => {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
}

const respondEcho = (req, res) => {
    const { input = '' } = req.query;

    res.json({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input
            .split('')
            .reverse()
            .join('')
    })
}

const respondStatic = (req, res) => {
    const filename = `${__dirname}/public/${req.params[0]}`
    fs.createReadStream(filename)
        .on('error', () => respondNotFound(req, res))
        .pipe(res)
}

app.get('/', respondText);
app.get('/json', respondJson);
app.get('/echo', respondEcho);
app.get('/static/*', respondStatic);

app.listen(port, () => console.log(`Server listening on port ${port}`));
