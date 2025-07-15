let backend = "https://jhihyang.pythonanywhere.com"
let $ = id => document.getElementById(id)
let viewLoader = () => $("loader-overlay").style.display = "flex"
let hideLoader = () => $("loader-overlay").style.display = "none"

let pages = ["home", "projects", "contact"]
let pageViewed = "home"
let switchingPages = false

function switchPage(e) {
    let move = pages.indexOf(e.dataset.page) - pages.indexOf(pageViewed)
    if (move != 0 && !switchingPages) {
        switchingPages = true;
        let start = $(pageViewed)
        let end = $(e.dataset.page)
        if (e.dataset.page == "home" || e.dataset.page == "contact") {
            end.style.display = "flex"
        } else {
            end.style.display = "block"
        }
        if (move > 0) {
            end.style.top = "68px"
            start.style.animation = "leftOut 0.5s forwards"
            end.style.animation = "rightIn 0.5s forwards"
        } else {
            start.style.top = "68px"
            start.style.animation = "rightOut 0.5s forwards"
            end.style.animation = "leftIn 0.5s forwards"
        }
        setTimeout(() => {
            start.style.display = "none"
            end.style.top = "68px"
            pageViewed = e.dataset.page
            switchingPages = false
        }, 500)
    }
}

numImages = {
    "booktank": 6,
    "minigrad": 4,
    "minirt": 2,
    "mips": 1,
    "hlsyn": 3,
    "cmm": 2,
    "aza": 6,
    "optizona": 3,
    "kewlai": 4,
}

imageIndices = {}

for (let key in numImages) {
    imageIndices[key] = 1
    $(`${key}-picture`).src = `images/${key}/${imageIndices[key]}.png`
    if (key == "kewlai") {
        $(`${key}-picture`).src = `images/${key}/${imageIndices[key]}.gif`
    }
}

function switchImage(project, right) {
    if (right) {
        imageIndices[project]++
    } else {
        imageIndices[project]--
    }
    if (imageIndices[project] > numImages[project]) {
        imageIndices[project] = 1
    } else if (imageIndices[project] < 1) {
        imageIndices[project] = numImages[project]
    }
    $(`${project}-picture`).src = `images/${project}/${imageIndices[project]}.png`
    if (project == "kewlai") {
        $(`${project}-picture`).src = `images/${project}/${imageIndices[project]}.gif`
    }
}

function post(msg) {
    return fetch(backend, {
        method: "POST",
        body: JSON.stringify(msg)
    }).then(response => response.json())
}

post({
    action: "visit"
}).then(() => {}).catch(() => {})

function submitMessage() {
    viewLoader()
	let msg = {
		action: "submitMessage"
	};
	["name", "email", "message"].forEach(attribute => msg[attribute] = $(`contact-form-${attribute}`).value)
    setTimeout(() => {
        post(msg).then(() => {
            ["name", "email", "message"].forEach(attribute => $(`contact-form-${attribute}`).value = "")
            hideLoader()
        }).catch(() => {
            hideLoader()
        })
    }, 500)
    return false
}

function clickProjects() {
    $("header-nav").childNodes[3].click()
}

if (window.location.href.endsWith("#projects")) {
    clickProjects()
}

// === starfield background ===
// coded by Grok

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let shootingStars = [];

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Star class
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1 + 0.5;
        this.speed = Math.random() * 0.05 + 0.01;
        this.opacity = Math.random() * 0.5 + 0.5;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
    update() {
        this.y += this.speed;
        if (this.y > canvas.height) this.y = 0;
        this.opacity = Math.random() * 0.5 + 0.5;
    }
}

// Shooting Star class
class ShootingStar {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.length = Math.random() * 50 + 20;
        this.speedX = Math.random() * 5 - 2.5;
        this.speedY = Math.random() * 5 + 2;
        this.opacity = 1;
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length * this.speedX / 5, this.y - this.length * this.speedY / 5);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;
    }
}

// Initialize stars
function initStars() {
    stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push(new Star());
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    shootingStars = shootingStars.filter(star => star.opacity > 0);
    shootingStars.forEach(star => {
        star.update();
        star.draw();
    });
    // Randomly add shooting stars
    if (Math.random() < 0.005) {
        shootingStars.push(new ShootingStar());
    }
    requestAnimationFrame(animate);
}

canvas.style.display = 'block';
initStars();
animate();

// ============================
