import Nav from './main/nav';
import Header from './main/header';
import Footer from './main/footer';
import ReactDOM from 'react-dom/client';
import React, { useEffect, useRef, useState } from 'react';

function Rst() {
    const cards = [];

    // Arrays for colors (single array for both header and border colors)
    const colors = ['#FF5733', '#33FF57', '#5733FF'];

    for (let i = 0; i < 9; i++) {
        const cardColor = colors[i % colors.length];  // Same color for header and border

        cards.push(
            <div className="col-md-4 mt-2 col-6 col-sm-6" key={i}>
                {/* Card wrapper with a bottom border that matches the header color */}
                <div className="card-wrap" style={{ borderBottom: `5px solid ${cardColor}` }}>

                    {/* Card Header with the same color as the bottom border */}
                    <div className="card-header text-center" style={{ backgroundColor: cardColor }}>
                        {/* Optional content inside the header */}
                    </div>

                    {/* Card Body */}
                    <div className="card-content">
                        <h1 className="card-title">C.NO.<span> : MSMU46926{i}2</span></h1>
                        <p className="card-text">CARD-SIZE : <span>{40 + i}</span></p>
                        <p className="card-text">SOURCE : <span>HR38X723{i}</span></p>
                        <p className="card-text">DEST : <span>023/077D</span></p>
                    </div>
                </div>
            </div>
        );
    }


    const fileInputRef = useRef(null);
    const [image, setImage] = useState(null);
  
    const openCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // Rear Camera
        });
  
        const video = document.createElement("video");
        video.srcObject = stream;
        video.play();
  
        setTimeout(() => {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
          setImage(canvas.toDataURL("image/png")); // Save image
          stream.getTracks().forEach((track) => track.stop()); // Stop camera
        }, 3000); // Capture after 3 seconds
      } catch (error) {
        console.error("Camera access denied:", error);
      }
    };

    return (
        <>
            <div class="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
                <div class="layout-container">
                    <Nav />
                    <div className="layout-page">
                        <div className="content-wrapper">
                            <div className="container-xxl flex-grow-1 container-p-y">



                            <div>
      <button onClick={openCamera}>Open Camera</button>
      <input
        type="file"
        id="container_image"
        name="container_image"
        className="d-none"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
      />
      {image && <img src={image} alt="Captured" style={{ width: "200px", marginTop: "10px" }} />}
    </div>




                                <div className="card p-4">
                                    <>
                                        {/* Nav pills */}
                                        <ul className="nav nav-pills container">
                                            <li className="nav-item">
                                                <a className="nav-link active" data-bs-toggle="pill" href="#grid">
                                                    Grid
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-bs-toggle="pill" href="#table">
                                                    Table
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-bs-toggle="pill" href="#map">
                                                    Map
                                                </a>
                                            </li>
                                        </ul>
                                        {/* Tab panes */}
                                        <div className="tab-content mt-5">
                                            <div className="tab-pane  active show" id="grid">
                                                <div className="container">
                                                    <div className="row">
                                                        {cards}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane  fade" id="table">
                                                <div className="container">
                                                    <div className="table-responsive">
                                                        <table className='table table-striped table-bordered table-font-sm table-hover table-sm'>
                                                            <thead>
                                                                <tr>
                                                                    <th>ID</th>
                                                                    <th>Container No.</th>
                                                                    <th>Card-Size</th>
                                                                    <th>Source</th>
                                                                    <th>Destination</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>01</td>
                                                                    <td> MSMU4692602</td>
                                                                    <td> 40</td>
                                                                    <td> HR38X7238</td>
                                                                    <td>023/077D</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>02</td>
                                                                    <td> MSMU4692602</td>
                                                                    <td> 40</td>
                                                                    <td> HR38X7238</td>
                                                                    <td>023/077D</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>03</td>
                                                                    <td> MSMU4692602</td>
                                                                    <td> 40</td>
                                                                    <td> HR38X7238</td>
                                                                    <td>023/077D</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>04</td>
                                                                    <td> MSMU4692602</td>
                                                                    <td> 40</td>
                                                                    <td> HR38X7238</td>
                                                                    <td>023/077D</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>05</td>
                                                                    <td> MSMU4692602</td>
                                                                    <td> 40</td>
                                                                    <td> HR38X7238</td>
                                                                    <td>023/077D</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>06</td>
                                                                    <td> MSMU4692602</td>
                                                                    <td> 40</td>
                                                                    <td> HR38X7238</td>
                                                                    <td>023/077D</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>07</td>
                                                                    <td> MSMU4692602</td>
                                                                    <td> 40</td>
                                                                    <td> HR38X7238</td>
                                                                    <td>023/077D</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>08</td>
                                                                    <td> MSMU4692602</td>
                                                                    <td> 40</td>
                                                                    <td> HR38X7238</td>
                                                                    <td>023/077D</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>09</td>
                                                                    <td> MSMU4692602</td>
                                                                    <td> 40</td>
                                                                    <td> HR38X7238</td>
                                                                    <td>023/077D</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>10</td>
                                                                    <td> MSMU4692602</td>
                                                                    <td> 40</td>
                                                                    <td> HR38X7238</td>
                                                                    <td>023/077D</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane container fade" id="map">
                                                <h1 className='text-primary'>Coming Soon</h1>
                                            </div>
                                        </div>
                                    </>
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
    )
}

export default Rst;