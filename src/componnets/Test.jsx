

import { useState } from "react"

export default function Test() {
  const initialData = {
    labrik: [
      { id: "Labrik 15", name: "Labrik 15", prix: 0.1, numPleta: 96 },
      { id: "Labrik 20", name: "Labrik 20", prix: 0.15, numPleta: 64 },
      { id: "Labrik 10", name: "Labrik 10", prix: 0.1, numPleta: 144 },
    ],
    sima: [
      { id: "Ton", name: "Ton", prix: 10 },
      { id: "khnachi", name: "Khnachi", prix: 0.1 },
    ],
    lhdid: [
      { id: "lhdid", name: "All_Type", prix: 0.5 },
    
    ],
  }

  const [data, setData] = useState(initialData)
  const [forms, setForms] = useState([{ id: 1 }])
  const [formState, setFormState] = useState({})
  const [activeFormId, setActiveFormId] = useState(null);
  const handleFormMouseEnter = (id) => {
    setActiveFormId(id);
};

const handleFormMouseLeave = () => {
    setActiveFormId(null);
};
const handleFormFocus = (id) => {
    setActiveFormId(id);
};

  const addNewForm = () => {
    const newId = forms.length > 0 ? Math.max(...forms.map((f) => f.id)) + 1 : 1
    setForms([...forms, { id: newId }])

    setFormState((prev) => ({
      ...prev,
      [newId]: {
        selectedCategory: "",
        selectedItem: "",
        NbrQtPlaeta_real: "",
        Qantiticharji_Na9is_QtAdition: 0,
        QuntitiCharjer: "",
        NbrQtPlaeta: 0,
        QtAdition: 0,
        PrixQTCharjer: "",
        PrixQTCharjerSima: "",
        PrixQTCharjerLhdid: "",
        PrixQtAdition: 0,
        PrixQtAdition_Absolute: "",
        TotalPrix: 0,
      },
    }))
    document.getElementById('divplus').style.display="block"
  }

  const removeForm = (id) => {
    if (forms.length <= 1) return
    setForms(forms.filter((form) => form.id !== id))

    const newState = { ...formState }
    delete newState[id]
    setFormState(newState)
  }
  const resetForm = () => {
    // Reset to initial state with just one form
    setForms([{ id: 1 }]);
    setFormState({
        1: {
            selectedCategory: "",
            selectedItem: "",
            NbrQtPlaeta_real: '',
            Qantiticharji_Na9is_QtAdition: 0,
            QuntitiCharjer: 0,
            NbrQtPlaeta: 0,
            QtAdition: 0,
            PrixQTCharjer: 0,
            PrixQTCharjerSima: '',
            PrixQTCharjerLhdid: '',
            PrixQtAdition: 0,
            PrixQtAdition_Absolute: '',
            TotalPrix: 0
        }
    });
};

  const updateFormState = (id, updates) => {
    setFormState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...updates,
      },
    }))
  }

  const Calcule = (id) => {
    const form = formState[id]
    if (!form) return

    if (form.selectedCategory === "labrik") {
      const item = data.labrik.find((item) => item.id === form.selectedItem)
      if (item && item.numPleta !== 0) {
        const QuntitiCharjerNum = Number(form.QuntitiCharjer)
        const NbrQtPlaeta_real = QuntitiCharjerNum / item.numPleta;

        const NbrQtPlaeta = 0;
        
        if (NbrQtPlaeta_real % 1 === 0) {
          // If NbrQtPlaeta_real is a whole number, use it directly
          NbrQtPlaeta = NbrQtPlaeta_real;
        } else {
          // If it's not a whole number, round up or down accordingly
          NbrQtPlaeta = NbrQtPlaeta_real >= 0.5 ? Math.ceil(NbrQtPlaeta_real) : Math.floor(NbrQtPlaeta_real);
        }
        
        NbrQtPlaeta = Math.min(10, NbrQtPlaeta); 
        const Qantiticharji_Na9is_QtAdition = NbrQtPlaeta * item.numPleta
        const QtAdition = QuntitiCharjerNum - Qantiticharji_Na9is_QtAdition
        const PrixQTCharjer = QuntitiCharjerNum * item.prix
        const PrixQtAdition = parseFloat((QtAdition * item.prix).toFixed(3));
        const PrixQtAdition_Absolute = parseFloat(Math.abs(QtAdition * item.prix).toFixed(3));
        const TotalPrix = PrixQTCharjer + PrixQtAdition_Absolute

        updateFormState(id, {
          NbrQtPlaeta_real,
          NbrQtPlaeta,
          QtAdition,
          PrixQTCharjer,
          PrixQtAdition,
          TotalPrix,
          Qantiticharji_Na9is_QtAdition,
          PrixQtAdition_Absolute,
        })
      }
    }
    if (form.selectedCategory === "sima") {
      const item = data.sima.find((item) => item.id === form.selectedItem)
      if (item) {
        const QuntitiCharjerNum = Number(form.QuntitiCharjer)
        const PrixQTCharjerSima = QuntitiCharjerNum * item.prix
        updateFormState(id, {
          PrixQTCharjerSima,
          TotalPrix: PrixQTCharjerSima,
        })
      }
    }
    if (form.selectedCategory === "lhdid") {
      const item = data.lhdid.find((item) => item.id === form.selectedItem)
      if (item) {
        const QuntitiCharjerNum = Number(form.QuntitiCharjer)
        const PrixQTCharjerLhdid = QuntitiCharjerNum/100 * item.prix
        updateFormState(id, {
          PrixQTCharjerLhdid,
          TotalPrix: PrixQTCharjerLhdid,
        })
      }
    }
  }

  // Calculate total of all forms
  const totalAPayer = Object.values(formState).reduce((sum, form) => sum + (form.TotalPrix || 0), 0)

  return (
    <div className="container-fluid bg-white min-vh-100">
      {/* Header */}
      <div className="bg-primary text-white shadow-sm py-3 mb-4 fixed-top">
        <div className="container d-flex justify-content-between align-items-center">
          <h3 className="m-0 fw-bold">
            <i className="bi bi-calculator me-2"></i>
            Product Calculator
          </h3>
          <div className="">
          <button className="btn btn-success  fw-bold mr-3" onClick={addNewForm}>
            <i className="bi bi-plus me-1"></i> Add New
          </button>
          <button className="btn btn-danger  fw-bold ml-3" onClick={resetForm}>
            <i className="bi bi-plus me-1 ml-3"></i> Reset
          </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container pt-5 mt-1">
        {/* Forms */}
        <hr />
        {forms.map((form) => (
          <div key={form.id}className={`card shadow-sm mb-4 ${activeFormId === form.id ? 'border-dark border-4' : ''}`}
          onMouseEnter={() => handleFormMouseEnter(form.id)}
          onMouseLeave={handleFormMouseLeave}
      >
            <div className="card-header bg-primary bg-opacity-10 d-flex justify-content-between align-items-center py-1">
              <h5 className={`${activeFormId === form.id ? 'text-primary ' : 'text-white bg-secondary'}`}>
              Form #{form.id} {activeFormId === form.id && <i className="bi bi-pencil-fill ms-2"></i>}</h5>
              <div className="alert alert-danger w-50" role="alert">
               <strong> This Calcule for =====) : {formState[form.id]?.selectedItem}</strong> 
                </div>
              {forms.length > 0 && (
                <button className="btn btn-sm btn-danger" onClick={() => removeForm(form.id)}>
                  <i className="bi bi-trash me-1"></i> Remove
                </button>
              )}
            </div>

            <div className="card-body p-3">
              <div className="row g-3">
                {/* Quantity Input */}
                

                {/* Select Category */}
                <div className="col-md-4">
                  <label className="form-label fw-bold text-dark">Category</label>
                  <select
                    className="form-select fw-bold py-2 border-primary"
                    value={formState[form.id]?.selectedCategory || ""}
                    onChange={(e) => {
                      updateFormState(form.id, {
                        selectedCategory: e.target.value,
                        selectedItem: "",
                      })
                    }}
                  >
                    <option value="">Select Category</option>
                    <option value="labrik">Labrik</option>
                    <option value="sima">Sima</option>
                    <option value="lhdid">Lhdid</option>
                  </select>
                </div>
                

                {/* Select Item */}
                <div className="col-md-4">
                  <label className="itemmm form-label  fw-bold text-dark">Item</label>
                  <select
                    className="form-select fw-bold border-primary py-2"
                    value={formState[form.id]?.selectedItem || ""}
                    onChange={(e) => updateFormState(form.id, { selectedItem: e.target.value })}
                    disabled={!formState[form.id]?.selectedCategory}
                  >
                    <option value="">Select Item</option>
                    {formState[form.id]?.selectedCategory &&
                      data[formState[form.id].selectedCategory].map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-bold text-dark">Quantity</label>
                  <input
                    type="number"
                    placeholder="Entre Qauntity ..."
                    className="form-control py-2 fw-bold border-primary"
                    value={formState[form.id]?.QuntitiCharjer }
                    onChange={(e) => updateFormState(form.id, { QuntitiCharjer: e.target.value })}
                  />
                </div>
              </div>

              {/* Calculate Button */}
              <div className="mt-3">
                <button className="btn btn-primary btn-lg w-100 fw-bold" onClick={() => Calcule(form.id)}>
                  <i className="bi bi-calculator me-1"></i> Calculate
                </button>
              </div>

              {/* Results Section */}
              {formState[form.id]?.selectedCategory && formState[form.id]?.TotalPrix > 0 && (
                <div className="mt-4 border border-primary rounded p-3 bg-light">
                  <h6 className="text-primary fw-bold mb-3 fs-5">
                    Results for{" "}
                    {formState[form.id]?.selectedCategory.charAt(0).toUpperCase() +
                      formState[form.id]?.selectedCategory.slice(1)}
                  </h6>

                  {formState[form.id]?.selectedCategory === "labrik" && (
                    <div className="row row-cols-2 row-cols-md-3 g-3">
                      <div className="col">
                        <div className="border border-primary rounded p-2 text-center bg-white">
                          <div className="text-primary fw-bold">N° PLT Reel</div>
                          <div className="fs-5 fw-bold text-dark">{formState[form.id]?.NbrQtPlaeta_real}</div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="border border-primary rounded p-2 text-center bg-white">
                          <div className="text-primary fw-bold">N° PLT</div>
                          <div className="fs-5 fw-bold text-dark">{formState[form.id]?.NbrQtPlaeta}</div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="border border-primary rounded p-2 text-center bg-white">
                          <div className="text-primary fw-bold">Qt Ajouter</div>
                          <div className="fs-5 fw-bold text-dark">{formState[form.id]?.QtAdition}</div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="border border-primary rounded p-2 text-center bg-white">
                          <div className="text-primary fw-bold">SPLM</div>
                          <div className="fs-5 fw-bold text-dark">
                            {formState[form.id]?.Qantiticharji_Na9is_QtAdition}
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="border border-primary rounded p-2 text-center bg-white">
                          <div className="text-primary fw-bold ">Prix Qt Ajouter : <span className="badge text-bg-warning " style={{ fontWeight: 'bold', fontSize: '1rem' }}>{formState[form.id]?.PrixQtAdition} Dh</span></div>
                          <div className="text-primary fw-bold">Prix Qt Ajouter Abs : <span className="badge text-bg-warning mt-1" style={{ fontWeight: 'bold', fontSize: '1rem' }}>{formState[form.id]?.PrixQtAdition_Absolute} Dh</span></div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="border border-primary rounded p-2 text-center bg-white">
                          <div className="text-primary fw-bold">Prix Qt Charjer</div> 
                          <div className="fs-5 fw-bold text-dark">{formState[form.id]?.PrixQTCharjer} Dh</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formState[form.id]?.selectedCategory === "sima" && (
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="border border-primary rounded p-2 text-center bg-white">
                          <div className="text-primary fw-bold">PrixQTCharjer</div>
                          <div className="fs-5 fw-bold text-dark">{formState[form.id]?.PrixQTCharjerSima} Dh</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formState[form.id]?.selectedCategory === "lhdid" && (
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="border border-primary rounded p-2 text-center bg-white">
                          <div className="text-primary fw-bold">PrixQTCharjer</div>
                          <div className="fs-5 fw-bold text-dark">{formState[form.id]?.PrixQTCharjerLhdid} Dh</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 p-1 bg-secondary text-white rounded text-center">
                    <div className="fw-bold">Total Prix</div>
                    <div className="fs-5 fw-bold">{formState[form.id]?.TotalPrix} Dh</div>
                  </div>
                </div>
              )}
              
            </div>
            <div className="d-flex justify-content-center align-items-center" id="divplus" style={{ display: "none" }}>
                <span className="badge bg-danger fs-4  ">+</span>
                </div>
                            
          </div>
          
          
        ))}
        
      

        <hr />
       

        {/* Total à Payer Section */}
        {totalAPayer > 0 && (
          <div className="card border-0 shadow mb-4">
            <div className="card-body p-2 bg-success text-white rounded">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0 fw-bold">
                  <i className="bi bi-cash me-2"></i>
                  Total à Payer
                </h5>
                <h4 className="m-0 fw-bold">{totalAPayer.toFixed(2)} Dh</h4>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

