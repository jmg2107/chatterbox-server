/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "application/JSON";





  //depending on what the request method is, then we need to form a response


  //REQUEST METHODS:
  //GET
  //form the response packet ->
  //body of the response is the fileData on the server
  if(request.method === "GET"){
     // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
    var packet;

    if(request.url !== "/classes/messages"){
      statusCode = 404;
      packet = "";
    } else {
      statusCode = 200;
      packet = JSON.stringify(fileData)
    }
    response.writeHead(statusCode, headers);
    response.write(packet);
  }


  //POST
  // at this point, `body` has the entire request body stored in it as a string
   //Update the fileData with whatever was sent in the request
  //response.write(fileData);
  else if(request.method === "POST"){
    //putting the entire request body into the body variable
    var body = [];
    request.on('data',
    function(chunk) {
      console.log("Chunk is ");
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      console.log("Post body is" + body);
      //parseJSON and return body back into a JSON element
      var parsedBody = JSON.parse(body);

      //push the new data onto the results array in fileData
      fileData.results.unshift(parsedBody);
    });
    response.writeHead(201,headers);
  }

  //PUT
  //Should work the same as POST
  //response.write(fileData);

  //DELETE
  //Delete specific parts of the fileData
  //response.write(fileData);

  //OPTIONS
  //To be Determined

  //FAIL request (status code is 403)




  response.end();

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var fileData = {results:[{createdAt: "2016-06-27", username:"testUser", roomname:"testRoom", text:"testText"}]};

module.exports = requestHandler;

