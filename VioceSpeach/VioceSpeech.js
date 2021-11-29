const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const SpeechBtn = document.querySelector("button");
let synth = speechSynthesis,
  // debugger;
  isSpeaking = true;
// voiceList();
function voice() {
  // Looping true for voice
  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google Us English" ? "selected" : "";
    console.log(voice);
    let option = `<Option value ="${voice.name}" ${selected}>${voice.name} (${voice.lang})</Option>`;
    voiceList.insertAdjacentHTML("beforeEnd", option);
  }
}
synth.addEventListener("Voiceschanged", voice);
function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utterance.voice = voice;
    }
  }
  speechSynthesis.speak(utterance);
}

SpeechBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if ((textarea.value = "")) {
    if (!synth.speaking) {
      textToSpeech(textarea.value);
    }
    if (textarea.value.length > 80) {
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        SpeechBtn.innerText = "pause speech";
      } else {
        synth.pause();
        isSpeaking = true;
        SpeechBtn.innerText = "Resume Speech";
      }
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          SpeechBtn.innerText = "Convert To Speech";
        }
      });
    } else {
      speechSynthesis.speak = "Convert to voice";
    }
  }
});
