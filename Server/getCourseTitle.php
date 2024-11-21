<?php 

    include "connection.php";
    
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, REQUEST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");


    $courseId = $_POST['courseId'] ?? null;
    
    if ($courseId === null) {
        http_response_code(400);
        echo json_encode(['error' => 'Course ID is required']);
        exit;
    }

    $query = $connection->prepare("select c.title from courses c where id = ?");
    $query->bind_param("s", $courseId);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0){
        $courseTitle = $result->fetch_assoc();

        echo json_encode(value: [
            "status" => "success",
            "message" => "get course successfully",
            "course_title"=> $courseTitle,
        ]);
    }
    else{
        echo json_encode([
            "status"=> "error",
            "message"=> "course title not found",
        ]);
    }

?>