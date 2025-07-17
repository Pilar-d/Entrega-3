import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ActualizarCliente() {
  const { id } = useParams();
  const [id_cliente, setIdCliente] = useState("");
  const [dv, setDv] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerDatosCliente();
  }, []);

  const obtenerDatosCliente = async () => {
    try {
      const response = await axios.get(`http://144.126.136.43/api/cliente/${id}`);
      const cliente = response.data[0];
      setIdCliente(cliente.id_cliente);
      setDv(cliente.dv);
      setNombres(cliente.nombres);
      setApellidos(cliente.apellidos);
      setEmail(cliente.email);
      setCelular(cliente.celular);
    } catch (error) {
      console.error("Error al obtener cliente:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const clienteActualizado = { nombres, apellidos, email, celular };
      await axios.patch(`http://144.126.136.43/api/cliente/${id}`, clienteActualizado);
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }

    setValidated(true);
  };

  return (
    <div className="container">
      <h1>Actualizar Cliente</h1>
      <hr />
      <form
        noValidate
        className={`needs-validation ${validated ? "was-validated" : ""}`}
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-3">
          <label>RUT</label>
          <input
            type="text"
            className="form-control"
            value={id_cliente}
            disabled
          />
        </div>

        <div className="form-group mb-3">
          <label>DV</label>
          <input
            type="text"
            className="form-control"
            value={dv}
            disabled
          />
        </div>

        <div className="form-group mb-3">
          <label>Nombres</label>
          <input
            type="text"
            className="form-control"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />
          <div className="invalid-feedback">Por favor ingresa los nombres.</div>
        </div>

        <div className="form-group mb-3">
          <label>Apellidos</label>
          <input
            type="text"
            className="form-control"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />
          <div className="invalid-feedback">Por favor ingresa los apellidos.</div>
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="invalid-feedback">Correo electrónico inválido.</div>
        </div>

        <div className="form-group mb-3">
          <label>Celular</label>
          <input
            type="text"
            pattern="^[0-9]{8,12}$"
            className="form-control"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
          />
          <div className="invalid-feedback">
            Por favor ingresa un número de celular válido.
          </div>
        </div>

        <button type="submit" className="btn btn-warning">Actualizar Cliente</button>
      </form>
      <br />
    </div>
  );
}

export default ActualizarCliente;
