// ============================================================================
// 3D TILT EFFECT
// ============================================================================
class TiltEffect {
  constructor(element) {
    this.element = element;
    this.rect = null;
    this.init();
  }

  init() {
    this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.element.addEventListener('mouseleave', () => this.handleMouseLeave());
  }

  handleMouseMove(e) {
    this.rect = this.element.getBoundingClientRect();
    const x = e.clientX - this.rect.left;
    const y = e.clientY - this.rect.top;
    
    const centerX = this.rect.width / 2;
    const centerY = this.rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = -(x - centerX) / 10;
    
    this.element.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(20px)
    `;
  }

  handleMouseLeave() {
    this.element.style.transform = `
      perspective(1000px)
      rotateX(0)
      rotateY(0)
      translateZ(0)
    `;
    this.element.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)';
    setTimeout(() => {
      this.element.style.transition = 'none';
    }, 600);
  }
}

// Initialize tilt on project cards
function initTiltCards() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => new TiltEffect(card));
}

// ============================================================================
// PARALLAX EFFECT
// ============================================================================
function initParallax() {
  const parallaxBg = document.getElementById('parallaxBg');
  if (!parallaxBg) return;

  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    parallaxBg.style.transform = `
      translate(${x * 20}px, ${y * 20}px)
      scale(1.05)
    `;
  });
}

// ============================================================================
// TYPING EFFECT
// ============================================================================
function initTypingEffect() {
  const typedTextSpan = document.querySelector('.typed-text');
  if (!typedTextSpan) return;

  const textArray = [
    'Rahul Sutradhar',
    'AI Engineer',
    'RAG Specialist',
    'LLM Developer'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const delayBetweenTexts = 2000;

  function type() {
    const currentText = textArray[textIndex];
    
    if (!isDeleting) {
      typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenTexts);
        return;
      }
    } else {
      typedTextSpan.textContent = currentText.substring(0, charIndex);
      charIndex--;
      
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
        return;
      }
    }
    
    setTimeout(type, typingSpeed);
  }

  type();
}

// ============================================================================
// SCROLL ANIMATIONS WITH INTERSECTION OBSERVER
// ============================================================================
function initScrollAnimations() {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        
        // Stagger animations for child elements
        if (entry.target.classList.contains('fade-in-up') ||
            entry.target.classList.contains('fade-in-left') ||
            entry.target.classList.contains('fade-in-right')) {
          entry.target.style.animation = null;
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Observe all animated elements
  document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
  });

  // Observe sections
  document.querySelectorAll('.reveal-section').forEach(section => {
    observer.observe(section);
  });
}

// ============================================================================
// SKILL BARS ANIMATION
// ============================================================================
function initSkillBars() {
  const options = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, options);

  document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
  });
}

// ============================================================================
// SMOOTH SCROLL NAVIGATION
// ============================================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================================================
// CONTACT FORM HANDLING
// ============================================================================
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: form.querySelector('input[type="text"]').value,
      email: form.querySelector('input[type="email"]').value,
      message: form.querySelector('textarea').value
    };

    // Validate
    if (!formData.name || !formData.email || !formData.message) {
      showFormMessage('Please fill in all fields', 'error');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showFormMessage('Please enter a valid email', 'error');
      return;
    }

    // Simulate sending (replace with actual API call)
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
    } catch (error) {
      showFormMessage('Failed to send message. Please try again.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  function showFormMessage(message, type) {
    const messageEl = document.getElementById('formMessage');
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    
    setTimeout(() => {
      messageEl.className = 'form-message';
    }, 4000);
  }
}

// ============================================================================
// NAVBAR HIDE ON SCROLL
// ============================================================================
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// ============================================================================
// RANDOM FLOATING PARTICLES (optional enhancement)
// ============================================================================
function initParticles() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(0, 212, 255, 0.5);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float-particle ${3 + Math.random() * 4}s infinite ease-in-out;
      pointer-events: none;
    `;
    heroSection.appendChild(particle);
  }

  if (!document.querySelector('style[data-particles]')) {
    const style = document.createElement('style');
    style.setAttribute('data-particles', 'true');
    style.textContent = `
      @keyframes float-particle {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translate(${Math.random() * 200 - 100}px, -${Math.random() * 200 + 100}px) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ============================================================================
// CURSOR EFFECT
// ============================================================================
function initCursorEffect() {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 212, 255, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    display: none;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = (e.clientX - 10) + 'px';
    cursor.style.top = (e.clientY - 10) + 'px';
    cursor.style.display = 'block';
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
  });

  // Highlight interactive elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'A' || 
        e.target.tagName === 'BUTTON' || 
        e.target.classList.contains('project-card')) {
      cursor.style.borderColor = 'rgba(0, 212, 255, 1)';
      cursor.style.width = '30px';
      cursor.style.height = '30px';
      cursor.style.left = (e.clientX - 15) + 'px';
      cursor.style.top = (e.clientY - 15) + 'px';
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'A' || 
        e.target.tagName === 'BUTTON' || 
        e.target.classList.contains('project-card')) {
      cursor.style.borderColor = 'rgba(0, 212, 255, 0.5)';
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.left = (e.clientX - 10) + 'px';
      cursor.style.top = (e.clientY - 10) + 'px';
    }
  });
}

// ============================================================================
// INITIALIZE ALL
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initTiltCards();
  initParallax();
  initScrollAnimations();
  initSkillBars();
  initSmoothScroll();
  initContactForm();
  initNavbarScroll();
  initParticles();
  initCursorEffect();
});

// Handle window resize for tilt effect
window.addEventListener('resize', () => {
  initTiltCards();
});