import React, { useState } from "react";
import { useHistory } from "react-router";
import userService from "service/userService";
import Swal from "sweetalert2";

function AddUser() {
  const [user, setUser] = useState({
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    roles: "",
    city: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleRoleChange = (e) => {
    const { value } = e.target;
    setUser({ ...user, roles: value });
  };
  const history = useHistory();
  const handleSubmit = () => {
    console.log(user);
    userService
      .signUpUser(user)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.message,
          timer: "1700",
        });
        setTimeout(() => {
          history.push("/admin/dashboard");
          return window.location.reload();
        }, 1700);
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message || error.response.data.error,
        })
      );

    setUser({
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      telephone: "",
      roles: "",
      city: "",
      address: "",
    });
  };
  return (
    <section className="h-100 bg-dark">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt="Sample photo"
                    className="img-fluid"
                    style={{
                      borderTopLeftRadius: ".25rem ",
                      borderBottomLeftRadius: ".25rem",
                    }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">
                      CRÉER UN COMPTE UTILISATEUR
                    </h3>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" for="firstName">
                            First name
                          </label>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" for="lastName">
                            Last name
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="email">
                        Email
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="telephone"
                        name="telephone"
                        value={user.telephone}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="telephone">
                        Telephone
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="address">
                        Address
                      </label>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-4">
                        <select
                          className="select"
                          value={user.roles}
                          onChange={handleRoleChange} // Add handleRoleChange as event handler
                        >
                          <option>ROLES</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="USER">USER</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={user.city}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="city">
                        Ville
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="password">
                        Password
                      </label>
                    </div>

                    <div className="d-flex justify-content-end pt-3">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-warning w-75 btn-sm ms-2"
                      >
                        Ajouter
                      </button>
                    </div>
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

export default AddUser;
