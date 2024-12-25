// const fs=require("fs")
// setImmediate(()=>{
    //     console.log("hello setImmediate")
    // },0)
    
    // setTimeout(()=>{
        //     console.log("gello settimeout")
        // },0)
        
        // console.log("hello world")
        
  //       process.env.UV_THREADPOOL_SIZE=5

  //  const crypto = require("crypto");

  //  const start = Date.now(); // Add a `start` variable to track the start time

  //  crypto.pbkdf2("password1", "salt1", 100000, 1024, "sha512", () => {
  //    console.log(`${Date.now() - start}ms done`);
  //  });
  //  crypto.pbkdf2("password1", "salt1", 100000, 1024, "sha512", () => {
  //    console.log(`${Date.now() - start}ms done`);
  //  });
  //  crypto.pbkdf2("password1", "salt1", 100000, 1024, "sha512", () => {
  //    console.log(`${Date.now() - start}ms done`);
  //  });
  //  crypto.pbkdf2("password1", "salt1", 100000, 1024, "sha512", () => {
  //    console.log(`${Date.now() - start}ms done`);
  //  });
  //  crypto.pbkdf2("password1", "salt1", 100000, 1024, "sha512", () => {
  //    console.log(`${Date.now() - start}ms done`);
  //  });

//* Assignement-2

const { Worker } = require("worker_threads");

const start = Date.now();

for (let i = 0; i < 5; i++) {
  const worker = new Worker("./worker.js");

  worker.on("message", (message) => {
    console.log(message);
    worker.terminate();
  });

  worker.postMessage({ startTime: start }); // Send start time to worker
}

