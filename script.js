
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    const options = {
        threshold: 0.5 // Trigger when at least 50% of the section is in view
    };

    let currentActive = null;

    // Observer callback to handle section visibility
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'visible' class to make the section visible
                entry.target.classList.add('visible');

                // Highlight the corresponding navigation item
                const id = entry.target.id;
                navItems.forEach(item => {
                    if (item.getAttribute('href').substring(1) === id) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    };

    // Initialize observer
    const observer = new IntersectionObserver(observerCallback, options);

    // Observe each section
    sections.forEach(section => observer.observe(section));

    // Smooth scroll for navigation links
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
// scroll-header




// script.js

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('lottie-animation');

    // Load the Lottie animation
    const animation = lottie.loadAnimation({
        container: container, // The container where the animation will be rendered
        renderer: 'svg',     // Use 'svg', 'canvas', or 'html' renderer
        loop: true,          // Loop the animation
        autoplay: true,      // Start playing the animation immediately
        path: 'https://lottie.host/041c70e1-6871-4995-a422-4c1cde7a9559/xD2beFK0WV.json' // URL to the Lottie JSON file
    });
});


// script.js
document.addEventListener('DOMContentLoaded', () => {
    gsap.from(".animated-text", {
        opacity: 0,
        y: 50,
        duration: 2,
        ease: "power2.out",
        stagger: 0.1, // Stagger animation for each word or letter
        onComplete: () => console.log("Animation Complete!")
    });
});


// hamburger

// scripts.js
// scripts.js
// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const mainNav = document.querySelector(".main-nav");
  
    hamburger.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  });
  


//   scroll




const showAnim = gsap.from('.header-main', { 
    yPercent: -100,
    paused: true,
    duration: 0.2
  }).progress(1);
  
  let timer;
  let isAtTop = true;
  
  ScrollTrigger.create({
    start: "top top",
    end: "max",
    markers: true,
    onUpdate: (self) => {
      // Check if we're at the top of the page
      if (self.scroll() <= 1) {
        if (!isAtTop) {
          // If we were not at the top and now we're back, reset the animation
          isAtTop = true;
          showAnim.progress(1).pause();
          clearTimeout(timer);
        }
      } else {
        isAtTop = false;
        if (self.direction === -1) {
          showAnim.play();
          // Clear any existing timer when scrolling up
          clearTimeout(timer);
          timer = setTimeout(() => {
            showAnim.pause();
            gsap.set('.header-main', { yPercent: -100 });
          }, 1000); // 3 seconds delay
        } else {
          showAnim.reverse();
          // Clear the timer when scrolling down
          clearTimeout(timer);
        }
      }
    }
  });
  