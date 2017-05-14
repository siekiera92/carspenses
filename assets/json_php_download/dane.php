<?php
    header('Content-type: application/json');
    include('simple_html_dom.php');

    //w parametrze podawane są wszystki dane dotyczące samochodu zgodnie z nazewnictwem na stronie autocentrum.pl
    //np. renault/clio/iii/grandtour/silnik-benzynowy-1.2tce-eco2-100km-2009-2010/
    $html = file_get_html('https://www.autocentrum.pl/dane-techniczne/'.$_GET['link'].'/');
    $car = array();
    $car_link = array();
    $all = array(array());

    //wybieram wszyskie elementy z klasą dt-row
    foreach($html->find('div[class="dt-row"]') as $cars) {
        $b = $cars->plaintext;

        if (strpos($b, 'skokowa') !== false) {
            $a = explode("skokowa", $b);
            $all[0]['pojemnosc'] = trim($a[1]);
        }
    }

    //następnie pobieram informacje o spalaniu
    foreach($html->find('a[class="dt-row rank"]') as $cars) {
        $b = $cars->plaintext;
        $car[] = $b;

        if (strpos($b, 'Moc silnika') !== false) {
            $a = explode("silnika", $b);
            $a = explode("KM", $a[1]);
            $all[0]['moc'] = trim($a[0]);
        }

        if (strpos($b, 'spalanie (cykl mieszany)') !== false) {
            $a = explode("mieszany)", $b);
            $all[0]['spalanie_mieszany'] = trim($a[1]);
        }

        if (strpos($b, 'w trasie (na autostradzie)') !== false) {
            $a = explode("w trasie (na autostradzie)", $b);
            $all[0]['spalanie_trasa'] = trim($a[1]);
        }

        if (strpos($b, 'Spalanie w mie') !== false) {
            $a = explode("Spalanie w mie", $b);
            $a = explode("cie", $a[1]);
            $all[0]['spalanie_miasto'] = trim($a[1]);
        }
    }

   

    //print_r($all);
    echo json_encode($all);

?>