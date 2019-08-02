function translate(sourceText) {
    const key = "AIzaSyAQRrXiza4ATn621-HJXem7tKPAGmHnVKc";
    const sourceLang = "ko";
    const targetLang = "en";
    axios
        .get("https://www.googleapis.com/language/translate/v2", {
            params: {
                q: sourceText,
                source: sourceLang,
                target: targetLang,
                key: key
            }
        })
        .then(function(response) {
            const translatedText =
                response.data.data.translations[0].translatedText;
            res(translatedText);
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {
            // always executed
        });
}

module.exports = translate;
