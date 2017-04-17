function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
}


function populateDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS SAMOCHODY');
	tx.executeSql('CREATE TABLE IF NOT EXISTS SAMOCHODY (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nazwa VARACHAR, opcja1 VARCHAR, opcja2 VARCHAR, opcja3 VARCHAR, opcja4 VARCHAR, opcja5 VARCHAR, nrrejestracyjny VARCHAR, badanie VARCHAR, ubezpieczenie VARCHAR, link VARCHAR, pojemnosc VARCHAR, moc VARCHAR)');
	tx.executeSql('INSERT INTO SAMOCHODY (nazwa, opcja1, opcja2, opcja3, opcja4, opcja5, nrrejestracyjny, badanie, ubezpieczenie, link, pojemnosc, moc) VALUES ("nazwa", "opcja1", "opcja2", "opcja3", "opcja4", "opcja5", "nr", "badanie", "ubezpieczenie", "link", "pojemnosc", "moc")');
	//tx.executeSql('INSERT INTO SAMOCHODY (data) VALUES ("Second row")');
}


function queryDB(tx) {
	tx.executeSql('SELECT * FROM SAMOCHODY', [], querySuccess, errorCB);
}


function querySuccess(tx, results) {
	var len = results.rows.length;
		if (len == 0) {
			$('#samochody').html("Aktualnie nie masz samochodów do wyświetlenia. Dodaj nowy pojazd, aby móc dodawać do niego wydatki, prowadzić zaawansowane statystyki związane z wydatkami oraz sprawdzać najblisze stacje benzynowe lub warsztaty. W niektórych przypadkach do prawidłowego działania aplikacji wymagane jest połączenie z internetem oraz aktywny GPS.");
		} else {
		$('#samochody').html("");
		for (var i=0; i<len; i++){
			$('#samochody').append("<a href=\"samochod-akcja\" class=\"ui-btn ui-corner-all\" id=\"sam-"+results.rows.item(i).id+"\">"+results.rows.item(i).nazwa+"</a>");
		}
	}
}


function errorCB(err) {
	alert("Error processing SQL: "+err.code);
}

   
function successCB() {
	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
	db.transaction(queryDB, errorCB);
}

    
function onDeviceReady() {
	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
	db.transaction(populateDB, errorCB, successCB);
}