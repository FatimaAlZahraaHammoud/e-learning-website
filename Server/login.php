<?php

    include "connection.php";

    $email = $_POST["email"];
    $password = $_POST["password"];

    $query = $connection->prepare("SELECT * FROM users WHERE email = ?");
    $query->bind_param("s", $email);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows != 0) {
        $user = $result->fetch_assoc();

        // Verify password
        $check = password_verify($password, hash: $user["password"]);

        if ($check) {
            echo json_encode([
                "status" => "Login Succesful",
                "user" => $user,
                "userId" => $user["userId"], 
            ]);
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => "Invalid Credentials",
            ]);
        }
    } else {
        http_response_code(404);

        echo json_encode([
            "status" => "User not found",
        ]);
    }

?>