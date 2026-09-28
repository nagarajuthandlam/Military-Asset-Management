import { useEffect, useState } from "react";
import API from "../services/api";

function Assignments() {
  const [assignments, setAssignments] = useState([]);

  const [form, setForm] = useState({
    assignment_date: "",
    person_name: "",
    base_name: "",
    equipment_name: "",
    quantity: "",
    status: "Assigned",
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await API.get("/assignments/");
      setAssignments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAssignment = async () => {
    try {
      await API.post("/assignments/", form);
      alert("Assignment Saved Successfully!");

      setForm({
        assignment_date: "",
        person_name: "",
        base_name: "",
        equipment_name: "",
        quantity: "",
        status: "Assigned",
      });

      fetchAssignments();
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to save assignment");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4">Assignments</h2>

      <div className="card shadow p-4 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <label>Date</label>
            <input
              type="date"
              name="assignment_date"
              value={form.assignment_date}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <label>Person Name</label>
            <input
              type="text"
              name="person_name"
              value={form.person_name}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <label>Base Name</label>
            <select
              name="base_name"
              value={form.base_name}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Base</option>
              <option>Hyderabad</option>
              <option>Delhi</option>
              <option>Bangalore</option>
            </select>
          </div>

          <div className="col-md-6">
            <label>Equipment</label>
            <select
              name="equipment_name"
              value={form.equipment_name}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Equipment</option>
              <option>Rifles</option>
              <option>Vehicles</option>
              <option>Ammunition</option>
              <option>Medical Kits</option>
              <option>Uniforms</option>
            </select>
          </div>

          <div className="col-md-6">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-6">
            <label>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-select"
            >
              <option>Assigned</option>
              <option>Expended</option>
            </select>
          </div>
        </div>

        <button
          className="btn btn-primary mt-4"
          onClick={saveAssignment}
        >
          Save Assignment
        </button>
      </div>

      <div className="card shadow p-4">
        <h4>Assignment History</h4>

        <table className="table table-bordered mt-3">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Person</th>
              <th>Base</th>
              <th>Equipment</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((item) => (
              <tr key={item.id}>
                <td>{item.assignment_date}</td>
                <td>{item.person_name}</td>
                <td>{item.base_name}</td>
                <td>{item.equipment_name}</td>
                <td>{item.quantity}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assignments;