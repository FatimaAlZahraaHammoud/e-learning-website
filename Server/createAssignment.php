<?php 

    include "connection.php";
    include "./vendor/autoload.php";

    $title = $_POST["title"];
    $description = $_POST["description"];
    $dueDate = $_POST["dueDate"];
    $course_id = $_POST["course_id"];

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

    $current_date = date('Y-m-d');

    $query = $connection->prepare("insert into assignments (course_id, instructor_id, title, description, duse_date, created_at) values (?, ?, ?, ?, ?, ?)");
    $query->bind_param("iissss", $course_id, $id, $title, $description, $dueDate, $current_date);

    if ($query->execute() === true) {
        echo json_encode([
            "status" => "success",
            "message"=> "Assignment added successfully!"
        ]);
    }
    else{
        echo json_encode([
            "status" => "error",
            "message"=> "Failed to add assignment."
        ]);
    }

    $query->close();
    $connection->close();
?>