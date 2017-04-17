var text = 
    '<a href="#stronaglowna" class="ui-btn">Moje samochody</a>';

$('#panel').html(text);
$('#panel-1').html(text);
$('#panel-2').html(text);
$('#panel-3').html(text);
$('#panel-4').html(text);
$('#panel-5').html(text);
$('#panel-6').html(text);
$('#panel-7').html(text);

var wopcji1, wopcji2, wopcji3, wopcji4, wopcji5;

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


$( "#dodaj1" ).click(function() {
    if(!sprawdzPolaczenie()) {
        window.location.href = 'index.html#stronaglowna';
        alert("Brak połączenia z siecią");
    } else {
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
            }
        })
    }
});  

$( "#dodaj2" ).click(function() {
    if(!sprawdzPolaczenie()) {
        window.location.href = 'index.html#stronaglowna';
        alert("Brak połączenia z siecią");
    } else {
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
            }
        })
    }
});  

$( "#dodaj3" ).click(function() {
    if(!sprawdzPolaczenie()) {
        window.location.href = 'index.html#stronaglowna';
        alert("Brak połączenia z siecią");
    } else {
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
            }
        })
    }
});

$( "#dodaj4" ).click(function() {
    if(!sprawdzPolaczenie()) {
        window.location.href = 'index.html#stronaglowna';
        alert("Brak połączenia z siecią");
    } else {
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
            
            }
        })
    }
});

$( "#dodaj5" ).click(function() {
    if(!sprawdzPolaczenie()) {
        window.location.href = 'index.html#stronaglowna';
        alert("Brak połączenia z siecią");
    } else {
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
            }
        })
    }
});

$( "#dodaj6" ).click(function() {
    if(!sprawdzPolaczenie()) {
        window.location.href = 'index.html#stronaglowna';
        alert("Brak połączenia z siecią");
    } else {
        $("#ptext").html("");
        wopcji5 = $("#opcja5 option:selected").text();
        $.ajax({
            url: "http://e123.linuxpl.eu/cars/index6.php?link=" + $( "#opcja5" ).val(),
            dataType: "JSON",
            success: function(json){
                $("#ptext").append(wopcji1 + "<br/>" + wopcji2 + "<br/>" + wopcji3 + "<br/>" + wopcji4 + "<br/>" + wopcji5);
                window.location.href = 'index.html#podsumowanie';
                
            }
        })
    }
});

$( "#dodaj7" ).click(function() {
    function dodajSamochod(tx) {
	    tx.executeSql('INSERT INTO SAMOCHODY (nazwa, opcja1, opcja2, opcja3, opcja4, opcja5, nrrejestracyjny, badanie, ubezpieczenie, link, pojemnosc, moc) VALUES ("nazwa", "'+wopcji1+'", "'+wopcji2+'", "'+wopcji3+'", "'+wopcji4+'", "'+wopcji5+'", "nr", "badanie", "ubezpieczenie", "link", "pojemnosc", "moc")');
    }

    var db = window.openDatabase("CarspensesDatabase", "1.0", "Carspenses", 200000);
    db.transaction(dodajSamochod, errorCB, successCB);

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }
   
    function successCB() {
    }
    
    db.transaction(wybierzSamochod, errorCB);
    window.location.href = 'index.html#stronaglowna';

});