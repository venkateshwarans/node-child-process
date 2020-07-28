const sampleService = require('../service/sample');


module.exports = (app) => {
  app.get('/health', (request, response, next) => {
    console.log("got req for health");
    setTimeout(() => response.send("ok"), 0);
  })

  app.post("/message",  (request, response, next) => {
    const data = request.body
    sampleService.getMessage(data.name)
      .then(
        (message) => {
          // Close the client response.
          response
            .type("text/plain")
            .send(message);
        }
      )
      // At this point, the CLIENT RESPONSE has been sent; but, that doesn't mean
      // that the Express.js request has completed. We can continue to process the
      // request, handling ASYNCHRONOUS aspects of the the client's request.
      // --
      // CAUTION: Since we're serializing the calls, essentially, it means that an
      // error in one will likely prevent the next one from being invoked. As such,
      // this approach may not always be appropriate.
      .then(sampleService.enqueueSomething(data.name))
      .then(sampleService.sendSomething)
      // If we hook all of this into the next() callback, it means that all of our
      // errors can be handled by the global error handler - even errors that occur
      // after the response has been sent to the client.
      .catch(next);
  });
}
