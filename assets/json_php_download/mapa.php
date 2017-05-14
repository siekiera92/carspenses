<?php
header('Content-type: application/json');
//pobieram dane nt. stacji benzynowych gas_statnion
$homepage = file_get_contents("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=".$_GET['lat'].",".$_GET['long']."&radius=3000&types=gas_station&key=AIzaSyAmsLfjmwDgoIu6dYsoBPlMAFvjZop6hXA");
echo $homepage;
?>