
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
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    const slideWidth = slides[0].getBoundingClientRect().width;

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

    // Optional: Auto-slide
    // setInterval(() => {
    //     nextButton.click();
    // }, 3000); 
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

gsap.registerPlugin(ScrollTrigger);

let lastScrollTop = 0; // Keeps track of the last scroll position
const header = document.querySelector('.main-tool-bar');
let timeoutId = null; // For storing the timeout ID

// Initialize header position
gsap.set(header, { y: 0 });

ScrollTrigger.create({
  start: "top top", // Trigger start
  end: "bottom bottom", // Trigger end
  onUpdate: self => {
    let currentScrollTop = self.scroll();

    // Clear the previous timeout to reset the delay
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (currentScrollTop <= 0) {
      // At the top of the page
      gsap.to(header, { y: 0, duration: 0.3, ease: "power1.out" });
    } else if (currentScrollTop > lastScrollTop) {
      // Scrolling down
      gsap.to(header, { y: -80, duration: 0.3, ease: "power1.out" });
    } else {
      // Scrolling up
      gsap.to(header, { y: 0, duration: 0.3, ease: "power1.out" });

      // Set a timeout to hide the header after a delay
      timeoutId = setTimeout(() => {
        gsap.to(header, { y: -80, duration: 0.3, ease: "power1.out" });
      }, 2000); // Adjust the delay as needed (2000ms = 2 seconds)
    }

    lastScrollTop = currentScrollTop;
  }
});
