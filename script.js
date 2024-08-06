
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


// Import GSAP and ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

gsap.set(".horizontal-line", { scaleX: 0 });
gsap.set(".content", { autoAlpha: 0 });

gsap.utils.toArray(".timeline-item").forEach((item, i) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top center+=100",
      end: "bottom center-=100",
      toggleActions: "play none none none",
      markers: false,
    },
  });

  tl.fromTo(
    item.querySelector(".horizontal-line"),
    { scaleX: 0 },
    { scaleX: 1, duration: 0.5, transformOrigin: i % 2 === 0 ? "left center" : "right center" }
  )
    .fromTo(
      item.querySelector(".content"),
      { autoAlpha: 0, y: 50 },
      { autoAlpha: 1, y: 0, duration: 0.5 },
      "-=0.3"
    );
});

gsap.fromTo(
  ".line",
  { height: 0 },
  {
    height: "100%",
    duration: 2,
    scrollTrigger: {
      trigger: ".timeline",
      start: "top center",
      end: "bottom center",
      scrub: true,
    },
  }
);

// project

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const slideWidth = slides[0].getBoundingClientRect().width + 20; // Adjust margin as needed

    let currentIndex = 0;

    const updateCarousel = (index) => {
        const offset = -index * slideWidth;
        track.style.transform = `translateX(${offset}px)`;
    };

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex += 1;
        } else {
            currentIndex = 0; // Loop back to the first slide
        }
        updateCarousel(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex -= 1;
        } else {
            currentIndex = slides.length - 1; // Loop back to the last slide
        }
        updateCarousel(currentIndex);
    });
});
