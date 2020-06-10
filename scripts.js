const cards = document.querySelectorAll('.memoryCard');
const descriptions = document.querySelectorAll('.description');


// memoryCard game \\
var cardIsFlipped = false;
var lockBoard = false;
var firstCard, secondCard;
var descriptionArray = [];

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!cardIsFlipped) {
    // first click
    cardIsFlipped = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  var isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    unveilDescription();
    disableCards();
  } else {
    unflipCards();
  }
}

function unveilDescription() {
  descriptions.forEach(description => {
    if (firstCard.dataset.framework == description.dataset.framework) {
      description.style.opacity = "1";
    }
  })
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function flipAll(){
  cards.forEach(card => {
    card.classList.add('flip');
    card.removeEventListener('click', flipCard);
  })
  descriptions.forEach(description => {
    description.style.opacity = 1;
  })
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [cardIsFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    var randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));