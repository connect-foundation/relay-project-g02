const axios = require("axios");
​
async function translate(sourceText) {
    const key = "AIzaSyAQRrXiza4ATn621-HJXem7tKPAGmHnVKc"; //이부분 개인 계정으로 발급받은 KEY값이라 변경해서 사용해 주시기 바랍니다.
    // key 발급은 docs 참고 
    const sourceLang = "ko";
    const targetLang = "en";
    const translatedText = await axios.get(
        "https://www.googleapis.com/language/translate/v2",
        {
            params: {
                q: sourceText,
                source: sourceLang,
                target: targetLang,
                key: key
            }
        });
    return translatedText.data.data.translations[0].translatedText;
}
​
module.exports = translate;