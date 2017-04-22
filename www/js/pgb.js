function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
}


function utworzDB(tx) {
	//tx.executeSql('DROP TABLE IF EXISTS SAMOCHODY');
	//tx.executeSql('DROP TABLE IF EXISTS TANKOWANIA');
	tx.executeSql('CREATE TABLE IF NOT EXISTS SAMOCHODY (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nazwa VARACHAR, opcja1 VARCHAR, opcja2 VARCHAR, opcja3 VARCHAR, opcja4 VARCHAR, opcja5 VARCHAR, nrrejestracyjny VARCHAR, badanie VARCHAR, ubezpieczenie VARCHAR, link VARCHAR, pojemnosc VARCHAR, moc VARCHAR, spal_miasto VARCHAR, spal_mieszane VARCHAR, spal_trasa VARCHAR)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS TANKOWANIA (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, samid INTEGER, stacja VARCHAR, data_tankowania VARCHAR, cena DECIMAL, litry DECIMAL, kilometry DECIMAL)');
	//tx.executeSql('INSERT INTO SAMOCHODY (nazwa, opcja1, opcja2, opcja3, opcja4, opcja5, nrrejestracyjny, badanie, ubezpieczenie, link, pojemnosc, moc) VALUES ("nazwa", "opcja1", "opcja2", "opcja3", "opcja4", "opcja5", "nr", "badanie", "ubezpieczenie", "link", "pojemnosc", "moc")');
	//tx.executeSql('INSERT INTO SAMOCHODY (data) VALUES ("Second row")');
}


function wybierzSamochod(tx) {
	tx.executeSql('SELECT * FROM SAMOCHODY', [], querySuccess, errorCB);
}


function querySuccess(tx, results) {
	var len = results.rows.length;
		if (len == 0) {
			$('#samochody').html("Aktualnie nie masz samochodów do wyświetlenia. Dodaj nowy pojazd, aby móc dodawać do niego wydatki, prowadzić zaawansowane statystyki związane z wydatkami oraz sprawdzać najblisze stacje benzynowe lub warsztaty. W niektórych przypadkach do prawidłowego działania aplikacji wymagane jest połączenie z internetem oraz aktywny GPS.");
		} else {
		$('#samochody').html("");
		for (var i=0; i<len; i++){
			$('#samochody').append("<a href=\"#samochod-akcja\" class=\"ui-btn ui-corner-all\" id=\"sam\" onClick=\"wybranySamochod("+results.rows.item(i).id+")\">"+results.rows.item(i).nazwa+"</a>");
		}
	}
}


function errorCB(err) {
	alert("Error processing SQL: "+err.code);
}

   
function successCB() {
	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
	db.transaction(wybierzSamochod, errorCB);
}

    
function onDeviceReady() {
	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
	db.transaction(utworzDB, errorCB, successCB);
}



function wybranySamochod(samid) {
	window.localStorage.setItem("samid", samid);
	function samochodID(tx) {
		tx.executeSql('SELECT * FROM SAMOCHODY where id = ' + samid, [], querySuccess1, errorCB);
	}

	function querySuccess1(tx, results) {
		var len = results.rows.length;
			$('#pinfo').html("");
			for (var i=0; i<len; i++){
				$('#pinfo').append(results.rows.item(i).opcja1 + "<br/>");
				$('#pinfo').append(results.rows.item(i).opcja2 + "<br/>");
				$('#pinfo').append(results.rows.item(i).opcja3 + "<br/>");
				if(results.rows.item(i).opcja4 != "undefined") {
					$('#pinfo').append(results.rows.item(i).opcja4 + "<br/>");
				}

				if(results.rows.item(i).opcja5 != "undefined") {
					$('#pinfo').append(results.rows.item(i).opcja5 + "<br/>");
				}

				$('#pinfo').append("<br/>" + results.rows.item(i).nrrejestracyjny);
				$('#pinfo').append("<br/>Badanie techniczne: " + results.rows.item(i).badanie);
				$('#pinfo').append("<br/>Ubezpieczenie: " + results.rows.item(i).ubezpieczenie);
				$('#pinfo').append("<br/><br/>Spalanie w mieście: " + results.rows.item(i).spal_miasto);
				$('#pinfo').append("<br/>Spalanie w mieszane: " + results.rows.item(i).spal_mieszane);
				$('#pinfo').append("<br/>Spalanie w trasie: " + results.rows.item(i).spal_trasa);

				$("#sam-usun").attr("onclick","usunSamochod("+samid+")");
				window.localStorage.setItem("spalanie", results.rows.item(i).spal_miasto);
				
		}
	}

	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
	db.transaction(samochodID, errorCB);

}

function usunSamochod(samid) {
	function usunSam(tx) {
		tx.executeSql('DELETE FROM SAMOCHODY where id = "' + window.localStorage.getItem("samid") + '"');
		tx.executeSql('DELETE FROM TANKOWANIA where samid = "' + window.localStorage.getItem("samid") + '"');
	}
	$("#pinfo").html("");
	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
    db.transaction(usunSam, errorCB, successCB);
	window.location.href = 'index.html#stronaglowna';
}

function dodajTankowanie() {
	function dodajTank(tx) {
		tx.executeSql('INSERT INTO TANKOWANIA (samid, stacja, data_tankowania, cena, litry, kilometry) VALUES ("'+window.localStorage.getItem("samid")+'","'+$('#stacja-benz').val()+'","'+$('#data-tankowania').val()+'","'+$('#cena').val()+'","'+$('#litry').val()+'","'+$('#kilometry').val()+'")');
	}
	$("#pinfo").html("");
	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
    db.transaction(dodajTank, errorCB, successCB);
	window.location.href = 'index.html#stronaglowna';
}

function statystykiTankowania() {
	function tankowaniaID(tx) {
		tx.executeSql('SELECT * FROM TANKOWANIA where samid = '+window.localStorage.getItem("samid"), [], querySuccess2, errorCB);
	}

	function querySuccess2(tx, results) {
		var len = results.rows.length;
			$('#tankstat').append("<table>");
			$('#tankstat').append("<thead><tr><th>Data</th><th>km</th><th>Stacja</th><th>Litry</th><th>Cena</th></tr></thead><tbody>")
			for (var i=0; i<len; i++){
				$('#tankstat').append("<tr><th>"+results.rows.item(i).data_tankowania+"</th><th>"+results.rows.item(i).kilometry+"</th><th>"+results.rows.item(i).stacja+"</th><th>"+results.rows.item(i).litry+"</th><th>"+results.rows.item(i).cena+"</th></tr>");

				
		}
		$('#tankstat').append("</tbody></table>");
	}

		var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
	db.transaction(tankowaniaID, errorCB);
}

function statystykiTankowania_SUMY() {
	function tankowaniaID_SUMY(tx) {
		tx.executeSql('SELECT sum(kilometry) as km, sum(litry) as ltr, avg(cena) as cena FROM TANKOWANIA where samid = '+window.localStorage.getItem("samid")+' group by samid', [], querySuccess3, errorCB);
	}

	function querySuccess3(tx, results) {
		var len = results.rows.length;
			$('#tankstat').html("");
			for (var i=0; i<len; i++){
				$('#tankstat').append("Suma km: "+results.rows.item(i).km);
				$('#tankstat').append("<br/>Suma litrów: "+results.rows.item(i).ltr);
				$('#tankstat').append("<br/>Średnia cena: "+results.rows.item(i).cena);
				$('#tankstat').append("<br/>Średnie spalanie: "+Math.round((results.rows.item(i).ltr*100)/results.rows.item(i).km*100)/100);
				$('#tankstat').append("<br/><br/>")
		}
	}

		var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
	db.transaction(tankowaniaID_SUMY, errorCB);

	statystykiTankowania();
}

