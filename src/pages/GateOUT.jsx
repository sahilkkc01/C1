import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./main/header";
import Footer from "./main/footer";
import Nav from "./main/nav";
import { Html5Qrcode } from "html5-qrcode";
import Swal from "sweetalert2";
import "../App.css";

export default function GateOUT() {
  const type = "IN";
  const [showScreen, setShowScreen] = useState("Gate");
  const [gate_no, setGateNo] = useState(null);
  const [line_no, setLineNo] = useState(null);
  const [permit, setPermit] = useState(false);
  const [isSpecialPermit, setIsSpecialPermit] = useState(false);
  const [specialPermit, setSpecialPermit] = useState(null);
  const [isContainer, setIsContainer] = useState(false);
  const [container, setContainer] = useState("");
  const [containerType, setContainerType] = useState(null);

  const [rearSideDamage, setRearSideDamage] = useState(null);
  const [leftSideDamage, setLeftSideDamage] = useState(null);
  const [frontSideDamage, setFrontSideDamage] = useState(null);
  const [rightSideDamage, setRightSideDamage] = useState(null);
  const [topSideDamage, setTopSideDamage] = useState(null);

  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [Error, setError] = useState("");

  let html5QrCode;
  const stopQrScanner = () => {
    if (html5QrCode) {
      html5QrCode
        .stop()
        .then(() => {
          console.log("QR scanner stopped.");
          setIsScanning(false);
        })
        .catch((err) => {
          console.error("Error stopping the QR scanner:", err);
        });
    }
  };
  const startQrScanner = () => {
    // alert('start');
    setIsScanning(true);
    if (!html5QrCode) {
      html5QrCode = new Html5Qrcode("reader");
    }

    // Check if navigator.mediaDevices is available

    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          // Check if we have an environment (rear) camera
          const environmentCamera = devices.find(
            (device) =>
              device.kind === "videoinput" && device.facing === "environment"
          );

          const constraints = environmentCamera
            ? { deviceId: { exact: environmentCamera.deviceId } }
            : { facingMode: "environment" }; // Use 'environment' to access the rear camera on mobile devices

          // Start QR scanner with constraints
          html5QrCode
            .start(
              constraints,
              { fps: 10, qrbox: { width: 250, height: 250 } },
              (decodedText) => {
                // Handle scanned data
                setScannedData(decodedText);
                setIsScanning(false);
                html5QrCode.stop();
              },
              (errorMessage) => {
                console.error("ScanningError:", errorMessage);
                setError("ScanningError:", errorMessage);
                // Swal.fire({
                //   icon: "error",
                //   text: errorMessage,
                //   timer: 1500,
                //   customClass: {
                //     popup: 'custom-swal-popup' // Add a custom class
                //   }
                // });
              }
            )
            .catch((err) => {
              Swal.fire({
                icon: "error",
                text: `Error starting QR scanner` + err,
                timer: 1500,
                customClass: {
                  popup: "custom-swal-popup", // Add a custom class
                },
              });
              console.error("Error starting QR scanner:", err);
              setError("Error starting QR scanner:", err);
              setIsScanning(false);
            });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            text: `Error starting QR scanner` + err,
            timer: 1500,
            customClass: {
              popup: "custom-swal-popup", // Add a custom class
            },
          });
          console.error("Error enumerating devices:", err);
          setError("Error enumerating devices: ", err);

          setIsScanning(false);
        });
    } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Fallback for older browsers or if enumerateDevices doesn't work
      const constraints = { video: { facingMode: "environment" } };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          // Start QR scanner with the video stream
          html5QrCode
            .start(
              { facingMode: "environment" },
              { fps: 10, qrbox: { width: 250, height: 250 } },
              (decodedText) => {
                // Handle scanned data
                setScannedData(decodedText);
                setIsScanning(false);
                html5QrCode.stop();
              },
              (errorMessage) => {
                console.error("ScanningError:", errorMessage);
                // Swal.fire({
                //   icon: "error",
                //   text: errorMessage,
                //   timer: 1500,
                //   customClass: {
                //     popup: 'custom-swal-popup' // Add a custom class
                //   }
                // });
              }
            )
            .catch((err) => {
              Swal.fire({
                icon: "error",
                text: `Error starting QR scanner` + err,
                timer: 1500,
                customClass: {
                  popup: "custom-swal-popup", // Add a custom class
                },
              });
              console.error("Error starting QR scanner:", err);

              setError("Error starting QR scanner: ", err);
              setIsScanning(false);
            });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            text: `Error accessing the camera` + err,
            timer: 1500,
            customClass: {
              popup: "custom-swal-popup", // Add a custom class
            },
          });
          console.error("Error accessing the camera:", err);
          setError("Error accessing the camera: ", err);

          setIsScanning(false);
        });
    } else {
      Swal.fire({
        icon: "error",
        text: `Media devices are not supported on this device.`,
        timer: 1500,
        customClass: {
          popup: "custom-swal-popup", // Add a custom class
        },
      });
      console.error("Media devices are not supported on this device.");
      setError("Media devices are not supported on this device ");
      setIsScanning(false);
    }
  };


  const handleFormSubmit =(e) =>{
    e.preventDefault();
    alert('Submit');
    console.log(e);
    let payload = {
        type: type,
        gate_no: gate_no,
        line_no:line_no,
        permit_no:permit,
      };

  }
  return (
    <>
      <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
        <div class="layout-container">
          <Nav />
          <div className="layout-page">
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <form className="row align-items-center position-relative" onSubmit={handleFormSubmit}>
                  <div className={`text-center col-md-5 col-sm-5 mt-12`}>
                    <img
                      src="/assets/images/isometric-vehicle.png"
                      className="w-100"
                      style={{ transform: "scaleX(-1)" }}
                      alt=""
                    />

                    {/* <img
                      src="/assets/images/truck.png"
                      className="w-100"
                      style={{ transform: "scaleX(-1) " }}
                      alt=""
                    /> */}
                    {/* <img
                        src="/assets/images/file.png"
                        className="w-100 m-auto"
                        style={{ transform: " rotate(0deg)" }}
                        alt=""
                      /> */}

                    {/* <img
                        src="/assets/images/19962572_6184623.jpg"
                        className="w-100 m-auto rounded-3"
                        style={{ transform: " rotate(0deg)" }}
                        alt=""
                      /> */}
                  </div>
                  <div className="col-md-6 col-sm-7  position-absolute top-0 end-0 me-8">
                    {showScreen && showScreen == "Gate" ? (
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
                                      setLineNo("1");
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
                                      setLineNo("1");
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
                                      setLineNo("2");
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
                                      setLineNo("2");
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
                                      setLineNo("");
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
                              <button
                              type="button"
                                className="btn m-0  w-100 fw-bold fs-5"
                                disabled={!gate_no}
                                onClick={() => setShowScreen("Vehicles")}
                              >
                                Proceed
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : showScreen == "Vehicles" ? (
                      <div className="card">
                        <div className="card-body border-bottom">
                          <h4 className="m-0">Vehicles</h4>
                        </div>
                        <div className="card-body border-bottom">
                          <div className="d-flex align-items-center gap-3 flex-row overflow-scroll pb-3 no-scrollbar">
                            <div className="col-md-6">
                              <div className="card">
                                <img
                                  src="https://5.imimg.com/data5/SELLER/Default/2023/3/294563822/GR/YN/WP/2617956/14inch-3mm-vehicle-number-plate.jpg"
                                  className="card-img-top"
                                  alt="..."
                                />
                                <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center">
                                <h5 className="card-title">TN88F4089 </h5>
                                <button type="button" className="btn btn-sm btn-label-primary">
                                <i class="ri-edit-circle-fill"></i>
                                </button>
                                </div>
                                  <button type="button"
                                    className="btn btn-sm btn-label-primary"
                                    onClick={() => setShowScreen("Permit")}
                                  >
                                    Start Survey
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="card">
                                <img
                                  src="https://5.imimg.com/data5/SELLER/Default/2023/3/294563822/GR/YN/WP/2617956/14inch-3mm-vehicle-number-plate.jpg"
                                  className="card-img-top"
                                  alt="..."
                                />
                                <div className="card-body">
                                  <h5 className="card-title">TN88F4089</h5>
                                  <button type="button"
                                    className="btn btn-sm btn-label-primary"
                                    onClick={() => setShowScreen("Permit")}
                                  >
                                    Start Survey
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="card">
                                <img
                                  src="https://5.imimg.com/data5/SELLER/Default/2023/3/294563822/GR/YN/WP/2617956/14inch-3mm-vehicle-number-plate.jpg"
                                  className="card-img-top"
                                  alt="..."
                                />
                                <div className="card-body">
                                  <h5 className="card-title">TN88F4089</h5>
                                  <button type="button"
                                    className="btn btn-sm btn-label-primary"
                                    onClick={() => setShowScreen("Permit")} >
                                    Start Survey
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="card-body p-0 py-1 text-center bg-label-secondary ">
                              <button  type="button"
                                className="btn m-0  w-100"
                                onClick={() => setShowScreen("Gate")}  >
                                Back 
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="card">
                        <div className="card-body border-bottom">
                          <h5 className="m-0">Driver Information</h5>
                          <hr className="my-2" />
                          <div className="row align-items-center justify-contact-between">
                            <div className="col-4">
                              <label
                                htmlFor="DriverPhoto"
                                className="btn btn-secondary btn-sm"
                              >
                                <i className="ri-camera-line me-1"></i> Driver Photo
                              </label>
                              <input
                                type="file"
                                id="DriverPhoto"
                                name="driver_photo"
                                className="d-none "
                                accept="image/*"
                                capture="environment"
                              />
                            </div>
                            <div className="col-4">
                              <label
                                htmlFor="DriverLicense"
                                className="btn btn-secondary btn-sm"
                              >
                                <i className="ri-camera-line me-1"></i> Driver License
                              </label>
                              <input
                                type="file"
                                id="DriverLicense"
                                className="d-none "
                                 name="driver_license"
                                accept="image/*"
                                capture="environment"
                              />
                            </div>
                            <div className="col-4">
                              <label
                                htmlFor="EBill"
                                className="btn btn-secondary btn-sm"
                              >
                                <i className="ri-camera-line me-1"></i> E Bill
                              </label>
                              <input
                                type="file"
                                id="EBill"
                                className="d-none "
                                 name="driver_e_bill"
                                accept="image/*"
                                capture="environment"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card-body border-bottom">
                          <div className="row align-items-end">
                            <div className="col-12 mb-4">
                              <div className="d-flex gap-4 justify-content-between align-items-center">
                                <div className="w-100">
                                  <h5 className="m-0">Permit Number</h5>
                                  <input
                                    type="text"
                                    className="form-control p-2 fs-6 mb-2"
                                    placeholder="e.g. PMA2007040012"
                                    name="permit_no"
                                    // onKeyUp={(e)=>setPermit(e.target.value)}
                                    defaultValue={scannedData}
                                  />
                                  <span className="mt-2">
                                    Today , 12 jan 2025
                                  </span>
                                </div>
                                <button type="button"
                                  className="btn btn-sm btn-label-secondary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#QrScanBox"
                                  onClick={startQrScanner}
                                >
                                  <i className="ri-camera-line fs-4"></i>
                                </button>
                              </div>
                            </div>

                            <div className="col-12 mb-1">
                              <div class="form-check align-items-center">
                                <input
                                  class="form-check-input rounded-circle fs-6 me-2"
                                  type="checkbox"
                                  id="flexCheck"
                                  onChange={() =>
                                    setIsSpecialPermit(!isSpecialPermit)
                                  }
                                />
                                <label
                                  class="form-check-label fs-6"
                                  htmlFor="flexCheck"
                                >
                                  Special Permit
                                </label>
                              </div>
                              {isSpecialPermit && (
                                <div className="">
                                  <label
                                    htmlFor="special_permit"
                                    className="btn btn-secondary"
                                  >
                                    <i className="ri-camera-line me-2"></i>{" "}
                                    Special Permit
                                  </label>
                                  <input
                                    type="file"
                                    id="special_permit"
                                    className="d-none "
                                    accept="image/*"
                                    capture="environment"
                                  />
                                </div>
                              )}
                            </div>
                            <hr />
                            <div className="col-md-12">
                              <div class="form-check align-items-center">
                                <input
                                  class="form-check-input rounded-circle fs-6 me-2"
                                  type="checkbox"
                                  id="isContainer"
                                  name="is_container"
                                  value="YES"
                                  onChange={() => setIsContainer(!isContainer)}
                                /> 
                                <label
                                  class="form-check-label h5 mb-0"
                                  htmlFor="isContainer"
                                >
                                  Is Container
                                </label>
                              </div>
                              {isContainer && (
                                <>
                                  <div className="row ps-5">
                                    <div className="col-2">
                                      <div
                                        className={`form-check custom-option custom-option-label custom-option-basic ${
                                          container == "1" ? "checked" : ""
                                        } `}
                                      >
                                        <label
                                          className="form-check-label custom-option-content text-center p-2"
                                          htmlFor="container1"
                                        >
                                          <input
                                            name="container"
                                            className="form-check-input"
                                            type="radio"
                                            id="container1"
                                            hidden
                                            onChange={() => {
                                              setContainer("1");
                                            }}
                                          />
                                          <b
                                            className={`fs-6  ${
                                              container == "1"
                                                ? "text-primary"
                                                : ""
                                            } `}
                                          >
                                            1
                                          </b>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-2">
                                      <div
                                        className={`form-check custom-option custom-option-label custom-option-basic  ${
                                          container == "2" ? "checked" : ""
                                        }  `}
                                      >
                                        <label
                                          className="form-check-label custom-option-content text-center p-2"
                                          htmlFor="container2"
                                        >
                                          <input
                                            name="container"
                                            className="form-check-input"
                                            type="radio"
                                            id="container2"
                                            hidden
                                            onChange={() => {
                                              setContainer("2");
                                            }}
                                          />
                                          <b
                                            className={`fs-6  ${
                                              container == "2"
                                                ? "text-primary"
                                                : ""
                                            } `}
                                          >
                                            2
                                          </b>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <h5 className="mt-3 mb-1">
                                      Container Type
                                    </h5>
                                    <div className="col-4">
                                      <div
                                        className={`form-check custom-option custom-option-label custom-option-basic ${
                                          containerType == "Laden"
                                            ? "checked"
                                            : ""
                                        } `}
                                      >
                                        <label
                                          className="form-check-label custom-option-content text-center p-2"
                                          htmlFor="Laden"
                                        >
                                          <input
                                            name="containerType"
                                            className="form-check-input"
                                            type="radio"
                                            id="Laden"
                                            hidden
                                            onChange={() => {
                                              setContainerType("Laden");
                                            }}
                                          />
                                          <b
                                            className={`fs-6  ${
                                              containerType == "Laden"
                                                ? "text-primary"
                                                : ""
                                            } `}
                                          >
                                            Laden
                                          </b>
                                        </label>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <div
                                        className={`form-check custom-option custom-option-label custom-option-basic  ${
                                          containerType == "Empty"
                                            ? "checked"
                                            : ""
                                        }  `}
                                      >
                                        <label
                                          className="form-check-label custom-option-content text-center p-2"
                                          htmlFor="Empty"
                                        >
                                          <input
                                            name="containerType"
                                            className="form-check-input"
                                            type="radio"
                                            id="Empty"
                                            hidden
                                            onChange={() => {
                                              setContainerType("Empty");
                                            }}
                                          />
                                          <b
                                            className={`fs-6  ${
                                              containerType == "Empty"
                                                ? "text-primary"
                                                : ""
                                            } `}
                                          >
                                            Empty
                                          </b>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row my-3">
                                    {containerType == "Laden" && (
                                      <div className="">
                                        <label
                                          htmlFor="SealImage"
                                          className="btn btn-secondary"
                                        >
                                          <i className="ri-camera-line me-2"></i>
                                          Seal Image
                                        </label>
                                        <input
                                          type="file"
                                          id="SealImage"
                                          className="d-none "
                                          accept="image/*"
                                          capture="environment"
                                        />
                                      </div>
                                    )}
                                    {containerType === "Empty" &&
                                      (container === "1" ? (
                                        <div>
                                          <label
                                            htmlFor="containerImage1"
                                            className="btn btn-secondary"
                                          >
                                            <i className="ri-camera-line me-2"></i>
                                            Add Photo
                                          </label>
                                          <input
                                            type="file"
                                            id="containerImage1"
                                            className="d-none"
                                            accept="image/*"
                                            capture="environment"
                                          />
                                        </div>
                                      ) : (
                                        <div className="d-flex gap-5 align-items-center">
                                          <div>
                                            <label
                                              htmlFor="containerImage1"
                                              className="btn btn-secondary"
                                            >
                                              <i className="ri-camera-line me-2"></i>
                                              Add Photo
                                            </label>
                                            <input
                                              type="file"
                                              id="containerImage1"
                                              className="d-none"
                                              accept="image/*"
                                              capture="environment"
                                            />
                                          </div>
                                          <div>
                                            <label
                                              htmlFor="containerImage2"
                                              className="btn btn-secondary"
                                            >
                                              <i className="ri-camera-line me-2"></i>
                                              Add Photo
                                            </label>
                                            <input
                                              type="file"
                                              id="containerImage2"
                                              className="d-none"
                                              accept="image/*"
                                              capture="environment"
                                            />
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                  <hr />
                                  <div className="row my-3">
                                    <h5 className="mb-0">Container Health</h5>
                                    <div className="col-md-12 mt-1">
                                      <p className="my-1">Rear Side Damage</p>
                                      <div className="row">
                                        <div className="col-3">
                                          <div
                                            className={`form-check custom-option custom-option-label custom-option-basic ${
                                              rearSideDamage == "YES"
                                                ? "checked"
                                                : ""
                                            } `}
                                          >
                                            <label
                                              className="form-check-label custom-option-content text-center p-2"
                                              htmlFor="rearSideDamageYes"
                                            >
                                              <input
                                                name="rearSideDamage"
                                                className="form-check-input"
                                                type="radio"
                                                id="rearSideDamageYes"
                                                hidden
                                                onChange={() => {
                                                  setRearSideDamage("YES");
                                                }}
                                              />
                                              <b
                                                className={`fs-6  ${
                                                  rearSideDamage == "YES"
                                                    ? "text-primary"
                                                    : ""
                                                } `}
                                              >
                                                YES
                                              </b>
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-3">
                                          <div
                                            className={`form-check custom-option custom-option-label custom-option-basic  ${
                                              rearSideDamage == "No"
                                                ? "checked"
                                                : ""
                                            }  `}
                                          >
                                            <label
                                              className="form-check-label custom-option-content text-center p-2"
                                              htmlFor="rearSideDamageNo"
                                            >
                                              <input
                                                name="rearSideDamage"
                                                className="form-check-input"
                                                type="radio"
                                                id="rearSideDamageNo"
                                                hidden
                                                onChange={() => {
                                                  setRearSideDamage("NO");
                                                }}
                                              />
                                              <b
                                                className={`fs-6  ${
                                                  rearSideDamage == "NO"
                                                    ? "text-primary"
                                                    : ""
                                                } `}
                                              >
                                                NO
                                              </b>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12 mt-1">
                                      <p className="my-1">Left Side Damage</p>
                                      <div className="row">
                                        <div className="col-3">
                                          <div
                                            className={`form-check custom-option custom-option-label custom-option-basic ${
                                              leftSideDamage == "YES"
                                                ? "checked"
                                                : ""
                                            } `}
                                          >
                                            <label
                                              className="form-check-label custom-option-content text-center p-2"
                                              htmlFor="leftSideDamageYes"
                                            >
                                              <input
                                                name="leftSideDamage"
                                                className="form-check-input"
                                                type="radio"
                                                id="leftSideDamageYes"
                                                hidden
                                                onChange={() => {
                                                  setLeftSideDamage("YES");
                                                }}
                                              />
                                              <b
                                                className={`fs-6  ${
                                                  leftSideDamage == "YES"
                                                    ? "text-primary"
                                                    : ""
                                                } `}
                                              >
                                                YES
                                              </b>
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-3">
                                          <div
                                            className={`form-check custom-option custom-option-label custom-option-basic  ${
                                              leftSideDamage == "No"
                                                ? "checked"
                                                : ""
                                            }  `}
                                          >
                                            <label
                                              className="form-check-label custom-option-content text-center p-2"
                                              htmlFor="leftSideDamageNo"
                                            >
                                              <input
                                                name="leftSideDamage"
                                                className="form-check-input"
                                                type="radio"
                                                id="leftSideDamageNo"
                                                hidden
                                                onChange={() => {
                                                  setLeftSideDamage("NO");
                                                }}
                                              />
                                              <b
                                                className={`fs-6  ${
                                                  leftSideDamage == "NO"
                                                    ? "text-primary"
                                                    : ""
                                                } `}
                                              >
                                                NO
                                              </b>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12 mt-1">
                                      <p className="my-1">Front Side Damage</p>
                                      <div className="row">
                                        <div className="col-3">
                                          <div
                                            className={`form-check custom-option custom-option-label custom-option-basic ${
                                              frontSideDamage == "YES"
                                                ? "checked"
                                                : ""
                                            } `}
                                          >
                                            <label
                                              className="form-check-label custom-option-content text-center p-2"
                                              htmlFor="frontSideDamageYes"
                                            >
                                              <input
                                                name="frontSideDamage"
                                                className="form-check-input"
                                                type="radio"
                                                id="frontSideDamageYes"
                                                hidden
                                                onChange={() => {
                                                  setFrontSideDamage("YES");
                                                }}
                                              />
                                              <b
                                                className={`fs-6  ${
                                                  frontSideDamage == "YES"
                                                    ? "text-primary"
                                                    : ""
                                                } `}
                                              >
                                                YES
                                              </b>
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-3">
                                          <div
                                            className={`form-check custom-option custom-option-label custom-option-basic  ${
                                              frontSideDamage == "No"
                                                ? "checked"
                                                : ""
                                            }  `}
                                          >
                                            <label
                                              className="form-check-label custom-option-content text-center p-2"
                                              htmlFor="frontSideDamageNo"
                                            >
                                              <input
                                                name="frontSideDamage"
                                                className="form-check-input"
                                                type="radio"
                                                id="frontSideDamageNo"
                                                hidden
                                                onChange={() => {
                                                  setFrontSideDamage("NO");
                                                }}
                                              />
                                              <b
                                                className={`fs-6  ${
                                                  frontSideDamage == "NO"
                                                    ? "text-primary"
                                                    : ""
                                                } `}
                                              >
                                                NO
                                              </b>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12 mt-1">
                                      <p className="my-1">Right Side Damage</p>
                                      <div className="row">
                                        <div className="col-3">
                                          <div
                                            className={`form-check custom-option custom-option-label custom-option-basic ${
                                              rightSideDamage == "YES"
                                                ? "checked"
                                                : ""
                                            } `}
                                          >
                                            <label
                                              className="form-check-label custom-option-content text-center p-2"
                                              htmlFor="rightSideDamageYes"
                                            >
                                              <input
                                                name="rightSideDamage"
                                                className="form-check-input"
                                                type="radio"
                                                id="rightSideDamageYes"
                                                hidden
                                                onChange={() => {
                                                  setRightSideDamage("YES");
                                                }}
                                              />
                                              <b
                                                className={`fs-6  ${
                                                  rightSideDamage == "YES"
                                                    ? "text-primary"
                                                    : ""
                                                } `}
                                              >
                                                YES
                                              </b>
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-3">
                                          <div
                                            className={`form-check custom-option custom-option-label custom-option-basic  ${
                                              rightSideDamage == "No"
                                                ? "checked"
                                                : ""
                                            }  `}
                                          >
                                            <label
                                              className="form-check-label custom-option-content text-center p-2"
                                              htmlFor="rightSideDamageNo"
                                            >
                                              <input
                                                name="rightSideDamage"
                                                className="form-check-input"
                                                type="radio"
                                                id="rightSideDamageNo"
                                                hidden
                                                onChange={() => {
                                                  setRightSideDamage("NO");
                                                }}
                                              />
                                              <b
                                                className={`fs-6  ${
                                                  rightSideDamage == "NO"
                                                    ? "text-primary"
                                                    : ""
                                                } `}
                                              >
                                                NO
                                              </b>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-12 mt-1">
                                      <p className="my-1">Top Side Damage</p>
                                      <div className="row">
                                        <div className="col-3">
                                          <div
                                            className={`form-check custom-option custom-option-label custom-option-basic ${
                                              topSideDamage == "YES"
                                                ? "checked"
                                                : ""
                                            } `}
                                          >
                                            <label
                                              className="form-check-label custom-option-content text-center p-2"
                                              htmlFor="topSideDamageYes"
                                            >
                                              <input
                                                name="topSideDamage"
                                                className="form-check-input"
                                                type="radio"
                                                id="topSideDamageYes"
                                                hidden
                                                onChange={() => {
                                                  setTopSideDamage("YES");
                                                }}
                                              />
                                              <b
                                                className={`fs-6  ${
                                                  topSideDamage == "YES"
                                                    ? "text-primary"
                                                    : ""
                                                } `}
                                              >
                                                YES
                                              </b>
                                            </label>
                                          </div>
                                        </div>
                                        <div className="col-3">
                                          <div
                                            className={`form-check custom-option custom-option-label custom-option-basic  ${
                                              topSideDamage == "No"
                                                ? "checked"
                                                : ""
                                            }  `}
                                          >
                                            <label
                                              className="form-check-label custom-option-content text-center p-2"
                                              htmlFor="topSideDamageNo"
                                            >
                                              <input
                                                name="topSideDamage"
                                                className="form-check-input"
                                                type="radio"
                                                id="topSideDamageNo"
                                                hidden
                                                onChange={() => {
                                                  setTopSideDamage("NO");
                                                }}
                                              />
                                              <b
                                                className={`fs-6  ${
                                                  topSideDamage == "NO"
                                                    ? "text-primary"
                                                    : ""
                                                } `}
                                              >
                                                NO
                                              </b>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 border-end pe-0 ">
                            <div
                              className="card-body p-0 py-1 text-center bg-label-secondary"
                              onClick={() => setShowScreen("Vehicles")}
                            >
                              <button className="btn m-0  w-100"  type="button">Back</button>
                            </div>
                          </div>
                          <div className="col-6 ps-0 ">
                            <div className="card-body p-0 py-1 text-center bg-label-primary ">
                              <button
                              type="submit"
                                className="btn m-0  w-100"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </form>

                <button
                  className={`btn btn-label-danger position-absolute bottom-0 mb-2 start-10 "`}
                >
                  <span className="fs-6 me-1">&times; </span> Cancel Survey
                </button>
              </div>

              <div
                className="modal fade"
                id="QrScanBox"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">
                        QR Scan
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={stopQrScanner}
                      />
                    </div>
                    <div className="modal-body">
                      <div className="row p-5">
                        <div className="col-md-6 m-auto text-center QrScanBox">
                          {isScanning ? (
                            "Scanning..."
                          ) : (
                            <div onClick={startQrScanner} disabled={isScanning}>
                              <img src="/camra.png" alt="" className="qrImg" />
                              <h4>Scan Permit</h4>
                            </div>
                          )}
                          {isScanning ? (
                            <>
                              <button
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={stopQrScanner}
                                className="btn btn-danger ms-3"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            ""
                          )}

                          <div
                            id="reader"
                            className="mt-3 m-auto"
                            style={{
                              width: "300px",
                              height: "300px",
                              display: isScanning ? "block" : "none",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={stopQrScanner}
                      >
                        Close
                      </button>
                    </div>
                  </div>
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
    </>
  );
}
