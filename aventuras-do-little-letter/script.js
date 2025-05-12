const gameData = [
  {
    image: 'public/apple.png',
    letter: 'A',
    description: 'Maçã',
  },
  {
    image: 'public/ball.png',
    letter: 'B',
    description: 'Bola',
  },
  {
    image: 'public/cat.png',
    letter: 'C',
    description: 'Gato',
  },
];

let currentIndex = 0;

const currentImage = document.getElementById('current-image');
const lettersContainer = document.getElementById('letters-container');
const feedback = document.getElementById('feedback');
const nextButton = document.getElementById('next-button');
const speechBalloon = document.getElementById('speech-balloon');

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generateLetterButtons() {
  lettersContainer.innerHTML = '';
  const letters = gameData.map((item) => item.letter);
  const shuffledLetters = shuffleArray(letters);

  shuffledLetters.forEach((letter) => {
    const button = document.createElement('button');
    button.classList.add('letter-button');
    button.textContent = letter;
    button.setAttribute('aria-label', `Letra ${letter}`);
    button.addEventListener('click', () => handleLetterClick(letter, button));
    lettersContainer.appendChild(button);
  });
}

function handleLetterClick(selectedLetter, button) {
  const correctLetter = gameData[currentIndex].letter;
  if (selectedLetter === correctLetter) {
    button.classList.add('correct');
    feedback.textContent = `Muito bem! "${gameData[currentIndex].description}" começa com a letra "${correctLetter}".`;
    speechBalloon.textContent = 'Parabéns! Você acertou!';
    nextButton.disabled = false;
    disableLetterButtons();
  } else {
    button.classList.add('incorrect');
    feedback.textContent = 'Tente novamente!';
    speechBalloon.textContent = 'Ops! Tente outra vez.';
    button.disabled = true;
  }
}

function disableLetterButtons() {
  const buttons = lettersContainer.querySelectorAll('button');
  buttons.forEach((btn) => {
    btn.disabled = true;
  });
}

function enableLetterButtons() {
  const buttons = lettersContainer.querySelectorAll('button');
  buttons.forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove('correct', 'incorrect');
  });
}

function loadCurrentItem() {
  const item = gameData[currentIndex];
  currentImage.src = item.image;
  currentImage.alt = `Imagem de ${item.description}`;
  feedback.textContent = '';
  speechBalloon.textContent = 'Clique na letra que corresponde à imagem.';
  nextButton.disabled = true;
  enableLetterButtons();
}

nextButton.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= gameData.length) {
    currentIndex = 0;
  }
  loadCurrentItem();
});

window.onload = () => {
  loadCurrentItem();
  generateLetterButtons();
};
