let express = require('express');
let uuid = require('uuid');

let app = express();
let id = uuid.v4();
let port = 8090;

let multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'uploads/')
    },
    filename: function (req,file,cb) {
        cb(null,file.originalname)
    }
})
let upload = multer({storage : storage})

app.post('/upload', upload.single('userfile'), function(req, res){
    res.send('Uploaded! : '+req.file); // object를 리턴함
    console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
});

app.listen(port, function() {
	console.log('ex-app listen port : '+ port);
});