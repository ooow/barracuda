// Include http module.
var http = require('http');

// Create http server.
var httpServer = http.createServer(function (req, resp) {

    resp.writeHeader(200);

    resp.end('This is a node js created http web server. ');
});

// Http server listen on port 5000.
httpServer.listen(5000);

console.log("Http web server listening on port 5000. Access it with url http://localhost:5000.");
