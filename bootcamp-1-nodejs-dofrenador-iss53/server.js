var http = require("http");
var fs = require("fs");
var url = require("url");
var port = 8080;

/* Global variables */
var listingData;
var server;

var requestHandler = function (request, response) {
  var parsedUrl = url.parse(request.url);
  
  // State the request here
  console.log('Request was made to: ' + request.url);
  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 
    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
  if (request.method === 'GET' && parsedUrl.path === "/listings") {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write(listingData);

  } else {
      response.writeHead(404, {'Content-Type' : 'text/plain'});
      response.write("Bad gateway error");
  }
    response.end();
};

fs.readFile("listings.json", "utf8", function (err, data) {

  //  This callback function should save the data in the listingData variable, then start the server.
  if (err) throw err;
  listingData = data;
  //  Start the server here
  server = http.createServer(requestHandler);
  server.listen(port);
  console.log("Server listening on: http://127.0.0.1:" + port);
});
