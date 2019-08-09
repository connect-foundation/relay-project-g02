//import { request } from "gaxios";

let fileName = '';
const changeInputFileLabel = () => {
  const inputFile = document.getElementById("inputFile");
  inputFile.addEventListener("change", () => {
    fileName = inputFile.files[0].name;
    document.getElementById("inputFileLabel").innerText =
    fileName;
  });
};

const sendInputFileImage = () => {
  document.getElementById("inputFileForm").addEventListener("submit", event => {
    const formData = new FormData(event.target);
    const ocrResult = document.getElementById("ocrResult");
    //const url = "http://localhost:8080/upload";
    const url = "http://10.81.24.175:8080/upload";
    
    const options = {
      method: "POST",
      body: formData
    };
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        console.log(data.result.split("\n"));
        var ss = [];
        var arr = data.result.split("\n");
        for (var i = 0; i < arr.length; i++) {
          if (i % 10 === 0) {
            arr.splice(i, 0, "\n");
          }
        }
        // ocrResult.innerText = arr.join(" ");
        ocrResult.value = arr.join(" ");
        ocrResult.readOnly = "";
        ocrResult.disabled = false;
        const uploadedImg = document.getElementById("requestImage");
        uploadedImg.src = data.filepath;
        uploadedImg.style.visibility = "visible";
      })
      .catch(error => {
        console.log(error);
        // ocrResult.innerText = error;
        ocrResult.value = error;
      })
      .finally(() => {
        ocrResult.classList.remove("blinking");
      });
    // ocrResult.innerText = "|";
    ocrResult.value = "|";
    ocrResult.classList.add("blinking");
  });
};

const downloadTxt = () => {
  const ocrResult = document.getElementById("ocrResult");
  const downBtn = document.getElementById('downBtn');
  downBtn.addEventListener('click', (e) => {
    if(ocrResult.value.length === 0) {
      return;
    }
    const link = document.createElement('a');
    link.href = "data:text/plain;charset=UTF-8,"  + encodeURIComponent(ocrResult.value);
    link.download = `${fileName.split('.')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
  })
}

const shareLink = () => {
  const modal = document.getElementById('alertModal');
  const shareBtn = document.getElementById("shareBtn");
  const shareLink = document.getElementById('shareLink');
  const copyBtn = document.getElementById('copyBtn');
  const closeBtn = document.getElementsByClassName("close")[0]; 
  const ocrResult = document.getElementById("ocrResult");
  let link;

  shareBtn.addEventListener('click', (e) => {
    if(ocrResult.value.length === 0) {
      return;
    }else{
      link = "data:text/plain;charset=UTF-8,"  + encodeURIComponent(ocrResult.value);
    }
    modal.style.display = "block";
    shareLink.value = link;
    shareLink.select();
  })

  copyBtn.addEventListener('click', (e) => {
    copyToClipboard(link);
  });

  closeBtn.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }
}

function copyToClipboard(val) {
  var t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = val;
  t.select();
  document.execCommand('copy');
  document.body.removeChild(t);
}

window.onload = () => {
  changeInputFileLabel();
  sendInputFileImage();
  downloadTxt();
  shareLink();
};
