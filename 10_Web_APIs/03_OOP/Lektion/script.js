/*==========================================================================
 * OOP GRUNDLAGEN: KLASSEN, VERERBUNG & KAPSELUNG
 *==========================================================================*/

// 1. DER BAUPLAN (Die Basisklasse)
class BankAccount {
  // 1. Das private Feld: Von außen komplett unsichtbar und unantastbar
  #balance;

  // Statische Eigenschaften gehören der Klasse selbst, nicht den Instanzen
  static accountCount = 0;

  constructor(owner, initialBalance) {
    this.owner = owner;
    this.#balance = initialBalance;

    // Bei jedem neuen Objekt erhöhen wir den Zähler der Klasse
    BankAccount.accountCount++;
  }

  // 2. Der GETTER: Erlaubt uns, den Kontostand zu lesen (aber nicht zu ändern)
  // Wird wie eine Eigenschaft aufgerufen, nicht wie eine Funktion!
  get currentBalance() {
    return `${this.owner} hat ${this.#balance} Euro.`;
  }

  // 3. Der SETTER: Der einzige Weg, den Kontostand zu ändern.
  // Hier können wir nun Regeln und Überprüfungen (Validation) einbauen!
  set deposit(amount) {
    if (amount <= 0) {
      console.log("Fehler: Du kannst nur positive Beträge einzahlen!");
      return; // Bricht ab
    }
    this.#balance += amount;
    console.log(`${amount} Euro erfolgreich eingezahlt.`);
  }

  // Statische Methode: Wird auf dem Bauplan aufgerufen, nicht auf dem Objekt
  static showTotalAccounts() {
    console.log(
      `Es gibt aktuell ${BankAccount.accountCount} registrierte Bank-Accounts.`,
    );
  }
}

const myAccount = new BankAccount("Max", 500);

// // Lesezugriff über den Getter (ohne Klammern am Ende!)
// console.log(myAccount.currentBalance); // "Max hat 500 Euro."

// // Schreibzugriff über den Setter (ohne Klammern, wie eine Zuweisung)
// myAccount.deposit = 200;

// // Versuchter Betrug oder Fehler:
// myAccount.deposit = -5000; // "Fehler: Du kannst nur positive Beträge einzahlen!"

// // Was passiert, wenn wir direkt auf das private Feld zugreifen wollen?
// // console.log(myAccount.#balance); // FATALER FEHLER! Private field must be declared in an enclosing class

// BankAccount.showTotalAccounts();

/*==========================================================================
 * VERERBUNG (INHERITANCE) & POLYMORPHISMUS
 *==========================================================================*/
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  login() {
    console.log(`${this.name} hat sich eingeloggt.`);
  }
}

const user1 = new User("Tom", "tom@web.de");
user1.login();

// Eine neue Klasse, aufbauend auf einer anderen Klasse
class Admin extends User {
  constructor(name, email, adminId) {
    super(name, email); // Ruft den Konstruktor der Elternklasse (User) auf
    this.adminId = adminId;
    this.tasks = ["User löschen", "Server rebooten", "Backups erstellen"];
  }

  // Polymorphismus: Wir überschreiben die login() Methode der Elternklasse!
  login() {
    console.log(
      `🛑 WICHTIG: Admin ${this.name} hat sich mit ID ${this.adminId} eingeloggt.`,
    );
  }

  deleteUser(userObj) {
    console.log(`Admin ${this.name} löscht den User ${userObj.name}...`);
  }

  showTasks() {
    console.log(`Aufgaben für Admin ${this.name}:`);

    // ES5 (Fehlerhaftes Verhalten):
    // this.tasks.forEach(function (task) {
    //   // FEHLER: 'this' ist hier drinnen nicht mehr der Admin!
    //   // 'this.name' ist undefined, da die function ihren eigenen Kontext erstellt.
    //   console.log(`- ${this.name} muss erledigen: ${task}`);
    // }, this);

    // ES6 (Die moderne, korrekte Lösung):
    // Die Arrow Function (=>) erstellt keinen eigenen Kontext,
    // sondern "erbt" das 'this' von der showTasks Methode.
    this.tasks.forEach((task) => {
      console.log(`- ${this.name} erledigt: ${task}`);
    });
  }
}

// Den Admin instanziieren und testen
const admin1 = new Admin("Anna", "anna@web.de", 10);

// Zeigt Polymorphismus (andere Ausgabe als beim normalen User)
admin1.login();

// Zeigt die Interaktion zwischen zwei Objekten
admin1.deleteUser(user1);

// // Zeigt, dass der Arrow-Function Kontext funktioniert
admin1.showTasks();

/*==========================================================================
 * DIE OOP BEGRIFFS-ANALOGIEN
 *==========================================================================*/

/*
1. INTERFACE (Die Schnittstelle)
Ein Vertrag. Es beschreibt nur, WELCHE Methoden und Eigenschaften ein Objekt haben muss, 
enthält aber keine Logik.
-> Analogie: Die Tasten einer Fernbedienung. Man weiß, was sie tun (z. B. "Lauter"), 
   aber nicht, wie das Signal intern erzeugt und verarbeitet wird.

2. KLASSE (Class)
Ein Bauplan. Sie enthält die tatsächliche Logik und definiert, WIE die Aufgaben 
erledigt werden.
-> Analogie: Der Schaltplan im Inneren der Fernbedienung, der festlegt, wie 
   der Knopfdruck in ein Infrarot-Signal umgewandelt wird.

3. INSTANZ (Object / Instance)
Das fertige Produkt. Das konkrete Objekt, das aus dem Bauplan erstellt wurde, 
im Arbeitsspeicher lebt und mit dem wir arbeiten.
-> Analogie: Die physische Fernbedienung, die du gerade in der Hand hältst.
*/
