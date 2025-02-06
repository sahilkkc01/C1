import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./main/header";
import Footer from "./main/footer";
import Nav from "./main/nav";
import { Html5Qrcode } from "html5-qrcode";
import Swal from "sweetalert2";
import "../App.css";

export default function Gate() {
  const [type, setType] = useState(null);
  const [gate_no, setGateNo] = useState(null);
  const [lane_no, setLaneNo] = useState(null);

  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
        <div class="layout-container">
          <Nav />
          <div className="layout-page">
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                {type == "IN" ? (
                  <div className="row align-items-center position-relative">
                    <div className={`text-center col-md-5 col-sm-5 mt-12`}>
                      <img
                        src="/assets/images/isometric-vehicle.png"
                        className="w-100"
                        style={{ transform: "scaleX(-1)" }}
                        alt=""
                      />
                    </div>
                    <div className="col-md-6 col-sm-7  position-absolute top-0 end-0 me-8">
                      <div className="card">
                        <div className="card-body border-bottom py-2 px-1">
                          <h4 className="m-0 text-center">
                            Select Gate Number
                          </h4>
                        </div>
                        <div className="card-body border-bottom py-2 pe-0">
                          <h6 className="my-2"> Lane 1 </h6>
                          <div className="row">
                            <div className="col-5">
                              <div
                                className={`form-check custom-option custom-option-label custom-option-basic ${
                                  gate_no == "2" ? "checked" : ""
                                } `}
                              >
                                <label
                                  className="form-check-label custom-option-content text-center p-3"
                                  htmlFor="gate_no2"
                                >
                                  <input
                                    name="gate_no"
                                    className="form-check-input"
                                    type="radio"
                                    id="gate_no2"
                                    hidden
                                    onChange={() => {
                                      setGateNo("2");
                                      setLaneNo("1");
                                    }}
                                  />
                                  <b
                                    className={`fs-6  ${
                                      gate_no == "2" ? "text-primary" : ""
                                    } `}
                                  >
                                    Gate 2
                                  </b>
                                </label>
                              </div>
                            </div>
                            <div className="col-5">
                              <div
                                className={`form-check custom-option custom-option-label custom-option-basic  ${
                                  gate_no == "3" ? "checked" : ""
                                }  `}
                              >
                                <label
                                  className="form-check-label custom-option-content text-center p-3"
                                  htmlFor="gate_no3"
                                >
                                  <input
                                    name="gate_no"
                                    className="form-check-input"
                                    type="radio"
                                    id="gate_no3"
                                    hidden
                                    onChange={() => {
                                      setGateNo("3");
                                      setLaneNo("1");
                                    }}
                                  />
                                  <b
                                    className={`fs-6  ${
                                      gate_no == "3" ? "text-primary" : ""
                                    } `}
                                  >
                                    Gate 3
                                  </b>
                                </label>
                              </div>
                            </div>
                            <div className="col-12">
                              <hr className="mb-1" />
                              <h6 className="mb-2"> Lane 2 </h6>
                            </div>
                            <div className="col-5">
                              <div
                                className={`form-check custom-option custom-option-label custom-option-basic ${
                                  gate_no == "4" ? "checked" : ""
                                } `}
                              >
                                <label
                                  className="form-check-label custom-option-content text-center p-3"
                                  htmlFor="gate_no4"
                                >
                                  <input
                                    name="gate_no"
                                    className="form-check-input"
                                    type="radio"
                                    id="gate_no4"
                                    hidden
                                    onChange={() => {
                                      setGateNo("4");
                                      setLaneNo("2");
                                    }}
                                  />
                                  <b
                                    className={`fs-6 ${
                                      gate_no == "4" ? "text-primary" : ""
                                    } `}
                                  >
                                    Gate 4
                                  </b>
                                </label>
                              </div>
                            </div>
                            <div className="col-5">
                              <div
                                className={`form-check custom-option custom-option-label custom-option-basic  ${
                                  gate_no == "5" ? "checked" : ""
                                } `}
                              >
                                <label
                                  className="form-check-label custom-option-content text-center p-3"
                                  htmlFor="gate_no5"
                                >
                                  <input
                                    name="gate_no"
                                    className="form-check-input"
                                    type="radio"
                                    id="gate_no5"
                                    hidden
                                    onChange={() => {
                                      setGateNo("5");
                                      setLaneNo("2");
                                    }}
                                  />
                                  <b
                                    className={`fs-6 ${
                                      gate_no == "5" ? "text-primary" : ""
                                    } `}
                                  >
                                    Gate 5
                                  </b>
                                </label>
                              </div>
                            </div>
                            <div className="col-12">
                              <hr />
                            </div>
                            <div className="col-5">
                              <div
                                className={`form-check custom-option custom-option-label custom-option-basic  ${
                                  gate_no == "1" ? "checked" : ""
                                } `}
                              >
                                <label
                                  className="form-check-label custom-option-content text-center p-3"
                                  htmlFor="gate_no1"
                                >
                                  <input
                                    name="gate_no"
                                    className="form-check-input"
                                    type="radio"
                                    id="gate_no1"
                                    hidden
                                    onChange={() => {
                                      setGateNo("1");
                                      setLaneNo("");
                                    }}
                                  />
                                  <b
                                    className={`fs-6 ${
                                      gate_no == "1" ? "text-primary" : ""
                                    } `}
                                  >
                                    Gate 1
                                  </b>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 ">
                            <div className="card-body p-0 py-1 text-center pe-1 bg-label-secondary ">
                              {gate_no ? (
                                <Link
                                  to={`/GateIN?gate_no=${gate_no}&lane_no=${lane_no}`}
                                  className="btn m-0 w-100 fw-bold fs-5"
                                >
                                  Proceed
                                </Link>
                              ) : (
                                <button
                                  className="btn m-0 w-100 fw-bold fs-5"
                                  disabled
                                >
                                  Proceed
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : type == "OUT" ? (
                  <div className="row align-items-center position-relative">
                    <div className={`text-center col-md-5 col-sm-5 mt-12`}>
                      <img
                        src="/assets/images/isometric-vehicle.png"
                        className="w-100"
                        style={{ transform: "scaleX(-1)" }}
                        alt=""
                      />
                    </div>
                    <div className="col-md-6 col-sm-7  position-absolute top-0 end-0 me-8">
                      <div className="card">
                        <div className="card-body border-bottom py-2 px-1">
                          <h4 className="m-0 text-center">
                            Select Gate Number
                          </h4>
                        </div>
                        <div className="card-body border-bottom py-2 pe-0">
                          <h6 className="my-2"> Lane 1 </h6>
                          <div className="row">
                            <div className="col-5">
                              <div
                                className={`form-check custom-option custom-option-label custom-option-basic  ${
                                  gate_no == "1" ? "checked" : ""
                                } `}
                              >
                                <label
                                  className="form-check-label custom-option-content text-center p-3"
                                  htmlFor="gate_no1"
                                >
                                  <input
                                    name="gate_no"
                                    className="form-check-input"
                                    type="radio"
                                    id="gate_no1"
                                    hidden
                                    onChange={() => {
                                      setGateNo("1");
                                      setLaneNo("");
                                    }}
                                  />
                                  <b
                                    className={`fs-6 ${
                                      gate_no == "1" ? "text-primary" : ""
                                    } `}
                                  >
                                    Gate 1
                                  </b>
                                </label>
                              </div>
                            </div>
                            <div className="col-5">
                              <div
                                className={`form-check custom-option custom-option-label custom-option-basic ${
                                  gate_no == "2" ? "checked" : ""
                                } `}
                              >
                                <label
                                  className="form-check-label custom-option-content text-center p-3"
                                  htmlFor="gate_no2"
                                >
                                  <input
                                    name="gate_no"
                                    className="form-check-input"
                                    type="radio"
                                    id="gate_no2"
                                    hidden
                                    onChange={() => {
                                      setGateNo("2");
                                      setLaneNo("1");
                                    }}
                                  />
                                  <b
                                    className={`fs-6  ${
                                      gate_no == "2" ? "text-primary" : ""
                                    } `}
                                  >
                                    Gate 2
                                  </b>
                                </label>
                              </div>
                            </div>

                            <div className="col-12">
                              <hr className="mb-1" />
                              <h6 className="mb-2"> Lane 2 </h6>
                            </div>
                            <div className="col-5 mb-2">
                              <div
                                className={`form-check custom-option custom-option-label custom-option-basic  ${
                                  gate_no == "3" ? "checked" : ""
                                }  `}
                              >
                                <label
                                  className="form-check-label custom-option-content text-center p-3"
                                  htmlFor="gate_no3"
                                >
                                  <input
                                    name="gate_no"
                                    className="form-check-input"
                                    type="radio"
                                    id="gate_no3"
                                    hidden
                                    onChange={() => {
                                      setGateNo("3");
                                      setLaneNo("1");
                                    }}
                                  />
                                  <b
                                    className={`fs-6  ${
                                      gate_no == "3" ? "text-primary" : ""
                                    } `}
                                  >
                                    Gate 3
                                  </b>
                                </label>
                              </div>
                            </div>
                            <div className="col-5 mb-2">
                              <div
                                className={`form-check custom-option custom-option-label custom-option-basic ${
                                  gate_no == "4" ? "checked" : ""
                                } `}
                              >
                                <label
                                  className="form-check-label custom-option-content text-center p-3"
                                  htmlFor="gate_no4"
                                >
                                  <input
                                    name="gate_no"
                                    className="form-check-input"
                                    type="radio"
                                    id="gate_no4"
                                    hidden
                                    onChange={() => {
                                      setGateNo("4");
                                      setLaneNo("2");
                                    }}
                                  />
                                  <b
                                    className={`fs-6 ${
                                      gate_no == "4" ? "text-primary" : ""
                                    } `}
                                  >
                                    Gate 4
                                  </b>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 ">
                            <div className="card-body p-0 py-1 text-center pe-1 bg-label-secondary ">
                              {gate_no ? (
                                <Link
                                  to={`/GateOUT?gate_no=${gate_no}&lane_no=${lane_no}`}
                                  className="btn m-0 w-100 fw-bold fs-5"
                                >
                                  Proceed
                                </Link>
                              ) : (
                                <button
                                  className="btn m-0 w-100 fw-bold fs-5"
                                  disabled
                                >
                                  Proceed
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="container">
                    <div className="row justify-content-around text-center mt-5 gap-5">
                      <div className="col-4">
                        <div
                          className="d-flex flex-column align-items-center"
                          onClick={() => setType("IN")}
                        >
                          <div
                            className="card d-flex justify-content-center align-items-center border border-3 border-primary rounded"
                            style={{
                              width: "250px",
                              height: "250px",
                              cursor: "pointer",
                            }}
                          >
                            <span
                              className="badge bg-primary"
                              style={{
                                padding: "20px 30px",
                                fontSize: "16px",
                              }}
                            >
                              IN
                            </span>
                          </div>
                          <p className="mt-3 fw-bold">GATE IN</p>
                        </div>
                      </div>

                      <div className="col-4">
                        <div
                          className="d-flex flex-column align-items-center"
                          onClick={() => setType("OUT")}
                        >
                          <div
                            className="card d-flex justify-content-center align-items-center border border-3 border-primary rounded"
                            style={{
                              width: "250px",
                              height: "250px",
                              cursor: "pointer",
                            }}
                          >
                            <span
                              className="badge bg-primary"
                              style={{
                                padding: "20px 30px",
                                fontSize: "16px",
                              }}
                            >
                              OUT
                            </span>
                          </div>
                          <p className="mt-3 fw-bold">GATE OUT</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* <button
                  className={`btn btn-label-danger position-absolute bottom-0 mb-2 start-10 "`}
                >
                  <span className="fs-6 me-1">&times; </span> Cancel Survey
                </button> */}
              </div>

              <Footer />
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
        <div className="drag-target"></div>
      </div>
    </>
  );
}
