import React, { useRef, useState } from "react";
import Nav from "./main/nav";
import LinksButtons from "./main/LinksButtons";
import Footer from "./main/footer";
import { useParams } from "react-router-dom";
import "../App.css";
import Header from "./main/header";
export default function EIR() {
   const { Permit } = useParams();
   const [Loading, setLoading] = useState(false);
  const a5Width = 700;
  const a5Height = 750;

  const iframeRef = useRef(null);

  const handlePrint = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.print();
    }

  };

  return (
    <>
      {Loading && (
        <div
          className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100"
          style={{ zIndex: 9999 }}
        >
          <div className="sk-chase sk-primary display-1">
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
            <div className="sk-chase-dot" />
          </div>
        </div>
      )}
      <div className="layout-wrapper layout-content-navbar">
              <div className="layout-container">
                <Header />
                <div className="layout-page">
                  <div className="content-wrapper">
                    <Nav />
              <div className="container-xxl flex-grow-1 container-p-y">
                {/* {JSON.stringify(Data)} */}

                <LinksButtons />
           <div className="row">
            <div className="col-md-10">
            <div className="py-5">
                  <div className="text-end mt-2 mb-4">
                    <button
                      onClick={handlePrint}
                      className="btn btn-sm btn-label-primary print-button"
                    >
                      Print{" "}
                    </button>
                  </div>
                  <div
                  className="d-flex align-items-center justify-content-center"
                  >
                    <iframe
                      ref={iframeRef}
                      src={`/EIRMain/${Permit}`}
                      width={a5Width}
                      height={a5Height}
                      className="overflow-hidden"
                      title="A5 Iframe"
                    ></iframe>
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
      </div>
    </>
  );
}
