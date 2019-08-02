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

function uploadDirCheck(){
  try{
    fs.accessSync(__dirname+"/uploads");
  }
  catch{
    fs.mkdirSync(__dirname+"/uploads");
  }
}

function optionCheck(isTranslate, isRule){
  if(isTranslate && isRule) return "번역과교정";
  else if(isTranslate) return "번역";
  else if(isRule) return "교정";
  else return "원본";
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
  const optionMenu=optionCheck(req.body.translate, req.body.rule);
  switch(optionMenu){
    case "둘다":

    case "번역":

    case "교정":

    case "원본":
      
  }

  res.status(201).json({
    result,
    filepath: '/uploads/'+req.file.filename 
  });
});


app.listen(port, function() {
  console.log('ex-app listen port : '+ port);
  uploadDirCheck();
});

