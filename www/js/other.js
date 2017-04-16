var text = 
    '<a href="#homepage" class="ui-btn">Moje samochody</a>';

$('#panel').html(text);
$('#panel-1').html(text);
$('#panel-2').html(text);
$('#panel-3').html(text);
$('#panel-4').html(text);
$('#panel-5').html(text);
$('#panel-6').html(text);

var wopcji1, wopcji2, wopcji3, wopcji4, wopcji5;


$( "#dodaj1" ).click(function() {
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
});  

$( "#dodaj2" ).click(function() {
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
});  

$( "#dodaj3" ).click(function() {
    wopcji2 = "<br>" + $("#opcja2 option:selected").text();
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
});

$( "#dodaj4" ).click(function() {
    $("#ptext").html("");
    wopcji3 = "<br>" + $("#opcja3 option:selected").text();
    var opcja4;
    $('#opcja4').html("");
    var pom = 1;
    $.ajax({
        url: "http://e123.linuxpl.eu/cars/index4.php?link=" + $( "#opcja3" ).val(),
        dataType: "JSON",
        success: function(json){
            
            if(json[0].nazwa == "samochod") {
                $("#ptext").append(wopcji1 + wopcji2 + wopcji3);
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
});

$( "#dodaj5" ).click(function() {
    $("#ptext").html("");
    wopcji4 = "<br>" + $("#opcja4 option:selected").text();
    var opcja5;
    $('#opcja5').html("");
    var pom = 1;
    $.ajax({
        url: "http://e123.linuxpl.eu/cars/index5.php?link=" + $( "#opcja4" ).val(),
        dataType: "JSON",
        success: function(json){
            
            if(json[0].nazwa == "samochod") {
                $("#ptext").append(wopcji1 + wopcji2 + wopcji3 + wopcji4);
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
});

$( "#dodaj6" ).click(function() {
    $("#ptext").html("");
    wopcji5 = "<br>" + $("#opcja5 option:selected").text();
    $.ajax({
        url: "http://e123.linuxpl.eu/cars/index6.php?link=" + $( "#opcja5" ).val(),
        dataType: "JSON",
        success: function(json){
            $("#ptext").append(wopcji1 + wopcji2 + wopcji3 + wopcji4 + wopcji5);
            window.location.href = 'index.html#podsumowanie';
            
        }
    })
});