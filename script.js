function textToSpeech() {
    var text = document.getElementById('textToSpeech').value;
    var voiceSelect = document.getElementById('resultVoiceSelect');
    var selectedVoice = voiceSelect.value;
  
    var speech = new SpeechSynthesisUtterance();
    speech.text = text;
  
    if (selectedVoice === 'male') {
        speech.voice = getMaleVoice();
    } else if (selectedVoice === 'female') {
        speech.voice = getFemaleVoice();
    }
  
    window.speechSynthesis.speak(speech);
  }
  
  function startSpeechRecognition() {
    var recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
  
    recognition.onresult = function (event) {
        var interimTranscript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                var resultVoiceSelect = document.getElementById('resultVoiceSelect');
                var selectedResultVoice = resultVoiceSelect.value;
                var resultText = event.results[i][0].transcript;
  
                if (selectedResultVoice === 'male') {
                    resultText = resultText.replace(/(\.|!|\?)$/, ''); 
                    resultText += ' (Male)';
                } else if (selectedResultVoice === 'female') {
                    resultText = resultText.replace(/(\.|!|\?)$/, ''); 
                    resultText += ' (Female)';
                }
  
                document.getElementById('speechResult').textContent = resultText;
            } else {
                interimTranscript += event.results[i][0].transcript;
                document.getElementById('speechResult').textContent = interimTranscript;
            }
        }
    };
  
    recognition.start();
  }
  
  function getMaleVoice() {
    var voices = window.speechSynthesis.getVoices();
    for (var i = 0; i < voices.length; i++) {
        if (voices[i].name.includes('Male')) {
            return voices[i];
        }
    }
    return null;
  }
  
  function getFemaleVoice() {
    var voices = window.speechSynthesis.getVoices();
    for (var i = 0; i < voices.length; i++) {
        if (voices[i].name.includes('Female')) {
            return voices[i];
        }
    }
    return null;
  }