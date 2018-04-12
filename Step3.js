const { get } = require('./verify-client');

if (process.argv.length < 3) {
    console.error('You need to specify the request ID from Step 1 like this:');
    console.error('$ node Step3.js <ID from Step 1>');

    process.exit(1);
}

const requestId = process.argv[2];

function pause() {
    console.log('Still waiting on verification. Checking again in 5 seconds...');

    return new Promise((r) => setTimeout(r, 5000));
}

function checkOnRequest(requestId) {
    return get(`/verify/requests/${requestId}`, {
        requestConfig: { timeout: 10000 },
        responseConfig: { timeout: 10000 },
    });
}

// We use this to let the server continuously check the
// status of the verification.
function pollStatus(requestId) {
    return checkOnRequest(requestId)
        .then((payload) => {
            const { status } = payload.attributes[0];

            return (status === 'pending')
                ? pause().then(() => pollStatus(requestId))
                : payload;
        });
}

pollStatus(requestId)
    .then((payload) => {
        console.log(JSON.stringify(payload, null, 4));

        process.exit(0);
    })
    .catch((e) => {
        console.error(e);

        process.exit(1);
    });
