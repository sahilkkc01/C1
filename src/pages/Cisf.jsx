import React from 'react'
import Nav from './main/nav'
import Footer from './main/footer'
import { Link } from 'react-router-dom'
import Header from './main/header'

export default function Cisf() {
    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Header />
                    <div className="layout-page">
                        <div className="content-wrapper">
                            <Nav />
                            <div className="container-xxl flex-grow-1 container-p-y mt-5">

                                <div className="row justify-content-center text-center mt-5" >
                                    <div className="col-md-4 mb-4" >
                                        <Link to={"/CISFIn"}>
                                            <div className="d-flex flex-column align-items-center">
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
                                                <p className="mt-3 fw-bold">CISF IN</p>
                                            </div>
                                        </Link>
                                    </div>

                                    {/* OUT Section */}
                                    <div className="col-md-4 mb-4">
                                        <Link to={"/CISFOut"}>
                                            <div className="d-flex flex-column align-items-center">
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
                                                <p className="mt-3 fw-bold">CISF OUT</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
