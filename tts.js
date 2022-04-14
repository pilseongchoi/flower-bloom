
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'ko-KR';

let p = null;

let makeNewTextContent = function () {
    p = document.createElement('p');
    document.querySelector('.words').appendChild(p);
};



recognition.start();
recognition.onstart = function () {
    makeNewTextContent(); // 음성 인식 시작시마다 새로운 문단을 추가한다.
};
recognition.onend = function () {
    recognition.start();
};

recognition.onresult = function (e) {
    let texts = Array.from(e.results)
        .map(results => results[0].transcript).join("");
    texts.replace(/느낌표|강조|뿅/gi, '❗️');

    p.textContent = texts;
    if (texts == '안녕하세요') {
        speech("안녕하세요. 무궁화 꽃이 피었습니다에 오신 걸 환영합니다.");
    }

    console.log(texts);
};

