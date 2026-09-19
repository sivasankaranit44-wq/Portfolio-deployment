// Mobile Navigation
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("open");
        const isOpen = navbar.classList.contains("open");
        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
             : "Open navigation menu"
        );
    });
}
// Close mob menu when navigation is clicked
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (navbar) {
            navbar.classList.remove("open");
        }
        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
          );
        }
    });

});
// Head and scroll
const header = document.querySelector(".header");
function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}
window.addEventListener("scroll", handleHeaderScroll);
// Runs once page is loaded
handleHeaderScroll();

// Scroll reveal
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("show");
    });
}
// Active Navigation
const sections = document.querySelectorAll("section[id]");
if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {

         entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const currentSection = entry.target.id;
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    const linkTarget =
                        link.getAttribute("href");
                    if (
                        linkTarget ===
                        `#${currentSection}`
                    ) {
                        link.classList.add("active");
                    }
                });
            });
      },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );
    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}
// Current year
const currentYear =
    document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}

// For closing mobile menu while resizing
window.addEventListener("resize", () => {
    if (
        window.innerWidth > 700 &&
        navbar
    ) {
        navbar.classList.remove("open");
        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
          );
        }
    }
});
// Escape key for mobile menu
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        if (navbar) {
            navbar.classList.remove("open");
        }
        if (menuToggle) {
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }
    }
});