require("dotenv").config();

async function quickstart() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  const fileName = './test2.png';

  // Performs text detection on the local file
  const [result] = await client.textDetection(fileName);
  const detections = result.textAnnotations;
  console.log('Text:');
  let str = ''
  await detections.forEach(text => {
      str =  str.concat(text.description)
  });
  console.log(str);
}

quickstart();