const app = document.getElementById('app');
let vocabs = [
  { id: 1, front: "Hello", back: "Hallo", known: false },
  { id: 2, front: "Goodbye", back: "Auf Wiedersehen", known: false },
];
let currentCardIndex = 0;
let startX = 0;
let isDragging = false;

// Render-Funktion mit Swipe-Event-Handlern
function render() {
  const currentCard = vocabs[currentCardIndex];
  
  app.innerHTML = `
    <div 
      class="card" 
      onclick="flipCard()"
      ontouchstart="handleTouchStart(event)"
      ontouchmove="handleTouchMove(event)"
      ontouchend="handleTouchEnd(event)"
      onmousedown="handleMouseDown(event)"
      onmousemove="handleMouseMove(event)"
      onmouseup="handleMouseEnd(event)"
    >
      ${currentCard ? currentCard.front : "Keine Vokabeln mehr!"}
    </div>
    <div class="nav">
      <button onclick="prevCard()">Zurück</button>
      <button onclick="nextCard()">Weiter</button>
    </div>
  `;
}

// Swipe-Handler für Touch
function handleTouchStart(e) {
  startX = e.touches[0].clientX;
  isDragging = true;
}

function handleTouchMove(e) {
  if (!isDragging) return;
  const card = e.target;
  const x = e.touches[0].clientX - startX;
  card.style.transform = `translateX(${x}px) rotate(${x / 10}deg)`;
}

function handleTouchEnd(e) {
  if (!isDragging) return;
  const card = e.target;
  const x = e.changedTouches[0].clientX - startX;
  handleSwipeEnd(card, x);
}

// Swipe-Handler für Mouse (für Desktop)
function handleMouseDown(e) {
  startX = e.clientX;
  isDragging = true;
  e.preventDefault(); // Verhindert Textauswahl
}

function handleMouseMove(e) {
  if (!isDragging) return;
  const card = e.target;
  const x = e.clientX - startX;
  card.style.transform = `translateX(${x}px) rotate(${x / 10}deg)`;
}

function handleMouseEnd(e) {
  if (!isDragging) return;
  const card = e.target;
  const x = e.clientX - startX;
  handleSwipeEnd(card, x);
}

// Entscheidet, ob die Karte geswiped wird
function handleSwipeEnd(card, moveX) {
  isDragging = false;
  const threshold = 100;

  if (Math.abs(moveX) > threshold) {
    card.classList.add(moveX > 0 ? 'swipe-right' : 'swipe-left');
    setTimeout(() => {
      if (moveX > 0) {
        vocabs[currentCardIndex].known = true; // Richtig
      }
      nextCard(); // Nächste Karte
    }, 200);
  } else {
    card.style.transform = ''; // Zurück zur Mitte
  }
}

// Restliche Funktionen (flipCard, nextCard, prevCard) bleiben gleich wie vorher
function flipCard() {
  const currentCard = vocabs[currentCardIndex];
  const cardElement = document.querySelector('.card');
  if (cardElement.textContent === currentCard.front) {
    cardElement.textContent = currentCard.back;
  } else {
    cardElement.textContent = currentCard.front;
  }
}

function nextCard() {
  if (currentCardIndex < vocabs.length - 1) {
    currentCardIndex++;
    render();
  }
}

function prevCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    render();
  }
}

// Initialer Render
render();
