import { useState, useEffect } from "react";
import API from "../services/api";

function Purchases() {
  const [purchases, setPurchases] = useState([]);

  const [form, setForm] = useState({
    date: "",
    base: "",
    equipment: "",
    quantity: "",
  });

  // Load purchases from Django when page opens
  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await API.get("/purchases/");
      setPurchases(response.data);
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

  // Save purchase to Django + MySQL
  const addPurchase = async () => {
    if (
      !form.date ||
      !form.base ||
      !form.equipment ||
      !form.quantity
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await API.post("/purchases/", {
        purchase_date: form.date,
        base_name: form.base,
        equipment_name: form.equipment,
        quantity: Number(form.quantity),
      });

      alert("Purchase Added Successfully!");

      setForm({
        date: "",
        base: "",
        equipment: "",
        quantity: "",
      });

      // Reload latest data
      fetchPurchases();

    } catch (error) {
      console.log(error);
      alert("Failed to save purchase.");
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">

      <h2 className="text-success fw-bold mb-4">
        Purchases Management
      </h2>

      {/* Purchase Form */}
      <div className="card shadow p-4 mb-4">

        <h4 className="mb-3">Add New Purchase</h4>

        <div className="row g-3">

          <div className="col-md-3">
            <label>Date</label>

            <input
              type="date"
              name="date"
              className="form-control"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label>Base</label>

            <select
              name="base"
              className="form-select"
              value={form.base}
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
              <option>Uniforms</option>
              <option>Medical Kits</option>
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
          className="btn btn-success mt-4"
          onClick={addPurchase}
        >
          Add Purchase
        </button>

      </div>

      {/* Purchase History */}
      <div className="card shadow">

        <div className="card-header bg-success text-white">
          Purchase History
        </div>

        <div className="card-body table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-success">
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Base</th>
                <th>Equipment</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No purchases available.
                  </td>
                </tr>
              ) : (
                purchases.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.purchase_date}</td>
                    <td>{item.base_name}</td>
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

export default Purchases;