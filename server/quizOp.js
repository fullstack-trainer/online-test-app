const fse = require('fs-extra');
const url = require('url');

module.exports = {
    getQuestions: async function (req, res) {
        let body = {}, code = 200;
        try {
            body = await fse.readJSON("./questions.json");
            body = body.map((val, index) => {
                delete val.answer;
                return val;
            })
        } catch (ex) {
            console.log("Error in [checkCreds]: ", ex);
            body = { error: ex.toString() };
            code = 500;
        }
        body = JSON.stringify(body);
        res.writeHead(code, {
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'application/json'
        });
        res.end(body);
    },
    evaulateTest: async function (req, res) {
        let body = {}, code = 200;
        try {
            const questions = await fse.readJSON("./questions.json");
            const params = url.parse(req.url, true);
            let { answers = "", username = "" } = params.query;
            answers = answers.split(",");
            console.log("answers....",answers);

            let score = 0;
            questions.forEach((val, index) => {
                console.log("questions.....",val);
                if (val.answer === answers[index]) {
                    score++;
                }
            });
            const date = new Date();
            const results = await fse.readJSON("./results.json");
            results.push({ date, score, username });
            await fse.writeJSON("./results.json", results);
            body = { score };
        } catch (ex) {
            console.log("Error in [evaulateTest]: ", ex);
            body = { error: ex.toString() };
            code = 500;
        }
        body = JSON.stringify(body);
        res.writeHead(code, {
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'application/json'
        });
        res.end(body);
    },
    getTestResults: async function (req, res) {
        let body = {}, code = 200;
        try {
            body = await fse.readJSON("./results.json");
        } catch (ex) {
            console.log("Error in [getTestResults]: ", ex);
            body = { error: ex.toString() };
            code = 500;
        }
        body = JSON.stringify(body);
        res.writeHead(code, {
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'application/json'
        });
        res.end(body);
    }
}