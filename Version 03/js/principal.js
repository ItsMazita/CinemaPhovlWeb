
const toggleLogo = document.getElementById("toggleMenu");
const menuItems = document.getElementById("menuItems");
const sidebarPanel = document.getElementById("sidebarPanel");

toggleLogo.addEventListener("click", () => {
  menuItems.classList.toggle("hidden");
  sidebarPanel.classList.toggle("collapsed");
});

let currentSlide = 0;
const cardWidth = 185;
const totalSlides = document.querySelectorAll("#carouselSlide .movie-container").length;

function moveSlide(direction) {
  currentSlide += direction;

  if (currentSlide < 0) currentSlide = totalSlides - 1;
  if (currentSlide >= totalSlides) currentSlide = 0;

  document.getElementById("carouselSlide").style.transform =
    `translateX(${currentSlide * -cardWidth}px)`;
}