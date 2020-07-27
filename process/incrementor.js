process.on('message', msg => {
  console.log('Message from Parent', msg)
  // Start the execution once we receive the message from the parent
  // const counter =  init(msg.name, msg.counterValue)
  // process.send(counter)
  const sum = longComputation();
  process.send({name: msg.name, sum, date: new Date()})
  process.exit()
})


const init = (name, val)  => {
  let counter = val;

  // var promise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     return resolve({
  //       name,
  //       date: new Date()
  //      })
  //   }, 4000);
  // });
  setTimeout(() => {
      return {
        name,
        date: new Date()
       }
  }, 15000)
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
