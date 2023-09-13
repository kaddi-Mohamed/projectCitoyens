import React, { useState } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import { login } from "service/authService";
import Swal from "sweetalert2";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleLogin = () => {
    login(email, password)
      .then((res) => {
        localStorage.setItem("adminToken", res.data.token);
        history.push("/dashboard");
        return window.location.reload();
      })
      .catch((err) =>
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err.response.data.error || err.response.data.message,
          showConfirmButton: false,
          timer: 2000,
        })
      );
  };

  return (
    <section class="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-10">
            <div class="card" style={{ borderRadius: "1rem" }}>
              <div class="row g-0">
                <div class="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={require("../assets/img/Shining-bright-idea-light-bulb-with-cogs-on-transparent-background-PNG.png")}
                    alt="login form"
                    class="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div class="col-md-6 col-lg-7 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <i
                          class="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span class="h1 fw-bold mb-0">Logo</span>
                      </div>

                      <h5
                        class="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label class="form-label" for="form2Example17">
                          Email address
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label class="form-label" for="form2Example27">
                          Password
                        </label>
                      </div>

                      <div class="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="button"
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                      </div>

                      {/* <a class="small text-muted" href="#!">
                        Forgot password?
                      </a> */}
                      <p class="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <Link to="/singup" style={{ color: "#393f81" }}>
                          Register here
                        </Link>
                      </p>
                      <a href="#!" class="small text-muted">
                        Terms of use
                      </a>
                      <a href="#!" class="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
