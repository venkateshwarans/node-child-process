const { fork } = require("child_process");
const incrementor = fork('./process/incrementor.js');

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

  incrementor.send({
    message: "INIT",
    name,
    counterValue: 0
   });

  incrementor.on("message", msg => {
    console.log("Message from child", msg);
    return
  });
}

module.exports.getMessage = getMessage;
module.exports.enqueueSomething = enqueueSomething;
module.exports.sendSomething = sendSomething;

