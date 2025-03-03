
// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Login form submission (homepage)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // This would typically connect to a backend service
        // For demo purposes, just show an alert
        alert(`Welcome back, ${username}! You are now logged in.`);
        
        // Clear the form
        loginForm.reset();
      });
    }
    
    // Login page form submission
    const loginPageForm = document.getElementById('login-page-form');
    if (loginPageForm) {
      loginPageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // This would typically connect to a backend service
        // For demo purposes, just show an alert
        alert(`Welcome back! You are now logged in with ${email}.`);
        
        // Redirect to homepage after successful login
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      });
    }
    
    // Reservation form submission
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
      reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const guests = document.getElementById('guests').value;
        const accommodation = document.getElementById('accommodation').value;
        
        // Show confirmation
        alert(`Thank you, ${name}! Your reservation for ${guests} guest(s) in our ${accommodation} has been received. We will contact you shortly to confirm your booking.`);
        
        // Clear the form
        reservationForm.reset();
      });
    }
    
    // Deals page filters
    const filterDropdowns = document.querySelectorAll('.filter-dropdown');
    if (filterDropdowns.length > 0) {
      filterDropdowns.forEach(dropdown => {
        dropdown.addEventListener('change', function() {
          // In a real app, this would filter the deals
          // For demo purposes, just show what was selected
          console.log(`Filter selected: ${dropdown.id} = ${dropdown.value}`);
        });
      });
      
      // Search functionality
      const searchButton = document.querySelector('.search-input button');
      if (searchButton) {
        searchButton.addEventListener('click', function() {
          const searchInput = document.querySelector('.search-input input');
          if (searchInput.value.trim() !== '') {
            console.log(`Searching for: ${searchInput.value}`);
            // In a real app, this would filter based on search
            alert(`Showing results for: ${searchInput.value}`);
          }
        });
      }
    }
    
    // Date validation for reservation
    const checkinDate = document.getElementById('checkin');
    const checkoutDate = document.getElementById('checkout');
    
    if (checkinDate && checkoutDate) {
      // Set min date to today
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const formattedToday = `${yyyy}-${mm}-${dd}`;
      
      checkinDate.setAttribute('min', formattedToday);
      
      // Update checkout min date when checkin changes
      checkinDate.addEventListener('change', function() {
        checkoutDate.setAttribute('min', checkinDate.value);
        
        // If checkout date is before checkin date, reset it
        if (checkoutDate.value && checkoutDate.value < checkinDate.value) {
          checkoutDate.value = '';
        }
      });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(38, 192, 211, 0.9)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      } else {
        header.style.backgroundColor = '#26c0d3';
        header.style.boxShadow = 'none';
      }
    });
    
    // Animated counter for stats (simplified version)
    const statNumbers = document.querySelectorAll('.stat-info h3, .stat-item h3');
    let hasAnimated = false;
    
    // Function to animate counting
    function animateCounter(el, target) {
      let current = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target.toString().includes('.') ? target : target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 10);
    }
    
    // Check if element is in viewport
    function isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    // Trigger animation when stats section is visible
    window.addEventListener('scroll', function() {
      const statsSection = document.getElementById('stats') || document.querySelector('.stats-grid');
      if (statsSection && isInViewport(statsSection) && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(el => {
          const targetText = el.textContent.replace(/[^0-9.]/g, '');
          const target = parseFloat(targetText);
          if (!isNaN(target)) {
            animateCounter(el, target);
          }
        });
      }
    });
    
    // Mobile menu toggle (for responsive design)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav');
    
    if (window.innerWidth <= 768) {
      header.insertBefore(mobileMenuButton, nav);
      nav.style.display = 'none';
      
      mobileMenuButton.addEventListener('click', function() {
        if (nav.style.display === 'none') {
          nav.style.display = 'block';
          mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
        } else {
          nav.style.display = 'none';
          mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    }
    
    // Resize event handler
    window.addEventListener('resize', function() {
      if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-button')) {
          header.insertBefore(mobileMenuButton, nav);
        }
        nav.style.display = 'none';
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
      } else {
        if (document.querySelector('.mobile-menu-button')) {
          document.querySelector('.mobile-menu-button').remove();
        }
        nav.style.display = 'flex';
      }
    });
  });
  