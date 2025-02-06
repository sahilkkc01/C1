import React, { useState } from "react";
import Footer from "./main/footer";
import Nav from "./main/nav";
import "../Pages.css";
import { useNavigate } from "react-router-dom";
import Header from "./main/header";

export default function RakeOutWord() {
  const [PortNo, setPortNo] = useState(null);
  const [Step, setStep] = useState(1);
  const [type, setType] = useState(null);
  const navigate = useNavigate();
  const handleOnClick = (T) => {
    setType(T);
    setStep(2);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    navigate(`/RakeOutWordData/${type}?port_no=${PortNo}`);
  };

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <div className="content-wrapper">
              <Nav />
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="position-relative">
                  <div
                    className="authentication-wrapper authentication-basic container-p-y"
                    style={{ minHeight: "86vh" }}
                  >
                    {Step === 1 ? (
                      <>
                        <div className="authentication-inner py-6 mx-4">
                          <div className="row">
                            <div
                              className="col-md-6 mb-4"
                              onClick={() => handleOnClick("express")}
                            >
                              <div className="card p-7 div-card-hover">
                                <div className="app-brand justify-content-center mt-5 d-block">
                                  <h3 className="text-center">Express</h3>
                                  <p className="text-center">Select Express</p>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col-md-6 mb-4"
                              onClick={() => handleOnClick("block")}
                            >
                              <div className="card p-7 div-card-hover" >
                                <div className="app-brand justify-content-center mt-5 d-block">
                                  <h3 className="text-center">Block</h3>
                                  <p className="text-center">Select Block</p>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col-md-6 mb-4"
                              onClick={() => handleOnClick("normal")}
                            >
                              <div className="card p-7 div-card-hover">
                                <div className="app-brand justify-content-center mt-5 d-block">
                                  <h3 className="text-center">Normal</h3>
                                  <p className="text-center">Select Normal</p>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col-md-6 mb-4"
                              onClick={() => handleOnClick("empty")}
                            >
                              <div className="card p-7 div-card-hover">
                                <div className="app-brand justify-content-center mt-5 d-block">
                                  <h3 className="text-center">Empty</h3>
                                  <p className="text-center">Select Empty</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <img
                            src="/assets/img/illustrations/tree-3.png"
                            alt="auth-tree"
                            className="authentication-image-object-left d-none d-lg-block"
                          />
                          <img
                            src="/assets/img/illustrations/auth-basic-mask-light.png"
                            className="authentication-image d-none d-lg-block scaleX-n1-rtl"
                            height={172}
                            alt="triangle-bg"
                            data-app-light-img="illustrations/auth-basic-mask-light.png"
                            data-app-dark-img="illustrations/auth-basic-mask-dark.png"
                          />
                          <img
                            src="/assets/img/illustrations/tree.png"
                            alt="auth-tree"
                            className="authentication-image-object-right d-none d-lg-block"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="authentication-inner py-6 mx-4">
                          <div className="card p-7">
                            <div className="app-brand justify-content-center mt-5">
                              <h3 className="text-capitalize">{type}</h3>
                            </div>
                            <div className="card-body">
                              <p className="mb-5">
                                Please Enter Port Number to Fetch Data
                              </p>
                              <form
                                id="formAuthentication"
                                className="mb-5 fv-plugins-bootstrap5 fv-plugins-framework"
                                onSubmit={handleFormSubmit}
                              >
                                <div className="form-floating form-floating-outline mb-5 fv-plugins-icon-container">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="port_no"
                                    name="port_no"
                                    placeholder="Port Number"
                                    required
                                    defaultValue={PortNo}
                                    onChange={(e) =>
                                      setPortNo(e.target.value.toUpperCase())
                                    }
                                  />
                                  <label htmlFor="email">Port Number</label>
                                  <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                                </div>
                                <div className="mb-5">
                                  <button
                                    className="btn btn-primary d-grid w-100 waves-effect waves-light"
                                    type="submit"
                                  >
                                    Fetch Data
                                  </button>
                                </div>
                              </form>
                              <button
                                className="btn btn-danger"
                                onClick={() => setStep(1)}
                              >
                                Go Back
                              </button>
                            </div>
                          </div>
                          <img
                            src="/assets/img/illustrations/tree-3.png"
                            alt="auth-tree"
                            className="authentication-image-object-left d-none d-lg-block"
                          />
                          <img
                            src="/assets/img/illustrations/auth-basic-mask-light.png"
                            className="authentication-image d-none d-lg-block scaleX-n1-rtl"
                            height={172}
                            alt="triangle-bg"
                            data-app-light-img="illustrations/auth-basic-mask-light.png"
                            data-app-dark-img="illustrations/auth-basic-mask-dark.png"
                          />
                          <img
                            src="/assets/img/illustrations/tree.png"
                            alt="auth-tree"
                            className="authentication-image-object-right d-none d-lg-block"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <Footer />
                <div className="content-backdrop fade"></div>
              </div>
            </div>
          </div>
          <div className="layout-overlay layout-menu-toggle"></div>
          <div className="drag-target"></div>
        </div>
      </div>
    </>
  );
}
