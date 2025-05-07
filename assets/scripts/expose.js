// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const hornSelect = document.getElementById('horn-select');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');
  const playButton = document.querySelector('button');
  const audioElement = document.querySelector('audio');
  const hornImage = document.querySelector('#expose img');
  const jsConfetti = new JSConfetti();

  // Update horn image and audio source when a horn is selected
  hornSelect.addEventListener('change', () => {
    const hornValue = hornSelect.value;
    if (hornValue === 'air-horn') {
      hornImage.src = './assets/images/air-horn.svg';
      audioElement.src = './assets/audio/air-horn.mp3';
    } else if (hornValue === 'car-horn') {
      hornImage.src = './assets/images/car-horn.svg';
      audioElement.src = './assets/audio/car-horn.mp3';
    } else if (hornValue === 'party-horn') {
      hornImage.src = './assets/images/party-horn.svg';
      audioElement.src = './assets/audio/party-horn.mp3';
    }
  });

  // Update volume icon and audio volume when the slider changes
  volumeSlider.addEventListener('input', () => {
    const volumeValue = volumeSlider.value;
    if (volumeValue == 0) {
      volumeIcon.src = './assets/icons/volume-level-0.svg';
    } else if (volumeValue < 33) {
      volumeIcon.src = './assets/icons/volume-level-1.svg';
    } else if (volumeValue < 67) {
      volumeIcon.src = './assets/icons/volume-level-2.svg';
    } else {
      volumeIcon.src = './assets/icons/volume-level-3.svg';
    }
    audioElement.volume = volumeValue / 100; // Volume will be between 0 and 1
  });

  // Play the selected horn sound when the button is clicked
  playButton.addEventListener('click', () => {
    if (audioElement.src) {
      audioElement.play();
      if (hornSelect.value === 'party-horn') {
        jsConfetti.addConfetti();
      }
    }
  });
}