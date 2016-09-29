var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

var allowInsecureHTTP = true

var app1 = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/friendslist',
    appId: 'AppId1',
    restAPIKey: "restAPIKey",
    fileKey: 'myFileKey',
    masterKey: 'masterKey',
    serverURL: 'http://parsetest-samarthagarwal.c9users.io/app1'
});

var pasreDashboardSettings = {
    "apps": [{
        "serverURL": "https://parsetest-samarthagarwal.c9users.io/app1",
        "appId": "AppId1",
        "restAPIKey": "restAPIKey",
        "masterKey": "masterKey",
        "appName":"FriendsList"
    }],
    "users": [{
        "user": "samarthagarwal",
        "pass": "abc",
        "masterKey": "masterKey",
        "apps": [{
            "appId": "AppId1"
        }]
    }]
}

var dashboard = new ParseDashboard(pasreDashboardSettings, allowInsecureHTTP);

var app = express();

// make the Parse Server available at /parse
app.use('/app1', app1, function(req, res, next){
    //res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(8080);