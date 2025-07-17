import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrearUsuario() {
  const [id_usuario, setIdUsuario] = useState("");
  const [dv, setDv] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      await axios.post("http://144.126.136.43/api/usuario", {
        id_usuario,
        dv,
        nombres,
        apellidos,
        email,
        celular,
        username,
        password,
        fecha_registro,
      });
      navigate("/usuarios");
    } catch (error) {
      console.error(error);
    }

    setValidated(true);
  };

  return (
    <div className="container">
      <br />
      <h1>Crear Usuario</h1>
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
            value={id_usuario}
            onChange={(e) => setIdUsuario(e.target.value)}
            required
          />
          <div className="invalid-feedback">RUT requerido.</div>
        </div>

        <div className="form-group mb-3">
          <label>DV</label>
          <input
            type="text"
            maxLength="1"
            className="form-control"
            value={dv}
            onChange={(e) => setDv(e.target.value.toUpperCase())}
            required
          />
          <div className="invalid-feedback">Dígito verificador obligatorio.</div>
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
          <div className="invalid-feedback">Nombres requeridos.</div>
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
          <div className="invalid-feedback">Apellidos requeridos.</div>
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
            Número de celular requerido (8 a 12 dígitos).
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="invalid-feedback">Nombre de usuario requerido.</div>
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="invalid-feedback">Contraseña requerida.</div>
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Usuario
        </button>
      </form>
      <br />
    </div>
  );
}

export default CrearUsuario;
