const { post } = require('./verify-client');


if (process.argv.length < 4) {
    console.error('Specify an email and your own unique user ID like this:');
    console.error('$ node Step1.js john.doe@example.com my-id-for-jon-doe');

    process.exit(1);
}

const [email, userId] = process.argv.slice(2);

const REQUIREMENTS = {
    // This is your own internal identifier associated with the user.
    "userId": userId,
    "email": email,
    "description": "Please provide your ServSafe certification",
    "userAuthenticationType": "embedded",
    "attributesRequested": [
        { "attributeType": "certifications.servsafe.servsafe_food_handler.valid" }
    ]
};

function createRequestForVerification(requirements) {
    return post('/verify/requests', requirements);
}

createRequestForVerification(REQUIREMENTS).then((resp) => {
    console.log('Here is the ID of your new request:');
    console.log('');
    console.log(resp.id);
    console.log('');
    console.log('Now we need to let a user submit data against the request.');
    console.log(`Run this: $ node Step2.js ${resp.id}`);

    process.exit(0);
}).catch((e) => {
    console.error(e);

    process.exit(1);
});
