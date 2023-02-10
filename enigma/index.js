const crypto = require("node:crypto");
const qr = require("qr-image");
const fs = require("fs");

const iv = crypto.randomBytes(16);
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);

exports.encode = (text) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

exports.decode = (text) => {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

exports.qrgen = (data, file) => {
  let dataToEncode = data || null;
  let outImage = file || null;
  if (dataToEncode !== null && outImage !== null) {
    qr.image(dataToEncode, { type: "png", size: 20 }).pipe(
      fs.createWriteStream(outImage)
    );

    return true;
  } else {
    return false;
  }
};
