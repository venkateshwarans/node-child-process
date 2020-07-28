process.on('message', msg => {
  console.log('Message from Parent', msg)
  // Start the execution once we receive the message from the parent
  init()
})


function init() {
  let counter = 0;
  setInterval(() => {
    if(counter <= 20) {
      process.send({ counter: counter++ });
    } else {
      process.exit(1);
    }
  }, 1000)
}
