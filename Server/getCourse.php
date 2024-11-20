<?php 

    include "connection.php";
    /*require "vendor/autoload.php";

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    $secretKey = ""*/

    $course_title = $_POST['course_title'] ?? null;

    $query = $connection->prepare("select * from courses where title = ?");
    $query->bind_param("s", $course_title);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0){
        $course = $result->fetch_assoc();

        echo json_encode([
            "status" => "success",
            "message" => "get course successfully",
            "course"=> $course,
        ]);
    }
    else{
        echo json_encode([
            "status"=> "error",
            "message"=> "course title not found",
        ]);
    }

?>