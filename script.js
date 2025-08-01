// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `Olá Jeremias!%0A%0A` +
        `Nome: ${encodeURIComponent(name)}%0A` +
        `Email: ${encodeURIComponent(email)}%0A` +
        `Assunto: ${encodeURIComponent(subject)}%0A%0A` +
        `Mensagem:%0A${encodeURIComponent(message)}`;
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/244000000000?text=${whatsappMessage}`, '_blank');
    
    // Reset form
    contactForm.reset();
    
    // Show success message
    alert('Obrigado pela tua mensagem! Serás redirecionado para o WhatsApp.');
});

// Add mobile menu styles
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            width: 100%;
            height: 100vh;
            background: rgba(26, 26, 26, 0.98);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: right 0.3s ease;
            z-index: 999;
        }
        
        .nav-links.active {
            right: 0;
        }
        
        .nav-links li {
            margin: 1rem 0;
        }
        
        .nav-links a {
            font-size: 1.2rem;
            padding: 1rem 2rem;
            display: block;
            text-align: center;
        }
    }
`;
document.head.appendChild(style);

// Add typing animation to hero text
const heroTitle = document.querySelector('.hero h1');
const heroSubtitle = document.querySelector('.hero-subtitle');

// Add a subtle pulse animation to CTA buttons
const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
ctaButtons.forEach((btn, index) => {
    setTimeout(() => {
        btn.style.animationDelay = `${index * 0.1}s`;
        btn.style.animation = 'pulse 2s infinite';
    }, 1000);
});

// Add pulse animation keyframes
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// Add hover effects to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(212, 168, 83, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    hero.appendChild(particlesContainer);
}

// Add float animation for particles
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
`;
document.head.appendChild(floatStyle);

// Initialize particles
createParticles();

// Add counter animation for stats (if needed in future)
function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('animated');
            }
        });
    }, 100);
});

// Performance optimization: throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Header background update
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Add loading state
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initial body styling
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';