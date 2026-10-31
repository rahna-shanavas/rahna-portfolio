
// =========================================
// SCROLL REVEAL ANIMATIONS
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    // Check browser support
    if (!("IntersectionObserver" in window)) {
        return;
    }

    // Respect reduced-motion accessibility settings
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    // Elements that will animate when they enter the screen
    const revealElements = document.querySelectorAll(`
        section:not(.home-hero) .container > .row > [class*="col-"],
        section:not(.home-hero) .container > .home-highlights,
        section:not(.home-hero) .container > .home-section-heading
    `);

    // Add animation class to each selected element
    revealElements.forEach(function (element, index) {
        element.classList.add("scroll-reveal");

        // Slightly stagger elements in the same row
        const siblings = Array.from(element.parentElement.children);
        const siblingIndex = siblings.indexOf(element);

        element.style.transitionDelay = `${siblingIndex * 100}ms`;
    });

    // Observe elements as they enter the screen
    const revealObserver = new IntersectionObserver(function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");

                // Stop observing once the animation has happened
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    // Start observing each element
    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(
    ".section-heading, .skill-card, .journey-item, .home-project-card"
).forEach(element => {
    element.classList.add("reveal");
    revealObserver.observe(element);
});

const sparkleContainer = document.querySelector(".sparkle-container");

if (
    sparkleContainer &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
    setInterval(() => {
        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";
        sparkle.textContent = Math.random() > 0.5 ? "✧" : "✦";
        sparkle.style.color = Math.random() > 0.5
            ? "#8B3F4B"
            : "#C77F8E";
        sparkle.style.left = Math.random() * 95 + "vw";
        sparkle.style.top = Math.random() * 90 + "vh";
        sparkle.style.fontSize = (12 + Math.random() * 12) + "px";

        sparkleContainer.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 3000);
    }, 400);
}
