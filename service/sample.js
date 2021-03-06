const { fork } = require("child_process");
const incrementor = fork('./process/incrementor.js');

function getMessage() {
	return( Promise.resolve( "Come at me, bro!" ) );
}

function enqueueSomething() {
  startChild()
	return;
}

function sendSomething() {
	throw( new Error( "SendFailure" ) );
}

function startChild() {
  incrementor.on("message", msg => {
    console.log("Message from child", msg);
  });
  incrementor.send({ hello: "world" });
}

module.exports.getMessage = getMessage;
module.exports.enqueueSomething = enqueueSomething;
module.exports.sendSomething = sendSomething;

