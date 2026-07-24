// Erstelle das header-Element und seine Unterelemente
const header = document.createElement("header");

const nav = document.createElement("nav");

const logo = document.createElement("a");
logo.href = "#";
logo.textContent = "Coffee Shop";

const navList = document.createElement("ul");

const navItems = ["Startseite", "Menü", "Über uns", "Kontakt"];

navItems.forEach((item) => {
  const navItem = document.createElement("li");
  navItem.classList.add("nav-item");
  const navLink = document.createElement("a");
  navLink.href = "#";
  navLink.textContent = item;
  navItem.appendChild(navLink);
  navList.appendChild(navItem);
});

nav.appendChild(logo);
nav.appendChild(navList);
header.appendChild(nav);

// Erstelle den Hero-Bereich und seine Unterelemente
const hero = document.createElement("section");

const heroContent = document.createElement("div");

const heroHeading = document.createElement("h1");
heroHeading.textContent = "Willkommen in unserem Café";

const heroText = document.createElement("p");
heroText.textContent = "Genieße den besten Kaffee der Stadt.";

const heroButton = document.createElement("a");
heroButton.href = "#";
heroButton.textContent = "Entdecke unsere Karte";

heroContent.appendChild(heroHeading);
heroContent.appendChild(heroText);
heroContent.appendChild(heroButton);
hero.appendChild(heroContent);

// Erstelle den Footer und seine Unterelemente
const footer = document.createElement("footer");

const footerText = document.createElement("p");
footerText.innerText = "2024 Coffee Shop. Alle Rechte vorbehalten.";

footer.appendChild(footerText);

// Füge alle Sektionen dem Body hinzu
document.body.appendChild(header);
document.body.appendChild(hero);
document.body.appendChild(footer);

// Wende CSS-Stile über element.style an

// Header-Stile
header.style.backgroundColor = "#fff";
header.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
header.style.padding = "1rem 0";

// Nav-Stile
nav.style.display = "flex";
nav.style.justifyContent = "space-between";
nav.style.alignItems = "center";
nav.style.maxWidth = "1200px";
nav.style.margin = "0 auto";
nav.style.padding = "0 1rem";

// Logo-Stile
logo.style.fontSize = "1.5rem";
logo.style.fontWeight = "bold";
logo.style.color = "#333";
logo.style.textDecoration = "none";

// Nav-List-Stile
navList.style.display = "flex";
navList.style.listStyle = "none";

// Nav-Item-Stile
document.querySelectorAll(".nav-item").forEach((navItem) => {
  navItem.style.marginLeft = "1.5rem";
});

// Nav-Link-Stile
document.querySelectorAll(".nav-item a").forEach((navLink) => {
  navLink.style.textDecoration = "none";
  navLink.style.color = "#333";
  navLink.style.fontWeight = "bold";
});

// Hero-Stile
hero.style.height = "560px";
hero.style.background =
  'url("https://images.pexels.com/photos/2907301/pexels-photo-2907301.jpeg?auto=compress&cs=tinysrgb&w=640&h=853&dpr=1") no-repeat center center/cover';
hero.style.color = "#fff";
hero.style.display = "flex";
hero.style.justifyContent = "center";
hero.style.alignItems = "center";

// Hero-Content-Stile
heroContent.style.maxWidth = "600px";
heroContent.style.height = "100%";
heroContent.style.display = "flex";
heroContent.style.flexDirection = "column";
heroContent.style.justifyContent = "space-around";
heroContent.style.alignItems = "center";
heroContent.style.textAlign = "center";

// Hero-Heading-Stile
heroHeading.style.fontSize = "2.5rem";
heroHeading.style.marginBottom = "1rem";

// Hero-Text-Stile
heroText.style.fontSize = "1.2rem";
heroText.style.marginBottom = "2rem";

// Button-Stile
heroButton.style.backgroundColor = "#333";
heroButton.style.color = "#fff";
heroButton.style.padding = "0.75rem 1.5rem";
heroButton.style.textDecoration = "none";
heroButton.style.borderRadius = "5px";
heroButton.style.transition = "background-color 0.3s ease";

heroButton.addEventListener("mouseover", () => {
  heroButton.style.backgroundColor = "#555";
});

heroButton.addEventListener("mouseout", () => {
  heroButton.style.backgroundColor = "#333";
});

// Footer-Stile
footer.style.backgroundColor = "#333";
footer.style.color = "#fff";
footer.style.textAlign = "center";
footer.style.padding = "1rem 0";
footer.style.marginTop = "auto";
