const changeInputFileLabel = () => {
    const inputFile = document.getElementById('inputFile')
    inputFile.addEventListener('change', () => {
        document.getElementById('inputFileLabel').innerText = inputFile.files[0].name;
    });
} 

const sendInputFileImage = () => {
    const inputFileForm = document.getElementById('inputFileForm');
    inputFileForm.addEventListener('submit', (event) => {
        const fileInput = document.getElementById('inputFile') ;
        const formData = new FormData();
        const url = 'http://3.17.161.241:8080/upload';

        formData.append('file', fileInput.files[0]);

        const options = {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };
        // delete options.headers['Content-Type'];

        alert('sss');

        fetch(url, options)
        .then((res) => {
            console.log(res);
            document.getElementById('resultText').innerText = res;

            // if (res.status === 200) {
            //     document.getElementById('resultText').innerText = res;
            // }
        })
        .catch(e => {
            console.log(e);
        })
        // console.log(data);

        alert('sss');
    });
};

window.onload = () => {
    changeInputFileLabel();
    sendInputFileImage();
};
