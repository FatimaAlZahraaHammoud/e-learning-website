<?php 

    include "connection.php";

    $course_id = $_POST["course_id"];

    $query = $connection->prepare("select * from syllabus_topics where course_id = ?");
    $query->bind_param("i", $course_id);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0) {
        $syllabus = $result->fetch_assoc();

        echo json_encode([
            "status" => "success",
            "message" => "get syllabus topics successfully",
            "syllabus" => $syllabus
        ]);
    }
    else{
        echo json_encode([
            "status"=> "error",
            "message"=> "no syllabus found for the course"
        ]);
    }
?>