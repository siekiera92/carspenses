function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
}

//wszystkie potrzebne bazy
function utworzDB(tx) {
	//tx.executeSql('DROP TABLE IF EXISTS SAMOCHODY');
	//tx.executeSql('DROP TABLE IF EXISTS TANKOWANIA');
	//tx.executeSql('DROP TABLE IF EXISTS NAPRAWY');
	tx.executeSql('CREATE TABLE IF NOT EXISTS SAMOCHODY (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nazwa VARACHAR, opcja1 VARCHAR, opcja2 VARCHAR, opcja3 VARCHAR, opcja4 VARCHAR, opcja5 VARCHAR, nrrejestracyjny VARCHAR, badanie VARCHAR, ubezpieczenie VARCHAR, link VARCHAR, pojemnosc VARCHAR, moc VARCHAR, spal_miasto VARCHAR, spal_mieszane VARCHAR, spal_trasa VARCHAR)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS TANKOWANIA (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, samid INTEGER, stacja VARCHAR, data_tankowania VARCHAR, cena DECIMAL, litry DECIMAL, kilometry DECIMAL)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS NAPRAWY (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, samid INTEGER, data_naprawy VARCHAR, zrobione TEXT, przebieg DECIMAL, koszt DECIMAL)');
}

//START - pobieranie informacji o dodanych samochodach
function wybierzSamochod(tx) {
	tx.executeSql('SELECT * FROM SAMOCHODY', [], querySuccess, errorCB);
}


function querySuccess(tx, results) {
	var len = results.rows.length;
		if (len == 0) {
			$('#samochody').html("Aktualnie nie masz samochodów do wyświetlenia. Dodaj nowy pojazd, aby móc dodawać do niego wydatki, prowadzić statystyki oraz sprawdzać najbliższe stacje benzynowe, myjnie samochodowe lub warsztaty. Do prawidłowego działania aplikacji wymagane jest połączenie z internetem oraz aktywny GPS.");
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
//KONIEC - pobieranie informacji o dodanych samochodach

//START - tworzenie baz danych jezeli nie istnieją
function successCB() {
	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
	db.transaction(wybierzSamochod, errorCB);
	 $("#spin").hide();
}

    
function onDeviceReady() {
	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
	db.transaction(utworzDB, errorCB, successCB);
}
//KONIEC - tworzenie baz danych jezeli nie istnieją

//START - pobieranie informacji o wybranym samochodzie
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
				if(results.rows.item(i).spal_miasto!= "undefined") {
					$('#pinfo').append("<br/><br/>Spalanie w mieście: " + results.rows.item(i).spal_miasto);
				}
				if(results.rows.item(i).spal_mieszane != "undefined") {
						$('#pinfo').append("<br/>Spalanie w mieszane: " + results.rows.item(i).spal_mieszane);
				}
				if(results.rows.item(i).spal_trasa != "undefined") {
					$('#pinfo').append("<br/>Spalanie w trasie: " + results.rows.item(i).spal_trasa);
				}
				
				
				

				$("#sam-usun").attr("onclick","usunSamochod("+samid+")");
				window.localStorage.setItem("spalanie", results.rows.item(i).spal_miasto);
				
		}
	}

	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
	db.transaction(samochodID, errorCB);

}
//KONIEC - pobieranie informacji o wybranym samochodzie

//START - usuwanie wszystkich danych o samochodzie
function usunSamochod(samid) {
	function usunSam(tx) {
		tx.executeSql('DELETE FROM SAMOCHODY where id = "' + window.localStorage.getItem("samid") + '"');
		tx.executeSql('DELETE FROM TANKOWANIA where samid = "' + window.localStorage.getItem("samid") + '"');
		tx.executeSql('DELETE FROM NAPRAWY where samid = "' + window.localStorage.getItem("samid") + '"');
	}
	$("#pinfo").html("");
	if (confirm('Czy na pewno chcesz usunąć samochód i wszystkie dane z nim związane?')) {
	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
    db.transaction(usunSam, errorCB, successCB);
	}
	window.location.href = 'index.html#stronaglowna';
	
}
//KONIEC - usuwanie wszystkich danych o samochodzie

//START - Zmiana daty badania technicznego lub ubezpieczenia
function pobierzDaty() {
	function datyID(tx) {
		tx.executeSql('SELECT nazwa, badanie, ubezpieczenie FROM SAMOCHODY where id = '+window.localStorage.getItem("samid"), [], querySuccessDaty, errorCB);
	}

	function querySuccessDaty(tx, results) {
		var len = results.rows.length;
			for (var i=0; i<len; i++){
				$("#sam-badanie-akt").val(results.rows.item(i).badanie);
				$("#sam-ubezp-akt").val(results.rows.item(i).ubezpieczenie);
				window.localStorage.setItem("samNazwa", results.rows.item(i).nazwa);
		}
		
	}
		var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
		db.transaction(datyID, errorCB);
	
}
//KONIEC - Zmiana daty badania technicznego lub ubezpieczenia

//START - Zmiana daty badania technicznego lub ubezpieczenia
function aktualizujDaty() {

	function aktDaty(tx) {
		tx.executeSql('UPDATE SAMOCHODY set badanie = "' + $("#sam-badanie-akt").val() + '", ubezpieczenie = "' + $("#sam-ubezp-akt").val() + '" where id = ' + window.localStorage.getItem("samid"));
	
		var data1 = $('#sam-badanie-akt').val().split("-");
        var now = new Date();
        var d1 = new Date(parseInt(data1[0]), parseInt(data1[1]) - 1, parseInt(data1[2]), now.getHours(), now.getMinutes(), now.getSeconds()+15, now.getMilliseconds());

        var data2 = $('#sam-ubezp-akt').val().split("-");
        var d2 = new Date(parseInt(data2[0]), parseInt(data2[1]) - 1, parseInt(data2[2]), now.getHours(), now.getMinutes(), now.getSeconds()+35, now.getMilliseconds());

        cordova.plugins.notification.local.schedule({
            id: Math.floor((Math.random() * 1000000) + 1),
            title: "Badanie techniczne",
            text: "Następne badanie techniczne dla smochodu: "+window.localStorage.getItem("samNazwa")+", dnia: " + $('#sam-badanie-akt').val(),
            at: d1
        });

        cordova.plugins.notification.local.schedule({
            id: Math.floor((Math.random() * 1000000) + 1),
            title: "Ubezpieczenie",
            text: "Koniec ubezpieczenia dla smochodu: "+window.localStorage.getItem("samNazwa")+", dnia: " + $('#sam-ubezp-akt').val(),
            at: d2
        });
}

	$("#pinfo").html("");
	if (confirm('Czy na pewno chcesz zmienić daty?')) {
	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
    db.transaction(aktDaty, errorCB, successCB);
	}

	window.location.href = 'index.html#stronaglowna';
	
}
//KONIEC - Zmiana daty badania technicznego lub ubezpieczenia

//START - dodawanie danych o tankowaniu i trasie
function dodajTankowanie() {
	if($("#stacja-benz").val() == "" || $("#kilometry").val() == "" || $("#litry").val() == "" || $("#cena").val() == "" || $("#data-tankowania").val() == "") {
		alert("Wypełnij wszystkie pola!");
	} else {
		function dodajTank(tx) {
			tx.executeSql('INSERT INTO TANKOWANIA (samid, stacja, data_tankowania, cena, litry, kilometry) VALUES ("'+window.localStorage.getItem("samid")+'","'+$('#stacja-benz').val()+'","'+$('#data-tankowania').val()+'","'+$('#cena').val()+'","'+$('#litry').val()+'","'+$('#kilometry').val()+'")');
		}
		$("#pinfo").html("");
		var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
		db.transaction(dodajTank, errorCB, successCB);
		window.location.href = 'index.html#stronaglowna';
	}
}
//KONIEC - dodawanie danych o tankowaniu i trasie

function statystykiTankowania() {
	function tankowaniaID(tx) {
		tx.executeSql('SELECT * FROM TANKOWANIA where samid = '+window.localStorage.getItem("samid")+' order by id desc', [], querySuccess2, errorCB);
	}

	function querySuccess2(tx, results) {
		var len = results.rows.length;
			$('#tankstat').append("<table>");
			$('#tankstat').append("<thead><tr><th>Data</th><th>km</th><th>Stacja</th><th>Litry</th><th>Cena</th></tr></thead><tbody>")
			for (var i=0; i<len; i++){
				$('#tankstat').append("<tr><th>"+results.rows.item(i).data_tankowania+"</th><th>"+results.rows.item(i).kilometry+"</th><th>"+results.rows.item(i).stacja+"</th><th>"+results.rows.item(i).litry+"</th><th>"+results.rows.item(i).cena+"</th></tr>");
				$('#tankstat').append("<tr><th colspan=\"5\"><a class=\"ui-btn ui-corner-all\" onClick=\"usunDane("+results.rows.item(i).id+", 0)\">Usuń tankowanie</a></th></tr>");
				if(len > 1 && len-1 != i) {
					$("#tankstat").append("<hr/>");
				}
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
		if(len == 0) {
			alert("Nie masz dodanego żadnego tankowania...");
			window.location.href = 'index.html#tankowanie';
		} else {
			for (var i=0; i<len; i++){
				$('#tankstat').append("Suma km: "+results.rows.item(i).km);
				$('#tankstat').append("<br/>Suma litrów: "+results.rows.item(i).ltr);
				$('#tankstat').append("<br/>Średnia cena: "+Math.round(results.rows.item(i).cena * 100) / 100);
				$('#tankstat').append("<br/>Średnie spalanie: "+Math.round((results.rows.item(i).ltr*100)/results.rows.item(i).km*100)/100);
				$('#tankstat').append("<br/><br/>Wydane środki: "+Math.round(results.rows.item(i).ltr*results.rows.item(i).cena * 100)/100 + " zł");
				$('#tankstat').append("<br/><br/>")
		}
		}
	}

		var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
	db.transaction(tankowaniaID_SUMY, errorCB);

	statystykiTankowania();
}

function dodajNaprawe() {
	//alert($('#zrobiono').val())
	//alert(window.localStorage.getItem("samid")+","+$('#data-naprawy').val()+","+$('#zrobiono').val()+","+$('#przebiegkm').val()+","+$('#koszt').val());
	if($("#zrobiono").val() == "" || $("#przebiegkm").val() == "" || $("#koszt").val() == "" || $("#data-naprawy").val() == "") {
		alert("Wypełnij wszystkie pola!");
	} else {
	function dodajNapra(tx) {
		tx.executeSql('INSERT INTO NAPRAWY (samid, data_naprawy, zrobione, przebieg, koszt) VALUES ("'+window.localStorage.getItem("samid")+'","'+$('#data-naprawy').val()+'","'+$('#zrobiono').val()+'; '+$('#innerzeczy').val()+'","'+$('#przebiegkm').val()+'","'+$('#koszt').val()+'")');
	}
	$("#pinfo").html("");
	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
    db.transaction(dodajNapra, errorCB, successCB);
	window.location.href = 'index.html#stronaglowna';
	}
	
}

function statystykiNapraw() {
	$("#naprawastat").html("");
	$("#naprawastat").append("<h3>Statystyki napraw</h3>");
	function naprawyID(tx) {
		tx.executeSql('SELECT * FROM NAPRAWY where samid = '+window.localStorage.getItem("samid")+' order by id desc', [], querySuccess2na, errorCB);
	}

	function querySuccess2na(tx, results) {
		var len = results.rows.length;
		$('#naprawastat').html("");
		if(len == 0) {
			alert("Nie masz dodanej żadnej naprawy...");
			window.location.href = 'index.html#naprawa';
		} else {
			for (var i=0; i<len; i++){
				var str = results.rows.item(i).zrobione;
				var re = str.split(",").join(", ");
				str = str.replace(re, '');
				$("#naprawastat").append("<p>");
				$("#naprawastat").append("<b>Data naprawy:</b> " + results.rows.item(i).data_naprawy + "<br/>");
				$("#naprawastat").append("<b>Przebieg:</b> " + results.rows.item(i).przebieg + " km<br/>");
				$("#naprawastat").append("<b>Koszt:</b> " + results.rows.item(i).koszt + " zł<br/>");
				$("#naprawastat").append("<b>Co zrobiono:</b> " + re + "<br/>");
				$("#naprawastat").append("<a class=\"ui-btn ui-corner-all\" onClick=\"usunDane("+results.rows.item(i).id+", 1)\">Usuń naprawe</a>");
				$("#naprawastat").append("</p>");
				if(len > 1 && len-1 != i) {
					$("#naprawastat").append("<hr/>");
				}
		}
	}
	}

		var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
		db.transaction(naprawyID, errorCB);
}

function usunDane(idusun, cousuwam) {
	var id_usun = idusun;
	var co = cousuwam;

	function usunTo(tx) {
		if(co == 1) {
			tx.executeSql('DELETE FROM NAPRAWY where id = "' + id_usun + '"');
		} else {
			tx.executeSql('DELETE FROM TANKOWANIA where id = "' + id_usun + '"');
		}
	}
	$("#pinfo").html("");
	if (confirm('Czy na pewno chcesz to usunąć?')) {
	var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
    db.transaction(usunTo, errorCB, successCB);
	}
	window.location.href = 'index.html#stronaglowna';
}

