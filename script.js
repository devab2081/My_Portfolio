


// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    // Change icon class
    const icon = navToggle.querySelector("i");
    if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
    } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        navToggle.querySelector("i").classList.remove("fa-times");
        navToggle.querySelector("i").classList.add("fa-bars");
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Active Link Highlighting
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// EmailJS Configuration (Replace with your actual keys)
(function () {
    // Check if EmailJS is loaded/defined
    if (typeof emailjs !== 'undefined') {
        emailjs.init("b9v4NEhirU-dxGXpd");
    } else {
        console.error("EmailJS not loaded");
    }
})();

// Contact Form Handling
const contactForm = document.getElementById("contact-form");
const statusMsg = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        statusMsg.innerText = "Sending...";
        statusMsg.style.color = "#a0a0a0";

        // Use the same Service ID and Template ID as before or updated ones
        const serviceID = "service_jzeci2g";
        const templateID = "template_akpv81c";

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                statusMsg.innerText = "✅ Message sent successfully!";
                statusMsg.style.color = "#00ff88";
                this.reset();
                setTimeout(() => {
                    statusMsg.innerText = "";
                }, 5000);
            })
            .catch((err) => {
                console.error("EmailJS Error:", err);
                statusMsg.innerText = "❌ Failed to send. Please try again later.";
                statusMsg.style.color = "#ff5f56";
            });
    });
}

// Reveal Animations on Scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".project-card, .skill-category, .contact-card").forEach(el => {
    // Add initial opacity 0 within css for these elements if you want them to pop in
    // For now, we'll let them just be visible or add a class
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";

    // Custom observer logic for these
    const simpleObserver = new IntersectionObserver((items) => {
        items.forEach(item => {
            if (item.isIntersecting) {
                item.target.style.opacity = "1";
                item.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    simpleObserver.observe(el);
});

// Matrix/Network Background Animation
const canvas = document.getElementById("hero-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        draw() {
            ctx.fillStyle = "rgba(0, 255, 136, 0.5)"; // Accent color
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = (canvas.width * canvas.height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 136, ${1 - distance / 100})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
}