// Wähle das h1-Element innerhalb des .hero-content-divs aus und gib es in der Konsole aus
const heading = document.querySelector(".hero-content h1");
console.log(heading);

// Wähle alle a-Elemente innerhalb der .nav-list aus und gib sie in der Konsole aus
const navList = document.querySelectorAll(".nav-list a");
console.log(navList);

// Wähle das .btn-Element aus und gib es in der Konsole aus
const btn = document.querySelector(".btn");
console.log(btn);

// Ändere die Hintergrundfarbe des .header-Elements auf #b5651d
const header = document.querySelector(".header");
header.style.backgroundColor = "#b5651d";

// Ändere die Schriftgröße des h1-Elements innerhalb des .hero-content-divs auf 3rem
heading.style.fontSize = "3rem";

// Ändere die Textfarbe aller a-Elemente innerhalb der .nav-list auf #faf0e6
for (const link of navList) {
  link.style.color = "#faf0e6";
}

// Alternative
// navList.forEach((link) => (link.style.color = "#faf0e6"));

// Wähle das .hero-content-div aus und füge darin ein neues p-Element mit dem Text "Täglich von 07:00 bis 21:00 Uhr geöffnet." hinzu
const heroContent = document.querySelector(".hero-content");
const newPara = document.createElement("p");

newPara.textContent = "Täglich von 07:00 bis 21:00 Uhr geöffnet.";

heroContent.appendChild(newPara);
