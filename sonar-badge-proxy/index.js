const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

const sonarUrl = process.env.SONAR_URL;
const sonarToken = process.env.SONAR_TOKEN;
const tokenBase64 = Buffer.from(`${sonarToken}:`).toString('base64')

console.log(`Token: ${tokenBase64}`);

app.get('/sonar-badge-proxy/get-badge', (req, res) => {
    const project = req.query['project'];
    const metric = req.query['metric'];

    const url = `${sonarUrl}/api/project_badges/measure?project=${project}&metric=${metric}`;
    console.log(`Request url: ${url}`);

    request({
        uri: url,
        headers: {
            Authorization: `Basic ${tokenBase64}`
        },
        method: 'GET'
    }).pipe(res);
});

app.listen(port, () => {
    console.log(`Sonar badge proxy listening at http://localhost:${port}`);
});
