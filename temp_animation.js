
// Advanced Code Block Animation
const codeBlock = document.querySelector(".code-block");
const codeDisplay = document.getElementById("code-display");

if (codeBlock && codeDisplay) {
    // 3D Tilt Effect
    codeBlock.addEventListener("mousemove", (e) => {
        const rect = codeBlock.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;

        codeBlock.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    codeBlock.addEventListener("mouseleave", () => {
        codeBlock.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        codeBlock.style.transition = "transform 0.5s ease";
    });

    codeBlock.addEventListener("mouseenter", () => {
        codeBlock.style.transition = "none";
    });

    // Character-by-Character Typing Effect
    const pythonCode = `class SecurityExpert:
    def __init__(self):
        self.skills = [
            "Penetration Testing",
            "Network Security",
            "AI Defense"
        ]
        
    def secure_system(self, target):
        return "System Secured 🔒"

# Initializing...
current_status = "Ready to work"`;

    let codeIndex = 0;

    function typeCode() {
        if (codeIndex < pythonCode.length) {
            let char = pythonCode.charAt(codeIndex);

            // Simple syntax highlighting simulation (wrapping in spans)
            // Note: This is a basic implementation. For full highlighting, we'd need a parser.
            // Here we just append the text, trusting Prism or similar to highlight (if re-triggered),
            // or we just rely on CSS colors inheritance for now. 
            // Since we removed the hardcoded spans, we might lose colors unless we add logic.
            // Let's keep it simple: type text.

            codeDisplay.textContent += char;
            codeDisplay.innerHTML = Prism.highlight(codeDisplay.textContent, Prism.languages.python, 'python');

            codeIndex++;
            setTimeout(typeCode, Math.random() * 30 + 10); // Random typing speed
        }
    }

    // We need Prism.js for this to look good with highlighting dynamically
    // If Prism is not available, we fallback to plain text
    if (typeof Prism !== 'undefined') {
        typeCode();
    } else {
        // Fallback: manually insert specific HTML or just plain type
        // Let's implement a custom simple typer that preserves colors if we can't use Prism
        codeDisplay.textContent = "";
        codeIndex = 0;

        function typeSimple() {
            if (codeIndex < pythonCode.length) {
                codeDisplay.textContent += pythonCode.charAt(codeIndex);
                codeIndex++;
                setTimeout(typeSimple, Math.random() * 30 + 10);
            }
        }
        typeSimple();
    }
}
