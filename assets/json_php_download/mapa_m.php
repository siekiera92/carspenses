<?php
header('Content-type: application/json');
$homepage = file_get_contents("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=".$_GET['lat'].",".$_GET['long']."&radius=3000&types=car_wash&key=AIzaSyAmsLfjmwDgoIu6dYsoBPlMAFvjZop6hXA");
echo $homepage;
?>