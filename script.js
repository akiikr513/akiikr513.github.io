const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');
const question = document.querySelector('.question');
const gif = document.querySelector('.gif');

yesBtn.addEventListener('click', () => {
    question.textContent = 'Yayy! See you on the 14th!';
    gif.src = 'img/cute love1.webp';
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';
});

noBtn.addEventListener('mouseover', () => {
    const maxX = window.innerWidth - noBtn.clientWidth;
    const maxY = window.innerHeight - noBtn.clientHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
});

const heartsContainer = document.querySelector('.hearts-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    const duration = Math.random() * 2 + 8; // Duration between 8s and 10s

    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = duration + 's';

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

setInterval(createHeart, 300);

