// ========== Section Animations ==========
gsap.registerPlugin(ScrollTrigger);
gsap.from(".hero-title", { duration: 1, y: -50, opacity: 0 });
gsap.from(".hero-subtitle", { duration: 1, y: 50, opacity: 0, delay: 0.5 });
gsap.from(".scroll-indicator", { duration: 1, opacity: 0, delay: 1 });

gsap.utils.toArray("section").forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse"
        }
    });
});

// ========== Dark/Light Mode Toggle ==========
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    const lampText = document.getElementById('lamp-text');
    if (document.body.classList.contains('light-mode')) {
        lampText.textContent = 'Toggle Dark Mode';
    } else {
        lampText.textContent = 'Toggle Light Mode';
    }
}

// ========== Custom Cursor ==========
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', (e) => {
    cursorDot.style.top = `${e.clientY}px`;
    cursorDot.style.left = `${e.clientX}px`;
});

// ========== Floating Particles Background ==========
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray;

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        particlesArray.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        let p = particlesArray[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200, 200, 255, 0.3)";
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;

        // Bounce from edges
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    requestAnimationFrame(animateParticles);
}

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    initParticles();
});

// Initialize particles
canvas.width = innerWidth;
canvas.height = innerHeight;
initParticles();
animateParticles();

// ========== Parallax Background Movement ==========
gsap.utils.toArray("section").forEach(section => {
    gsap.to(section, {
        backgroundPositionY: "50%",
        scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// ========== Gear Scroll Speed Effect ==========
let gears = document.querySelectorAll('.gear');

window.addEventListener('scroll', () => {
    let scrollSpeed = window.scrollY;
    gears.forEach(gear => {
        if (gear.classList.contains('rotate')) {
            gear.style.animationDuration = `${20 - Math.min(scrollSpeed/50, 10)}s`;
        } else if (gear.classList.contains('rotate-reverse')) {
            gear.style.animationDuration = `${25 - Math.min(scrollSpeed/50, 10)}s`;
        }
    });
});
