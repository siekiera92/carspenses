var wopcji1, wopcji2, wopcji3, wopcji4, wopcji5, wlink, spalanie_miasto, spalanie_mieszane, spalanie_trasa, sam_moc, sam_poj, pm2, nazwastacji;

$("#spin").spinner();

//SPRAWDZANIE POŁĄCZENIA WIFI
function sprawdzPolaczenie() {
    var networkState = navigator.connection.type;
    var states = {};

    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
 
    if(states[networkState] == "WiFi connection" || states[networkState] == "Cell 3G connection" || states[networkState] == "Cell 4G connection" ) {
        return true;
    }

    return false;
}
//SPRAWDZANIE POŁĄCZENIA WIFI

//POBIERANIE DANYCH O MARKACH
$( "#dodaj1" ).click(function() {
    if(!sprawdzPolaczenie()) {
        $("#spin").hide();
        alert("Brak połączenia z siecią");
        window.location.href = 'index.html#stronaglowna';
    } else {
        $("#spin").show();
        var opcja1;
        $('#opcja1').html("");
        $('#opcja1').append('<option val="0" selected>Wybierz</option>');
        $.ajax({
            url: "http://e123.linuxpl.eu/cars/index1.php",
            dataType: "JSON",
            success: function(json){
                for(var i=0;i<json.length;i++){
                $('#opcja1').append(json[i].nazwa)
                
                opcja1 = new Option(json[i].link, json[i].link);
                $(opcja1).html(json[i].nazwa);
                $("#opcja1").append(opcja1);
            }
            },
            complete: function (json) {
            $("#spin").hide();
            }
        })
    }
});
//POBIERANIE DANYCH O MARKACH

//POBIERANIE INFORMACJI O MODELU
$( "#dodaj2" ).click(function() {
    if(!sprawdzPolaczenie()) {
        $("#spin").hide();
        alert("Brak połączenia z siecią");
        window.location.href = 'index.html#stronaglowna';
    } else {
        $("#spin").show();
        wopcji1 = $("#opcja1 option:selected").text();
        var opcja2;
        $('#opcja2').html("");
        $('#opcja2').append('<option val="0" selected>Wybierz</option>');
        $.ajax({
            url: "http://e123.linuxpl.eu/cars/index2.php?link=" + $( "#opcja1" ).val(),
            dataType: "JSON",
            success: function(json){
                for(var i=0;i<json.length;i++){
                
                opcja2 = new Option(json[i].link, json[i].link);
                $(opcja2).html(json[i].nazwa);
                $("#opcja2").append(opcja2);
                }
            window.location.href = 'index.html#wyboropcji2';
            },
            complete: function (json) {
            $("#spin").hide();
            }
        })
    }
}); 
//POBIERANIE INFORMACJI O MODELU

//POBIERANIE DALSZYCH INFORMACJI 1 - MOZE TO BYĆ TYP NADWOZIA, ROCZNIK, SILNIK ITP. ZALEZNE OD AUTOCENTRUM.PL
//OPCJA 3 ZAWSZE JEST
$( "#dodaj3" ).click(function() {
    if(!sprawdzPolaczenie()) {
        $("#spin").hide();
        alert("Brak połączenia z siecią");
        window.location.href = 'index.html#stronaglowna';
    } else {
        $("#spin").show();
        wopcji2 = $("#opcja2 option:selected").text();
        var opcja3;
        $('#opcja3').html("");
        $('#opcja3').append('<option val="0" selected>Wybierz</option>');
        $.ajax({
            url: "http://e123.linuxpl.eu/cars/index3.php?link=" + $( "#opcja2" ).val(),
            dataType: "JSON",
            success: function(json){
                for(var i=0;i<json.length;i++){
                
                opcja3 = new Option(json[i].link, json[i].link);
                $(opcja3).html(json[i].nazwa);
                $("#opcja3").append(opcja3);
            }
            window.location.href = 'index.html#wyboropcji3';
            },
            complete: function (json) {
            $("#spin").hide();
            }
        })
    }
});
//POBIERANIE DALSZYCH INFORMACJI 1 - MOZE TO BYĆ TYP NADWOZIA, ROCZNIK, SILNIK ITP. ZALEZNE OD AUTOCENTRUM.PL
//OPCJA 3 ZAWSZE JEST

//POBIERANIE DALSZYCH INFORMACJI 2 - MOZE TO BYĆ TYP NADWOZIA, ROCZNIK, SILNIK ITP. ZALEZNE OD AUTOCENTRUM.PL
//OPCJA 4 NIE ZAWSZE JEST. JEZELI ZWRACA SAMOCHOD W JSON TO ZNACZY ZE JEST TO KONCOWA INFORMACJA
$( "#dodaj4" ).click(function() {
    if(!sprawdzPolaczenie()) {
        $("#spin").hide();
        alert("Brak połączenia z siecią");
        window.location.href = 'index.html#stronaglowna';
    } else {
        $("#spin").show();
        $("#ptext").html("");
        wopcji3 = $("#opcja3 option:selected").text();
        var opcja4;
        $('#opcja4').html("");
        var pom = 1;
        $.ajax({
            url: "http://e123.linuxpl.eu/cars/index4.php?link=" + $( "#opcja3" ).val(),
            dataType: "JSON",
            success: function(json){
                
                if(json[0].nazwa == "samochod") {
                    $("#ptext").append(wopcji1 + "<br/>" + wopcji2 + "<br/>" + wopcji3);
                    window.location.href = 'index.html#podsumowanie';
                    wlink = $( "#opcja3" ).val()
                } else {
                for(var i=0;i<json.length;i++){
                    if(pom == 1) {
                        $('#opcja4').append('<option val="0" selected>Wybierz</option>');
                        pom = 0;
                    }

                    opcja4 = new Option(json[i].link, json[i].link);
                    $(opcja4).html(json[i].nazwa);
                    $("#opcja4").append(opcja4);
                }
                window.location.href = 'index.html#wyboropcji4';
            }
            
            },
            complete: function (json) {
            $("#spin").hide();
            }
        })
    }
});
//POBIERANIE DALSZYCH INFORMACJI 2 - MOZE TO BYĆ TYP NADWOZIA, ROCZNIK, SILNIK ITP. ZALEZNE OD AUTOCENTRUM.PL
//OPCJA 4 NIE ZAWSZE JEST. JEZELI ZWRACA SAMOCHOD W JSON TO ZNACZY ZE JEST TO KONCOWA INFORMACJA

//POBIERANIE DALSZYCH INFORMACJI 3 - MOZE TO BYĆ TYP NADWOZIA, ROCZNIK, SILNIK ITP. ZALEZNE OD AUTOCENTRUM.PL
//OPCJA 5 NIE ZAWSZE JEST. JEZELI ZWRACA SAMOCHOD W JSON TO ZNACZY ZE JEST TO KONCOWA INFORMACJA
$( "#dodaj5" ).click(function() {
    if(!sprawdzPolaczenie()) {
        $("#spin").hide();
        alert("Brak połączenia z siecią");
        window.location.href = 'index.html#stronaglowna';
        
    } else {
        $("#spin").show();
        $("#ptext").html("");
        wopcji4 = $("#opcja4 option:selected").text();
        var opcja5;
        $('#opcja5').html("");
        var pom = 1;
        $.ajax({
            url: "http://e123.linuxpl.eu/cars/index5.php?link=" + $( "#opcja4" ).val(),
            dataType: "JSON",
            success: function(json){
                
                if(json[0].nazwa == "samochod") {
                    $("#ptext").append(wopcji1 + "<br/>" + wopcji2 + "<br/>" + wopcji3 + "<br/>" + wopcji4);
                    window.location.href = 'index.html#podsumowanie';
                    wlink = $( "#opcja4" ).val();
                } else {
                    for(var i=0;i<json.length;i++){
                    if(pom == 1) {
                        $('#opcja5').append('<option val="0" selected>Wybierz</option>');
                        pom = 0;
                    }

                    opcja5 = new Option(json[i].link, json[i].link);
                    $(opcja5).html(json[i].nazwa);
                    $("#opcja5").append(opcja5);
                }
                    window.location.href = 'index.html#wyboropcji5';
                }
            },
            complete: function (json) {
            $("#spin").hide();
            }
        })
    }
});
//POBIERANIE DALSZYCH INFORMACJI 3 - MOZE TO BYĆ TYP NADWOZIA, ROCZNIK, SILNIK ITP. ZALEZNE OD AUTOCENTRUM.PL
//OPCJA 5 NIE ZAWSZE JEST. JEZELI ZWRACA SAMOCHOD W JSON TO ZNACZY ZE JEST TO KONCOWA INFORMACJA

//PRZECHODZI DO PODSUMOWANIA, OSTATNI ETAP WYBORU
$( "#dodaj6" ).click(function() {
    if(!sprawdzPolaczenie()) {
        alert("Brak połączenia z siecią");
        $("#spin").hide();
        window.location.href = 'index.html#stronaglowna';
    } else {
        $("#spin").show();
        $("#ptext").html("");
        wopcji5 = $("#opcja5 option:selected").text();
        $.ajax({
            url: "http://e123.linuxpl.eu/cars/index6.php?link=" + $( "#opcja5" ).val(),
            dataType: "JSON",
            success: function(json){
                $("#ptext").append(wopcji1 + "<br/>" + wopcji2 + "<br/>" + wopcji3 + "<br/>" + wopcji4 + "<br/>" + wopcji5);
                wlink = $( "#opcja5" ).val()
                window.location.href = 'index.html#podsumowanie';
                
            },
            complete: function (json) {
            $("#spin").hide();
            }
        })
    }
});
//PRZECHODZI DO PODSUMOWANIA, OSTATNI ETAP WYBORU

//PO WPISANIU DANYCH W PODSUMOWANIU, FUNKCJA WYWYOŁYWANA PO PRZYCISKU, WYWOŁUJE FUNKCJE DODATKOWE INFO GDZIE DOŁĄCZANE SĄ DALESZE INFORMACJE
//POBIERA SZCZEGÓŁOWE DANE O SAMOCHODZIE, TAKIE JAK SPALANIE, KM, POJEMNOSC
function dodajWpis() {
    if($("#sam-nazwa").val() == "" || $("#sam-badanie").val() == "" || $("#sam-nrrej").val() == "" || $("#sam-ubezp").val() == "") {
        alert("Wypełnij wszystkie pola!")
    } else {
    $("#spin").show();
    $.ajax({
            url: "http://e123.linuxpl.eu/cars/dane.php?link=" + wlink,
            dataType: "JSON",
            success: function(json){
                for(var i=0;i<json.length;i++){
                    spalanie_miasto = json[i].spalanie_miasto;
                    spalanie_mieszane = json[i].spalanie_mieszany;
                    spalanie_trasa = json[i].spalanie_trasa;
                    sam_moc = json[i].moc;
                    sam_poj = json[i].pojemnosc;

                    dodatkoweInfo(wlink,spalanie_miasto,spalanie_mieszane,spalanie_trasa,sam_moc,sam_poj);
                    window.location.href = 'index.html#stronaglowna';
                }
                
            },
            complete: function (json) {
            $("#spin").hide();
            }
        })
    }
};
//PO WPISANIU DANYCH W PODSUMOWANIU, FUNKCJA WYWYOŁYWANA PO PRZYCISKU, WYWOŁUJE FUNKCJE DODATKOWE INFO GDZIE DOŁĄCZANE SĄ DALESZE INFORMACJE
//POBIERA SZCZEGÓŁOWE DANE O SAMOCHODZIE, TAKIE JAK SPALANIE, KM, POJEMNOSC

//WSTAWIA INFORMACJE DO BAZY, CZYSCI POLA, DODAJE POWIADOMIENIA
function dodatkoweInfo(dlink, dspalaniem, dspalaniem2, dspalaniet, dmoc, dpoj) {
    $("#spin").show();
    function dodajSamochod(tx) {
	    tx.executeSql('INSERT INTO SAMOCHODY (nazwa, opcja1, opcja2, opcja3, opcja4, opcja5, nrrejestracyjny, badanie, ubezpieczenie, link, pojemnosc, moc, spal_miasto, spal_mieszane, spal_trasa) VALUES ("'+$('#sam-nazwa').val()+'", "'+wopcji1+'", "'+wopcji2+'", "'+wopcji3+'", "'+wopcji4+'", "'+wopcji5+'", "'+$('#sam-nrrej').val()+'", "'+$('#sam-badanie').val()+'", "'+$('#sam-ubezp').val()+'", "'+dlink+'", "'+dpoj+'", "'+dmoc+'", "'+dspalaniem+'", "'+dspalaniem2+'", "'+dspalaniet+'")');
        
        var data1 = $('#sam-badanie').val().split("-");
        var now = new Date();
        var d1 = new Date(parseInt(data1[0]), parseInt(data1[1]) - 1, parseInt(data1[2]), now.getHours(), now.getMinutes(), now.getSeconds()+15, now.getMilliseconds());

        var data2 = $('#sam-ubezp').val().split("-");
        var d2 = new Date(parseInt(data2[0]), parseInt(data2[1]) - 1, parseInt(data2[2]), now.getHours(), now.getMinutes(), now.getSeconds()+35, now.getMilliseconds());

        cordova.plugins.notification.local.schedule({
            id: Math.floor((Math.random() * 1000000) + 1),
            title: "Badanie techniczne",
            text: "Następne badanie techniczne dla smochodu: "+$('#sam-nazwa').val()+", dnia: " + $('#sam-badanie').val(),
            at: d1
        });

        cordova.plugins.notification.local.schedule({
            id: Math.floor((Math.random() * 1000000) + 1),
            title: "Ubezpieczenie",
            text: "Koniec ubezpieczenia dla smochodu: "+$('#sam-nazwa').val()+", dnia: " + $('#sam-ubezp').val(),
            at: d2
        });

        $("#sam-nazwa").val("");
        $("#sam-nrrej").val("");
        $("#sam-badanie").val("");
        $("#sam-ubezp").val("");

    }

    var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
    db.transaction(dodajSamochod, errorCB, successCB);
    
}
//WSTAWIA INFORMACJE DO BAZY, CZYSCI POLA, DODAJE POWIADOMIENIA

//AUTOMATYCZNA LOKALIZACJA STACJI PRZY DODAWANIU TANKOWANIA
function selectGEO() {
    if(!sprawdzPolaczenie()) {
        $("#spin").hide();
        alert("Brak połączenia z siecią");
        
    } else {
var onSuccessGEO = function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var pm = 1;
    var odleglosc, nazwastacji;
    $.ajax({
                  
            url: "http://e123.linuxpl.eu/cars/mapa.php?lat="+lat+"&long="+long,
            dataType: "JSON",
            success: function(json1){
                for(var i=0;i<json1.results.length;i++){
                    //alert(json.results[i].name+": "+json.results[i].geometry.location.lat+": "+json.results[i].geometry.location.lng);
                    
                    
                    //alert(json1.results[i].geometry.location.lat+" "+json1.results[i].geometry.location.lng);
                    $.ajax({
                  
                        url: "http://e123.linuxpl.eu/cars/stacje.php?lat="+lat+"&long="+long+"&dlat="+json1.results[i].geometry.location.lat+"&dlong="+json1.results[i].geometry.location.lng+"&stacja="+json1.results[i].name,
                        dataType: "JSON",
                        success: function(json){
                            
                            for(var a=0;a<json.rows.length;a++){
                                if(pm == 1) {
                                    odleglosc = json.rows[a].elements[a].distance.value;
                                    nazwastacji = json.nazwa;
                                    pm = 0;
                                } else {
                                    if(odleglosc > json.rows[a].elements[a].distance.value) {
                                        odleglosc = json.rows[a].elements[a].distance.value;
                                        nazwastacji = json.nazwa;
                                    }
                                }
                                
                                    $('#stacja-benz').val(nazwastacji);
                               
                            }
                            
                        }
                    })

                    //
                }
            },
            complete: function (json1) {
            $("#spin").hide();
            }
        })
    };
 
    function onErrorGEO(error) {
        $("#spin").hide();
       alert("Błąd GPS!");
    }
    $("#spin").show();
    navigator.geolocation.getCurrentPosition(onSuccessGEO, onErrorGEO, { timeout: 15000, enableHighAccuracy: true });
    }
}
//AUTOMATYCZNA LOKALIZACJA STACJI PRZY DODAWANIU TANKOWANIA

//POBIERANIE CEN BENZYNY I GAZU Z AUTOCENTRUM.PL
function pobierzCenyBenzyny() {
    $("#obliczenia").html("");
    if(!sprawdzPolaczenie()) {
        $("#spin").hide();
        alert("Brak połączenia z siecią");
        window.location.href = 'index.html#stronaglowna';
        
    } else {
        $("#przebieg").val("");
        $("#spin").show();
    $.ajax({
            url: "http://e123.linuxpl.eu/cars/cenypaliw.php",
            dataType: "JSON",
            success: function(json){
                for(var i=0;i<json.length;i++){
                    var pb = json[i].pb;
                    var gaz = json[i].gaz;
                    $('#cenabenzyny').val(parseFloat(pb.replace(",", ".")));
                    $('#cenagazu').val(parseFloat(gaz.replace(",", ".")));
                    var mysplit = window.localStorage.getItem("spalanie");
                    var myarr = mysplit.split(" l/");
                    
                    if(window.localStorage.getItem("samid") != "undefined") {
                      $("#ilena100").val(parseFloat(myarr[0].replace(",", ".")))
                      $("#ilena100gaz").val(parseFloat(myarr[0].replace(",", "."))+3)
                      $("#cenainstalacji").val(2700)
                    }
                    
                    
                }
                
            },
            complete: function (json) {
            $("#spin").hide();
            }
        })
    }
};
//POBIERANIE CEN BENZYNY I GAZU Z AUTOCENTRUM.PL

//WYKONYWANIE WYLICZEŃ W KALKULATORZE
function przeliczGaz() {
    if($("#cenabenzyny").val() == "" || $("#cenagazu").val() == "" || $("#ilena100").val() == "" || $("#ilena100gaz").val() == "" || $("#przebieg").val() == "" || $("#cenainstalacji").val() == "") {
        alert("Wypełnij wszystkie pola!");
    } else {
    $("#obliczenia").html("");
    var cenapb = $('#cenabenzyny').val();
    var przebieg = $('#przebieg').val();
    var cenagaz = $('#cenagazu').val();
    var ilena100 = $('#ilena100').val();
    var ilena100gaz = $('#ilena100gaz').val();
    var cenainstalacji = $('#cenainstalacji').val();
    var mscoszcz = Math.round((((ilena100 * przebieg / 100) * cenapb) - ((ilena100gaz * przebieg / 100) * cenagaz))*100)/100;
    $("#obliczenia").append("Miesięczne zużycie benzyny: " + Math.round((ilena100 * przebieg / 100)*100)/100);
    $("#obliczenia").append("<br/>Miesięczne zużycie gazu: " + Math.round((ilena100gaz * przebieg / 100)*100)/100);
    $("#obliczenia").append("<br/>Miesięczne oszczędności: " + mscoszcz);
    $("#obliczenia").append("<br/>Zwrot po (ile miesięcy): " + Math.round(cenainstalacji / mscoszcz));
    }
}
//WYKONYWANIE WYLICZEŃ W KALKULATORZE

//WYSZUKIWANIE NAJBLIZSZEJ STACJI BENZYNOWEJ
function znajdzStacjeBenz() {
    if(!sprawdzPolaczenie()) {
        $("#spin").hide();
        alert("Brak połączenia z siecią");
        window.location.href = 'index.html#stronaglowna';
        
    } else {
//stacje benzynowe
var onSuccessGEO2 = function(position) {
    
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    $("#lstacje").html("");
    $.ajax({
                  
            url: "http://e123.linuxpl.eu/cars/mapa.php?lat="+lat+"&long="+long,
            dataType: "JSON",
            success: function(json1){
                
                for(var i=0;i<json1.results.length;i++){
                    //alert(lat+" "+long+" "+json1.results[i].geometry.location.lat+" "+json1.results[i].geometry.location.lng+" "+json1.results[i].name);
                     $.ajax({
                     
                        url: "http://e123.linuxpl.eu/cars/stacje.php?lat="+lat+"&long="+long+"&dlat="+json1.results[i].geometry.location.lat+"&dlong="+json1.results[i].geometry.location.lng+"&stacja="+json1.results[i].name,
                        dataType: "JSON",
                        success: function(json){
                            //alert(json.rows.length);
                            for(var a=0;a<json.rows.length;a++){
                                    odleglosc = json.rows[a].elements[a].distance.value;
                                    nazwastacji = json.nazwa;
                                    $("#lstacje").append("<a href=\"http://maps.google.com/maps?saddr="+lat+","+long+"&daddr="+json.lat+", "+json.long+"\" class=\"ui-btn ui-corner-all\">"+json.nazwa+": "+json.rows[a].elements[a].distance.text+" ("+json.rows[a].elements[a].duration.text+")</a>");
                       
                               
                            }
                            
                        }
                    })
                    //
                }
            },
            complete: function (json1) {
            $("#spin").hide();
            }
        })
}
    };
 
    function onErrorGEO2(error) {
        $("#spin").hide();
        alert("Błąd GPS!");
        window.location.href = 'index.html#stronaglowna';
    }
    $("#spin").show();
    navigator.geolocation.getCurrentPosition(onSuccessGEO2, onErrorGEO2, { timeout: 15000, enableHighAccuracy: true });

}
//WYSZUKIWANIE NAJBLIZSZEJ STACJI BENZYNOWEJ

//WYSZUKIWANIE NAJBLIZSZEGO WARSZTATU
function znajdzWarsztaty() {
    if(!sprawdzPolaczenie()) {
        $("#spin").hide();
        alert("Brak połączenia z siecią");
        window.location.href = 'index.html#stronaglowna';
        
    } else {
//warsztaty
var onSuccessGEO3 = function(position) {
    
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    $.ajax({
                  
            url: "http://e123.linuxpl.eu/cars/mapa_w.php?lat="+lat+"&long="+long,
            dataType: "JSON",
            success: function(json1){
                for(var i=0;i<json1.results.length;i++){
                     $.ajax({
                  
                        url: "http://e123.linuxpl.eu/cars/stacje.php?lat="+lat+"&long="+long+"&dlat="+json1.results[i].geometry.location.lat+"&dlong="+json1.results[i].geometry.location.lng+"&stacja="+json1.results[i].name,
                        dataType: "JSON",
                        success: function(json){
                            
                            for(var a=0;a<json.rows.length;a++){
                                    odleglosc = json.rows[a].elements[a].distance.value;
                                    nazwastacji = json.nazwa;
                                    $("#lwarsztaty").append("<a href=\"http://maps.google.com/maps?saddr="+lat+","+long+"&daddr="+json.lat+", "+json.long+"\" class=\"ui-btn ui-corner-all\">"+json.nazwa+": "+json.rows[a].elements[a].distance.text+" ("+json.rows[a].elements[a].duration.text+")</a>");
                       
                               
                            }
                            
                        }
                    })
                    //
                }
            },
            complete: function (json1) {
            $("#spin").hide();
            }
        })
}
    };
 
    function onErrorGEO3(error) {
        $("#spin").hide();
        alert("Błąd GPS!");
        window.location.href = 'index.html#stronaglowna';
    }
   $("#spin").show();
   navigator.geolocation.getCurrentPosition(onSuccessGEO3, onErrorGEO3, { timeout: 15000, enableHighAccuracy: true });
}
//WYSZUKIWANIE NAJBLIZSZEGO WARSZTATU

//WYSZUKIWANIE NAJBLIZSZEJ MYJNI
function znajdzMyjnie() {
    if(!sprawdzPolaczenie()) {
        $("#spin").hide();
        alert("Brak połączenia z siecią");
        window.location.href = 'index.html#stronaglowna';
        
    } else {
var onSuccessGEO4 = function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    $("#lmyjnie").html("");
    $.ajax({
                  
            url: "http://e123.linuxpl.eu/cars/mapa_m.php?lat="+lat+"&long="+long,
            dataType: "JSON",
            success: function(json1){
                for(var i=0;i<json1.results.length;i++){
                     $.ajax({
                  
                        url: "http://e123.linuxpl.eu/cars/stacje.php?lat="+lat+"&long="+long+"&dlat="+json1.results[i].geometry.location.lat+"&dlong="+json1.results[i].geometry.location.lng+"&stacja="+json1.results[i].name,
                        dataType: "JSON",
                        success: function(json){
                            
                            for(var a=0;a<json.rows.length;a++){
                                    odleglosc = json.rows[a].elements[a].distance.value;
                                    nazwastacji = json.nazwa;
                                    $("#lmyjnie").append("<a href=\"http://maps.google.com/maps?saddr="+lat+","+long+"&daddr="+json.lat+", "+json.long+"\" class=\"ui-btn ui-corner-all\">"+json.nazwa+": "+json.rows[a].elements[a].distance.text+" ("+json.rows[a].elements[a].duration.text+")</a>");
                       
                               
                            }
                            
                        }
                    })
                    //
                }
            },
            complete: function (json1) {
            $("#spin").hide();
            }
        })
        
    };
 
    function onErrorGEO4(error) {
        $("#spin").hide();
        alert("Błąd GPS!");
        window.location.href = 'index.html#stronaglowna';
    }
    $("#spin").show();
    navigator.geolocation.getCurrentPosition(onSuccessGEO4, onErrorGEO4, { timeout: 15000, enableHighAccuracy: true });
    }
}
//WYSZUKIWANIE NAJBLIZSZEJ MYJNI