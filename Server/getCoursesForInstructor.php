<?php

    include "connection.php";

    header('Content-Type: application/json');

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, REQUEST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    $instructor_id = $_POST["instructor_id"] ?? null;

    if (!$instructor_id) {
        http_response_code(400);
        echo json_encode(['error' => 'Instructor ID is required']);
        exit;
    }

    $coursesQuery = $connection->prepare("select c.*, u.name as instructor_name from courses c INNER JOIN users u on c.instructor_id = u.user_id where c.instructor_id = ?");
    $coursesQuery->bind_param("i", $instructor_id);
    $coursesQuery->execute();
    $result = $coursesQuery->get_result();

    $courses = [];
    if ($result->num_rows > 0) {
        while ($course = $result->fetch_assoc()) {
            $courses[] = [
                'id' => $course['id'],
                'title' => $course['title'],
                'image' => $course['image'],
                'students' => $course['number_of_students'],
                'instructor' => $course['instructor_name'],
            ];
        }
        echo json_encode($courses);
    }
    else{
        echo json_encode(['error'=> 'No courses found']);
    }

?>