<?php

    include "connection.php";

    header('Content-Type: application/json');

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, REQUEST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");


    $sectionsQuery = $connection->prepare('select * from sections');
    $sectionsQuery->execute();
    $sectionsResult = $sectionsQuery->get_result();

    $sections = [];

    if ($sectionsResult->num_rows > 0) {
        while ($section = $sectionsResult->fetch_assoc()) {
            $sectionId = $section['id'];

            $coursesQuery = $connection->prepare("select c.*, u.name from courses c INNER JOIN users u on c.instructor_id = u.user_id where c.section_id = $sectionId");
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
                        'instructor' => $course['instructor_id']
                    ];
                }
            }

            $sections[] = [
                'id' => $sectionId,
                'title' => $section['title'],
                'courses' => $courses
            ];
    
        }

        
        echo json_encode($sections);
    }
    else{
        echo json_encode(['error'=> 'no sections found']);
    }

?>