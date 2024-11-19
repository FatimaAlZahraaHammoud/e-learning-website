<?php

    include "connection.php";
    include "vendor/autoload.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, REQUEST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    // If the request is a preflight (OPTIONS request), return a success response
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    
    use Firebase\JWT\JWT;

    $secretKey = "FatimaSecretKeyy";

    // Read JSON data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    $email = $data["email"] ?? null;
    $password = $data["password"] ?? null;


    if (empty($email) || empty($password)) {
        echo json_encode([
            "status"=> "error",
            "message"=> "Credentials are required"
        ]);
    }

    $query = $connection->prepare("SELECT * FROM users WHERE email = ?");
    $query->bind_param("s", $email);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows != 0) {
        $user = $result->fetch_assoc();

        // Verify password
        $check = password_verify($password, hash: $user["password"]);

        if ($check) {

            $payload = [
                "user_id"=> $user["user_id"],
                "role" => $user["role"],
            ];

            $token = JWT::encode($payload, $secretKey, "HS256");

            echo json_encode([
                "status" => "Login Succesful",
                "message" => "Login is Succesful",
                "user" => $user,
                "access_token" => $token
            ]);

        } else {
            http_response_code(404);
            echo json_encode([
                "status" => "Incorrect password",
                "message" => "The email is not found"
            ]);
        }
    } else {
        http_response_code(404);

        echo json_encode([
            "status" => "User not found",
            "message" => "User not found"
        ]);
    }

?>