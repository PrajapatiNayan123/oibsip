const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => links.classList.remove("open"));
});
