import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const EMAIL = "admin@avs.com";
const PASSWORD = "admin";

function SignIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email && !password) {
      return;
    }

    if (email === EMAIL && password === PASSWORD) {
      localStorage.setItem("userLoggedIn", JSON.stringify({ email }));
      navigate("/");
      console.log("Successfuly loggedIn");
    } else {
      console.log("incorrect email or password");
    }
  };

  return (
    <>
      <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
          <div class="col-12">
            <nav class="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
              <div class="container-fluid ps-2 pe-0">
                <Link
                  class="navbar-brand font-weight-bolder ms-lg-0 ms-3 "
                  to="/signin"
                >
                  AVS SignIn
                </Link>
                <button
                  class="navbar-toggler shadow-none ms-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navigation"
                  aria-controls="navigation"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon mt-2">
                    <span class="navbar-toggler-bar bar1"></span>
                    <span class="navbar-toggler-bar bar2"></span>
                    <span class="navbar-toggler-bar bar3"></span>
                  </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <main class="main-content  mt-0">
        <div
          class="page-header align-items-start min-vh-100"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')",
          }}
        >
          <span class="mask bg-gradient-dark opacity-6"></span>
          <div class="container my-auto">
            <div class="row">
              <div class="col-lg-4 col-md-8 col-12 mx-auto">
                <div class="card z-index-0 fadeIn3 fadeInBottom">
                  <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="card-gradient-background shadow-primary border-radius-lg py-3 pe-1">
                      <h4 class="text-white font-weight-bolder text-center mt-2 mb-0">
                        Sign in
                      </h4>
                    </div>
                  </div>
                  <div class="card-body">
                    <form
                      onSubmit={(e) => handleSubmitForm(e)}
                      role="form"
                      class="text-start"
                    >
                      <div class="input-group input-group-outline my-3">
                        {/* <label class="form-label">Email</label> */}
                        <input
                          ref={emailRef}
                          type="email"
                          class="form-control"
                          placeholder="Email"
                          required={true}
                        />
                      </div>
                      <div class="input-group input-group-outline mb-3">
                        {/* <label class="form-label">Password</label> */}
                        <input
                          ref={passwordRef}
                          type="password"
                          class="form-control"
                          placeholder="Password"
                          required={true}
                        />
                      </div>
                      <div class="form-check form-switch d-flex align-items-center mb-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                          checked={false}
                        />
                        <label
                          class="form-check-label mb-0 ms-3"
                          for="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                      <div class="text-center">
                        <button
                          type="submit"
                          class="btn card-gradient-background text-white w-100 my-4 mb-2"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignIn;
