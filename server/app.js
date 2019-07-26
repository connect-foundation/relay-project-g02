let express = require('express');
let uuid = require('uuid');

let app = express();
let id = uuid.v4();
let port = 8080;

let multer = require('multer');
let upload = multer({ dest: 'uploads/' })

app.post('/upload', upload.single('userfile'), function(req, res){
    res.send('Uploaded! : '+req.file); // object를 리턴함
    console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
});

app.listen(port, function() {
	console.log('ex-app listen port : '+ port);
});