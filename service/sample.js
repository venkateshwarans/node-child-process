const { fork } = require("child_process");

function getMessage(name) {
	return( Promise.resolve(name) );
}

function enqueueSomething(name) {
  startChild(name)
	return;
}

function sendSomething() {
	throw( new Error( "SendFailure" ) );
}

function startChild(name) {
  const incrementor = fork('./process/incrementor.js', [], {
    silent: true,
    detached: true
  });

  incrementor.send({
    message: "INIT",
    name,
    counterValue: 0
   });

  incrementor.on("message", (msg) => {
    console.log("Message from child", msg);
    return
  });

  incrementor.on('error', (err) => {
    console.log("\n\t\tERROR: a counter failed! (" + err + ")");
  })

  incrementor.on('exit', (code, signal) => {
    console.log(code);
    console.log(signal);
  })

  incrementor.unref();
}

module.exports.getMessage = getMessage;
module.exports.enqueueSomething = enqueueSomething;
module.exports.sendSomething = sendSomething;

