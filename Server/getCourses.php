<?php 

    include "connection.php";
    require "vendor/autoload.php";

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    $secretKey = "FatimaSecretKeyy";
    $headers = getallheaders();
    $jwt = $headers["Authorization"];

    $key = new Key($secretKey, "HS256");
    $payload = JWT::decode($jwt, $key);

    if($payload->role != "admin") {
        http_response_code(401);
        echo json_encode([
        "message"=> "Unauthorized"
        ]);
        return;
    }
    

    $query = $connection->prepare("select * from courses");
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0){
        $courses = [];
        while ($course = $result->fetch_assoc()) {
            $courses[] = $course;
        }

        echo json_encode(value: [
            "status" => "success",
            "message" => "get course successfully",
            "courses"=> $courses,
        ]);
    }
    else{
        echo json_encode([
            "status"=> "error",
            "message"=> "course title not found",
        ]);
    }

?>