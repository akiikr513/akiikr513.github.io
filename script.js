document.addEventListener('DOMContentLoaded', () => {
    const soundToggle = document.getElementById('soundToggle');
    const audio = document.getElementById('bgMusic');
    let isSoundOn = true;
    let hasInteracted = false;

    audio.volume = 0.01;

    function startAudio() {
        audio.muted = false;
        audio.play().catch(e => {
            // Autoplay was prevented. This is normal.
            // We wait for the next user interaction to try again.
        });
    }

    soundToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        startAudio();
        isSoundOn = !isSoundOn;
        if (isSoundOn) {
            audio.volume = 0.01;
            soundToggle.src = 'img/speaker_on.gif';
        } else {
            audio.volume = 0;
            soundToggle.src = 'img/speaker_off.gif';
        }
    });

    const yesBtn = document.querySelector('.yes-btn');
    const noBtn = document.querySelector('.no-btn');

    // Attempt to play immediately, and on any first interaction (click or touch)
    startAudio();
    document.body.addEventListener('click', startAudio, { once: true });
    document.body.addEventListener('touchstart', startAudio, { once: true });

    noBtn.addEventListener('mouseover', startAudio);
    const question = document.querySelector('.question');
    const gif = document.querySelector('.gif');
    const container = document.querySelector('.container');
    const galleryContainer = document.querySelector('.gallery-container');
    const heartMain = document.querySelector('.heart-main');

    // List of your actual images
    const galleryImages = [
        'img/my images/IMG20241222132547.jpg',
        'img/my images/IMG20241222151626.jpg',
        'img/my images/IMG20250103135718.jpg',
        'img/my images/IMG20250103143050.jpg',
        'img/my images/IMG20250213200101.jpg',
        'img/my images/IMG20250217101549.jpg',
        'img/my images/IMG20250218092951.jpg',
        'img/my images/IMG20250218103410.jpg',
        'img/my images/IMG20250218110814.jpg',
        'img/my images/IMG20250222170453.jpg',
        'img/my images/IMG20250223100437.jpg',
        'img/my images/IMG20250223103558.jpg',
        'img/my images/IMG20250309114323.jpg',
        'img/my images/IMG20251020193255.jpg',
        'img/my images/IMG20251023104002.jpg',
        'img/my images/IMG20251231151916.jpg',
        'img/my images/IMG20260110161401.jpg',
        'img/my images/IMG20260110161444.jpg',
        'img/my images/IMG_20241213_184543.jpg',
        'img/my images/IMG_20250217_181950.jpg',
        'img/my images/IMG_20250224_104606.jpg',
        'img/my images/IMG_20250912_000629.jpg',
        'img/my images/IMG_8062.JPG',
        'img/my images/IMG_8063.JPG',
        'img/my images/IMG_8066.JPG',
        'img/my images/IMG_8068.JPG',
        'img/my images/IMG_8070.JPG',
        'img/my images/IMG_8074.JPG',
        'img/my images/IMG_8075.JPG',
        'img/my images/IMG_8077.JPG',
        'img/my images/IMG_8079.JPG',
        'img/my images/IMG_8083.JPG',
        'img/my images/IMG_8088.JPG',
        'img/my images/DSC6786.JPG',
        'img/my images/DSC6921.JPG',
        'img/my images/DSC6943.JPG',
        'img/my images/DSC7023.JPG',
        'img/my images/DSC7047.JPG',
        'img/my images/DSC7054.JPG'
    ];

    // Shuffle array using Fisher-Yates shuffle
    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Get a random image from the gallery
    function getRandomImage() {
        return galleryImages[Math.floor(Math.random() * galleryImages.length)];
    }

    yesBtn.addEventListener('click', () => {
        startAudio();
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
        // Also ensure noBtn is hidden (in case it was moved to body)
        noBtn.style.display = 'none';

        // show the decorative heart (adds pseudo elements)
        if (heartMain) heartMain.classList.add('heart-visible');

        // Reveal and prepare the gallery behind the heart
        galleryContainer.style.display = 'block';

        // Populate gallery with images
        const gallery = document.getElementById('gallery');
        if (gallery && !gallery.dataset.duplicated) {
            // Get shuffled images
            const shuffledImages = shuffleArray(galleryImages);
            const selectedImages = shuffledImages.slice(0, 8); // Use first 8 images

            // Create rhombus elements with images
            selectedImages.forEach(imageSrc => {
                const rhombus = document.createElement('div');
                rhombus.classList.add('rhombus');
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = 'gallery image';
                rhombus.appendChild(img);
                gallery.appendChild(rhombus);
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
            const shuffledImages2 = shuffleArray(galleryImages);
            const imgs2 = row2.querySelectorAll('img');
            let imgIndex = 0;
            imgs2.forEach(img => {
                img.src = shuffledImages2[imgIndex % shuffledImages2.length];
                imgIndex++;
            });

            galleryContainer.appendChild(row2);
        }
    });

    function moveNoButton() {
        startAudio();

        // Move button to body to ensure fixed positioning works relative to viewport
        // even if parent container has transforms (common in responsive layouts)
        if (noBtn.parentNode !== document.body) {
            document.body.appendChild(noBtn);
        }

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
    }

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);

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


    // Create many hearts and sparkles around the window edges to act as a frame
    function createFrameElements(heartCount = 80, sparkleCount = 60) {
        let frame = document.getElementById('windowFrame');
        if (!frame) {
            frame = document.createElement('div');
            frame.id = 'windowFrame';
            frame.className = 'window-frame';
            document.body.appendChild(frame);
        }

        frame.innerHTML = '';

        // helper to place element near edges
        function placeNearEdge(el, edge) {
            const pad = 2; // percent padding from exact edge
            if (edge === 'top') {
                el.style.top = (Math.random() * 6 + 0) + '%';
                el.style.left = (Math.random() * 100) + '%';
            } else if (edge === 'bottom') {
                el.style.bottom = (Math.random() * 6 + 0) + '%';
                el.style.left = (Math.random() * 100) + '%';
            } else if (edge === 'left') {
                el.style.left = (Math.random() * 6 + 0) + '%';
                el.style.top = (Math.random() * 100) + '%';
            } else { // right
                el.style.right = (Math.random() * 6 + 0) + '%';
                el.style.top = (Math.random() * 100) + '%';
            }
        }

        const edges = ['top', 'bottom', 'left', 'right'];

        for (let i = 0; i < heartCount; i++) {
            const h = document.createElement('div');
            h.className = 'frame-heart';
            const edge = edges[Math.floor(Math.random() * edges.length)];
            placeNearEdge(h, edge);
            // randomize size and animation
            const size = 8 + Math.random() * 18;
            h.style.width = size + 'px';
            h.style.height = size + 'px';
            h.style.animationDuration = 3 + Math.random() * 4 + 's';
            frame.appendChild(h);
        }

        for (let i = 0; i < sparkleCount; i++) {
            const s = document.createElement('div');
            s.className = 'frame-sparkle';
            const edge = edges[Math.floor(Math.random() * edges.length)];
            placeNearEdge(s, edge);
            const size = 3 + Math.random() * 6;
            s.style.width = size + 'px';
            s.style.height = size + 'px';
            s.style.animationDuration = (1.2 + Math.random() * 2.2) + 's';
            s.style.animationDelay = (Math.random() * 3) + 's';
            frame.appendChild(s);
        }
    }

    // Initialize frame elements and refresh occasionally
    createFrameElements();
    window.addEventListener('resize', () => {
        // re-create to adapt to new size
        createFrameElements(70 + Math.floor(Math.random() * 50), 50 + Math.floor(Math.random() * 40));
    });

    // Preload gallery images in background for instant display
    function preloadGalleryImages() {
        galleryImages.forEach(imageSrc => {
            const img = new Image();
            img.src = imageSrc;
        });
    }

    preloadGalleryImages();
});
