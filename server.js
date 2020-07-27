const express = require('express');
const chalk = require('chalk');
const app = express();
const port = 1001;

app.use(express.static(__dirname));

require('./routes/sample')(app)

// Setup the Express global error handler.
app.use(( error, request, response, next ) => {
		console.log( chalk.red.bold( "ERROR" ) );
		console.log( chalk.red.bold( "=====" ) );
		console.log( error );
		// Because we hooking post-response processing into the global error handler, we
		// get to leverage unified logging and error handling; but, it means the response
		// may have already been committed, since we don't know if the error was thrown
		// PRE or POST response. As such, we have to check to see if the response has
		// been committed before we attempt to send anything to the user.
		if (!response.headersSent ) {
			response
				.status( 500 )
				.send( "Sorry - something went wrong. We're digging into it." );
		}
	}
);


const server = app.listen(port, () => console.log('Server listening on port ' + port));

server.keepAliveTimeout = 60000 * 5;
let secPassed = 0;
const increment = 5;


setInterval(() => server.getConnections((err, connections) => {
  secPassed += increment;
  // console.log(`${connections} connections open on ${port}, ${secPassed} passed`);
}), increment * 1000);

server.on('connection', (connection) => {
  console.log('got new connection');
})
