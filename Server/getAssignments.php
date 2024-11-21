<?php 

    include "connection.php";

    
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, REQUEST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");


    $course_id = $_GET["course_id"];

    $query = $connection->prepare("select title, description, due_date, created_at created_at from assignments where course_id = ?");
    $query->bind_param("i", $course_id);
    $query->execute();
    $result = $query->get_result();

    $assignments = [];
    if ($result->num_rows > 0) {
        while ($assignment = $result->fetch_assoc()) {
            $assignments[] = $assignment;
        }

        echo json_encode([
            "status" => "success",
            "message"=> "get assignments successfully",
            "assignments"=> $assignments
        ]);
    }
    else{
        echo json_encode([
            "status"=> "error",
            "message"=> "error getting assignments"
        ]);
    }
?>