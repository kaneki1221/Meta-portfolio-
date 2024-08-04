
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
