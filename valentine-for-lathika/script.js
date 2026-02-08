// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 1000);
    }, 2000);

    // Initialize variables
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const envelope = document.getElementById('envelope');
    const letterContainer = document.getElementById('letterContainer');
    const secretCodeInput = document.getElementById('secretCode');
    const unlockBtn = document.getElementById('unlockBtn');
    const secretMessage = document.getElementById('secretMessage');
    const loveMessageInput = document.getElementById('loveMessage');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const messageResponse = document.getElementById('messageResponse');
    const shareBtn = document.getElementById('shareBtn');
    const memoryCards = document.querySelectorAll('.memory-card');
    const notes = document.querySelectorAll('.note');

    // Music Control
    let isMusicPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            music.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i> Turn on Our Song';
            musicToggle.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        } else {
            music.play().catch(e => {
                console.log("Autoplay prevented. User interaction needed.");
                musicToggle.innerHTML = '<i class="fas fa-play"></i> Click to Play Music';
            });
            musicToggle.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
            musicToggle.style.background = 'linear-gradient(45deg, #20bf6b, #26de81)';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Envelope Click - Open Love Letter
    envelope.addEventListener('click', function() {
        envelope.classList.add('open');
        
        // Animate envelope opening
        setTimeout(() => {
            envelope.style.opacity = '0';
            envelope.style.transform = 'scale(0.5)';
            
            setTimeout(() => {
                envelope.style.display = 'none';
                letterContainer.style.display = 'block';
                
                // Create confetti effect
                createConfetti();
                
                // Show floating hearts
                createFloatingHearts(20);
            }, 500);
        }, 1000);
    });

    // Secret Code Unlock
    const secretMessages = {
        'forever': {
            title: '💘 Eternal Love Unlocked!',
            message: 'My dearest Lathika, you\'ve discovered the secret of my heart! My love for you is eternal and unconditional. Every moment with you feels like forever, and I want forever with you.',
            gift: '✨ Special Surprise: Check your email for a love letter from me!',
            color: '#ff6b9d'
        },
        'lathika': {
            title: '💖 My Favorite Word!',
            message: 'Lathika - just saying your name makes my heart skip a beat. You\'re not just my love, you\'re my inspiration, my happiness, my everything.',
            gift: '🎁 Surprise: I\'ve booked a special dinner for us this weekend!',
            color: '#667eea'
        },
        'pradeep loves lathika': {
            title: '💕 The Truth of My Heart!',
            message: 'Yes! Pradeep loves Lathika more than words can express. More than the stars in the sky, more than the waves in the ocean, more than life itself.',
            gift: '🌟 Secret: I\'m planning the most romantic surprise for our anniversary!',
            color: '#20bf6b'
        },
        'coffee': {
            title: '☕ Our First Meeting!',
            message: 'Remember our first coffee date? That\'s when I knew you were someone special. Your smile over coffee cup is forever etched in my memory.',
            gift: '💝 Let\'s recreate our first date soon!',
            color: '#a55eea'
        }
    };

    unlockBtn.addEventListener('click', unlockSecret);
    secretCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') unlockSecret();
    });

    function unlockSecret() {
        const code = secretCodeInput.value.toLowerCase().trim();
        
        if (secretMessages[code]) {
            const secret = secretMessages[code];
            
            // Update secret message display
            secretMessage.innerHTML = `
                <div class="unlock-animation">
                    <div class="unlock-icon">🔓</div>
                    <h3>${secret.title}</h3>
                    <p>${secret.message}</p>
                    <div class="secret-gift">${secret.gift}</div>
                    <div class="secret-heart">💝</div>
                </div>
            `;
            
            secretMessage.classList.add('unlocked');
            secretMessage.style.borderColor = secret.color;
            secretMessage.style.background = `${secret.color}20`;
            
            // Create celebration
            createConfetti();
            createFloatingHearts(15);
            
            // Play success sound (if available)
            playSuccessSound();
            
        } else {
            secretMessage.innerHTML = `
                <div class="lock-icon">🔐</div>
                <h3>Almost There, My Love!</h3>
                <p>Try these secret codes:</p>
                <ul class="code-hints">
                    <li><code>forever</code> - How long I\'ll love you</li>
                    <li><code>lathika</code> - My favorite word</li>
                    <li><code>coffee</code> - Where we first met</li>
                    <li><code>pradeep loves lathika</code> - The truth</li>
                </ul>
                <p>I believe in you! 💕</p>
            `;
            secretMessage.classList.remove('unlocked');
        }
        
        // Clear input
        secretCodeInput.value = '';
    }

    // Send Message to Pradeep
    sendMessageBtn.addEventListener('click', function() {
        const message = loveMessageInput.value.trim();
        
        if (!message) {
            showMessageResponse('Please write a message first! 💌', 'error');
            return;
        }
        
        // Show sending animation
        showMessageResponse('Sending to Pradeep\'s heart... 💖', 'sending');
        
        // Simulate sending delay
        setTimeout(() => {
            // In a real app, you would send to server
            // For demo, we'll just show success
            showMessageResponse(
                '💝 Message Received! 💝<br>' +
                'Pradeep says: "I\'ll treasure your words forever in my heart, Lathika!"<br>' +
                'Your love has been saved in my digital memory forever! 💾',
                'success'
            );
            
            // Clear input
            loveMessageInput.value = '';
            
            // Create celebration
            createFloatingHearts(10);
            
            // Save message to local storage (for demo)
            const messages = JSON.parse(localStorage.getItem('loveMessages') || '[]');
            messages.push({
                text: message,
                timestamp: new Date().toISOString(),
                from: 'Lathika'
            });
            localStorage.setItem('loveMessages', JSON.stringify(messages));
            
        }, 1500);
    });

    // Share Button
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: '💖 A Love Letter from Pradeep to Lathika',
                text: 'Check out this beautiful Valentine\'s gift made with love!',
                url: window.location.href
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    showMessageResponse('Link copied to clipboard! Share it with love! 💝', 'success');
                })
                .catch(() => {
                    showMessageResponse('Please copy the URL manually to share.', 'info');
                });
        }
    });

    // Memory Cards Interaction
    memoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const memoryId = this.dataset.memory;
            const memories = {
                1: {
                    title: '☕ First Coffee Date',
                    details: 'That nervous excitement, the shared laughter, the moment I realized I wanted to know everything about you. Your eyes sparkled brighter than the coffee shop lights.'
                },
                2: {
                    title: '🌧️ Rainy Day Magic',
                    details: 'The sound of rain, cozy conversations, and time standing still. We talked for hours, and I wished the moment would never end.'
                },
                3: {
                    title: '🎬 Movie Night Memories',
                    details: 'You cried during the emotional scenes, and in that moment, I saw the beautiful, sensitive soul that I\'m honored to love.'
                },
                4: {
                    title: '🚗 Adventures Together',
                    details: 'Getting lost was never so fun! Every wrong turn led to new discoveries, and every moment with you felt like an adventure.'
                }
            };
            
            if (memories[memoryId]) {
                const memory = memories[memoryId];
                showCustomAlert(memory.title, memory.details, '💖');
                createFloatingHearts(5);
            }
        });
    });

    // Notes Interaction
    notes.forEach(note => {
        note.addEventListener('click', function() {
            const text = this.querySelector('p').textContent;
            showCustomAlert('💌 Love Note', text, '✨');
        });
    });

    // Countdown Timer
    function updateCountdown() {
        // Set your next meeting date (example: March 1, 2024)
        const nextMeeting = new Date('2024-03-01T19:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = nextMeeting - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.querySelector('.countdown-title').textContent = '🎉 We\'re Together Now! 🎉';
            document.querySelector('.countdown-timer').innerHTML = `
                <div class="time-unit">
                    <span>00</span>
                    <small>Days</small>
                </div>
                <div class="time-unit">
                    <span>00</span>
                    <small>Hours</small>
                </div>
                <div class="time-unit">
                    <span>00</span>
                    <small>Minutes</small>
                </div>
                <div class="time-unit">
                    <span>00</span>
                    <small>Seconds</small>
                </div>
            `;
        }
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Helper Functions
    function showMessageResponse(message, type) {
        messageResponse.innerHTML = message;
        messageResponse.className = '';
        messageResponse.classList.add(type);
        
        setTimeout(() => {
            messageResponse.style.opacity = '1';
        }, 10);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageResponse.style.opacity = '0';
            setTimeout(() => {
                messageResponse.innerHTML = '';
                messageResponse.className = '';
            }, 300);
        }, 5000);
    }

    function showCustomAlert(title, message, icon) {
        // Create custom alert
        const alertDiv = document.createElement('div');
        alertDiv.className = 'custom-alert';
        alertDiv.innerHTML = `
            <div class="alert-content">
                <div class="alert-icon">${icon}</div>
                <h3>${title}</h3>
                <p>${message}</p>
                <button class="alert-close">OK</button>
            </div>
        `;
        
        document.body.appendChild(alertDiv);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .custom-alert {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .alert-content {
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                padding: 30px;
                border-radius: 20px;
                max-width: 500px;
                width: 90%;
                border: 2px solid #ff6b9d;
                text-align: center;
                animation: slideUp 0.3s ease;
            }
            .alert-icon {
                font-size: 3rem;
                margin-bottom: 20px;
                animation: heartbeat 1.2s infinite;
            }
            .alert-content h3 {
                color: #ffd166;
                margin-bottom: 15px;
                font-size: 1.8rem;
            }
            .alert-content p {
                color: #a5b4fc;
                line-height: 1.6;
                margin-bottom: 25px;
            }
            .alert-close {
                background: linear-gradient(45deg, #ff6b9d, #ff4081);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 10px;
                cursor: pointer;
                font-size: 1.1rem;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            .alert-close:hover {
                transform: scale(1.05);
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Close button
        alertDiv.querySelector('.alert-close').addEventListener('click', () => {
            alertDiv.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(alertDiv);
                document.head.removeChild(style);
            }, 300);
        });
    }

    function createConfetti() {
        const confettiSettings = {
            target: 'confetti-container',
            max: 150,
            size: 1.2,
            animate: true,
            props: ['💖', '💕', '💗', '💓', '💘', '💝', '❤️', '✨'],
            colors: [[255, 107, 157], [102, 126, 234], [255, 209, 102], [32, 191, 107]],
            clock: 25,
            rotate: true,
            start_from_edge: true,
            respawn: false
        };
        
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
        
        // Stop after 5 seconds
        setTimeout(() => {
            confetti.clear();
        }, 5000);
    }

    function createFloatingHearts(count) {
        const container = document.querySelector('.floating-hearts');
        
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.opacity = '0.4';
            heart.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            heart.style.animationDelay = Math.random() * 5 + 's';
            
            container.appendChild(heart);
            
            // Remove after animation completes
            setTimeout(() => {
                heart.remove();
            }, (Math.random() * 10 + 10) * 1000);
        }
    }

    function playSuccessSound() {
        // Create a simple success sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log("Audio context not supported");
        }
    }

    // Add CSS classes for message response types
    const style = document.createElement('style');
    style.textContent = `
        #messageResponse.success {
            background: rgba(32, 191, 107, 0.2);
            border: 2px solid #20bf6b;
            color: #20bf6b;
        }
        #messageResponse.error {
            background: rgba(255, 107, 157, 0.2);
            border: 2px solid #ff6b9d;
            color: #ff6b9d;
        }
        #messageResponse.info {
            background: rgba(102, 126, 234, 0.2);
            border: 2px solid #667eea;
            color: #667eea;
        }
        #messageResponse.sending {
            background: rgba(255, 209, 102, 0.2);
            border: 2px solid #ffd166;
            color: #ffd166;
        }
        .code-hints {
            text-align: left;
            margin: 20px 0;
            padding-left: 20px;
        }
        .code-hints li {
            margin: 10px 0;
            color: #a5b4fc;
        }
        .code-hints code {
            background: rgba(255, 255, 255, 0.1);
            padding: 2px 8px;
            border-radius: 4px;
            color: #ffd166;
        }
        .secret-gift {
            background: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            color: #ffd166;
            font-weight: bold;
        }
        .unlock-animation {
            animation: slideUp 0.5s ease;
        }
        .unlock-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            animation: heartbeat 1.2s infinite;
        }
    `;
    document.head.appendChild(style);
});