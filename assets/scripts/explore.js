// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const synth = window.speechSynthesis;
  const voiceSelect = document.getElementById('voice-select');
  const textArea = document.getElementById('text-to-speak');
  const talkButton = document.querySelector('button');
  const faceImage = document.querySelector('#explore img');

  // Populate the voice dropdown with available voices
  function populateVoices() {
    const voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;
      option.value = voice.name;
      voiceSelect.appendChild(option);
    });
  }

  // Ensure voices are loaded (some browsers load them asynchronously)
  populateVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoices;
  }

  // Handle the "Press to Talk" button click
  talkButton.addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance(textArea.value);
    const selectedVoiceName = voiceSelect.value;
    const voices = synth.getVoices();
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceName);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Change face to open mouth while speaking
    utterance.addEventListener('start', () => {
      faceImage.src = './assets/images/smiling-open.png';
    });

    // Revert face to closed mouth after speaking
    utterance.addEventListener('end', () => {
      faceImage.src = './assets/images/smiling.png';
    });

    synth.speak(utterance);
  });
}