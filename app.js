// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Ensure page starts at the top
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Re-enable smooth scrolling after initial positioning
    setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);
    
    // Typewriter effect for hero title - Type, delete, type next
    const typewriterText = document.querySelector('.typewriter-text');
    const lines = [
        "Hi!, I'm Hung",
        "I'm a Physics student",
        "I'm a Photographer & Videographer", 
        "I'm a person who loves to share knowledge",
        "Welcome to my world!"
    ];
    let currentLineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function typeWriter() {
        if (isWaiting) return;
        
        const currentLine = lines[currentLineIndex];
        
        if (isDeleting) {
            // Delete characters
            if (charIndex > 0) {
                charIndex--;
                typewriterText.innerHTML = currentLine.substring(0, charIndex);
                setTimeout(typeWriter, 30); // Faster deletion
            } else {
                // Finished deleting, move to next line
                isDeleting = false;
                currentLineIndex++;
                
                // If we've shown all lines, stop at the last one
                if (currentLineIndex >= lines.length) {
                    currentLineIndex = lines.length - 1;
                    charIndex = 0;
                    isWaiting = true;
                    setTimeout(() => {
                        isWaiting = false;
                        typeWriter();
                    }, 500);
                    return;
                }
                
                // Pause before typing next line
                isWaiting = true;
                setTimeout(() => {
                    isWaiting = false;
                    typeWriter();
                }, 500);
            }
        } else {
            // Type characters
            if (charIndex <= currentLine.length) {
                typewriterText.innerHTML = currentLine.substring(0, charIndex);
                charIndex++;
                
                if (charIndex <= currentLine.length) {
                    setTimeout(typeWriter, 80); // Typing speed
                } else {
                    // If this is the last line, don't delete it
                    if (currentLineIndex === lines.length - 1) {
                        typewriterText.innerHTML = currentLine;
                        return; // Stop here, keep "Welcome to my world"
                    }
                    
                    // Finished typing, start deleting after a pause
                    isWaiting = true;
                    setTimeout(() => {
                        isWaiting = false;
                        isDeleting = true;
                        typeWriter();
                    }, 1200); // Pause before deleting
                }
            }
        }
    }
    
    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 500);
    
    // Back to Top Button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Show/hide back to top button on scroll
    window.addEventListener('scroll', toggleBackToTopButton, { passive: true });
    
    // Back to top button click handler
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mobile detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinkElements = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinkElements.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offset = isMobile ? 20 : 0; // Extra offset for mobile
                const targetPosition = targetSection.offsetTop - headerHeight - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after navigation
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // CTA button scroll to projects
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const offset = isMobile ? 20 : 0;
                const targetPosition = projectsSection.offsetTop - headerHeight - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Header background opacity on scroll with throttling for mobile performance
    const header = document.querySelector('.header');
    let ticking = false;
    let lastScrollY = 0;
    
    function updateHeader() {
        const scrolled = window.scrollY;
        const opacity = Math.min(scrolled / 100, 0.95);
        header.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
        
        // Mobile scroll direction detection for better UX
        if (isMobile) {
            const scrollingDown = scrolled > lastScrollY;
            if (scrollingDown && scrolled > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollY = scrolled;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    // Use passive listener for better mobile performance
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Contact item interactions with mobile optimization
    const contactValues = document.querySelectorAll('.contact-value');
    
    contactValues.forEach(item => {
        const eventType = isTouch ? 'touchstart' : 'click';
        
        item.addEventListener(eventType, function(e) {
            if (isTouch) e.preventDefault(); // Prevent double-tap zoom on mobile
            
            const text = this.textContent;
            
            // Visual feedback
            this.style.color = 'var(--accent-purple)';
            setTimeout(() => {
                this.style.color = '';
            }, isMobile ? 500 : 300);
            
            // Copy to clipboard if it looks like an email
            if (text.includes('@')) {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(() => {
                        console.log('Email copied to clipboard');
                        // Mobile feedback
                        if (isMobile) {
                            const feedback = document.createElement('div');
                            feedback.textContent = 'Email copied!';
                            feedback.style.cssText = `
                                position: fixed;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                background: var(--accent-purple);
                                color: white;
                                padding: 10px 20px;
                                border-radius: 4px;
                                z-index: 10000;
                                font-size: 0.9rem;
                            `;
                            document.body.appendChild(feedback);
                            setTimeout(() => feedback.remove(), 2000);
                        }
                    }).catch(err => {
                        console.log('Could not copy email');
                    });
                }
            }
        }, { passive: false });
    });
    
    // Project card hover effects (disabled on touch devices)
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!isTouch) {
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Skill items random highlight effect (reduced frequency on mobile)
    const skillItems = document.querySelectorAll('.skill-item');
    
    function randomHighlight() {
        if (skillItems.length > 0) {
            const randomIndex = Math.floor(Math.random() * skillItems.length);
            const randomSkill = skillItems[randomIndex];
            
            randomSkill.style.background = 'var(--accent-purple)';
            randomSkill.style.color = 'var(--text-white)';
            
            setTimeout(() => {
                randomSkill.style.background = '';
                randomSkill.style.color = '';
            }, isMobile ? 1500 : 1000);
        }
    }
    
    // Trigger random highlight (less frequent on mobile to save battery)
    const highlightInterval = isMobile ? 8000 : 5000;
    setInterval(randomHighlight, highlightInterval);
    
    // Mobile-specific optimizations
    if (isMobile) {
        // Prevent zoom on double tap for buttons
        const buttons = document.querySelectorAll('button, .nav-links a, .skill-item');
        buttons.forEach(button => {
            button.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.click();
            });
        });
        
        // Optimize scroll performance on mobile
        let scrollTimer = null;
        window.addEventListener('scroll', function() {
            if (scrollTimer !== null) {
                clearTimeout(scrollTimer);
            }
            scrollTimer = setTimeout(function() {
                // Scroll ended - can perform intensive operations here if needed
            }, 150);
        }, { passive: true });
    }
    
    // Console welcome message
    console.log('%c Welcome to the Portfolio! ', 'background: #8A2BE2; color: white; padding: 10px; font-size: 16px;');
    console.log('%c Built with vanilla HTML, CSS, and JavaScript ', 'background: #000; color: #8A2BE2; padding: 5px;');
    console.log('%c Mobile optimized for all devices ', 'background: #8A2BE2; color: white; padding: 5px;');
    
    // Image Modal Functionality
    window.openImageModal = function(img) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        
        modal.classList.add('active');
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalCaption.textContent = img.alt;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    };
    
    function closeImageModal() {
        const modal = document.getElementById('imageModal');
        modal.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    // Close modal when clicking close button
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', closeImageModal);
    }
    
    // Close modal when clicking overlay
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeImageModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
    
    // Email copy functionality
    window.copyEmail = function(event) {
        // Prevent event bubbling
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        
        const emailText = document.querySelector('.email-text').textContent.trim();
        const copyButton = document.getElementById('copyButton');
        
        // Use the Clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(emailText).then(function() {
                showCopyFeedback(copyButton);
            }).catch(function(err) {
                console.error('Failed to copy email: ', err);
                // Fallback to older method
                fallbackCopyToClipboard(emailText, copyButton);
            });
        } else {
            // Fallback for older browsers or non-secure contexts
            fallbackCopyToClipboard(emailText, copyButton);
        }
    };
    
    function fallbackCopyToClipboard(text, copyButton) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyFeedback(copyButton);
        } catch (err) {
            console.error('Fallback: Could not copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }
    
    function showCopyFeedback(copyButton) {
        const originalText = copyButton.textContent;
        copyButton.textContent = '✓ COPIED!';
        copyButton.classList.add('copied');
        
        setTimeout(function() {
            copyButton.textContent = originalText;
            copyButton.classList.remove('copied');
        }, 2000);
    }

    // Video Introduction Functionality
    const introVideo = document.getElementById('introVideo');
    const muteBtn = document.getElementById('muteBtn');
    const videoClickArea = document.getElementById('videoClickArea');
    const videoSection = document.getElementById('video-intro');
    
    if (introVideo && muteBtn && videoClickArea) {
        // Create play/pause indicator
        const playPauseIndicator = document.createElement('div');
        playPauseIndicator.className = 'play-pause-indicator';
        playPauseIndicator.innerHTML = `
            <svg class="play-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            <svg class="pause-icon" viewBox="0 0 24 24" fill="currentColor" style="display: none;">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        `;
        videoSection.appendChild(playPauseIndicator);
        
        // Video click to play/pause
        videoClickArea.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Ensure we're in video mode when clicking
            if (!isInVideoMode) {
                enterVideoMode();
            }
            
            if (introVideo.paused) {
                introVideo.play().then(() => {
                    showIndicator('play');
                    videoSection.classList.remove('paused');
                }).catch(e => {
                    console.log('Play failed:', e);
                });
            } else {
                introVideo.pause();
                showIndicator('pause');
                videoSection.classList.add('paused');
            }
        });
        
        // Show play/pause indicator
        function showIndicator(type) {
            const playIcon = playPauseIndicator.querySelector('.play-icon');
            const pauseIcon = playPauseIndicator.querySelector('.pause-icon');
            
            if (type === 'play') {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
            
            playPauseIndicator.classList.add('show');
            setTimeout(() => {
                playPauseIndicator.classList.remove('show');
            }, 1000);
        }
        
        // Mute/Unmute functionality
        muteBtn.addEventListener('click', function() {
            const volumeIcon = muteBtn.querySelector('.volume-icon');
            const muteIcon = muteBtn.querySelector('.mute-icon');
            
            if (introVideo.muted) {
                introVideo.muted = false;
                volumeIcon.style.display = 'block';
                muteIcon.style.display = 'none';
                hideAudioNotification(); // Hide notification when user enables audio
            } else {
                introVideo.muted = true;
                volumeIcon.style.display = 'none';
                muteIcon.style.display = 'block';
            }
        });
        
        // Function to update mute button UI
        function updateMuteButtonUI(isMuted) {
            const volumeIcon = muteBtn.querySelector('.volume-icon');
            const muteIcon = muteBtn.querySelector('.mute-icon');
            
            if (isMuted) {
                volumeIcon.style.display = 'none';
                muteIcon.style.display = 'block';
            } else {
                volumeIcon.style.display = 'block';
                muteIcon.style.display = 'none';
            }
        }
        
        // Global flag to prevent multiple notifications
        let isNotificationActive = false;
        
        // Function to show audio notification with revamped morphing
        function showAudioNotification() {
            // Prevent multiple notifications
            if (isNotificationActive) {
                return;
            }
            
            isNotificationActive = true;
            
            // Clean slate - remove any existing notifications
            document.querySelectorAll('.audio-notification').forEach(notif => {
                notif.remove();
            });
            
            // Clear all timeouts
            clearAllNotificationTimeouts();
            
            // Add morphing class to button
            muteBtn.classList.add('morphing');
            
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'audio-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <span>Click to enable audio</span>
                </div>
            `;
            
            // Attach to mute button
            muteBtn.appendChild(notification);
            
            // Phase-based morphing animation
            requestAnimationFrame(() => {
                // Phase 1: Initialize and appear (0ms)
                notification.classList.add('init');
                
                setTimeout(() => {
                    // Phase 2: Expand to Dynamic Island (150ms)
                    notification.classList.add('expand');
                }, 150);
                
                setTimeout(() => {
                    // Phase 3: Activate with content (400ms)
                    notification.classList.add('active');
                }, 400);
                
                // Auto-hide sequence after 3 seconds
                window.hideTimeout = setTimeout(() => {
                    hideAudioNotification();
                }, 3000);
            });
        }
        
        // Clear all notification timeouts
        function clearAllNotificationTimeouts() {
            if (window.hideTimeout) {
                clearTimeout(window.hideTimeout);
                window.hideTimeout = null;
            }
            if (window.collapseTimeout) {
                clearTimeout(window.collapseTimeout);
                window.collapseTimeout = null;
            }
            if (window.removeTimeout) {
                clearTimeout(window.removeTimeout);
                window.removeTimeout = null;
            }
        }
        
        // Function to hide audio notification with revamped morphing
        function hideAudioNotification() {
            const notification = document.querySelector('.audio-notification');
            if (!notification) {
                isNotificationActive = false;
                muteBtn.classList.remove('morphing');
                return;
            }
            
            // Clear any pending timeouts
            clearAllNotificationTimeouts();
            
            // Phase-based collapse animation
            requestAnimationFrame(() => {
                // Phase 1: Remove active state and content (0ms)
                notification.classList.remove('active');
                
                setTimeout(() => {
                    // Phase 2: Collapse to button size (200ms)
                    notification.classList.remove('expand');
                    notification.classList.add('collapse');
                }, 200);
                
                setTimeout(() => {
                    // Phase 3: Fade out (500ms)
                    notification.classList.add('hide');
                }, 500);
                
                setTimeout(() => {
                    // Phase 4: Clean removal (800ms)
                    if (notification.parentNode) {
                        notification.remove();
                    }
                    
                    // Restore button state
                    muteBtn.classList.remove('morphing');
                    isNotificationActive = false;
                }, 800);
            });
        }
        
        // Auto-advance when video ends
        introVideo.addEventListener('ended', function() {
            setTimeout(() => {
                document.getElementById('photo-montage').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }, 1000);
        });
    }
    
    // Smooth scroll from photo montage to about section
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.getElementById('about').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
    
    // Dark mode functionality for video section
    let isInVideoMode = false;
    
    function enterVideoMode() {
        if (!isInVideoMode) {
            isInVideoMode = true;
            document.body.classList.add('video-mode');
        }
    }
    
    function exitVideoMode() {
        if (isInVideoMode) {
            isInVideoMode = false;
            document.body.classList.remove('video-mode');
        }
    }
    
    // Intersection Observer for smooth transitions and autoplay
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -20% 0px'
    };
    
    let pageLoaded = false;
    let hasScrolledToVideo = false;
    
    // Prevent immediate video activation on page load
    setTimeout(() => {
        pageLoaded = true;
    }, 1000); // Reduced to 1 second
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && pageLoaded) {
                entry.target.classList.add('visible');
                
                // Auto-play video when scrolled into view and enter dark mode
                if (entry.target.id === 'video-intro' && introVideo) {
                    // Check if user has scrolled or if they've been to video section before
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrollTop > window.innerHeight * 0.2 || hasScrolledToVideo) {
                        hasScrolledToVideo = true;
                        
                        // Enter video mode first
                        enterVideoMode();
                        
                        setTimeout(() => {
                            // Only try to autoplay if video isn't already playing
                            if (introVideo.paused) {
                                // Start with muted autoplay for better browser compatibility
                                introVideo.muted = true;
                                introVideo.play().then(() => {
                                    // Video started successfully muted, update mute button UI
                                    updateMuteButtonUI(true);
                                    // Show audio notification after a delay
                                    setTimeout(() => {
                                        showAudioNotification();
                                    }, 2000);
                                }).catch(e => {
                                    console.log('All autoplay prevented:', e);
                                });
                            }
                        }, 300);
                    }
                }
            } else {
                // Exit dark mode and pause video when scrolled out of view
                if (entry.target.id === 'video-intro' && introVideo) {
                    // Only exit if we're actually leaving the section
                    setTimeout(() => {
                        exitVideoMode();
                        if (!introVideo.paused) {
                            introVideo.pause();
                        }
                        videoSection.classList.add('paused');
                    }, 100); // Small delay to prevent flickering
                }
            }
        });
    }, observerOptions);
    
    // Observe video and montage sections
    const videoSectionElement = document.getElementById('video-intro');
    const montageSection = document.getElementById('photo-montage');
    
    if (videoSectionElement) sectionObserver.observe(videoSectionElement);
    if (montageSection) sectionObserver.observe(montageSection);        // Playback track functionality
        const playbackTrack = document.getElementById('playbackTrack');
        const trackProgress = document.getElementById('trackProgress');
        const trackHandle = document.getElementById('trackHandle');
        const trackContainer = playbackTrack.querySelector('.track-container');
        
        let isDragging = false;
        
        // Update track progress
        function updateTrackProgress() {
            if (!isDragging && introVideo.duration) {
                const progress = (introVideo.currentTime / introVideo.duration) * 100;
                trackProgress.style.width = `${progress}%`;
                trackHandle.style.left = `${progress}%`;
                
                // Add playing animation when video is playing
                if (!introVideo.paused) {
                    playbackTrack.classList.add('playing');
                } else {
                    playbackTrack.classList.remove('playing');
                }
            }
        }        // Handle track click/drag
        function handleTrackInteraction(e) {
            if (!introVideo.duration) return;
            
            const rect = trackContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            const newTime = (percentage / 100) * introVideo.duration;
            
            introVideo.currentTime = newTime;
            trackProgress.style.width = `${percentage}%`;
            trackHandle.style.left = `${percentage}%`;
        }
    
    // Track container click
    trackContainer.addEventListener('click', handleTrackInteraction);
    
    // Handle dragging
    trackHandle.addEventListener('mousedown', (e) => {
        isDragging = true;
        trackHandle.style.cursor = 'grabbing';
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            handleTrackInteraction(e);
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            trackHandle.style.cursor = 'grab';
        }
    });
    
    // Update progress during video playback
    introVideo.addEventListener('timeupdate', updateTrackProgress);
    introVideo.addEventListener('loadedmetadata', updateTrackProgress);        // Show/hide track on video section hover
        const videoContainer = document.querySelector('.video-section');
        let trackTimeout;
        
        videoContainer.addEventListener('mouseenter', () => {
            clearTimeout(trackTimeout);
            playbackTrack.classList.add('visible');
        });
        
        videoContainer.addEventListener('mouseleave', () => {
            trackTimeout = setTimeout(() => {
                playbackTrack.classList.remove('visible');
            }, 1000); // Hide after 1 second
        });
    
    // Keep track visible when hovering over it
    playbackTrack.addEventListener('mouseenter', () => {
        clearTimeout(trackTimeout);
    });
    
    playbackTrack.addEventListener('mouseleave', () => {
        trackTimeout = setTimeout(() => {
            playbackTrack.classList.remove('visible');
        }, 1000);
    });
});