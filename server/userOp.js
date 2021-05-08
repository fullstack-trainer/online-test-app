const fse = require('fs-extra');
const url = require('url');

module.exports = {
    checkCreds: async function (req, res) {
        let body = {}, code = 200;
        try {
            const users = await fse.readJSON("./user.json");
            const params = url.parse(req.url, true);
            const { username, password } = params.query;
            const user = users.find((val, index) => {
                return val.username === username && val.password === password;
            });
            if (user) {
                body = { username: user.username, name: user.name };
            } else {
                code = 400;
                body = { error: "username or password is incorrect" };
            }
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
    }
}