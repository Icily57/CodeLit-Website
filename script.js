// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
    // ==================== FORM HANDLING ====================
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
  
    if (form) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
          const formData = new FormData(form);
          const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            // Show success message
            successMessage.classList.add('show');
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
              successMessage.classList.remove('show');
            }, 5000);
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('There was an error sending your message. Please try again or contact us directly via email at codelitacademy@gmail.com');
        } finally {
          // Hide loading state
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
      });
    }
  
    // ==================== SMOOTH SCROLLING ====================
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
  
    // ==================== SOCIAL MEDIA ICONS HOVER EFFECTS ====================
    const socialIcons = document.querySelectorAll('.social-link');
    socialIcons.forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
      });
      
      icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    });
  
    // ==================== COURSE CARD ANIMATION ON SCROLL ====================
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    // Animate course cards
    document.querySelectorAll('.course-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });
  
    // Animate purpose card
    const purposeCard = document.querySelector('.purpose-card');
    if (purposeCard) {
      purposeCard.style.opacity = '0';
      purposeCard.style.transform = 'translateY(30px)';
      purposeCard.style.transition = 'all 0.6s ease 0.2s';
      observer.observe(purposeCard);
    }
  
    // ==================== HEADER SCROLL EFFECT ====================
    const header = document.querySelector('header');
    let lastScroll = 0;
  
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
      } else {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
      }
      
      lastScroll = currentScroll;
    });
  
    // ==================== FORM INPUT VALIDATION HIGHLIGHTS ====================
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
      // Add validation styling on blur
      input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
          this.style.borderColor = '#059669';
        } else {
          this.style.borderColor = '#334155';
        }
      });
      
      // Reset validation styling on focus
      input.addEventListener('focus', function() {
        this.style.borderColor = '#facc15';
      });
    });
  
    // ==================== KEYBOARD NAVIGATION ====================
    document.addEventListener('keydown', function(e) {
      // Press 'Escape' to close any open modals or clear focus
      if (e.key === 'Escape') {
        document.activeElement.blur();
      }
    });
  
    // ==================== PRINT CURRENT YEAR ====================
    const yearSpan = document.querySelector('.footer-note');
    if (yearSpan) {
      const currentYear = new Date().getFullYear();
      yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', currentYear);
    }
  
    console.log('CodeLit Academy - All systems ready! 🚀');
  });