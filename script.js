// Eric Brítez Portfolio - JavaScript Functionality

// Global Variables
let isLoading = true;
const typingRoles = [
    'Desarrollador Full-Stack',
    'Content Creator',
    'Editor Digital',
    'Estudiante de Software',
    'Creativo Digital'
];
let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Initialize Portfolio
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // evita que recargue la página

    emailjs.sendForm("service_6fonyxk", "template_4cisy38", this)
      .then(() => {
        alert("✅ Mensaje enviado con éxito!");
        form.reset(); // limpia el formulario
      }, (error) => {
        console.error("❌ Error:", error);
        alert("Hubo un problema al enviar el mensaje. Intenta de nuevo.");
      });
  });
});

function initializePortfolio() {
    // Show loading screen
    showLoadingScreen();
    
    // Initialize components after loading
    setTimeout(() => {
        hideLoadingScreen();
        initializeNavigation();
        initializeMatrixEffect();
        initializeTypingEffect();
        initializeScrollAnimations();
        initializeSkillLevels();
        initializeFormHandling();
    }, 3000);
}

// Loading Screen Functions
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    loadingScreen.style.display = 'flex';
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    loadingScreen.classList.add('hidden');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        isLoading = false;
    }, 500);
}

// Navigation Functions
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Handle scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active section highlighting
    initializeActiveSection();
}

function initializeActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Matrix Canvas Effect
function initializeMatrixEffect() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Initialize drops array
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    // Draw matrix effect
    function drawMatrix() {
        if (isLoading) return;
        
        // Black background with transparency for trail effect
        ctx.fillStyle = 'rgba(21, 0, 22, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text properties
        ctx.fillStyle = '#29104A';
        ctx.font = fontSize + 'px monospace';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            // Reset drop randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Start animation
    setInterval(drawMatrix, 50);
}

// Typing Effect
function initializeTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    
    function typeRole() {
        const currentRole = typingRoles[currentRoleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % typingRoles.length;
            }
        } else {
            typingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            if (currentCharIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeRole, 2000); // Pause before deleting
                return;
            }
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeRole, typingSpeed);
    }
    
    // Start typing effect
    setTimeout(typeRole, 1000);
}

// Scroll Animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .timeline-item, .contact-card, .about-card'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Set initial state and observe
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Skill Level Animations
function initializeSkillLevels() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.setProperty('--level', level + '%');
            }
        });
    }, observerOptions);
    
    skillLevels.forEach(level => {
        observer.observe(level);
    });
}

// Form Handling
function initializeFormHandling() {
    const form = document.querySelector('.form');
    const submitButton = document.querySelector('.submit-button');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Enviando...</span>';
    submitButton.disabled = true;
    
    // Get form data
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Restore button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-accent)'};
        color: var(--color-deep-purple);
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow-large);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Download CV Function
function downloadCV() {
    const cvContent = `
ERIC BRÍTEZ - CURRÍCULUM VITAE

═══════════════════════════════════════════════════════════════

DATOS PERSONALES
────────────────────────────────────────────────────────────
Nombre: Eric Brítez
Profesión: Editor, Desarrollador Web & Estudiante de Desarrollo de Software
Ubicación: Formosa Capital, Argentina
Estudios: Secundario Completo en Ciencias Naturales
Institución: E.P.E.S Nº16 "República de Italia"

CONTACTO PROFESIONAL
────────────────────────────────────────────────────────────
📧 Email: erikbritejr@email.com
📱 Instagram Personal: @britez_eric
💻 Contenido Tech: @briteech
🎯 TikTok: @briteech

Nota: Para una comunicación más rápida, contáctame por mi 
Instagram personal @britez_eric. Si prefieres WhatsApp, 
puedes solicitarlo por mensaje privado en Instagram.

HABILIDADES PRINCIPALES
────────────────────────────────────────────────────────────
🎬 EDICIÓN DE VIDEO PROFESIONAL
   • CapCut (Avanzado)
   • Edición cinematográfica
   • Storytelling visual
   • Contenido para redes sociales

💻 DESARROLLO WEB FULL-STACK
   • HTML5, CSS3, JavaScript
   • Python
   • MySQL
   • Visual Studio Code
   • Desarrollo responsive

🎨 DISEÑO GRÁFICO Y UI/UX
   • Canva (Experto)
   • Adobe Photoshop
   • Diseño de interfaces
   • Identidad visual

📱 CREACIÓN DE CONTENIDO DIGITAL
   • TikTok Content Creation
   • Estrategias de engagement
   • Marketing digital
   • Educación tecnológica

🌟 HABILIDADES BLANDAS
   • Responsabilidad
   • Amabilidad y empatía
   • Constancia y perseverancia
   • Creatividad e innovación
   • Trabajo en equipo
   • Aprendizaje continuo

PROYECTOS DESTACADOS
────────────────────────────────────────────────────────────
🚀 CANAL TIKTOK @BRITEECH
   • Contenido tecnológico educativo
   • Crecimiento orgánico sostenido
   • Comunidad activa y comprometida
   • Enfoque en democratizar la tecnología

💼 PORTFOLIO PERSONAL
   • Desarrollo web moderno
   • Diseño responsive e interactivo
   • Tecnologías: HTML5, CSS3, JavaScript
   • Optimizado para SEO y rendimiento

🏋️ ASESORAMIENTO FÍSICO
   • Plataforma web para coaching fitness
   • Diseño UX/UI intuitivo
   • Funcionalidades de contacto y consulta
   • URL: kobyy24.github.io/Asesoramiento-Fisico/

EXPERIENCIA PROFESIONAL
────────────────────────────────────────────────────────────
📅 2022 - PRESENTE
   Content Creator & Desarrollador Web Freelance
   • Creación de contenido educativo en TikTok
   • Desarrollo de proyectos web personalizados
   • Crecimiento de audiencia orgánica
   • Colaboración con marcas y emprendedores

📅 2018 - PRESENTE
   Editor Digital Especializado
   • 5+ años de experiencia en edición de video
   • Dominio avanzado de CapCut y herramientas pro
   • Creación de contenido viral y educativo
   • Técnicas de storytelling y engagement

📅 2023
   Graduado en Ciencias Naturales
   • E.P.E.S Nº16 "República de Italia"
   • Base sólida en pensamiento lógico
   • Metodología científica aplicada a programación
   • Fundamentos matemáticos para desarrollo

FILOSOFÍA PROFESIONAL
────────────────────────────────────────────────────────────
"Mi sueño es crear contenido digital que inspire y eduque, 
mientras desarrollo soluciones web innovadoras. Creo que la 
tecnología debe ser accesible para todos, por eso me dedico 
a desmitificar la programación y el desarrollo web, mostrando 
que cualquiera puede aprender y crear cosas increíbles."

OBJETIVOS PROFESIONALES
────────────────────────────────────────────────────────────
• Consolidar mi presencia como educador tecnológico
• Desarrollar proyectos web de mayor complejidad
• Formar una comunidad sólida de aprendices tech
• Colaborar con empresas en transformación digital
• Contribuir al ecosistema tecnológico argentino

DATOS ADICIONALES
────────────────────────────────────────────────────────────
🏠 Residencia: Formosa Capital, Argentina
🎓 Enfoque: Aprendizaje continuo y adaptación
🌐 Idiomas: Español (nativo), Inglés (técnico)
⚡ Disponibilidad: Proyectos freelance y colaboraciones

═══════════════════════════════════════════════════════════════

💡 "El código no es solo texto, es la materialización de 
   ideas que pueden cambiar el mundo." - Eric Brítez

Para más información y ejemplos de mi trabajo, visita mi 
portfolio online o contáctame a través de mis redes sociales.

¡Hablemos y creemos algo increíble juntos! 🚀

═══════════════════════════════════════════════════════════════
Generado desde: Portfolio Digital de Eric Brítez
Fecha: ${new Date().toLocaleDateString('es-AR')}
    `;
    
    // Create and download file
    const element = document.createElement('a');
    const file = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Eric_Britez_CV_Completo.txt';
    element.style.display = 'none';
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    // Show success notification
    showNotification('¡CV descargado correctamente!', 'success');
}

// Smooth Scroll Enhancement
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const offsetTop = element.offsetTop - 100;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

// Replace the existing scroll listener with optimized version
window.addEventListener('scroll', optimizedScrollHandler);

// Lazy Loading for Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Theme Switcher (Optional Enhancement)
function initializeThemeSwitch() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light-theme' : '');
}

// Social Share Functions
function shareProject(projectName, projectUrl) {
    if (navigator.share) {
        navigator.share({
            title: `Proyecto: ${projectName} - Eric Brítez`,
            text: `Mira este increíble proyecto de Eric Brítez: ${projectName}`,
            url: projectUrl
        }).catch(console.error);
    } else {
        // Fallback to copy to clipboard
        navigator.clipboard.writeText(projectUrl).then(() => {
            showNotification('¡Enlace copiado al portapapeles!', 'success');
        });
    }
}

// Analytics and Tracking (Privacy-friendly)
function trackEvent(eventName, eventData = {}) {
    // Simple analytics tracking without external dependencies
    const event = {
        name: eventName,
        data: eventData,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
    };
    
    // Store in sessionStorage for basic analytics
    const events = JSON.parse(sessionStorage.getItem('portfolio-events') || '[]');
    events.push(event);
    sessionStorage.setItem('portfolio-events', JSON.stringify(events));
}

// error-handler.js

(function () {
    const isDev = location.hostname === "localhost" || location.hostname === "127.0.0.1";

    function notifyUser(message, type = 'error') {
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        } else {
            // fallback simple si no existe showNotification
            alert(message);
        }
    }

    // Manejo de errores globales
    window.addEventListener('error', function (e) {
        console.error('Portfolio Error:', e.error || e.message);

        // Ignorar errores irrelevantes (ej: favicon perdido)
        if (e.message && e.message.includes("favicon.ico")) return;

        if (isDev) {
            // En desarrollo mostramos el error exacto
            notifyUser("Error: " + (e.error?.message || e.message));
        } else {
            // En producción mensaje genérico
            notifyUser("Algo salió mal. Por favor, recarga la página.", 'error');
        }
    });

    // Manejo de promesas no capturadas
    window.addEventListener('unhandledrejection', function (e) {
        console.error('Portfolio Promise Error:', e.reason);

        if (isDev) {
            notifyUser("Promise Error: " + e.reason, 'error');
        } else {
            notifyUser("Ocurrió un error inesperado.", 'error');
        }
    });
})();


// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registrado correctamente:', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker falló al registrarse:', error);
            });
    });
}

// Contact Form Validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('name') || formData.get('name').length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Por favor ingresa un email válido');
    }
    
    if (!formData.get('subject') || formData.get('subject').length < 3) {
        errors.push('El asunto debe tener al menos 3 caracteres');
    }
    
    if (!formData.get('message') || formData.get('message').length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    return errors;
}

// Enhanced Form Submit Handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    const formData = new FormData(e.target);
    
    // Validate form
    const errors = validateForm(formData);
    if (errors.length > 0) {
        showNotification(errors.join('. '), 'error');
        return;
    }
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Enviando...</span>';
    submitButton.disabled = true;
    
    // Track form submission
    trackEvent('form_submit', {
        name: formData.get('name'),
        subject: formData.get('subject')
    });
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
        
        // Reset form
        e.target.reset();
        
        // Restore button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Enhanced Notification System
function showNotification(message, type = 'info', duration = 4000) {
    // Remove existing notifications
    const existing = document.querySelectorAll('.notification');
    existing.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const colors = {
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-accent)'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icons[type] || icons.info}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Enhanced styles
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: ${colors[type] || colors.info};
        color: var(--color-deep-purple);
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow-large);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
        max-width: 400px;
        display: flex;
        align-items: center;
        gap: 1rem;
    `;
    
    // Close button styles
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: var(--color-deep-purple);
        cursor: pointer;
        font-size: 1rem;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background 0.2s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
    initializePortfolio();
    
    // Initialize optional enhancements
    initializeLazyLoading();
    initializeThemeSwitch();
    
    // Track page load
    trackEvent('page_load', {
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`
    });
});

// Export functions for global access
window.portfolioFunctions = {
    downloadCV,
    showNotification,
    smoothScrollTo,
    shareProject,
    trackEvent
};
