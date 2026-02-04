const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');
const question = document.querySelector('.question');
const gif = document.querySelector('.gif');

yesBtn.addEventListener('click', () => {
    question.textContent = 'Yayy! See you on the 14th!';
    gif.src = 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2R0cTNpbm1iZGNsM3J3bHM4M3RiaGI4d3Z0cW92dG1tY2l1N3JpbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11W0mn3Qc2k1Gg/giphy.gif';
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
