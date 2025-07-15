document.addEventListener('DOMContentLoaded', () => {
  const skillLevels = document.querySelectorAll('.skill-level');
  function animateSkills() {
    skillLevels.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        bar.style.width = bar.dataset.level + '%';
      }
    });
  }
  window.addEventListener('scroll', animateSkills);
  animateSkills();

  // Contact form validation and animation
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    this.querySelectorAll('input, textarea').forEach(el => {
      if (!el.value.trim()) valid = false;
    });
    if (!valid) {
      this.classList.add('shake');
      setTimeout(() => this.classList.remove('shake'), 400);
      return;
    }
    // Success animation
    this.reset();
    // Show thank you message
    let thankYou = document.createElement('div');
    thankYou.textContent = 'Thank you for reaching out! Your message has been sent.';
    thankYou.className = 'thank-you-message';
    thankYou.style.cssText = `
      background: #f9b234;
      color: #fff;
      padding: 1.2em;
      border-radius: 12px;
      margin: 1em auto;
      text-align: center;
      font-size: 1.15rem;
      font-weight: 500;
      box-shadow: 0 4px 24px rgba(0,0,0,0.12);
      animation: fadeIn 1s;
    `;
    this.parentNode.insertBefore(thankYou, this.nextSibling);
    setTimeout(() => {
      thankYou.remove();
    }, 3500);
    this.querySelector('button').textContent = 'Send Message';
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Parallax effect for hero bg
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (heroBg) {
      heroBg.style.transform = `translateY(${window.scrollY/3}px) scale(1.02)`;
    }
  });

  // Optional: Lightbox for project images
  document.querySelectorAll('.project-card img').forEach(img => {
    img.addEventListener('click', function() {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.style = `
        position:fixed;top:0;left:0;width:100vw;height:100vh;
        background:rgba(30,30,40,0.97);display:flex;align-items:center;justify-content:center;
        z-index:9999;animation:fadeIn .5s;
      `;
      const image = document.createElement('img');
      image.src = this.src;
      image.alt = this.alt;
      image.style = `max-width:90vw;max-height:85vh;border-radius:18px;box-shadow:0 4px 24px #0006;`;
      lightbox.appendChild(image);
      document.body.appendChild(lightbox);
      lightbox.addEventListener('click', () => document.body.removeChild(lightbox));
    });
  });

  // --- Creative Cursor Trail Effect ---
  const trailCount = 18; // Number of trail dots
  const trailDots = [];
  // Colors for a vibrant fading effect
  const colors = [
    "#f9b234", "#2d3a52", "#ffcf5c", "#fff", "#e5eaf1"
  ];
  // Create trail elements
  for (let i = 0; i < trailCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.style.cssText = `
      position:fixed;
      left:0;top:0;
      width:${12 - i * 0.5}px;
      height:${12 - i * 0.5}px;
      border-radius:50%;
      pointer-events:none;
      z-index:20000;
      opacity:${1 - i * 0.05};
      background:${colors[i % colors.length]};
      box-shadow:0 2px 12px ${colors[i % colors.length]}55;
      transition:background 0.2s;
      will-change:transform;
      mix-blend-mode:screen;
    `;
    document.body.appendChild(dot);
    trailDots.push(dot);
  }
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let lastMouse = { x: mouse.x, y: mouse.y };
  function renderTrail() {
    let x = mouse.x, y = mouse.y;
    for (let i = 0; i < trailDots.length; i++) {
      const dot = trailDots[i];
      lastMouse.x += (x - lastMouse.x) * 0.2;
      lastMouse.y += (y - lastMouse.y) * 0.2;
      dot.style.transform = `translate3d(${lastMouse.x - (i*6)}px,${lastMouse.y - (i*6)}px,0) scale(${1 - i*0.03})`;
      dot.style.opacity = `${0.8 - i * 0.04}`;
      x = lastMouse.x;
      y = lastMouse.y;
    }
    requestAnimationFrame(renderTrail);
  }
  renderTrail();
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mousedown', () => {
    trailDots.forEach((dot, i) => {
      dot.style.background = colors[(i+1) % colors.length];
      dot.style.boxShadow = `0 2px 16px ${colors[(i+1) % colors.length]}88`;
      setTimeout(() => {
        dot.style.background = colors[i % colors.length];
        dot.style.boxShadow = `0 2px 12px ${colors[i % colors.length]}55`;
      }, 200 + i*10);
    });
  });
  const hideTrail = () => trailDots.forEach(dot => dot.style.opacity = 0);
  const showTrail = () => trailDots.forEach((dot, i) => dot.style.opacity = `${0.8 - i * 0.04}`);
  document.querySelectorAll('input, textarea, button').forEach(el => {
    el.addEventListener('mouseenter', hideTrail);
    el.addEventListener('mouseleave', showTrail);
    el.addEventListener('focus', hideTrail);
    el.addEventListener('blur', showTrail);
  });
});