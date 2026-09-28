import { useState, useEffect } from "react";
import API from "../services/api";

function Transfers() {
  const [transfers, setTransfers] = useState([]);

  const [form, setForm] = useState({
    date: "",
    fromBase: "",
    toBase: "",
    equipment: "",
    quantity: "",
  });

  // Load transfers when page opens
  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const response = await API.get("/transfers/");
      setTransfers(response.data);
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

  const addTransfer = async () => {
    if (
      !form.date ||
      !form.fromBase ||
      !form.toBase ||
      !form.equipment ||
      !form.quantity
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await API.post("/transfers/", {
        transfer_date: form.date,
        from_base: form.fromBase,
        to_base: form.toBase,
        equipment_name: form.equipment,
        quantity: Number(form.quantity),
      });

      alert("Transfer Added Successfully!");

      setForm({
        date: "",
        fromBase: "",
        toBase: "",
        equipment: "",
        quantity: "",
      });

      fetchTransfers();
    } catch (error) {
      console.log(error);
      alert("Failed to save transfer.");
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <h2 className="text-primary fw-bold mb-4">
        Transfers Management
      </h2>

      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Transfer Equipment</h4>

        <div className="row g-3">

          <div className="col-md-2">
            <label>Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <label>From Base</label>
            <select
              name="fromBase"
              className="form-select"
              value={form.fromBase}
              onChange={handleChange}
            >
              <option value="">Select Base</option>
              <option>Hyderabad</option>
              <option>Delhi</option>
              <option>Bangalore</option>
            </select>
          </div>

          <div className="col-md-2">
            <label>To Base</label>
            <select
              name="toBase"
              className="form-select"
              value={form.toBase}
              onChange={handleChange}
            >
              <option value="">Select Base</option>
              <option>Hyderabad</option>
              <option>Delhi</option>
              <option>Bangalore</option>
            </select>
          </div>

          <div className="col-md-3">
            <label>Equipment</label>
            <select
              name="equipment"
              className="form-select"
              value={form.equipment}
              onChange={handleChange}
            >
              <option value="">Select Equipment</option>
              <option>Rifles</option>
              <option>Vehicles</option>
              <option>Ammunition</option>
              <option>Medical Kits</option>
              <option>Uniforms</option>
            </select>
          </div>

          <div className="col-md-3">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Enter Quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>

        </div>

        <button
          className="btn btn-primary mt-4"
          onClick={addTransfer}
        >
          Transfer Equipment
        </button>

      </div>

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          Transfer History
        </div>

        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover">

            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>From Base</th>
                <th>To Base</th>
                <th>Equipment</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {transfers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No transfers available.
                  </td>
                </tr>
              ) : (
                transfers.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.transfer_date}</td>
                    <td>{item.from_base}</td>
                    <td>{item.to_base}</td>
                    <td>{item.equipment_name}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}

export default Transfers;