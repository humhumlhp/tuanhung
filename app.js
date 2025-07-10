// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Facebook SDK Configuration and Video API
    window.fbAsyncInit = function() {
        FB.init({
            appId: 'YOUR_APP_ID', // Replace with your Facebook App ID
            cookie: true,
            xfbml: true,
            version: 'v18.0'
        });
        
        FB.AppEvents.logPageView();
        
        // Initialize video API functionality
        initializeFacebookVideoAPI();
    };

    function initializeFacebookVideoAPI() {
        console.log('Facebook Video API initialized');
        
        // Example: Get user's videos (requires permissions)
        function getUserVideos() {
            FB.login(function(response) {
                if (response.authResponse) {
                    FB.api('/me/videos', 'GET', {
                        fields: 'id,title,description,source,thumbnail'
                    }, function(response) {
                        if (response && response.data) {
                            console.log('User videos:', response.data);
                            displayVideos(response.data);
                        }
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, {scope: 'user_videos'});
        }
        
        // Example: Upload video to Facebook (requires publish permissions)
        function uploadVideoToFacebook(videoFile, title, description) {
            FB.login(function(response) {
                if (response.authResponse) {
                    const formData = new FormData();
                    formData.append('title', title);
                    formData.append('description', description);
                    formData.append('source', videoFile);
                    
                    FB.api('/me/videos', 'POST', formData, function(response) {
                        if (response && !response.error) {
                            console.log('Video uploaded successfully:', response);
                        } else {
                            console.error('Error uploading video:', response.error);
                        }
                    });
                }
            }, {scope: 'publish_video'});
        }
        
        // Example: Embed Facebook video player
        function embedFacebookVideo(videoId, containerId) {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `
                    <div class="fb-video" 
                         data-href="https://www.facebook.com/facebook/videos/${videoId}/" 
                         data-width="500" 
                         data-show-text="false">
                    </div>
                `;
                
                // Re-parse Facebook plugins
                if (typeof FB !== 'undefined') {
                    FB.XFBML.parse();
                }
            }
        }
        
        // Make functions globally available
        window.getUserVideos = getUserVideos;
        window.uploadVideoToFacebook = uploadVideoToFacebook;
        window.embedFacebookVideo = embedFacebookVideo;
    }

    function displayVideos(videos) {
        // You can customize this function to display videos in your UI
        const videoContainer = document.getElementById('facebook-videos');
        if (videoContainer) {
            videoContainer.innerHTML = '';
            videos.forEach(video => {
                const videoElement = document.createElement('div');
                videoElement.className = 'facebook-video-item';
                videoElement.innerHTML = `
                    <h4>${video.title || 'Untitled Video'}</h4>
                    <p>${video.description || 'No description'}</p>
                    <div class="fb-video" 
                         data-href="https://www.facebook.com/video.php?v=${video.id}" 
                         data-width="300">
                    </div>
                `;
                videoContainer.appendChild(videoElement);
            });
            
            // Re-parse Facebook plugins
            if (typeof FB !== 'undefined') {
                FB.XFBML.parse();
            }
        }
    }
});