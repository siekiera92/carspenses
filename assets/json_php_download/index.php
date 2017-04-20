<?php
include('simple_html_dom.php');
 
if(isset($_GET['car'])) {

    if(isset($_GET['model'])) {

        if(isset($_GET['version'])) {

            //silniki
            if($_GET['version'] == "brak") {
                echo $_GET['engine'];
            } else {

                if(isset($_GET['engine'])) {
                    echo $_GET['engine'];
                } else {

                    $html = file_get_html('https://www.autocentrum.pl/'.$_GET['version'].'/');
                    $engine = array();
                    $engine_link = array();

                    foreach($html->find('option[data-url$=""]') as $engines) {
                        $engine_link[] = $engines->getAttribute('data-url');
                        $engine[] = $engines->plaintext;
                    }

                    $length = count($engine);
                    for ($i = 0; $i < $length; $i++) {
                        echo "<a href=\"index.php?car=".$_GET['car']."&model=".$_GET['model']."&version=".$_GET['version']."&engine=".$engine_link[$i]."\">".$engine[$i]."</a><br/>";
                    }

                }

            }
            //silniki
        
        } else {

            //wersje samochodow
            $html = file_get_html('https://www.autocentrum.pl/'.$_GET['model'].'/');
            $version = array();
            $version_link = array();

            foreach($html->find('option[value="1"]') as $versions) {
                $version[] = $versions->plaintext;
                $version_link[] = $versions->getAttribute('data-url');
            }

            if($version[0] == "Wybierz generacje") {

                //jezeli jest model
                foreach($html->find('option[data-url$=""]') as $versions) {
                    $version_link[] = $versions->getAttribute('data-url');
                    $version[] = $versions->plaintext;
                }

                $length = count($version);
                for ($i = 1; $i < $length; $i++) {
                    echo "<a href=\"index.php?car=".$_GET['car']."&model=".$_GET['model']."&version=".$version_link[$i]."\">".$version[$i]."</a><br/>";
                }
                //jezeli jest model

            } elseif($version[0] == "Wybierz nadwozie") {
                
                //jezeli jest nadwozie
                foreach($html->find('option[data-url$=""]') as $versions) {
                    $version_link[] = $versions->getAttribute('data-url');
                    $version[] = $versions->plaintext;
                }

                $length = count($version);
                for ($i = 1; $i < $length; $i++) {
                    echo "<a href=\"index.php?car=".$_GET['car']."&model=".$_GET['model']."&version=".$version_link[$i]."\">".$version[$i]."</a><br/>";
                }
                //jezeli jest nadwozie

            } else {

                //jezeli nie ma modelu
                foreach($html->find('option[data-url$=""]') as $versions) {
                    $version[] = $versions->plaintext;
                    $version_link[] = $versions->getAttribute('data-url');
                }
                $length = count($version);
                for ($i = 1; $i < $length; $i++) {
                    echo "<a href=\"index.php?car=".$_GET['car']."&model=".$_GET['model']."&version=brak&engine=".$version_link[$i]."\">".$version[$i]."</a><br/>";
                }
                //jezeli nie ma modelu
                
            }
            //wersje samochodow

        }

    } else {

        //modele samochodow
        $html = file_get_html('https://www.autocentrum.pl/'.$_GET['car'].'/');
        $model = array();
        $model_link = array();

        foreach($html->find('option') as $models) {
            $model[] = $models->plaintext;
            $model_link[] = $models->getAttribute('data-url');
        }

        $length = count($model);
        for ($i = 1; $i < $length; $i++) {
            echo "<a href=\"index.php?car=".$_GET['car']."&model=".$model_link[$i]."\">".$model[$i]."</a><br/>";
        }
        //modele samochodow

    }

} else {

    //marki samochodow
    $html = file_get_html('https://www.autocentrum.pl/auta/');
    $car = array();
    $car_link = array();

    foreach($html->find('option') as $cars) {
        $car[] = $cars->plaintext;
        $car_link[] = $cars->getAttribute('data-url');
    }

    $length = count($car);
    for ($i = 1; $i < $length; $i++) {
        echo "<a href=\"index.php?car=".$car_link[$i]."\">".$car[$i]."</a><br/>";
    }
    //marki samochodow



}

?>