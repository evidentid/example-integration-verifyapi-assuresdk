const app = require('express')();
const { get } = require('./verify-client');
const config = require('./config.json');

if (process.argv.length < 3) {
    console.error('You need to specify the request ID from Step 1 like this:');
    console.error('$ node Step2.js <ID from Step 1>');

    process.exit(1);
}

const requestId = process.argv[2];

// Provides a single-use token that an end-user may use to submit information.
function issueToken(requestId) {
    return get(`/verify/requests/${requestId}/authToken`);
}

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    issueToken(requestId)
        .then((token) => {
            res.render(__dirname + '/index.ejs', {
                token,
            });
        });
});

app.listen(3000, () => {
    console.log('Open http://localhost:3000 in your browser and fill out the form.');
    console.log('After submitting the form successfully, run this:');
    console.log('');
    console.log(`$ node Step3.js ${requestId}`);
});
