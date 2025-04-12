"use client"

import { useState } from "react"

export default function ProductCalculator() {
  const initialData = {
    labrik: [
      { id: "Labrik 15", name: "AGG 15", prix: 0.1, numPleta: 96 },
      { id: "Labrik 20", name: "AGG 20 ", prix: 0.15, numPleta: 64 },
      { id: "Labrik 10", name: "AGG 10", prix: 0.1, numPleta: 144 },
      { id: "HOURDIS 12", name: "HOURDIS 12", prix: 0.1, numPleta: 112 },
      { id: "HOURDIS 16", name: "HOURDIS 16", prix: 0.1, numPleta: 80 },
      { id: "PL3amr", name: "PL3amr", prix: 0.5, numPleta: 1 },
      { id: "PLkhawi", name: "PLkhwai", prix: 0.35},
      { id: "PTS", name: "PTS", prix: 0.5 * 2, numPleta: 1 },
    ],
    sima: [
      { id: "Ton", name: "Ton", prix: 10 },
      { id: "khnachi", name: "Khnachi", prix: 0.5 },
    ],
    lhdid: [{ id: "lhdid", name: "All_Type", prix: 0.5 }],
  }

  const [data, setData] = useState(initialData)
  const [forms, setForms] = useState([{ id: 1 }])
  const [formState, setFormState] = useState({
    1: {
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
  })
  const [activeFormId, setActiveFormId] = useState(null)
  const [calculationResults, setCalculationResults] = useState([])

  const handleFormMouseEnter = (id) => {
    setActiveFormId(id)
  }

  const handleFormMouseLeave = () => {
    setActiveFormId(null)
  }

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

    setTimeout(() => {
      const newFormElement = document.getElementById(`form-${newId}`)
      if (newFormElement) {
        newFormElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  const removeForm = (id) => {
    if (forms.length <= 1) return
    setForms(forms.filter((form) => form.id !== id))

    const newState = { ...formState }
    delete newState[id]
    setFormState(newState)
  }

  const resetForm = () => {
    setForms([{ id: 1 }])
    setFormState({
      1: {
        selectedCategory: "",
        selectedItem: "",
        NbrQtPlaeta_real: "",
        Qantiticharji_Na9is_QtAdition: 0,
        QuntitiCharjer: 0,
        NbrQtPlaeta: 0,
        QtAdition: 0,
        PrixQTCharjer: 0,
        PrixQTCharjerSima: "",
        PrixQTCharjerLhdid: "",
        PrixQtAdition: 0,
        PrixQtAdition_Absolute: "",
        TotalPrix: 0,
      },
    })
    setCalculationResults([])
  }

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
    const form = formState[id];
    if (!form) return;
  
    const result = {
      id: Date.now(),
      formId: id,
      category: form.selectedCategory,
      item: form.selectedItem,
      quantity: form.QuntitiCharjer,
      totalPrice: 0,
      details: {},
    };
  
    // Handle labrik category
    if (form.selectedCategory === "labrik") {
      const item = data.labrik.find((item) => item.id === form.selectedItem);
      
      if (!item) return;
  
      // Special cases for simple quantity × price calculation
      const simplePriceItems = ["PL3amr", "PLkhawi", "PTS"];
  
  
      if (simplePriceItems.includes(item.id)) {
        const QuntitiCharjerNum = Number(form.QuntitiCharjer) || 0;
        const PrixQTCharjer = QuntitiCharjerNum * item.prix;
        
        updateFormState(id, {
          NbrQtPlaeta_real: 0,
          NbrQtPlaeta: 0,
          QtAdition: 0,
          PrixQTCharjer: PrixQTCharjer,
          PrixQtAdition: 0,
          TotalPrix: PrixQTCharjer,
          Qantiticharji_Na9is_QtAdition: 0,
          PrixQtAdition_Absolute: 0,
        });
    
        result.totalPrice = PrixQTCharjer;
        result.details = {
          itemName: item.name,
          PrixQTCharjer,
        };
      } 
      // Regular labrik items with numPleta
      else if (item.numPleta !== 0) {
        const QuntitiCharjerNum = Number(form.QuntitiCharjer);
        const NbrQtPlaeta_real = QuntitiCharjerNum / item.numPleta;
  
        let NbrQtPlaeta;
        
        if (NbrQtPlaeta_real % 1 === 0) {
          NbrQtPlaeta = NbrQtPlaeta_real;
        } else {
          const decimalPart = NbrQtPlaeta_real % 1;
          NbrQtPlaeta = decimalPart >= 0.6 ? Math.ceil(NbrQtPlaeta_real) : Math.floor(NbrQtPlaeta_real);
        }
  
        NbrQtPlaeta = Math.min(10, NbrQtPlaeta);
  
        const Qantiticharji_Na9is_QtAdition = NbrQtPlaeta * item.numPleta;
        const QtAdition = QuntitiCharjerNum - Qantiticharji_Na9is_QtAdition;
        const PrixQTCharjer = QuntitiCharjerNum * item.prix;
        const PrixQtAdition = Number.parseFloat((QtAdition * item.prix).toFixed(3));
        const PrixQtAdition_Absolute = Number.parseFloat(Math.abs(QtAdition * item.prix).toFixed(3));
        const TotalPrix = PrixQTCharjer + PrixQtAdition_Absolute;
  
        updateFormState(id, {
          NbrQtPlaeta_real,
          NbrQtPlaeta,
          QtAdition,
          PrixQTCharjer,
          PrixQtAdition,
          TotalPrix,
          Qantiticharji_Na9is_QtAdition,
          PrixQtAdition_Absolute,
        });
  
        result.totalPrice = TotalPrix;
        result.details = {
          itemName: item.name,
          NbrQtPlaeta_real,
          NbrQtPlaeta,
          QtAdition,
          PrixQTCharjer,
          PrixQtAdition,
          Qantiticharji_Na9is_QtAdition,
          PrixQtAdition_Absolute,
        };
      }
    }
  
    // Rest of your code remains the same...
    // Handle sima category
    if (form.selectedCategory === "sima") {
      const item = data.sima.find((item) => item.id === form.selectedItem);
      if (item) {
        const QuntitiCharjerNum = Number(form.QuntitiCharjer);
        const PrixQTCharjerSima = QuntitiCharjerNum * item.prix;
        
        updateFormState(id, {
          PrixQTCharjerSima,
          TotalPrix: PrixQTCharjerSima,
        });
  
        result.totalPrice = PrixQTCharjerSima;
        result.details = {
          itemName: item.name,
          PrixQTCharjerSima,
        };
      }
    }
  
    // Handle lhdid category
    if (form.selectedCategory === "lhdid") {
      const item = data.lhdid.find((item) => item.id === form.selectedItem);
      if (item) {
        const QuntitiCharjerNum = Number(form.QuntitiCharjer);
        const PrixQTCharjerLhdid = (QuntitiCharjerNum / 100) * item.prix;
        
        updateFormState(id, {
          PrixQTCharjerLhdid,
          TotalPrix: PrixQTCharjerLhdid,
        });
  
        result.totalPrice = PrixQTCharjerLhdid;
        result.details = {
          itemName: item.name,
          PrixQTCharjerLhdid,
        };
      }
    }
  
    // Add/update results
    if (result.totalPrice > 0) {
      setCalculationResults((prev) => {
        const existingIndex = prev.findIndex((r) => r.formId === id);
        if (existingIndex >= 0) {
          const newResults = [...prev];
          newResults[existingIndex] = result;
          return newResults;
        }
        return [...prev, result];
      });
    }
  };

  // Calculate total of all forms
  const totalAPayer = calculationResults.reduce((sum, result) => sum + (result.totalPrice || 0), 0)

  // Get item name from ID
  const getItemName = (category, itemId) => {
    if (!category || !itemId) return ""
    const item = data[category]?.find((item) => item.id === itemId)
    return item ? item.name : ""
  }

  return (
    <div className="container-fluid bg-white min-vh-100">
      {/* Header */}
      <div className="bg-primary text-white shadow-sm py-3 mb-4 fixed-top">
        <div className="container d-flex justify-content-between align-items-center">
          <h3 className="m-0 fw-bold">
            <i className="bi bi-calculator me-2"></i>
            Product Calculator
          </h3>
          <div>
            <button className="btn btn-success fw-bold me-2" onClick={addNewForm}>
              <i className="bi bi-plus me-1"></i> Add New
            </button>
            <button className="btn btn-danger fw-bold" onClick={resetForm}>
              <i className="bi bi-trash me-1"></i> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container pt-5 mt-5">
        {/* Forms */}
        <div className="row mb-4">
          <div className="col-12">
            {forms.map((form) => (
              <div
                key={form.id}
                id={`form-${form.id}`}
                className={`card shadow-sm mb-4 ${activeFormId === form.id ? "border-primary border-2" : ""}`}
                onMouseEnter={() => handleFormMouseEnter(form.id)}
                onMouseLeave={handleFormMouseLeave}
              >
                <div className="card-header bg-primary bg-opacity-10 d-flex justify-content-between align-items-center py-2">
                  <h5 className="m-0 fw-bold">
                    <i className="bi bi-calculator-fill me-2"></i>
                    Form #{form.id}{" "}
                    {activeFormId === form.id && <i className="bi bi-pencil-fill ms-2 text-primary"></i>}
                  </h5>
                  {formState[form.id]?.selectedItem && (
                    <div className="badge bg-primary fs-6 px-3 py-2">
                      {getItemName(formState[form.id]?.selectedCategory, formState[form.id]?.selectedItem)}
                    </div>
                  )}
                  {forms.length > 1 && (
                    <button className="btn btn-sm btn-danger" onClick={() => removeForm(form.id)}>
                      <i className="bi bi-trash me-1"></i> Remove
                    </button>
                  )}
                </div>

                <div className="card-body p-3">
                  <div className="row g-3">
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
                      <label className="form-label fw-bold text-dark">Item</label>
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

                    {/* Quantity Input */}
                    <div className="col-md-4">
                      <label className="form-label fw-bold text-dark">Quantity</label>
                      <input
                        type="number"
                        placeholder="Enter Quantity..."
                        className="form-control py-2 fw-bold border-primary"
                        value={formState[form.id]?.QuntitiCharjer || ""}
                        onChange={(e) => updateFormState(form.id, { QuntitiCharjer: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            Calcule(form.id)
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <div className="mt-3">
                    <button
                      className="btn btn-primary btn-lg w-100 fw-bold"
                      onClick={() => Calcule(form.id)}
                      disabled={
                        !formState[form.id]?.selectedCategory ||
                        !formState[form.id]?.selectedItem ||
                        !formState[form.id]?.QuntitiCharjer
                      }
                    >
                      <i className="bi bi-calculator me-1"></i> Calculate
                    </button>
                  </div>

                  {/* Individual Results Section */}
                 
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results Table */}
        {calculationResults.length > 0 && (
          <div className="card shadow-lg border-primary mb-4">
            <div className="card-header bg-primary text-white py-3">
              <h4 className="m-0 fw-bold">
                <i className="bi bi-table me-2"></i>
                Calculation Results Table
              </h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>Item</th>
                      <th>Num Real PLT</th>
                      <th>Num PLT</th>
                      <th>Qt Ajouter</th>
                      <th>SPLM</th>
                      <th>Quantity</th>
                      <th>Prix QuntitiCharjer</th>
                      {/* Conditional columns based on category */}
                      <th className="text-end">Total Price (Dh)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {}
                    {calculationResults.map((result, index) => (
                      <tr key={result.id}>
                        <td>{index + 1}</td>
                        <td>
                          <span className="badge bg-primary px-3 py-2">
                            {result.category.charAt(0).toUpperCase() + result.category.slice(1)}
                          </span>
                        </td>
                        <td>{result.details.itemName || getItemName(result.category, result.item)}</td>
                        <td>
                        {result.details.NbrQtPlaeta_real}
                        </td>
                        <td> {result.details.NbrQtPlaeta} </td>
                        <td>
                          
                        <span className="badge bg-warning text-dark me-1"> Qt+: {result.details.QtAdition}   </span>

                        <span className="badge bg-danger ">  Prix:{result.details.PrixQtAdition} DH   </span>

                        </td>
                        <td> {result.details.Qantiticharji_Na9is_QtAdition} </td>
                        <td>{result.quantity}</td>
                        <td>
                        {result.details. PrixQTCharjer }DH
                        </td>
                        <td className="text-end fw-bold">{result.totalPrice.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="table-dark">
                    <tr>
                      <td colSpan="9" className="text-end fw-bold">
                        TOTAL À PAYER:
                      </td>
                      <td className="text-end fw-bold fs-4 ">{totalAPayer.toFixed(2)} Dh</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Total à Payer Section */}
        {totalAPayer > 0 && (
          <div className="card border-0 shadow-lg mb-4">
            <div className="card-body p-3 bg-success text-white rounded">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="m-0 fw-bold">
                  <i className="bi bi-cash-coin me-2"></i>
                  Total à Payer
                </h5>
                <h3 className="m-0 fw-bold">{totalAPayer.toFixed(2)} Dh</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
