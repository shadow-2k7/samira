// Show first page on load
document.addEventListener('DOMContentLoaded', function() {
    const questionPages = document.querySelectorAll('.question-page');
    if (questionPages.length > 0) {
        questionPages.forEach(page => {
            if (page.querySelector('h1')) {
                page.classList.remove('hidden');
            }
        });
    }
});

// ===== PAGE 1 - OLD ALERT =====
function page1() {
    alert("🤨\nYou accidentally clicked the wrong button.\n[Try Again]");
}

// ===== PAGE 2 - FIXED: Using correct ID 'p2no' =====
function page2() {
    const btn = document.getElementById("p2no");
    const texts = ["Nah Moved on💀", "You capping 😭", "Naaaaah "];
    const currentText = btn.textContent;
    
    if (currentText === texts[0]) {
        btn.textContent = texts[1];
    } else if (currentText === texts[1]) {
        btn.textContent = texts[2];
    } else if (currentText === texts[2]) {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        alert("Alright alright... you win 😅");
    }
}

// ===== SLIDER =====
function slider() {
    const val = document.getElementById("slide").value;
    document.getElementById("res").value = val;
}

// ===== PAGE 3 - NEW FUNCTION (NO ALERTS, JUST MESSAGES) =====
function page3() {
    const val = parseInt(document.getElementById("slide").value);
    const msg = document.getElementById("p3msg");
    const resbtn = document.getElementById("resbtn");
    
    if (val >= 0 && val <= 4) {
        msg.innerHTML = '💀 Bro said ' + val + '?!';
        msg.style.color = '#ff4444';
        document.getElementById("slide").value = 10;
        document.getElementById("res").value = 10;
        resbtn.disabled = true;
        setTimeout(() => {
            msg.innerHTML = 'Nice try 😂';
        }, 1500);
    } else if (val >= 5 && val <= 7) {
        msg.innerHTML = '🤔 Mid... you can do better';
        msg.style.color = '#ff8844';
        resbtn.disabled = true;
        setTimeout(() => {
            msg.innerHTML = 'Aim higher bestie 😤';
        }, 1500);
    } else if (val >= 8 && val <= 10) {
        const responses = ['W taste! 😍', 'You know ball! 🔥', 'Awww 🥹', '10/10 energy! 💯'];
        msg.innerHTML = responses[Math.floor(Math.random() * responses.length)];
        msg.style.color = '#ff6b6b';
        resbtn.disabled = false;
        resbtn.style.opacity = '1';
    }
}

// ===== PAGE 4 - FIXED: Using correct ID 'p4msg' =====
function page4() {
    const msg = document.getElementById('p4msg');
    msg.innerHTML = '🔍 Searching...';
    msg.style.color = '#ff8844';
    
    setTimeout(() => {
        msg.innerHTML = '❌ ERROR 404: Person Not Found.';
        msg.style.color = '#ff4444';
    }, 1000);
    
    setTimeout(() => {
        msg.innerHTML = '';
    }, 3000);
}

// ===== PAGE 5 - FIXED: Using correct ID 'p5msg' =====
function page5() {
    const msg = document.getElementById('p5msg');
    msg.innerHTML = '📸 Lie Detected!';
    msg.style.color = '#ff4444';
    
    setTimeout(() => {
        msg.innerHTML = '🤥 Try again...';
    }, 1200);
    
    setTimeout(() => {
        msg.innerHTML = '';
    }, 2500);
}

// ===== FINAL PAGE - Runs away 100 times then disappears (PC + Mobile) =====
let escapeCount = 0;
const MAX_ESCAPES = 100;
let isRunningAway = false;

function final() {
    const btn = document.getElementById("finalNo");
    const texts = [
        "Fk no 💀",
        "You sure?",
        "Bro...",
        "Think again.",
        "Last chance.",
        "Are you positive?",
        "Your Wi-Fi acting weird?",
        "That's crazy...",
        "I don't believe you.",
        "Fine."
    ];
    
    const currentText = btn.textContent;
    const currentIndex = texts.indexOf(currentText);
    
    if (currentIndex < texts.length - 1) {
        btn.textContent = texts[currentIndex + 1];
    }
    
    // ONLY START RUNNING AWAY WHEN IT REACHES "Fine."
    if (currentText === "Fine.") {
        escapeCount = 0;
        isRunningAway = true;
        // Remove existing listeners and add new ones
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.id = 'finalNo';
        newBtn.textContent = 'Fine. 🙄';
        newBtn.setAttribute('onclick', 'final()');
        
        // PC - hover
        newBtn.addEventListener("mouseenter", runAway);
        
        // Mobile - tap/click
        newBtn.addEventListener("click", function(e) {
            e.preventDefault();
            runAway();
        });
        
        // Mobile - touchstart (better for touch devices)
        newBtn.addEventListener("touchstart", function(e) {
            e.preventDefault();
            runAway();
        });
    }
}

function runAway() {
    const btn = document.getElementById("finalNo");
    if (!btn || !isRunningAway) return;
    
    // Increment escape counter
    escapeCount++;
    
    // If escaped 100 times, make it disappear
    if (escapeCount >= MAX_ESCAPES) {
        btn.style.transition = 'all 0.5s ease';
        btn.style.opacity = '0';
        btn.style.transform = 'scale(0)';
        btn.style.pointerEvents = 'none';
        const msg = document.getElementById('p6msg');
        msg.innerHTML = '💀 You\'re too persistent! 😭💕\nFine... you win! I give up! 😤';
        msg.style.color = '#ff6b6b';
        msg.style.fontSize = '1.3rem';
        isRunningAway = false;
        return;
    }
    
    // Get button dimensions
    const btnWidth = btn.offsetWidth || 120;
    const btnHeight = btn.offsetHeight || 50;
    
    // SAFE BOUNDARIES - Keep button well within screen
    const margin = 80; // Bigger margin to keep it safe
    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;
    const minX = margin;
    const minY = margin;
    
    // Only calculate if we have valid space
    let x, y;
    if (maxX > minX && maxY > minY) {
        x = Math.random() * (maxX - minX) + minX;
        y = Math.random() * (maxY - minY) + minY;
    } else {
        // Fallback if screen is too small
        x = window.innerWidth / 2 - btnWidth / 2;
        y = window.innerHeight / 2 - btnHeight / 2;
    }
    
    // Clamp values to be safe
    x = Math.max(minX, Math.min(maxX, x));
    y = Math.max(minY, Math.min(maxY, y));
    
    // Random movement style
    if (Math.random() > 0.5) {
        btn.style.transition = 'all 0.1s ease';
    } else {
        btn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    }
    
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
    btn.style.zIndex = '9999';
    
    // Sometimes spin
    if (Math.random() > 0.7) {
        btn.style.transform = 'rotate(' + (Math.random() * 60 - 30) + 'deg)';
    } else {
        btn.style.transform = 'rotate(0deg)';
    }
}