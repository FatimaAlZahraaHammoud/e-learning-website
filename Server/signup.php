<?php
    include "connection.php";
    include "vendor/autoload.php";

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, REQUEST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    use Firebase\JWT\JWT;

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $secretKey = "FatimaSecretKeyy";
    $data = json_decode(file_get_contents("php://input"), true);

    $username = $data["username"] ?? null;
    $email = $data["email"] ?? null;
    $password = $data["password"] ?? null;

    if (empty($username) || empty($email) || empty($password)) {
        echo json_encode([
            "status"=> "error",
            "message"=> "All fields are required"
        ]);
        exit;
    }

    // This will check if the username is taken or not to have unique names
    $username_check = $connection->prepare("SELECT user_id FROM users WHERE name = ?");
    $username_check->bind_param("s", $username);
    $username_check->execute();
    $username_check_result = $username_check->get_result();

    // This will check if the email is taken or not to have unique emails
    $email_check = $connection->prepare("SELECT user_id FROM users WHERE email = ?");
    $email_check->bind_param("s", $email);
    $email_check->execute();
    $email_check_result = $email_check->get_result();


    if ($email_check_result->num_rows > 0) {
        echo json_encode(['message' => 'Email already taken.', 'email' => $email]);
    }
    else if ($username_check_result->num_rows > 0) {
        echo json_encode(['message' => 'Username already taken.', 'username' => $username]);
    }
    else{
        $hashed = password_hash($password, PASSWORD_BCRYPT);

        $query = $connection->prepare("INSERT INTO users(name, email, password) values(?,?,?)");
        $query->bind_param("sss", $username, $email, $hashed);
        $query->execute();

        if ($query->affected_rows > 0) {
            $user_id = $connection->insert_id;

            $payload = [
                "user_id" => $user_id,
                "role" => "student"
            ];

            $token = JWT::encode($payload, $secretKey,"HS256");

            echo json_encode([
                "status"=> "Register successful",
                "message"=> "user(s) created",
                "access_token" => $token
            ]);
        }
        else{
            http_response_code(400);
            echo json_encode([
                "status"=> "Failed",
                "message"=> "Could not create record",
            ]);
        }
    }
?>