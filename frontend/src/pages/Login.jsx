import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    try {
      const response = await API.post("/users/login/", {
        username: form.username,
        password: form.password,
      });

      if (response.data.success) {
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("base", response.data.base_name || "");

        alert("Login Successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid Username or Password");
      }
    } catch (error) {
      alert("Invalid Username or Password");
      console.log(error.response?.data);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center text-primary mb-4">
          Military Asset Login
        </h2>

        <input
          type="text"
          name="username"
          className="form-control mb-3"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100" onClick={login}>
          Login
        </button>

        <hr />

        <h6>Demo Accounts</h6>
        <small>Admin → admin / admin123</small><br />
        <small>Commander → commander / commander123</small><br />
        <small>Logistics → logistics / logistics123</small>
      </div>
    </div>
  );
}

export default Login;