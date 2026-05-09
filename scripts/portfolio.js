document.addEventListener('DOMContentLoaded', () => {
    /* --- COMMON CORE LOGIC --- */

    // Intersection Observer for scroll animations (Common to all pages)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Target elements across all pages
    document.querySelectorAll('[class*="fade"], [class*="slide"], [class*="reveal"]').forEach(el => {
        observer.observe(el);
    });

    /* --- PAGE-SPECIFIC LOGIC --- */

    // INDEX.HTML: Hero Background Parallax & Social Ripple
    const homeSection = document.getElementById('section-hero');
    if (homeSection) {
        // Initial fade-in trigger for non-observer elements if any
        const fadeElements = document.querySelectorAll('.fade-in-up');
        fadeElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 100);
        });

        // Parallax Effect
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            homeSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });

        // Social Link Ripple Effect
        const buttons = document.querySelectorAll('.social-link');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);

                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
});

/* --- GLOBAL FUNCTIONS (Used in Event Handlers) --- */

// EXPERIENCE.HTML: Tab Switching Logic
function openTab(tabId) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab content and activate button
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// CERTIFICATIONS.HTML: SweetAlert Display
function showCert(imageSrc, altText, verifyLink) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            imageUrl: imageSrc,
            imageAlt: altText,
            background: 'transparent',
            backdrop: 'rgba(0,0,0,0.8)',
            showCancelButton: true,
            confirmButtonText: 'Verify on Credly',
            confirmButtonColor: '#643cf0',
            cancelButtonColor: '#333333',
            cancelButtonText: 'Close',
            customClass: {
                image: 'swal-uniform-img'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.open(verifyLink, '_blank');
            }
        });
    } else {
        console.error('SweetAlert2 is not loaded.');
    }
}
