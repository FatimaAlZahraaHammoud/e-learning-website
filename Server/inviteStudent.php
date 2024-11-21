<?php
    include "connection.php";
    include "./vendor/autoload.php";

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    
    $email = $_POST['email'];
    $course_id = $_POST['course_id'];

    // Validate the email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Invalid email address."]);
        exit;
    }

    $query = $connection->prepare("SELECT * FROM users WHERE email = ?");
    $query->bind_param("s", $email);
    $query->execute();
    $result = $query->get_result();

    if ($result->num_rows > 0) {
        $student = $result->fetch_assoc();
        $student_id = $student['user_id'];

        $invitation_query = $connection->prepare("INSERT INTO course_invitations (student_id, course_id) VALUES (?, ?)");
        $invitation_query->bind_param("ii", $student_id, $course_id);
        $invitation_query->execute();

        if ($invitation_query->affected_rows > 0){

            $subject = "You're Invited to Join this Course!";
            $invitation_link = "http://localhost/FSW-SE-Factory/e-learning-website/acceptInvitation.php?student_id=$student_id&course_id=$course_id";
            $message = "Please click the following link to join the course: $invitation_link";

            $mail = new PHPMailer(true);

            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'hammoudmahdi31@gmail.com';
                $mail->Password = 'mahdi123@gmail.com';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                // Recipients
                $mail->setFrom('fatzahham@gmail.com', 'Fatima Al-Zahraa');
                $mail->addAddress($email);

                // Content
                $mail->isHTML(true);
                $mail->Subject = $subject;
                $mail->Body    = $message;

                // Send email
                if ($mail->send()) {
                    echo json_encode([
                        "status" => "success", 
                        "message" => "Invitation sent successfully!"
                    ]);
                } else {
                    echo json_encode([
                        "status" => "error", 
                        "message" => "Failed to send invitation email."
                    ]);
                }
            } catch (Exception $e) {
                echo json_encode([
                    "status" => "error", 
                    "message" => "Failed to send invitation email: {$mail->ErrorInfo}"
                ]);
            }
        } else {
            echo json_encode([
                "status" => "error", 
                "message" => "Failed to save the invitation."
            ]);
        }
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Student not found."
        ]);
    }

?>