// Array mit 10 zufälligen Aufgaben als Strings
const tasks = [
  "Projekt abschließen",
  "Am Meeting teilnehmen",
  "Bericht schreiben",
  "Code überprüfen",
  "Fehler beheben",
  "Dokumentation aktualisieren",
  "Nächsten Sprint planen",
  "Benutzertests durchführen",
  "Leistung optimieren",
  "Designen",
];

// Wähle die Buttons und das ul-Element aus
const addItemBtn = document.getElementById("add-item-btn");
const alertBtn = document.getElementById("alert-btn");
const consoleBtn = document.getElementById("console-btn");
const itemList = document.getElementById("item-list");

// Event anhängen, um dem ul ein neues li-Element hinzuzufügen
addItemBtn.addEventListener("click", () => {
  const newItem = document.createElement("li");
  newItem.textContent = tasks[Math.floor(Math.random() * tasks.length)];
  itemList.appendChild(newItem);
  newItem.scrollIntoView();
});

// Event anhängen, um einen Alert (Warnmeldung) anzuzeigen
alertBtn.addEventListener("click", () => {
  alert("Dies ist eine Warnmeldung!");
});

// Event anhängen, um eine Nachricht in der Konsole auszugeben
consoleBtn.addEventListener("click", () => {
  console.log("Ein Text!");
});
