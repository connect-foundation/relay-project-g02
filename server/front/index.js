const changeInputFileLabel = () => {
    const inputFile = document.getElementById('inputFile')
    inputFile.addEventListener('change', () => {
        document.getElementById('inputFileLabel').innerText = inputFile.files[0].name;
    });
};

const sendInputFileImage = () => {
    document.getElementById('inputFileForm')
        .addEventListener('submit', (event) => {
            const formData = new FormData(event.target);
            const ocrResult = document.getElementById('ocrResult');
            const url = 'http://localhost:8080/upload';
            const options = {
                method: 'POST',
                body: formData
            };
            fetch(url, options)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    ocrResult.innerText = data.result;
                    const uploadedImg = document.getElementById('requestImage');
                    uploadedImg.src = data.filepath;
                    uploadedImg.style.visibility = 'visible';
                })
                .catch(error => {
                    console.log(error);
                    ocrResult.innerText = error;
                })
                .finally(() => {
                    ocrResult.classList.remove('blinking');
                })
            ocrResult.innerText = '|';
            ocrResult.classList.add('blinking');
        });
};

window.onload = () => {
    changeInputFileLabel();
    sendInputFileImage();
};
