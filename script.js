const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');
const question = document.querySelector('.question');
const gif = document.querySelector('.gif');
const container = document.querySelector('.container');
const galleryContainer = document.querySelector('.gallery-container');
const heartMain = document.querySelector('.heart-main');

yesBtn.addEventListener('click', () => {
    // Update central text and image
    question.textContent = 'See you on 14th Feb';
    if (gif) {
        gif.src = 'img/cute love1.webp';
        gif.alt = 'cute love';
        gif.classList.add('center-image');
    }

    // hide the yes/no buttons — no longer needed
    const buttonsWrap = document.querySelector('.buttons');
    if (buttonsWrap) buttonsWrap.style.display = 'none';

    // show the decorative heart (adds pseudo elements)
    if (heartMain) heartMain.classList.add('heart-visible');

    // Reveal and prepare the gallery behind the heart
    galleryContainer.style.display = 'block';

    // Duplicate gallery items so the scroll is seamless (infinite)
    const gallery = galleryContainer.querySelector('.rhombus-gallery');
    if (gallery && !gallery.dataset.duplicated) {
        // populate each image with a random source
        const imgs = gallery.querySelectorAll('img');
        imgs.forEach(img => {
            img.src = randomPicsum(500);
        });

        // duplicate enough times to ensure long continuous strip
        const items = Array.from(gallery.children);
        items.forEach((it) => gallery.appendChild(it.cloneNode(true)));
        gallery.dataset.duplicated = 'true';

        // create a second row, offset, to produce a honeycomb-like feel
        const row2 = gallery.cloneNode(true);
        row2.classList.add('row2');
        row2.dataset.duplicated = 'true';
        // randomize images in the second row so they aren't identical
        const imgs2 = row2.querySelectorAll('img');
        imgs2.forEach(img => { img.src = randomPicsum(500); });

        galleryContainer.appendChild(row2);
    }
});

// return a Picsum URL with a random seed — keeps images consistent per element but random overall
function randomPicsum(size = 500) {
    const seed = Math.random().toString(36).substring(2, 9);
    return `https://picsum.photos/seed/${seed}/${size}/${size}`;
}

noBtn.addEventListener('mouseover', () => {
    // ensure the button is positioned relative to the viewport
    noBtn.style.position = 'fixed';

    // keep the button within the viewport with a padding so it never becomes unreachable
    const padding = 12; // px
    const maxX = Math.max(window.innerWidth - noBtn.offsetWidth - padding, padding);
    const maxY = Math.max(window.innerHeight - noBtn.offsetHeight - padding, padding);

    let newX = Math.random() * (maxX - padding) + padding;
    let newY = Math.random() * (maxY - padding) + padding;

    // clamp to range [padding, max]
    newX = Math.min(Math.max(newX, padding), maxX);
    newY = Math.min(Math.max(newY, padding), maxY);

    noBtn.style.left = `${Math.round(newX)}px`;
    noBtn.style.top = `${Math.round(newY)}px`;
});

// also ensure on window resize the no button remains in viewport
window.addEventListener('resize', () => {
    if (!noBtn) return;
    const padding = 12;
    const maxX = Math.max(window.innerWidth - noBtn.offsetWidth - padding, padding);
    const maxY = Math.max(window.innerHeight - noBtn.offsetHeight - padding, padding);
    const curLeft = parseInt(noBtn.style.left || '0', 10);
    const curTop = parseInt(noBtn.style.top || '0', 10);
    const clampedLeft = Math.min(Math.max(curLeft, padding), maxX);
    const clampedTop = Math.min(Math.max(curTop, padding), maxY);
    noBtn.style.left = `${clampedLeft}px`;
    noBtn.style.top = `${clampedTop}px`;
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

