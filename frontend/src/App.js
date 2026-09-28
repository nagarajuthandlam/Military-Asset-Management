import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Transfers from "./pages/Transfers";
import Assignments from "./pages/Assignments";

function Layout() {
  const role = localStorage.getItem("role") || "Admin";

  return (
    <div className="d-flex">
      <div className="bg-dark text-white p-3" style={{ width: "250px", minHeight: "100vh" }}>
        <h3 className="text-center mb-4">Military AMS</h3>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
          </li>

          {role !== "Base Commander" && (
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/purchases">Purchases</Link>
            </li>
          )}

          {role !== "Base Commander" && (
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/transfers">Transfers</Link>
            </li>
          )}

          {role !== "Logistics Officer" && (
            <li className="nav-item mb-2">
              <Link className="nav-link text-white" to="/assignments">Assignments</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/purchases" element={<Purchases />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/assignments" element={<Assignments />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}