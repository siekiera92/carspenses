<?php
    header('Content-type: application/json');
    include('simple_html_dom.php');

    //dane o cenach paliw pobierane są ze strony https://www.autocentrum.pl/paliwa/
    //następnie z drugiej i szóstej kolumny pobierane są dane o cenie PB i gazu
    $html = file_get_html('https://www.autocentrum.pl/paliwa/');
    $benzyna = array();
    $gaz = array();

    foreach($html->find('div[class="table_cell_sec"]') as $benzynas) {
        $benzyna[] = $benzynas->plaintext;
    }

    foreach($html->find('div[class="table_cell_sixth"]') as $gazs) {
        $gaz[] = $gazs->plaintext;
    }
    $all = array(array());
    $all[0]['pb'] = $benzyna[1];
    $all[0]['gaz'] = $gaz[1];
    

    //print_r($all);
    echo json_encode($all);

?>