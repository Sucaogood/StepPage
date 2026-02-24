AOS.init({
    duration: 1000,
    once: true,
});

const form = document.querySelector('.contact-form');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form)
        });

        alert('Mensagem enviada com sucesso!');
        form.reset();
    });
}

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const CONFIG = {
  count: 90,
  speed: 0.3,
  radius: 1.2,
  distance: 120,
  color: "88,166,255" // azul premium
};

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * CONFIG.speed;
    this.vy = (Math.random() - 0.5) * CONFIG.speed;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, CONFIG.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${CONFIG.color},0.8)`;
    ctx.fill();
  }
}

for (let i = 0; i < CONFIG.count; i++) {
  particles.push(new Particle());
}

function connect() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONFIG.distance) {
        ctx.strokeStyle = `rgba(${CONFIG.color},${1 - dist / CONFIG.distance})`;
        ctx.lineWidth = 0.4;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    p.move();
    p.draw();
  });

  connect();
  requestAnimationFrame(animate);
}

animate();

const revealLines = document.querySelectorAll(".about-reveal span");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.78;

  revealLines.forEach(line => {
    const top = line.getBoundingClientRect().top;

    if (top < trigger) {
      line.style.color = "#fff";
    } else {
      line.style.color = "rgba(255,255,255,0.18)";
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const animatedElements = document.querySelectorAll('[data-animate]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('ativo');
      }, index * 120); // stagger elegante
    }
  });
}, { threshold: 0.25 });

animatedElements.forEach(el => revealObserver.observe(el));


const bars = document.querySelectorAll('.barra');
let chartPlayed = false;

const animateChart = () => {
  if (chartPlayed) return;

  bars.forEach(bar => {
    const value = bar.getAttribute('data-value');
    bar.style.height = value + '%';
  });

  chartPlayed = true;
};

const chart = document.querySelector('.grafico');

const chartObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateChart();
    }
  });
}, { threshold: 0.4 });

if (chart) {
  chartObserver.observe(chart);
}


AOS.init({
  once: true,
  duration: 900,
  easing: 'ease-out-cubic'
});

const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  document.querySelectorAll(".animated-text").forEach(text => {
    const letters = text.innerText.split("");
    text.innerHTML = "";

    letters.forEach((letter, index) => {
      const span = document.createElement("span");
      span.innerText = letter === " " ? "\u00A0" : letter;
      span.style.animationDelay = `${index * 0.03}s`;
      text.appendChild(span);
    });
  });

  const fab = document.querySelector(".social-fab");
  const mainBtn = fab.querySelector(".social-main");

  mainBtn.addEventListener("click", () => {
    fab.classList.toggle("active");
  });

  