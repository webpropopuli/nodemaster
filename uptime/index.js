/* primart file for API
*/
const PORT = 9988;

var HTTP = require ('http');
var URL = require('url');

var StringDecoder = require('string_decoder').StringDecoder;

// respond to all requests with a string

var SRVR = HTTP.createServer(function(req, res){
 
// get URL and parse
/* when req comes in all info sent here
  Here we find the FULL url the user is asking for
  true means "parse the query string"
*/
    var parsedUrl = URL.parse(req.url, true);  // returns object

// get the path and query string
    var path = parsedUrl.pathname;  // untrimmed path from user
    var qryString = parsedUrl.query;

// I think this is akin to our route
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');


    // get HTTP method
    var method = req.method.toLowerCase();

    //get headers as obj
    var headers = req.headers;

    // Get the payload,if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();

// send the response
    res.end(`Server created method$:{method}  headers:${headers}`);

// log the request path
        console.log('Request received with this payload: ', buffer);
});




// start the server
SRVR.listen(PORT, function() {
    console.log(`Server is listening on ${PORT}`);
} );
