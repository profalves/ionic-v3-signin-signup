var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

var allowInsecureHTTP = true;

var app1 = new ParseServer({
    databaseURI: 'mongodb+srv://nextu:123@cluster0-5zbgr.mongodb.net/test?retryWrites=true&w=majority',
    appId: 'Appteste',
    restAPIKey: "restAPIKey",
    fileKey: 'myFileKey',
    masterKey: 'masterKey',
    serverURL: "http://localhost:5550/teste"
});

var pasreDashboardSettings = {
    "apps": [{
        "serverURL": "http://localhost:5550/teste",
        "appId": "Appteste",
        "restAPIKey": "restAPIKey",
        "masterKey": "masterKey",
        "appName": "Teste"
    }],
    "users": [{
        "user": "rodrigo",
        "pass": "01",
        "masterKey": "masterKey",
        "apps": [{
            "appId": "Appteste"
        }]
    }]
}
var dashboard = new ParseDashboard(pasreDashboardSettings, allowInsecureHTTP);

var app = express();

app.use("/teste", app1, function (req, res, next) {
    return next();
});

app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(5550);

console.log('O servidor está funcionando com sucesso na porta 5550');