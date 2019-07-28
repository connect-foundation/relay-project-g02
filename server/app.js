const express = require('express');
const fs = require("fs");
const path = require('path');

const app = express();
const port = 8080;
// const _projectId = 'boostcamp';
// const _keyFilename = path.join(__dirname, '../keys/boostcamp-9c749912510c.json');
const projectId = 'my-ocr-proj';
const keyFilename = path.join(__dirname, '../keys/my-ocr-proj-3ead5d620204.json');

app.use(express.json());

require("dotenv").config();

async function start(filename){
  const vision = require('@google-cloud/vision');
  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    projectId, keyFilename
  });

  // Performs text detection on the local file
  console.log(filename);
  const [result] = await client.textDetection(filename);
  const detections = result.textAnnotations[0].description;
  // fs.writeFileSync(`./${fn}.txt`, str, "utf8");
  return new Promise(resolve => resolve(detections));
}

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
const upload = multer({ storage: storage })

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'front')));

app.post('/upload', upload.single('userfile'), async (req, res) => {
  console.log(req.file);
  const result = await start(req.file.path);
  res.status(201).json({
    result,
    filepath: '/uploads/'+req.file.filename 
  });
});


app.listen(port, function() {
	console.log('ex-app listen port : '+ port);
});

