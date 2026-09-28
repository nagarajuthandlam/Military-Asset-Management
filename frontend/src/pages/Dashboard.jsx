import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [summary, setSummary] = useState({
    opening_balance: 0,
    closing_balance: 0,
    net_movement: 0,
    assigned_assets: 0,
    transfer_assets: 0,
  });

  const [showDetails, setShowDetails] = useState(false);

  const role = localStorage.getItem("role") || "Admin";

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await API.get("/dashboard/");
      setSummary(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard.");
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">

      {/* Heading */}
      <h2 className="text-primary fw-bold mb-2">
        Military Asset Management Dashboard
      </h2>

      <h5 className="text-success mb-4">
        Logged in as: {role}
      </h5>

      {/* Filters */}
      <div className="card shadow p-4 mb-4">
        <h4 className="mb-3">Filters</h4>

        <div className="row g-3">
          <div className="col-md-4">
            <label>Date</label>
            <input type="date" className="form-control" />
          </div>

          <div className="col-md-4">
            <label>Base</label>
            <select className="form-select">
              <option>All Bases</option>
              <option>Hyderabad</option>
              <option>Delhi</option>
              <option>Bangalore</option>
            </select>
          </div>

          <div className="col-md-4">
            <label>Equipment Type</label>
            <select className="form-select">
              <option>All Equipment</option>
              <option>Rifles</option>
              <option>Vehicles</option>
              <option>Ammunition</option>
              <option>Medical Kits</option>
              <option>Uniforms</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="row g-4">

        <div className="col-md-4">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <h5>Opening Balance</h5>
              <h2>{summary.opening_balance}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h5>Closing Balance</h5>
              <h2>{summary.closing_balance}</h2>
            </div>
          </div>
        </div>

        {/* CLICKABLE CARD */}
        <div className="col-md-4">
          <div
            className="card bg-info text-white shadow"
            style={{ cursor: "pointer" }}
            onClick={() => setShowDetails(!showDetails)}
          >
            <div className="card-body text-center">
              <h5>Net Movement</h5>
              <h2>{summary.net_movement}</h2>
              <small>Click to View Details</small>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card bg-warning shadow">
            <div className="card-body text-center">
              <h5>Assigned Assets</h5>
              <h2>{summary.assigned_assets}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
              <h5>Total Transfers</h5>
              <h2>{summary.transfer_assets}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* NET MOVEMENT DETAILS */}
      {showDetails && (
        <div className="card shadow border-primary mt-4">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Net Movement Details</h5>

            <button
              className="btn btn-light btn-sm"
              onClick={() => setShowDetails(false)}
            >
              Close
            </button>
          </div>

          <div className="card-body">
            <table className="table table-bordered table-hover">

              <thead className="table-primary">
                <tr>
                  <th>Movement Type</th>
                  <th>Total Assets</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Purchases</td>
                  <td>{summary.opening_balance}</td>
                </tr>

                <tr>
                  <td>Transfer In</td>
                  <td>{summary.transfer_assets}</td>
                </tr>

                <tr>
                  <td>Transfer Out / Assigned</td>
                  <td>{summary.assigned_assets}</td>
                </tr>

                <tr className="table-info fw-bold">
                  <td>Net Movement</td>
                  <td>{summary.net_movement}</td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>
      )}

      {/* Summary Table */}
      <div className="card shadow mt-5">
        <div className="card-header bg-dark text-white">
          Asset Summary
        </div>

        <div className="card-body">
          <table className="table table-bordered">

            <thead className="table-dark">
              <tr>
                <th>Metric</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Opening Balance</td>
                <td>{summary.opening_balance}</td>
              </tr>

              <tr>
                <td>Closing Balance</td>
                <td>{summary.closing_balance}</td>
              </tr>

              <tr>
                <td>Net Movement</td>
                <td>{summary.net_movement}</td>
              </tr>

              <tr>
                <td>Assigned Assets</td>
                <td>{summary.assigned_assets}</td>
              </tr>

              <tr>
                <td>Total Transfers</td>
                <td>{summary.transfer_assets}</td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;