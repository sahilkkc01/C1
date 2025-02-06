import React, { useState, useEffect } from "react";
import Footer from "./main/footer";
import Nav from "./main/nav";
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";
import "../Pages.css";
import LinksButtons from "./main/LinksButtons";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Header from "./main/header";
import { formatToDateTime, formatToDateTimeLocal } from "./main/formatToDateTime";

export default function DTMSGate() {
  const navigate = useNavigate();
  const NewUser = localStorage.getItem("user");
  const user = JSON.parse(NewUser);
  const gate_no = "1";
  const type = "IN";
  const gate_name = "DTMS";

  const [preview, setPreview] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [disable, setDisable] = useState(false);

  const [Error, setError] = useState("");

  const [ID, setID] = useState(null);
  const [PermitNumber, setPermitNumber] = useState(null);
  const [ContainerNumber, setContainerNumber] = useState(null);
  const [ContainerSize, setContainerSize] = useState(null);
  const [ContainerType, setContainerType] = useState(null);
  const [ContainerStatus, setContainerStatus] = useState(null);
  const [IsPermitValid, setIsPermitValid] = useState(null);
  const [PermitDateTime, setPermitDateTime] = useState(null);
  const [VehicleNumber, setVehicleNumber] = useState(null);
  const [SlineCode, setSlineCode] = useState(null);
  const [CtrLifeNumber, setCtrLifeNumber] = useState(null);
  const [DamageStatus, setDamageStatus] = useState(null);
  const [LDD_MT_Flg, setLDD_MT_Flg] = useState(null);

  const [Transections, setTransactions] = useState([]);

  useEffect(() => {
    setReadOnly(true);
    setScannedData(null);
    setIsScanning(false);

    setCurrentPage(1);
    setDisable(false);

    setError("");

    setID(null);
    setPermitNumber(null);
    setContainerNumber(null);
    setContainerSize(null);
    setContainerType(null);
    setContainerStatus(null);
    setIsPermitValid(null);
    setPermitDateTime(null);
    setVehicleNumber(null);
    setSlineCode(null);
    setCtrLifeNumber(null);
    setDamageStatus(null);
    setLDD_MT_Flg(null);
  }, [preview]);

  useEffect(() => {
    LastTransection();
  }, []);

  const startQrScanner = () => {
    setIsScanning(true);
    const html5QrCode = new Html5Qrcode("reader");

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
                handleSubmit(decodedText);
                setPreview(true);
                setIsScanning(false);
                html5QrCode.stop();
              },
              (errorMessage) => {
                console.error("ScanningError:", errorMessage);
                // setError("ScanningError:", errorMessage);
              }
            )
            .catch((err) => {
              console.error("Error starting QR scanner:", err);
              setError("Error starting QR scanner:", err);
              setIsScanning(false);
            });
        })
        .catch((err) => {
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
                handleSubmit(decodedText);
                setPreview(true);
                setIsScanning(false);
                html5QrCode.stop();
              },
              (errorMessage) => {
                console.error("ScanningError:", errorMessage);
              }
            )
            .catch((err) => {
              console.error("Error starting QR scanner:", err);

              setError("Error starting QR scanner: ", err);
              setIsScanning(false);
            });
        })
        .catch((err) => {
          console.error("Error accessing the camera:", err);
          setError("Error accessing the camera: ", err);

          setIsScanning(false);
        });
    } else {
      console.error("Media devices are not supported on this device.");
      setError("Media devices are not supported on this device ");
      setIsScanning(false);
    }
  };

  const handlePermitNumber = (e) => {
    e.preventDefault();
    const PermitNumber = e.target.permit_no.value;
    setPreview(true);
    setIsScanning(false);
    handleSubmit(PermitNumber);
  };

  const handleSubmit = async (decodedText) => {
    const url = `https://ctas.live/backend/api/get/permit_detail/${decodedText}?gate_no=${gate_no}&type=${type}&created_by=${user.id}&gate_name=${gate_name}`;
    try {
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data && response.data.data) {
        const Data = response.data.data;

        setID(Data?.id);
        setPermitNumber(Data?.permit_no);
        setContainerNumber(Data?.container_no);
        setContainerSize(Data?.container_size);
        setContainerType(Data?.container_type);
        setContainerStatus(Data?.ContainerStatus);

        setIsPermitValid(formatToDateTimeLocal(Data?.IsPermitValid || ""));
        setPermitDateTime(formatToDateTimeLocal(Data?.PermitDateTime || ""));
        setCtrLifeNumber(formatToDateTimeLocal(Data?.CtrLifeNumber || ""));

        setVehicleNumber(Data?.vehicle_no);
        setSlineCode(Data?.SlineCode);
        setDamageStatus(Data?.is_container_damage);
        setLDD_MT_Flg(Data?.LDD_MT_Flg);
      } else {
        console.warn("No data found for the given input.");
      }
    } catch (error) {
      console.error("Error in Permit Data Fetch :", error);
      setError(
        `Error in Permit Data Fetch : ${
          error.response?.status || "Unknown"
        } - ${error.message}`
      );
    }
  };

  const handlePostSubmit = async () => {
    const url = `https://ctas.live/backend/api/gate_transection/update`;
    const payload = {
      id: ID,
      created_by: user.id,
      permit_no: PermitNumber,
      container_no: ContainerNumber,
      container_size: ContainerSize,
      vehicle_no: VehicleNumber,
      is_container_damage: DamageStatus,
    };

    try {
      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" }, // Config object
      });

      if (response.data && response.data.data) {
        Swal.fire({
          icon: "success",
          text: `Data Updated SuccessFully.`,
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          // if (DamageStatus && DamageStatus === "YES") {
          //   navigate(`/EIR/${PermitNumber}`);
          // } else {
            setPreview(false);
            LastTransection();
          // }
        });
      } else {
        Swal.fire({
          icon: "Info",
          text: `No message returned from the server.`,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const handleEdit = () => {
    setReadOnly(false);
    setDisable(true);
  };

  const handleCancelEdit = () => {
    setReadOnly(true);
    setDisable(false);
  };

  const LastTransection = async (decodedText) => {
    const url = `https://ctas.live/backend/api/gate/last_transections?gate_name=${gate_name}`;
    try {
      const response = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data && response.data.data) {
        setTransactions(response.data.data);
        // console.log("Response from server:", );
      }
    } catch (error) {
      setError(
        `Error in Permit Data Fetch : ${
          error.response?.status || "Unknown"
        } - ${error.message}`
      );
    }
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
                <LinksButtons />

                <div className="row">
                  <div className="col-md-10 m-auto">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            {Error && (
                              <div
                                className="alert alert-danger mt-3"
                                role="alert"
                              >
                                {Error}
                              </div>
                            )}
                            <h4 className="text-primary">DTMS Gate Application</h4>
                          </div>
                          {!preview && (
                            <>
                              <div className="col-md-12 mb-2">
                                <div className="col-md-4 m-auto text-center QrScanBox">
                                  {isScanning ? (
                                    "Scanning..."
                                  ) : (
                                    <div
                                      onClick={startQrScanner}
                                      disabled={isScanning}
                                    >
                                      <img
                                        src="/camra.png"
                                        alt=""
                                        className="qrImg"
                                      />
                                      <h4>Scan Permit</h4>
                                    </div>
                                  )}
                                  {isScanning ? (
                                    <>
                                      <a
                                        href="?"
                                        className="btn btn-danger ms-3"
                                      >
                                        Cancel
                                      </a>
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
                              <h4 className="text-center">Or</h4>
                              <div className="col-md-6 m-auto">
                                <form
                                  action=""
                                  className="d-flex gap-3 align-items-center"
                                  onSubmit={handlePermitNumber}
                                >
                                  <div className="w-75">
                                    <div className="form-floating form-floating-outline">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Permit No."
                                        name="permit_no"
                                        required=""
                                      />
                                      <label htmlFor="email"> Permit No.</label>
                                    </div>
                                  </div>
                                  <div className="">
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      Submit
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </>
                          )}
                          {preview && (
                            <>
                              <hr />
                              <div className="row p-5">
                                <div className="col-sm-6 mb-4">
                                  <div className="form-floating form-floating-outline">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="Permit"
                                      readOnly={true}
                                      disabled={disable}
                                      defaultValue={PermitNumber}
                                    />
                                    <label htmlFor="Permit">
                                      Permit Number
                                    </label>
                                  </div>
                                </div>
                                <div className="col-sm-6 mb-4">
                                  <div className="form-floating form-floating-outline">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="Container"
                                      readOnly={readOnly}
                                      defaultValue={ContainerNumber}
                                      onKeyUp={(e) =>
                                        setContainerNumber(e.target.value)
                                      }
                                      onChange={(e) =>
                                        setContainerNumber(e.target.value)
                                      }
                                    />
                                    <label htmlFor="Container">
                                      Container Number
                                    </label>
                                  </div>
                                </div>

                                <div className="col-sm-6 mb-4">
                                  <div className="form-floating form-floating-outline">
                                    <input
                                      type="text"
                                      className="form-control"
                                      readOnly={readOnly}
                                      defaultValue={ContainerSize}
                                      onKeyUp={(e) =>
                                        setContainerSize(e.target.value)
                                      }
                                      onChange={(e) =>
                                        setContainerSize(e.target.value)
                                      }
                                    />
                                    <label htmlFor="">Container Size</label>
                                  </div>
                                </div>
                                <div className="col-sm-6 mb-4">
                                  <div className="form-floating form-floating-outline">
                                    <input
                                      type="text"
                                      className="form-control"
                                      readOnly={true}
                                      disabled={disable}
                                      defaultValue={ContainerType}
                                    />
                                    <label htmlFor="">Container Type</label>
                                  </div>
                                </div>
                                <div className="col-sm-6 mb-4">
                                  <div className="form-floating form-floating-outline">
                                    <input
                                      type="text"
                                      className="form-control"
                                      readOnly={true}
                                      disabled={disable}
                                      defaultValue={ContainerStatus}
                                    />
                                    <label htmlFor="">Container Status</label>
                                  </div>
                                </div>
                                <div className="col-sm-6 mb-4">
                                  <div className="form-floating form-floating-outline">
                                    <input
                                      type="datetime-local"
                                      className="form-control"
                                      readOnly={true}
                                      disabled={disable}
                                      defaultValue={IsPermitValid}
                                    />
                                    <label htmlFor="">Is Permit Valid </label>
                                  </div>
                                </div>
                                <div className="col-sm-6 mb-4">
                                  <div className="form-floating form-floating-outline">
                                    <input
                                      type="datetime-local"
                                      className="form-control"
                                      readOnly={true}
                                      disabled={disable}
                                      defaultValue={PermitDateTime}
                                    />
                                    <label htmlFor="">Permit Date Time</label>
                                  </div>
                                </div>
                                <div className="col-sm-6 mb-4">
                                  <div className="form-floating form-floating-outline">
                                    <input
                                      type="text"
                                      className="form-control"
                                      required
                                      readOnly={readOnly}
                                      defaultValue={VehicleNumber}
                                      onKeyUp={(e) =>
                                        setVehicleNumber(e.target.value)
                                      }
                                      onChange={(e) =>
                                        setVehicleNumber(e.target.value)
                                      }
                                    />
                                    <label htmlFor="">Vehicle Number</label>
                                  </div>
                                </div>
                                <div className="col-sm-6 mb-4">
                                  <div className="form-floating form-floating-outline">
                                    <input
                                      type="datetime-local"
                                      className="form-control"
                                      readOnly={true}
                                      disabled={disable}
                                      defaultValue={CtrLifeNumber}
                                    />
                                    <label htmlFor="">Ctr Life Number</label>
                                  </div>
                                </div>
                                {readOnly && (
                                  <div className="col-sm-6 mb-4">
                                    <div className="form-floating form-floating-outline">
                                      <input
                                        type="text"
                                        className="form-control"
                                        readOnly={readOnly}
                                        defaultValue={DamageStatus}
                                      />
                                      <label htmlFor="">Damage Status</label>
                                    </div>
                                  </div>
                                )}
                                {!readOnly && (
                                  <div className="col-sm-6 mb-4">
                                    <label htmlFor="">Damage Status</label>
                                    <div className="d-flex gap-2 my-2">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="damage"
                                          id="YES"
                                          checked={DamageStatus === "YES"}
                                          onChange={() =>
                                            setDamageStatus("YES")
                                          }
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="YES"
                                        >
                                          Yes
                                        </label>
                                      </div>
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="damage"
                                          id="NO"
                                          checked={DamageStatus === "NO"}
                                          onChange={() => setDamageStatus("NO")}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="NO"
                                        >
                                          No
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div className="col-sm-6 mb-4">
                                  <div className="form-floating form-floating-outline">
                                    <input
                                      type="text"
                                      className="form-control"
                                      readOnly={true}
                                      disabled={disable}
                                      defaultValue={LDD_MT_Flg}
                                    />
                                    <label htmlFor="">LDD_MT_Flg</label>
                                  </div>
                                </div>
                                <div className="col-md-12 d-flex gap-3">
                                  <button
                                    className="btn btn-label-primary"
                                    onClick={handlePostSubmit}
                                  >
                                    Submit
                                  </button>
                                  {readOnly && (
                                    <button
                                      className="btn btn-label-info"
                                      onClick={handleEdit}
                                    >
                                      Edit
                                    </button>
                                  )}
                                  {!readOnly && (
                                    <button
                                      className="btn btn-label-danger"
                                      onClick={handleCancelEdit}
                                    >
                                      Cancel Edit
                                    </button>
                                  )}

                                  <button
                                    onClick={() => {
                                      setPreview(false);
                                      setReadOnly(true);
                                    }}
                                    className="btn btn-danger ms-auto"
                                  >
                                    Scan Another Permit
                                  </button>
                                </div>
                              </div>
                              {/* </div>
                              </div> */}
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="card mt-4 p-3">
                      <div className="">
                        <h5>Last Transactions</h5>
                        <div className="table-responsive">
                          <table className="table table-striped table-hover">
                            <thead>
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col">Type</th>
                                <th scope="col">Permit No</th>
                                <th scope="col">Vehicle No</th>
                                <th scope="col">Date Time</th>
                                {/* <th scope="col">Action</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {Transections &&
                                Transections.map((data, index) => (
                                  <tr key={index}>
                                    <th scope="row">{data.id}</th>
                                    <td>{data.type}</td>
                                    <td>{data.permit_no}</td>
                                    <td>{data.vehicle_no}</td>
                                    <td>{formatToDateTime(data.updated_at)}</td>
                                    {/* <td>
                                      <Link to={`/EIR/${data.permit_no}`} className="btn btn-sm btn-label-primary">EIR Print</Link>
                                    </td> */}
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
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
