//* Assigment-2
const { parentPort } = require("worker_threads");
const crypto = require("crypto");

function pbkdf2Promise(password, salt, iterations, keylen, digest) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      keylen,
      digest,
      (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey);
      }
    );
  });
}

parentPort.on("message", async ({ startTime }) => {
  try {
    await pbkdf2Promise("password1", "salt1", 10000, 1024, "sha512"); // Reduced iterations for faster performance
    parentPort.postMessage(`${Date.now() - startTime}ms done`);
  } catch (error) {
    parentPort.postMessage(`Error: ${error.message}`);
  }
});























// Sure! Let's break down the code step by step:

// 1. Imports:
// js
// Copy code
// const { parentPort } = require("worker_threads");
// const crypto = require("crypto");
// parentPort: This is part of the worker_threads module. It is used to communicate with the main thread from within the worker. The main thread sends messages to the worker through parentPort.postMessage(), and the worker can listen for those messages via parentPort.on("message", ...). In your case, parentPort is used to send the completion time back to the main thread.
// crypto: This is a Node.js module that provides cryptographic functionality. Here, it's used to perform the PBKDF2 (Password-Based Key Derivation Function 2) algorithm, which is a key derivation function that applies a hash function multiple times to a password to generate a cryptographic key.
// 2. pbkdf2Promise Function:
// js
// Copy code
// function pbkdf2Promise(password, salt, iterations, keylen, digest) {
//   return new Promise((resolve, reject) => {
//     crypto.pbkdf2(
//       password,
//       salt,
//       iterations,
//       keylen,
//       digest,
//       (err, derivedKey) => {
//         if (err) reject(err);
//         else resolve(derivedKey);
//       }
//     );
//   });
// }
// This function wraps the crypto.pbkdf2 function in a Promise. By default, pbkdf2 is a callback-based API, but promises are more modern and work better with async/await.

// The pbkdf2Promise function takes five parameters:

// password: The password you want to hash (in this case, "password1").
// salt: A random string added to the password before hashing to make it more secure (in this case, "salt1").
// iterations: The number of times the hashing function should be applied (10000 in this case, reduced for performance).
// keylen: The length of the derived key (1024 in this case).
// digest: The hashing algorithm to use (e.g., "sha512").
// Inside the Promise constructor, the crypto.pbkdf2 function is called. If it completes successfully, resolve(derivedKey) is called to indicate the success, passing the derived key. If there's an error, reject(err) is called to pass the error.

// 3. Handling Messages from the Main Thread:
// js
// Copy code
// parentPort.on("message", async ({ startTime }) => {
//   try {
//     await pbkdf2Promise("password1", "salt1", 10000, 1024, "sha512");
//     parentPort.postMessage(`${Date.now() - startTime}ms done`);
//   } catch (error) {
//     parentPort.postMessage(`Error: ${error.message}`);
//   }
// });
// parentPort.on("message", ...): This listens for messages from the main thread. When the main thread sends a message to the worker, this callback function is executed. In this case, the message is expected to be an object with the startTime property (which contains the time when the main thread started the task).

// Inside the callback:

// await pbkdf2Promise(...): The worker calls pbkdf2Promise (the promise-based version of pbkdf2) to execute the hashing operation. Since pbkdf2Promise is a promise, the await keyword is used, which means the worker will wait for the promise to resolve (i.e., the PBKDF2 operation to finish).
// After the PBKDF2 operation completes, it sends the time it took to the main thread with parentPort.postMessage(...). The time is calculated by subtracting startTime (sent from the main thread) from Date.now() (the current time in milliseconds when the PBKDF2 operation finishes).
// If there is an error in the PBKDF2 operation, it catches the error and sends an error message to the main thread.
// 4. How It Works Together:
// The main thread creates the worker and sends the start time to the worker with worker.postMessage({ startTime: Date.now() }).
// The worker listens for that message and starts processing. It performs the PBKDF2 operation using pbkdf2Promise.
// Once the PBKDF2 operation is complete, the worker sends back the time it took to complete the operation by calling parentPort.postMessage.
// The main thread receives the result (the elapsed time) and logs it.
// This code demonstrates how to run a CPU-intensive task like PBKDF2 in a worker thread, allowing the main thread to stay responsive, and how to use async/await and Promises for handling asynchronous operations in a cleaner, more modern way.

// Summary:
// pbkdf2Promise wraps the crypto.pbkdf2 function in a Promise for better asynchronous handling.
// parentPort.on("message", ...) listens for the start message from the main thread, performs the PBKDF2 operation, and then sends the elapsed time back to the main thread.
// await is used to wait for the result of the pbkdf2Promise function, ensuring that the worker doesn't send the result until the PBKDF2 operation is complete.