import React, { useState } from "react";
import Footer from "./main/footer";
import Nav from "./main/nav";
import { Html5Qrcode } from "html5-qrcode";

export default function Index() {
  const [preview, setPreview] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

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
            (device) => device.kind === "videoinput" && device.facing === "environment"
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
                setPreview(true);
                setIsScanning(false);
                html5QrCode.stop();
              },
              (errorMessage) => {
                console.error("Scanning error:", errorMessage);
              }
            )
            .catch((err) => {
              console.error("Error starting QR scanner:", err);
              setIsScanning(false);
            });
        })
        .catch((err) => {
          console.error("Error enumerating devices:", err);
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
                setPreview(true);
                setIsScanning(false);
                html5QrCode.stop();
              },
              (errorMessage) => {
                console.error("Scanning error:", errorMessage);
              }
            )
            .catch((err) => {
              console.error("Error starting QR scanner:", err);
              setIsScanning(false);
            });
        })
        .catch((err) => {
          console.error("Error accessing the camera:", err);
          setIsScanning(false);
        });
    } else {
      console.error("Media devices are not supported on this device.");
      setIsScanning(false);
    }
  };
  

  return (
    <>
      <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
        <div className="layout-container">
          <Nav />
          <div className="layout-page">
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  <div className="col-md-10 m-auto">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            <h5 className="text-primary">Gate Details</h5>
                          </div>
                          {!preview && (
                            <div className="col-md-12 mb-2">
                              <button
                                className="btn btn-primary"
                                onClick={startQrScanner}
                                disabled={isScanning}
                              >
                                {isScanning ? "Scanning..." : "Open Camera for QR"}
                              </button>
                              
                              {isScanning ? <>
                                <a href='?' className="btn btn-danger ms-3">Cancle</a> 
                              </> : ""}
                              <div
                                id="reader"
                                className="mt-3"
                                style={{
                                  width: "300px",
                                  height: "300px",
                                  display: isScanning ? "block" : "none",
                                }}
                              ></div>
                            </div>
                          )}
                          {preview && (
                            <>
                              <div className="col-sm-6 mb-2">
                                <label htmlFor="">Scanned QR Data</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={scannedData || ""}
                                  readOnly
                                />
                              </div>
                              <div className="col-md-12 d-flex gap-3">
                                <button
                                  className="btn btn-label-primary btn-xl"
                                  onClick={() => alert("Form submitted!")}
                                >
                                  Submit
                                </button>
                                {readOnly && (
                                  <button
                                    className="btn btn-label-info btn-xl"
                                    onClick={() => setReadOnly(false)}
                                  >
                                    Edit
                                  </button>
                                )}
                              </div>
                            </>
                          )}
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
