window.addEventListener("load", () => {
  const timeline = gsap.timeline();

  timeline.from(".header-main", {
    duration: 1,
    y: "-100%",
    opacity: 0,
    ease: "power4.out",

    onComplete: updateHeaderStyle,
  });

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
        gsap.to(".myname strong", {
          color: () => `hsl(${Math.random() * 360}, 70%, 50%)`,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          onUpdate: function () {
            gsap.set(".myname strong", {
              textShadow: `0 0 5px ${gsap.getProperty(".myname strong", "color")}`,
            });
          },
          onComplete: () => {
            gsap.to(".myname strong", {
              color: "#000",
              duration: 0.8,
              scale: 1.2,
              ease: "power1.inOut",
            });
          },
        });
      },
    },
    "-=0.5"
  );

  timeline.from(
    ".nav-item",
    {
      duration: 0.6,
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

  const viewportHeight = window.innerHeight;

  timeline.fromTo(
    ".pfp",
    { y: -viewportHeight / 2, scale: 0, opacity: 0 },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "bounce.out",
    },
    "-=1"
  );

  timeline.fromTo(
    "#social .icon",
    {
      x: (i) => (i % 2 === 0 ? -150 : 150),
      opacity: 0,
      scale: 0.6,
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
        amount: 0.2,
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

function updateHeaderStyle() {
  const header = document.querySelector(".header-main");
  const scrollPosition = window.scrollY;
  const viewportHeight = window.innerHeight;

  const transparentThreshold = viewportHeight;

  if (scrollPosition < transparentThreshold) {
    header.classList.add("transparent");
    header.classList.remove("colored");
  } else {
    header.classList.remove("transparent");
    header.classList.add("colored");
  }
}

window.addEventListener("scroll", updateHeaderStyle);

// end

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
    threshold: 0.5,
  };

  let currentActive = null;

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

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

  const observer = new IntersectionObserver(observerCallback, options);

  sections.forEach((section) => observer.observe(section));

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
    path: "icons8-instagram.json",
  },
  {
    container: "icon-container-3",
    path: "icons8-linked-in.json",
  },
  {
    container: "icon-container-4",
    path: "icons8-twitter.json",
  },
  {
    container: "icon-container-5",
    path: "icons8-gmail.json",
  },
  {
    container: "icon-container-6",
    path: "icons8-facebook.json",
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
    iconContainer.style.transform = "scale(1.1)";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("lottie-animation");

  const animation = lottie.loadAnimation({
    container: container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://lottie.host/041c70e1-6871-4995-a422-4c1cde7a9559/xD2beFK0WV.json",
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
        isAtTop = true;
        showAnim.progress(1).pause();
        clearTimeout(timer);
      }
    } else {
      isAtTop = false;
      if (self.direction === -1) {
        showAnim.play();

        clearTimeout(timer);
        timer = setTimeout(() => {
          showAnim.pause();
          gsap.set(".header-main", { yPercent: -100 });
        }, 1700);
      } else {
        showAnim.reverse();

        clearTimeout(timer);
      }
    }
  },
});

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
      markers: false,
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
      markers: false,
    },
  }
);

gsap.fromTo(
  ".contact-form",
  { y: 50, opacity: 0 },
  { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
);

document.querySelectorAll(".social-icons a").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, {
      scale: 2,
      color: "#007bff",
      duration: 0.2,
      ease: "power2.out",
    });
  });
  icon.addEventListener("mouseleave", () => {
    gsap.to(icon, {
      scale: 1,
      color: "#495057",
      duration: 0.2,
      ease: "power2.out",
    });
  });
});
// certificate
gsap.registerPlugin(ScrollTrigger);

// Animate the card
gsap.fromTo(
  ".card",
  {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".certificates",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
      markers: false,
    },
  }
);

gsap.fromTo(
  ".card img",
  {
    opacity: 0,
    x: -50,
    scale: 0.8,
  },
  {
    opacity: 1,
    x: 0,
    scale: 1,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".certificates",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
      markers: false,
    },
  }
);

gsap.fromTo(
  ".card-content",
  {
    opacity: 0,
    y: 50,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".certificates",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
      markers: false,
    },
  }
);
