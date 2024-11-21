<?php 

    include "connection.php";

    
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, REQUEST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");


    $course_id = $_POST["course_id"];

    $query = $connection->prepare("select id, title, content, created_at from announcements where course_id = ?");
    $query->bind_param("i", $course_id);
    $query->execute();
    $result = $query->get_result();

    $announcements = [];
    if ($result->num_rows > 0) {
        while ($announcement = $result->fetch_assoc()) {
            $announcements[] = $announcement;
        }

        echo json_encode([
            "status" => "success",
            "message"=> "get announcements successfully",
            "announcements"=> $announcements
        ]);
    }
    else{
        echo json_encode([
            "status"=> "error",
            "message"=> "error getting announcements"
        ]);
    }
?>