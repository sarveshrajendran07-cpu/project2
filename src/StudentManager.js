import React, { useState, useEffect } from "react";
import "./App.css";

function StudentManager() {
  // ✅ Load from localStorage
  const [students, setStudents] = useState(() => {
    const stored = localStorage.getItem("students");
    return stored ? JSON.parse(stored) : [];
  });

  const [form, setForm] = useState({
    name: "",
    roll: "",
    dept: "",
    year: "",
  });

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add student
  const handleAdd = () => {
    const { name, roll, dept, year } = form;
    if (!name || !roll || !dept || !year) return;

    const newStudent = {
      id: Date.now(),
      ...form,
    };

    setStudents([...students, newStudent]);

    setForm({ name: "", roll: "", dept: "", year: "" });
  };

  // Delete student
  const handleDelete = (id) => {
    const filtered = students.filter((s) => s.id !== id);
    setStudents(filtered);
  };

  return (
    <div className="container">
      <h1>Student Manager 🎓</h1>

      {/* Form */}
      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="roll"
          placeholder="Roll No"
          value={form.roll}
          onChange={handleChange}
        />
        <input
          type="text"
          name="dept"
          placeholder="Department"
          value={form.dept}
          onChange={handleChange}
        />
        <input
          type="text"
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
        />
        <button onClick={handleAdd}>Add Student</button>
      </div>

      {/* Table */}
      <div className="table-container">
        {students.length === 0 ? (
          <p>No students added 😴</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Department</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.roll}</td>
                  <td>{s.dept}</td>
                  <td>{s.year}</td>
                  <td>
                    <button onClick={() => handleDelete(s.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default StudentManager;