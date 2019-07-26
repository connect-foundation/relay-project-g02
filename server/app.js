let express = require('express');
let fs = require("fs");

let app = express();
let port = 8080;

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
  fs.writeFileSync(`./${fn}.txt`, str, "utf8");
}
const multer = require('multer');
// let upload = multer({ dest: 'uploads/' })
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
      }
})
let upload = multer({ storage: storage })

app.use('/uploads', express.static('uploads'));
app.use(express.static('front'));
app.post('/upload', upload.single('userfile'), async function(req, res){
    res.send('Uploaded! : '+req.file); // object를 리턴함
    await start(`./${req.file.path}`)
    console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
});

app.use(express.static('front'));

app.listen(port, function() {
	console.log('ex-app listen port : '+ port);
});

