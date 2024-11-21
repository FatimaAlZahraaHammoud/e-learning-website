<?php 

    include "connection.php";

    $course_id = $_POST["course_id"];

    $query = $connection->prepare("select title, content, created_at from announcements where course_id = ?");
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