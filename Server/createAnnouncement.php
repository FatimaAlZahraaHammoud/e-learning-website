<?php 

    include "connection.php";
    include "./vendor/autoload.php";

    
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, REQUEST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");


    $title = $_POST["title"] ?? null;
    $content = $_POST["content"] ?? null;
    $course_id = $_POST["course_id"] ?? null;
    $currentDate = $_POST["currentDate"] ?? null;

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    $secretKey = "FatimaSecretKeyy";
    $headers = getallheaders();
    $jwt = $headers["Authorization"];

    $key = new Key($secretKey, "HS256");
    $payload = JWT::decode($jwt, $key);

    if ($payload->role !== "instructor") {
        http_response_code(401);

        echo json_encode([
        "message"=> "Unauthorized"
        ]);
        return;
    }

    $id = $payload->user_id;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'Instructor ID is required']);
        exit;
    }

    $query = $connection->prepare("insert into announcements (course_id, instructor_id, title, content, created_at) values (?, ?, ?, ?, ?)");
    $query->bind_param("iisss", $course_id, $id, $title, $content, $currentDate);

    if ($query->execute()) {
        echo json_encode([
            "status" => "success",
            "message"=> "Announcement added successfully!"
        ]);
    }
    else{
        echo json_encode([
            "status" => "error",
            "message"=> "Failed to add announcement."
        ]);
    }

    $query->close();
    $connection->close();
?>