const { Client } = require('node-rest-client');
const config = require('./config.json');

const client = new Client({
    user: config.user,
    password: config.password,
});

const baseUrl = (config.demo)
    ? `https://verify.api.demo.evidentid.com/api/v1`
    : `https://verify.api.evidentid.com/api/v1`;

function request(method, endpoint, args = {}) {
    return new Promise((resolve, reject) => {
        const req = client[method](`${baseUrl}${endpoint}`, args, (data) => {
            resolve(Buffer.isBuffer(data)
                ? data.toString()
                : data);
        });

        req.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports.get = (endpoint, args = {}) => request('get', endpoint, args);
module.exports.post = (endpoint, data = {}) => request('post', endpoint, {
    headers: {
        "Content-Type": "application/json",
    },
    data,
});

