// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const siteHeader = document.querySelector(".site-header");

    if (menuToggle && siteHeader) {
        const closeMenu = () => {
            siteHeader.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        };

        menuToggle.addEventListener("click", () => {
            const isOpen = siteHeader.classList.toggle("menu-open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        });

        siteHeader.querySelectorAll("nav a").forEach((link) => link.addEventListener("click", closeMenu));
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });
    }

    const lightbox = document.querySelector("#project-lightbox");
    if (!lightbox) return;

    const closeButton = lightbox.querySelector(".project-lightbox-close");
    const image = lightbox.querySelector(".project-lightbox-image");
    const imageElement = image.querySelector("img");
    const imageLabel = image.querySelector("span");
    let lastFocusedPhoto;

    const closeLightbox = () => {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");
        lastFocusedPhoto?.focus();
    };

    document.querySelectorAll(".project-photo").forEach((photo) => {
        photo.addEventListener("click", () => {
            lastFocusedPhoto = photo;
            image.className = `project-lightbox-image ${[...photo.classList].filter((name) => name !== "project-photo").join(" ")}`;
            imageLabel.textContent = photo.textContent.trim();
            const sourceImage = photo.querySelector("img");
            imageElement.src = sourceImage.src;
            imageElement.alt = sourceImage.alt;
            lightbox.classList.add("is-open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.classList.add("lightbox-open");
            closeButton.focus();
        });
    });

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
});
