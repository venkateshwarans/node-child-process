process.on('message', msg => {
  console.log('Message from Parent', msg)
  init()
})


function init() {

  let counter = 0;

  setInterval(() => {
    if(counter <= 20) {
      process.send({ counter: counter++ });
    }else {
      process.exit(1);
    }
  }, 1000)

}
