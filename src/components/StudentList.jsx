import React from 'react';

const StudentList = ({ students }) => (
  <div className="space-y-4">
    {students.map((student) => (
      <div key={student.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h3>{student.name}</h3>
        <p>Edad: {student.age}</p>
        <p>Disciplina: {student.discipline}</p>
      </div>
    ))}
  </div>
);

export default StudentList;
