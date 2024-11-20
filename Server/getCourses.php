<?php

    include "connection.php";

    header('Content-Type: application/json');

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, REQUEST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    $coursesQuery = $connection->prepare("select c.*, u.name as instructor_name from courses c INNER JOIN users u on c.instructor_id = u.user_id where c.section_id = $sectionId");
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
        echo json_encode(['error'=> 'no courses found']);
    }

?>