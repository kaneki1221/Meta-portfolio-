import { injectSpeedInsights } from "@vercel/speed-insights";

injectSpeedInsights();
window.addEventListener("load", () => {
  const timeline = gsap.timeline();

  // Header slide-in animation
  timeline.from(".header-main", {
    duration: 1,
    y: "-800%",
    opacity: 0,
    ease: "power3.out",
    onComplete: updateHeaderStyle, // Update header style after the animation completes
  });

  // Get the viewport height
  const viewportHeight = window.innerHeight;

  // Profile picture fall and bounce animation
  timeline.fromTo(
    ".pfp",
    { y: -viewportHeight / 2, scale: 0, opacity: 0 }, // Adjust starting position based on viewport height
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1, // Total duration of the animation
      ease: "bounce.out", // Bounce effect
      onComplete: () => {
        // Optionally, you can fine-tune the final position if needed
      },
    }
  );
});

// icons

// Function to animate icons// GSAP Animation
gsap.fromTo(
  "#social .icon",
  {
    x: (i, target) => (i < 3 ? -window.innerWidth : window.innerWidth),
    opacity: 0,
  },
  {
    x: 0,
    opacity: 1,
    stagger: 0.1,
    duration: 1.2,
    ease: "bounce.out",
  }
);

// endAnimation

// Function to update header style based on scroll position
function updateHeaderStyle() {
  const header = document.querySelector(".header-main");
  const scrollPosition = window.scrollY;
  const viewportHeight = window.innerHeight;

  // Define the scroll position where styles change
  const transparentThreshold = viewportHeight; // Height of the viewport for transparent header

  if (scrollPosition < transparentThreshold) {
    // Header in the top section
    header.classList.add("transparent");
    header.classList.remove("colored");
  } else {
    // Header in other sections
    header.classList.remove("transparent");
    header.classList.add("colored");
  }
}

// Update header style on scroll
window.addEventListener("scroll", updateHeaderStyle);

// end

// icons animation

// smooth nav-links-forward

document.querySelectorAll(".nav-links a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-item");
  const options = {
    threshold: 0.5, // Trigger when at least 50% of the section is in view
  };

  let currentActive = null;

  // Observer callback to handle section visibility
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add 'visible' class to make the section visible
        entry.target.classList.add("visible");

        // Highlight the corresponding navigation item
        const id = entry.target.id;
        navItems.forEach((item) => {
          if (item.getAttribute("href").substring(1) === id) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  };

  // Initialize observer
  const observer = new IntersectionObserver(observerCallback, options);

  // Observe each section
  sections.forEach((section) => observer.observe(section));

  // Smooth scroll for navigation links
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = item.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});
// scroll-header

// icon8
var animations = [
  {
    container: "icon-container-1",
    path: "icons8-github.json",
  },
  {
    container: "icon-container-2",
    path: "icons8-instagram.json", // Replace with your path
  },
  {
    container: "icon-container-3",
    path: "icons8-linked-in.json", // Replace with your path
  },
  {
    container: "icon-container-4",
    path: "icons8-twitter.json", // Replace with your path
  },
  {
    container: "icon-container-5",
    path: "icons8-gmail.json", // Replace with your path
  },
  {
    container: "icon-container-6",
    path: "icons8-facebook.json", // Replace with your path
  },
];

// Initialize animations and add event listeners
animations.forEach(function (animationConfig) {
  var animation = lottie.loadAnimation({
    container: document.getElementById(animationConfig.container),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: animationConfig.path,
  });

  var iconContainer = document.getElementById(animationConfig.container);

  iconContainer.addEventListener("mouseover", function () {
    animation.goToAndPlay(0, true);
  });

  iconContainer.addEventListener("mouseout", function () {
    animation.stop();
  });
});

// end

// script.js

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("lottie-animation");

  // Load the Lottie animation
  const animation = lottie.loadAnimation({
    container: container, // The container where the animation will be rendered
    renderer: "svg", // Use 'svg', 'canvas', or 'html' renderer
    loop: true, // Loop the animation
    autoplay: true, // Start playing the animation immediately
    path: "https://lottie.host/041c70e1-6871-4995-a422-4c1cde7a9559/xD2beFK0WV.json", // URL to the Lottie JSON file
  });
});

// script.js
document.addEventListener("DOMContentLoaded", () => {
  gsap.from(".animated-text", {
    opacity: 1,
    y: 90,
    duration: 2,
    ease: "power2.out",
    stagger: 0.1, // Stagger animation for each word or letter
    onComplete: () => console.log("Animation Complete!"),
  });
});

// hamburger

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.querySelector(".main-nav");

  hamburger.addEventListener("click", () => {
    // Toggle the active class on both menu and icon
    mainNav.classList.toggle("active");
    hamburger.classList.toggle("header-nav-active");
  });
});

// scroll

const showAnim = gsap
  .from(".header-main", {
    yPercent: -100,
    paused: true,
    duration: 0.2,
  })
  .progress(1);

let timer;
let isAtTop = true;

ScrollTrigger.create({
  start: "top top",
  end: "max",
  markers: false,
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
          gsap.set(".header-main", { yPercent: -100 });
        }, 1000); // 3 seconds delay
      } else {
        showAnim.reverse();
        // Clear the timer when scrolling down
        clearTimeout(timer);
      }
    }
  },
});
// skill

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Animate each skill item as it enters the viewport
gsap.utils.toArray(".skill-item").forEach((skill) => {
  gsap.from(skill, {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power1.out",
    scrollTrigger: {
      trigger: skill,
      start: "top 80%", // Start the animation when the top of the skill enters 80% of the viewport
      end: "bottom 60%", // End the animation when the bottom of the skill enters 60% of the viewport
      toggleActions: "play none none none", // Only play the animation once
      markers: false, // Set to true to see markers for debugging
    },
  });
});

// end

//project card animation
console.clear();

const items = gsap.utils.toArray(".project-card");

items.forEach((item, index) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top top+=" + item.getAttribute("animation-item"),
      endTrigger: ".container2",
      end: "top 260",
      pin: true,
      pinSpacing: false,
      scrub: true,
      markers: false,
    },
  });
  tl.to(item, {
    opacity: 0.4,
    scale: 0.85 + 0.02 * index,
    transformOrigin: "center center",
  });
});
