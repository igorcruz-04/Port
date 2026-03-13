// ========================================
// MINHA TRANSFORMAÇÃO - MAIN JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // ===== LOADER =====
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1200);
    });
    // Fallback: hide loader after 3s max
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 3000);

    // ===== CUSTOM CURSOR =====
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX - 4 + 'px';
            cursor.style.top = mouseY - 4 + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            cursorFollower.style.left = followerX - 18 + 'px';
            cursorFollower.style.top = followerY - 18 + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .video-card, .comparison-slider, input, textarea');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }

    // ===== PROGRESS BAR =====
    const progressBar = document.getElementById('progress-bar');
    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }

    // ===== NAVBAR =====
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navAnchors = navLinks.querySelectorAll('a');

    function updateNavbar() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    function updateActiveNav() {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = navLinks.querySelector(`a[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    // ===== PARTICLES =====
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.life = Math.random() * 200 + 100;
            this.maxLife = this.life;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;
            if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            const alpha = (this.life / this.maxLife) * this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 200, 83, ${alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ===== HERO PARALLAX =====
    const heroParallax = document.querySelector('.hero-parallax');
    function updateParallax() {
        if (heroParallax) {
            const scrolled = window.scrollY;
            heroParallax.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    }

    // ===== SCROLL REVEAL =====
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const progressItems = document.querySelectorAll('.progress-item');

    function checkScrollReveal() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;

        scrollRevealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < triggerPoint) {
                el.classList.add('revealed');
            }
        });

        progressItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < triggerPoint) {
                item.classList.add('revealed');
            }
        });
    }

    // ===== TIMELINE ANIMATION =====
    const timelineFill = document.querySelector('.timeline-line-fill');
    const timeline = document.querySelector('.timeline');

    function updateTimeline() {
        if (!timeline || !timelineFill) return;
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
            const timelineHeight = rect.height;
            const visibleTop = Math.max(0, -rect.top + windowHeight * 0.3);
            const percentage = Math.min(100, (visibleTop / timelineHeight) * 100);
            timelineFill.style.height = percentage + '%';
        }
    }

    // ===== COMPARISON SLIDER =====
    const comparisonSlider = document.getElementById('comparisonSlider');
    const comparisonHandle = document.getElementById('comparisonHandle');
    const comparisonBefore = comparisonSlider ? comparisonSlider.querySelector('.comparison-before') : null;

    if (comparisonSlider && comparisonHandle && comparisonBefore) {
        let isDragging = false;

        function updateSlider(x) {
            const rect = comparisonSlider.getBoundingClientRect();
            let pos = ((x - rect.left) / rect.width) * 100;
            pos = Math.max(2, Math.min(98, pos));
            comparisonBefore.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
            comparisonHandle.style.left = pos + '%';
        }

        comparisonSlider.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateSlider(e.clientX);
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updateSlider(e.clientX);
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch support
        comparisonSlider.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateSlider(e.touches[0].clientX);
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                updateSlider(e.touches[0].clientX);
            }
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    // ===== ANIMATED COUNTERS =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const statsSection = document.getElementById('results');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            countersAnimated = true;

            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);
                    num.textContent = current.toLocaleString('pt-BR');

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                requestAnimationFrame(updateCounter);
            });
        }
    }

    // ===== VIDEO MODAL =====
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = videoModal ? videoModal.querySelector('.modal-overlay') : null;

    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            if (videoModal) {
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        if (videoModal) {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> <span>Mensagem Enviada!</span>';
            btn.style.background = 'linear-gradient(135deg, #00c853, #69f0ae)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                contactForm.reset();
            }, 3000);
        });
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SCROLL EVENT HANDLER =====
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgressBar();
                updateNavbar();
                updateActiveNav();
                updateParallax();
                checkScrollReveal();
                updateTimeline();
                animateCounters();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial calls
    updateProgressBar();
    updateNavbar();
    checkScrollReveal();
    updateTimeline();
});