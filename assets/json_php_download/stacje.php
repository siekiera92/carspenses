<?php
header('Content-type: application/json');
$homepage = file_get_contents("https://maps.googleapis.com/maps/api/distancematrix/json?origins=".$_GET['lat'].",".$_GET['long']."&destinations=".$_GET['dlat'].",".$_GET['dlong']."&mode=driving&key=AIzaSyALi3hXU0LUN6hoBYrkIMYc6qxgbVLymE4");
$test = json_decode($homepage, true);
//$test->{'nazwa'} = 'statoil';
$test['nazwa'] = $_GET['stacja'];
$test['lat'] = $_GET['dlat'];
$test['long'] = $_GET['dlong'];
echo json_encode($test);
?>