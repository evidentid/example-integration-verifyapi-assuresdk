These scripts walk you through a VerifyAPI+AssureSDK integration
used to verify a ServSafe certificate in the context of a web
browser. Here we perform the VerifyAPI integration with Node.js.

*This example should be taken only as an illustrative example of
one mode of integration and not as advice for how to approach your
own integration.*


## Quick start

1. Create a `config.json` in this directory with the following content:

```json
{
    "user": "<Your account name>",
    "password": "<Your API Key>",
    "demo": true
}
```

Set `demo` to `true` to use the sandboxed VerifyAPI, and make sure your
API key and username match (you have a different API key for production).

**Remember that your API keys are secrets.** Be sure that `config.json` is not
checked in, and does not become visible in a compromising location.

2. Run `npm install`
3. Run `node Step1.js jon.doe@example.com some-unique-id` and follow the instructions.

## How it works

Here we interactively walk though the main 3-step process from the docs.

You do not have to carry out the three steps in exactly this way, but
the same overarching concepts apply.

1. **Create a request to verify data that will be submitted.** The server talks to VerifyAPI, and VerifyAPI
responds with a single-use token used to authenticate the user who is meant to submit the data. The server will in
turn respond with an HTML page with the token embedded.

2. **The end-user submits the form on the HTML page.** The person using the page is assumed to be the owner of the
personal data you are trying to verify. You can use the form here for training purposes, but in real-world apps
only the person named in the verification request should use the form.

3. **The verification yields a result.** The server polls for a status and prints the result once it becomes available.
