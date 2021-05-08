const http = require('http');
const userOp = require("./userOp");
const quizOp = require("./quizOp");

const server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    if (req.url.startsWith("/api/login")) {
        return userOp.checkCreds(req, res);
    }
    if (req.url.startsWith("/api/questions")) {
        return quizOp.getQuestions(req, res);
    }
    if (req.url.startsWith("/api/evaluate")) {
        return quizOp.evaulateTest(req, res);
    }
    if (req.url.startsWith("/api/results")) {
        return quizOp.getTestResults(req, res);
    }
    const body = JSON.stringify({ error: "incorrect url" });
    res.writeHead(404, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json'
    });
    res.end(body);
});

server.listen(8080);
console.log("Server started in 8080");