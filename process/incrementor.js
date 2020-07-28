const _ = require("lodash");

process.on('message', msg => {
  console.log('Message from Parent', msg)
  // Start the execution once we receive the message from the parent
  init(msg.name, msg.counterValue)

  // process.send(counter)
  // const sum = longComputation();
  // process.send({name: msg.name, sum, date: new Date()})
  // process.exit()
})


const init = (name, val)  => {
  // let counter = val;
  // setTimeout(() => {
  //   process.send({
  //     name,
  //     date: new Date()
  //    })
  //    process.exit()
  // }, 15000)

  let counter = 0;
  setInterval(() => {
    if(counter === 10) {
      throw( new Error( "SendFailure" ) );
    }
    else if(counter <= 20) {
      process.send({ counter: counter++ });
    } else {
      process.exit(1);
    }
  }, 1000)
}

const sendMessage = (name, message, err) => {
  const messageObj = {
    name,
    message
  };
  if (err) {
    messageObj.err = err;
  }
  process.send(messageObj);
};


const longComputation = () => {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }
  return sum;
};
