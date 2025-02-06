import { useState } from "react";
import Footer from "./main/footer";
import Header from "./main/header";
import Nav from "./main/nav";
import { compressImage } from "./main/formatToDateTime";

export default function WTR() {

  const [rows, setRows] = useState([{ wagon: "", container: "" }]);

  // Handle input change
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Add a new row
  const handleAddRow = () => {
    setRows([...rows, { wagon: "", container: "" }]);
  };

  // Remove a row
  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  // Validate duplicates
  const hasDuplicateContainer = (container) => {
    return rows.some((row) => row.container === container);
  };

  const handleAddContainer = (index, container) => {
    if (hasDuplicateContainer(container)) {
      alert("This container is already added!");
      return;
    }

    handleInputChange(index, "container", container);
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
                <div />
                <div className="container">
                  <div className="card">
                    <div className="card-body">
                     
                      <div className="container mt-4">
                        <h3>Dynamic Form</h3>
                        <form>
                          {rows.map((row, index) => (
                            <div key={index} className="row mb-3">
                              <div className="col-1">
                                <h5>{index + 1}</h5>
                              </div>
                              <div className="col-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Wagon"
                                  value={row.wagon}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "wagon",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-4">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Container"
                                  value={row.container}
                                  onBlur={(e) =>
                                    handleAddContainer(index, e.target.value)
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      "container",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <div className="col-1">
                                {index > 0 && (
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveRow(index)}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                          <div className="col-2">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleAddRow}
                            >
                              Add More
                            </button>
                          </div>
                        </form>
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
