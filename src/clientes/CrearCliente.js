import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearCliente() {
  const [id_cliente, setIdCliente] = useState("");
  const [dv, setDv] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' ');
      await axios.post("http://144.126.136.43/api/cliente", {
        id_cliente,
        dv,
        nombres,
        apellidos,
        email,
        celular,
        fecha_registro,
      });
      navigate("/clientes");
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }

    setValidated(true);
  };

  return (
    <div className="container">
      <br />
      <h1>Crear Cliente</h1>
      <hr />
      <form
        className={`needs-validation ${validated ? "was-validated" : ""}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-3">
          <label htmlFor="rut">RUT</label>
          <input
            id="rut"
            type="number"
            className="form-control"
            value={id_cliente}
            onChange={(e) => setIdCliente(e.target.value)}
            required
          />
          <div className="invalid-feedback">Por favor ingresa un RUT válido.</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="dv">DV</label>
          <input
            id="dv"
            type="text"
            maxLength="1"
            className="form-control"
            value={dv}
            onChange={(e) => setDv(e.target.value.toUpperCase())}
            required
          />
          <div className="invalid-feedback">El dígito verificador es obligatorio.</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="nombres">Nombres</label>
          <input
            id="nombres"
            type="text"
            className="form-control"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
          <div className="invalid-feedback">Por favor ingresa tus nombres.</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="apellidos">Apellidos</label>
          <input
            id="apellidos"
            type="text"
            className="form-control"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
          <div className="invalid-feedback">Por favor ingresa tus apellidos.</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="invalid-feedback">Correo electrónico inválido.</div>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="celular">Celular</label>
          <input
            id="celular"
            type="number"
            className="form-control"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
          />
          <div className="invalid-feedback">Número de celular requerido.</div>
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Cliente
        </button>
      </form>
      <br />
    </div>
  );
}

export default CrearCliente;
