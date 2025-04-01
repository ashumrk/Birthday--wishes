function playAnimation() {
  const canvas = document.getElementById('birthdayCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  const audio = document.getElementById('birthdaySong');
  audio.play();

  const particles = [];

  function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 2;
    this.speedX = (Math.random() - 0.5) * 4;
    this.speedY = (Math.random() - 0.5) * 4;
    this.color = `hsl(${Math.random() * 360}, 70%, 70%)`;
  }

  Particle.prototype.update = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  function createParticles(e) {
    for (let i = 0; i < 20; i++) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
  }

  window.addEventListener('click', createParticles);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
      particle.update();
      particle.draw();
      if (particle.size <= 0.2) particles.splice(index, 1);
    });
    requestAnimationFrame(animate);
  }

  animate();
}
