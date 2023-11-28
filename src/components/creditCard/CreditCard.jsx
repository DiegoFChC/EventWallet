import "./creditCard.css";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export default function PaymentForm() {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <div className="PaymentForm">
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <div className="inputs">
        <form>
          <label>Número de tarjeta</label>
          <input
            type="number"
            name="number"
            placeholder="Número de tarjeta"
            value={state.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <p>Ej: 49..., 51..., 36..., 37...</p>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <label>Fecha de expiración</label>
          <input
            type="number"
            name="expiry"
            placeholder="MM/AA"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <label>CVC</label>
          <input
            type="number"
            name="cvc"
            placeholder="CVC"
            maxLength={3}
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </form>
      </div>
    </div>
  );
}
