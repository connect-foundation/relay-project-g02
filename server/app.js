const express = require('express');
const fs = require("fs");
const path = require('path');

const app = express();
const port = 8080;
// const _projectId = 'boostcamp';
// const _keyFilename = path.join(__dirname, '../keys/boostcamp-9c749912510c.json');
const projectId = 'my-ocr-proj';
const keyFilename = path.join(__dirname, '../keys/my-ocr-proj-3ead5d620204.json');

const key = "AIzaSyAQRrXiza4ATn621-HJXem7tKPAGmHnVKc";
      const sourceText =
          "안녕하세요, 만나서 반갑습니다. 저는 구글 번역기입니다.";
      const sourceLang = "ko";
      const targetLang = "en";
      const baseURL = `https://www.googleapis.com/language/translate/v2?q=${sourceText}&source=${sourceLang}&target=${targetLang}&key=${key}`;

app.use(express.json());

require("dotenv").config();

function uploadDirCheck(){
  try{
    fs.accessSync(__dirname+"/uploads");
  }
  catch{
    fs.mkdirSync(__dirname+"/uploads");
  }
}

function nameMaker(){
  const d=new Date(); // month+day+hour+minute+second
  let fileName=d.getMonth().toString();
  fileName+=d.getDay().toString();
  fileName+=d.getHours().toString();
  fileName+=d.getMinutes().toString();
  fileName+=(d.getSeconds().toString()+".txt");
  return fileName;
}
async function translateText(source, target, text, APIkey){
  fetch(baseURL, result => {
    console.log(result);
    console.log("translation: ", result.translations[0].translatedText);
  });
}

async function ocrConvert(filename){
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
  let result= await ocrConvert(req.file.path);
  if(req.body.translate){
    await translateText(sourceLang,targetLang,result,key);
  }
  fs.writeFileSync(__dirname+`/uploads/${nameMaker()}`,result,'utf8');
  res.status(201).json({
    result,
    filepath: '/uploads/'+req.file.filename 
  });
});


app.listen(port, function() {
  console.log('ex-app listen port : '+ port);
  uploadDirCheck();
});

