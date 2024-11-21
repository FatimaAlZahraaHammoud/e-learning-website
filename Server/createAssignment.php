<?php 

    include "connection.php";
    include "./vendor/autoload.php";

    
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, REQUEST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    $title = $_POST["title"];
    $description = $_POST["description"];
    $dueDate = $_POST["dueDate"];
    $course_id = $_POST["course_id"];
    $curentDate = $_POST["currentDate"] ?? null;

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

    $query = $connection->prepare("INSERT INTO assignments (course_id, instructor_id, title, description, due_date, created_at) VALUES (?, ?, ?, ?, ?, ?)");

    $query->bind_param("iissss", $course_id, $id, $title, $description, $dueDate, $curentDate);

    if ($query->execute()) {
        echo json_encode([
            "status" => "success",
            "message"=> "Assignment added successfully!"
        ]);
    }
    else{
        echo json_encode([
            "status" => "error",
            "message"=> "Failed to add assignment.",
            "error" => $query->error
        ]);
    }

    $query->close();
    $connection->close();
?>