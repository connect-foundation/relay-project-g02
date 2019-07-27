const express = require('express');
const fs = require("fs");
const path = require('path');

const app = express();
const port = 8080;

app.use(express.json());

require("dotenv").config();

async function start(filename){
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs text detection on the local file
  const [result] = await client.textDetection(filename);
  const detections = result.textAnnotations;
  console.log('Text:');
  let str = '';
  detections.forEach(text => {
      str += `${text.description}`
  });
  console.log(str);
  let fn = filename.slice(0, -4);
  // fs.writeFileSync(`./${fn}.txt`, str, "utf8");
  return new Promise(resolve => resolve({
    filename: fn,
    text: str
  }));
}

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, callback){
    callback(null,'uploads/')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
const upload = multer({ storage: storage })

// app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'front')));

app.post('/upload', upload.single('userfile'), async (req, res) => {
  try {
    console.log(req.file.path);
    const result = await start(`./${req.file.path}`);
  
    console.log(req.file)
      res.send({ 
        upload: 'success',
        filename: req.file
      }); // object를 리턴함
      // console.log(req); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
  } catch (error) {
    console.log(error);
  }
 
});


app.listen(port, function() {
	console.log('ex-app listen port : '+ port);
});

