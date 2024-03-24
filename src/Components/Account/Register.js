import React from "react";

export default function Register() {
  return (
    <form method="post" action="/register/">
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                    <div className="form-outline form-white mb-2">
                      <label className="form-label">User Name</label>
                      <input
                        type="text"
                        name="ma"
                        className="form-control form-control-lg "
                      />
                    </div>
                    <div className=" row mt-3 form-outline form-white mb-2">
                      <div className="col-6">
                        <label>Số điện thoại</label>
                        <input type="tel" name="sdt" className="form-control" />
                      </div>
                      <div className="col-6">
                        <label>Email</label>
                        <input
                          type="text"
                          name="dia_chi"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className=" row mt-3 form-outline form-white mb-2">
                      <div className="col-6">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          name="mat_khau"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">Enter the password</label>
                        <input
                          type="password"
                          name="NLMK"
                          className="form-control form-control-lg"
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Sign Up
                    </button>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg" />
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2" />
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-google fa-lg" />
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <a href="/login" className="text-white-50 fw-bold">
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
