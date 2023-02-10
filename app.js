const { encode, decode, qrgen } = require("./enigma");

let Encoded = encode("Hello World");

let Decoded = decode(Encoded);

let QR = qrgen(Encoded, "hackkcau.png");

console.log(Encoded);
console.log(Decoded);
QR
  ? console.log("QR Code Generated")
  : console.log("QR Code Generation Failed");
