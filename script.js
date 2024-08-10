window.addEventListener("load", () => {
  const timeline = gsap.timeline();

  // Header slide-in animation
  timeline.from(".header-main", {
    duration: 1,
    y: "-100%",
    opacity: 0,
    ease: "power4.out",

    onComplete: updateHeaderStyle,
  });

  // Animate the .mymyname with effects
  const colors = [
    "#ff5733",
    "#33ff57",
    "#3357ff",
    "#ff33a1",
    "#33fff0",
    "#ffb833",
    "#a1ff33",
  ];

  timeline.from(
    ".myname",
    {
      duration: 1.5,
      opacity: 1,
      x: -50,
      scale: 1,
      ease: "power2.out",
      onComplete: () => {
        // Continuous gradient color animation with smoother transitions
        gsap.to(".myname strong", {
          color: () => `hsl(${Math.random() * 360}, 70%, 50%)`, // Dynamic color
          duration: 2, // Extended duration for smoother transitions
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          onUpdate: function () {
            // Add a subtle text-shadow effect to enhance readability
            gsap.set(".myname strong", {
              textShadow: `0 0 5px ${gsap.getProperty(".myname strong", "color")}`,
            });
          },
          onComplete: () => {
            // Set the final color to a dark shade for visibility against white
            gsap.to(".myname strong", {
              color: "#000", // Dark color for visibility
              duration: 0.5,
              scale: 1.2,
              ease: "power1.inOut",
            });
          },
        });
      },
    },
    "-=0.5"
  );

  // Animate the navigation items with more engaging effects
  timeline.from(
    ".nav-item",
    {
      duration: 1.2,
      opacity: 0,
      y: 40,
      stagger: {
        amount: 0.5,
        from: "start",
      },
      ease: "power2.out",
    },
    "-=0.5"
  );

  // Get the viewport height
  const viewportHeight = window.innerHeight;

  // Profile picture fall and bounce animation
  timeline.fromTo(
    ".pfp",
    { y: -viewportHeight / 2, scale: 0, opacity: 0 },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "bounce.out",
    },
    "-=1"
  );

  // Icons animation - starts after profile picture animation
  timeline.fromTo(
    "#social .icon",
    {
      x: (i) => (i % 2 === 0 ? -150 : 150),
      opacity: 0,
      scale: 0.5,
      rotationY: 45,
      skewX: 10,
      filter: "blur(10px)",
    },
    {
      x: 0,
      opacity: 1,
      scale: 1,
      rotationY: 0,
      skewX: 0,
      filter: "blur(0px)",
      stagger: {
        amount: 1,
        from: "edges",
        ease: "back.out(1.1)",
      },
      duration: 1.2,
      ease: "elastic.out(1, 0.75)",
    },
    "-=0.5"
  );
});

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
    loop: true,
    autoplay: true,
    path: animationConfig.path,
  });

  var iconContainer = document.getElementById(animationConfig.container);

  iconContainer.addEventListener("mouseover", function () {
    animation.goToAndPlay(0, true);
    iconContainer.style.transform = "scale(1.3)"; // Scale up on hover
  });

  iconContainer.addEventListener("mouseout", function () {
    // animation.stop();
    iconContainer.style.transform = "scale(1)"; // Reset scale on mouse out
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
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Set up ScrollTrigger for animation
gsap.from(".animated-text", {
  opacity: 1,
  y: 90,
  duration: 2,
  ease: "power2.out",
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".animated-text", // The element that triggers the animation
    start: "top 70%", // When the top of the element is 80% from the top of the viewport
    end: "bottom 20%", // Animation will end when the bottom of the element is 20% from the top of the viewport
    scrub: true, // Optional: Smooth animation linked to scrolling position
    onEnter: () => console.log("Animation Started!"), // Optional: Log when animation starts
    onLeave: () => console.log("Animation Ended!"), // Optional: Log when animation ends
  },
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
        }, 1700); // 3 seconds delay
      } else {
        showAnim.reverse();
        // Clear the timer when scrolling down
        clearTimeout(timer);
      }
    }
  },
});
// skill  gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".tech-card",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".tech-card",
      start: "top 70%",
      end: "bottom 20%",
      scrub: true,
      markers: false, // Set to true for debugging
    },
  }
);

gsap.fromTo(
  ".tech-content",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".tech-content",
      start: "top 80%",
      end: "bottom 40%",
      scrub: true,
      markers: false, // Set to true for debugging
    },
  }
);
// hover

// contact form
// Animate the form on page load
gsap.fromTo(
  ".contact-form",
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
);

// Animate the social icons on hover
document.querySelectorAll(".social-icons a").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, {
      scale: 1.3,
      color: "#007bff",
      duration: 0.3,
      ease: "power2.out",
    });
  });
  icon.addEventListener("mouseleave", () => {
    gsap.to(icon, {
      scale: 1,
      color: "#495057",
      duration: 0.3,
      ease: "power2.out",
    });
  });
});
