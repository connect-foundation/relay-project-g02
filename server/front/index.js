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
            const url = 'http://localhost:8080/upload';
            const options = {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            };
            fetch(url, options);
        });
};

window.onload = () => {
    changeInputFileLabel();
    sendInputFileImage();
};
