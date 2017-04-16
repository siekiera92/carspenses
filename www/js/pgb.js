function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
}

function onDeviceReady() {
	navigator.notification.beep(1);

	var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
	db.transaction(carsDB, errorCB, successCB);
	db.transaction(selectCars, errorCB, successCB);
}


function carsDB(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS SAMOCHODY (id unique, opcja1, opcja2, opcja3, opcja4, opcja5, nrrejestracyjny, badanie, ubezpieczenie, pojemnosc, moc)');
}

function selectCars(tx) {
        tx.executeSql('SELECT * FROM SAMOCHODY', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
	if (!results.rowsAffected) {
		$('#samochody').html("Aktualnie nie masz samochodów do wyświetlenia. Dodaj nowy pojazd, aby móc dodawać do niego wydatki, prowadzić zaawansowane statystyki związane z wydatkami oraz sprawdzać najblisze stacje benzynowe lub warsztaty. W niektórych przypadkach do prawidłowego działania aplikacji wymagane jest połączenie z internetem oraz aktywny GPS.");
		return false;
	}
	
	
}

function errorCB(tx, err) {
	alert("Error processing SQL: "+err);
}

function successCB() {
	
}