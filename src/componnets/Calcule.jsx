import React, { useState } from "react";

export default function SimpleSelect() {
  // Data: Use an array instead of an object
  const data = {
    labrik: [
        { id: "labrik_1", name: "Labrik 1", prix: 0.1, numPleta: 96 },
        { id: "labrik_2", name: "Labrik 2", prix: 0.3, numPleta: 104 }
    ],
    sima: [
        { id: "Ton", name: "Ton", prix: 20 },
        { id: "khnachi", name: "Khnachi", prix: 40 }
    ]
};

  // State variables
  const [selectedLabrik, setSelectedLabrik] = useState('');
  const [selectedSima, setSelectedSima] = useState('');
  //const [selectedType, setSelectedType] = useState('');

  const [Qantiticharji_Na9is_QtAdition, setQantiticharji_Na9is_QtAdition] = useState(0);
  const [QuntitiCharjer, setQuntitiCharjer] = useState(0);
  const [NbrQtPlaeta, setNbrQtPlaeta] = useState(0);
  const [QtAdition, setQtAdition] = useState(0);
  const [PrixQTCharjer, setPrixQTCharjer] = useState(0);
  const [PrixQtAdition, setPrixQtAdition] = useState(0);
  const [TotalPrix, setTotalPrix] = useState(0);

  // Find selected labrik details
  const selectedData = data.labrik.find((item) => item.id === selectedLabrik);
  const selectedSimaData = data.sima.find((item) => item.id === selectedSima); //
    //const selectedTypeData = selectedData?.types?.find((type) => type.type === selectedType);


  const Calcule = () => {
    if (selectedData && selectedData.numPleta !== 0) {
      const QuntitiCharjerNum = Number(QuntitiCharjer); // Convert input to a number

      const NbrQtPlaeta = Math.floor(QuntitiCharjerNum / selectedData.numPleta);
      const QtAdition = QuntitiCharjerNum % selectedData.numPleta;
      const Qantiticharji_Na9is_QtAdition = QuntitiCharjerNum - QtAdition;
      const PrixQTCharjer = QuntitiCharjerNum * selectedData.prix;
      const PrixQtAdition = QtAdition * selectedData.prix;
      const TotalPrix = PrixQTCharjer + PrixQtAdition;

      // Update state variables
      setNbrQtPlaeta(NbrQtPlaeta);
      setQtAdition(QtAdition);
      setPrixQTCharjer(PrixQTCharjer);
      setPrixQtAdition(PrixQtAdition);
      setTotalPrix(TotalPrix);
      setQantiticharji_Na9is_QtAdition(Qantiticharji_Na9is_QtAdition);

    }
    
  };

  return (
    <div className="container py-2">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Main Card */}
          <div className="card border-0 shadow-lg rounded-3 overflow-hidden">
            {/* Header with gradient */}
            <div
              className="card-header bg-gradient-primary text-white p-2"
              style={{ background: "linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)" }}
            >
              <div className="d-flex align-items-center">
                <i className="bi bi-building fs-1 me-3"></i>
                <div>
                  <h4 className="mb-0 fw-bold">Product Calculator</h4>
                  <p className="mb-0 opacity-75">Select product type and enter quantity</p>
                </div>
              </div>
            </div>

            <div className="card-body p-2">
              {/* Input Form Section */}
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control form-control-lg border-0 bg-light fw-bold"
                      id="quantity"
                      placeholder="Enter quantity"
                      value={QuntitiCharjer}
                      onChange={(e) => setQuntitiCharjer(e.target.value)}
                    />
                    <label htmlFor="quantity">
                      <i className="bi bi-123 me-2 fw-bold"></i>Quantity
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <select
                      className="form-select  border-1 bg-light fw-bold"
                      id="productType"
                      value={selectedLabrik}
                      onChange={(e) => setSelectedLabrik(e.target.value)}
                    >
                      <option value="-1" >Select a product type</option>
                      {data.map((item) => (
                        <option className="fw-bold" key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="productType">
                      <i className="bi bi-box-seam me-2"></i>Product Type
                    </label>
                  </div>
                  
                </div>
              </div>

              {/* Calculate Button */}
              <div className="d-grid gap-2 mb-4">
                <button
                  className="btn btn-primary btn-lg py-1 fw-bold text-uppercase"
                  style={{ background: "linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)" }}
                  onClick={Calcule}
                  disabled={selectedLabrik === "-1" || !QuntitiCharjer}
                >
                  <i className="bi bi-calculator me-2"></i>
                  Calculate
                </button>
              </div>

              {/* Results Section */}
              {selectedData ? (
                <div className="results-section mt-4 animate__animated animate__fadeIn">

                  <div className="row g-4">
                    {/* Left Column - Summary */}
                   
                    

                    {/* Right Column - Pricing */}
                    
                  </div>

                  {/* Detailed Results Table */}
                  <div className="mt-4">
  <div className="table-responsive">
  <div class="alert alert-success" role="alert">
                            This is Calcule of product : <strong> {selectedData.name} </strong> !
                    </div>
    <table className="table table-striped table-hover mb-0">
      <thead className="table-light">
        <tr>
          <th>Description</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number paleta</td>
          <td>{NbrQtPlaeta}</td>
        </tr>
        <tr>
          <td>Qantiticharji_Na9is_QtAdition</td>
          <td>{Qantiticharji_Na9is_QtAdition}</td>
        </tr>
        <tr>
          <td>Quntiti zayda</td>
          <td>{QtAdition}</td>
        </tr>
        <tr>
          <td>Prix de quntiti zayda</td>
          <td>{PrixQtAdition} Dh</td>
        </tr>
        <tr>
          <td>Prix dyal QuntitiCharjer</td>
          <td>{PrixQTCharjer} Dh</td>
        </tr>
        <tr className="table-primary">
          <td>Total Prix</td>
          <td className="fw-bold">{TotalPrix} Dh</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

                </div>
              ) : (
                <div className="text-center py-5 my-3 bg-light rounded-3">
                  <i className="bi bi-calculator-fill text-primary" style={{ fontSize: "3rem" }}></i>
                  <p className="mt-3 text-muted">
                    Enter quantity and select product type, then click Calculate to see results
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="card-footer bg-light p-3 text-center">
              <small className="text-muted">
                <i className="bi bi-info-circle me-1"></i>
                All prices are calculated based on current rates
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
