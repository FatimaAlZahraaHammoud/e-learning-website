<?php
    include "connection.php";

    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // This will check if the username is taken or not to have unique names
    $username_check = $connection->prepare("SELECT id FROM users WHERE username = ?");
    $username_check->bind_param("s", $username);
    $username_check->execute();
    $username_check_result = $username_check->get_result();

    // This will check if the email is taken or not to have unique emails
    $email_check = $connection->prepare("SELECT id FROM users WHERE email = ?");
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

        $query = $connection->prepare("INSERT INTO users(username, email, password) values(?,?,?)");
        $query->bind_param("sss", $username, $email, $hashed);
        $query->execute();
        $result = $query->affected_rows;

        if ($result!=0){
            echo json_encode([
                "status"=> "Register successful",
                "message"=> "$result user(s) created",
            ]);
        }
        else{
            echo json_encode([
                "status"=> "Failed",
                "message"=> "Could not create record",
            ]);
        }
    }
?>