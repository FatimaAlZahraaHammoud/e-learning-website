import React, {Children, createContext, useContext, useState} from "react";

export const assignmentsProvider = createContext();

const AssignmentsProvider = ({Children}) => {
    const [assignments, setAssignments] = useState([]);

    
}