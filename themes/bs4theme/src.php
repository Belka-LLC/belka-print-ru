<?php //src.php

$data_obj = file_get_contents('php://input');

// . . .

echo json_encode($data_obj);
?>
