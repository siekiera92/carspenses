<?php
    header('Content-type: application/json');
    include('simple_html_dom.php');

    $html = file_get_html('https://www.autocentrum.pl/'.$_GET['link'].'/');
    $car = array();
    $car_link = array();
    $type = array();
    $all = array(array());

    foreach($html->find('option[data-url$=""]') as $cars) {
        $car[] = $cars->plaintext;
        $car_link[] = $cars->getAttribute('data-url');
    }

    foreach($html->find('option[value="1"]') as $types) {
        $type[] = $types->plaintext;
    }

    $length = count($car);
    if($length == 0 || $type[0] == "Wybierz inny silnik") {
        //echo "Końcowy link: ".$_GET['link'];
        $all[0]['nazwa'] = "samochod";
        $all[0]['link'] = $_GET['link'];
    } else {
        for ($i = 0; $i < $length; $i++) {
            //echo "<a href=\"index6.php?link=".$car_link[$i]."\">".$car[$i]."</a><br/>";
            $all[$i]['nazwa'] = $car[$i];
            $all[$i]['link'] = $car_link[$i];
        }
    }

    //print_r($all);
    echo json_encode($all);

?>