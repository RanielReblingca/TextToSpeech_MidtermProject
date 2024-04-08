function textToSpeech() {
    var text = document.getElementById('textToSpeech').value;
    var voiceSelect = document.getElementById('voiceSelect');
    var selectedVoice = voiceSelect.value;

    var speech = new SpeechSynthesisUtterance();
    speech.text = text;

    // Select voice based on user choice
    if (selectedVoice === 'male') {
      speech.voice = getVoiceByGender('male');
    } else if (selectedVoice === 'female') {
      speech.voice = getVoiceByGender('female');
    }

    window.speechSynthesis.speak(speech);
  }

  // Function to get voice by gender
  function getVoiceByGender(gender) {
    var voices = window.speechSynthesis.getVoices();
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].name.includes(gender)) {
        return voices[i];
      }
    }
    // If no voice with specified gender found, return the default voice
    return voices[0];
  }

  // Voice to Text
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

        // Adjust voice of recognition result based on user choice
        if (selectedResultVoice === 'male') {
          resultText = resultText.replace(/(\.|!|\?)$/, ''); // Remove punctuation from the end
          resultText += ' (Male)';
        } else if (selectedResultVoice === 'female') {
          resultText = resultText.replace(/(\.|!|\?)$/, ''); // Remove punctuation from the end
          resultText += ' (Female)';
        }

        document.getElementById('speechResult').textContent = resultText;
      } else {
        interimTranscript += event.results[i][0].transcript;
        document.getElementById('speechResult').textContent = interimTranscript;
      }
    }
  };

  function startSpeechRecognition() {
    recognition.start();
  }