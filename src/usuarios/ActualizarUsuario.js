import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ActualizarUsuario() {
  const { id } = useParams();
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

  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

  const obtenerDatosUsuario = async () => {
    try {
      const response = await axios.get(`http://144.126.136.43/api/usuario/${id}`);
      const usuario = response.data[0];
      setIdUsuario(usuario.id_usuario);
      setDv(usuario.dv);
      setNombres(usuario.nombres);
      setApellidos(usuario.apellidos);
      setEmail(usuario.email);
      setCelular(usuario.celular);
      setUsername(usuario.username);
      setPassword(usuario.password);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const usuarioActualizado = {
        nombres,
        apellidos,
        email,
        celular,
        username,
        password,
      };
      await axios.patch(`http://144.126.136.43/api/usuario/${id}`, usuarioActualizado);
      navigate("/usuarios");
    } catch (error) {
      console.log(error);
    }

    setValidated(true);
  };

  return (
    <div className="container">
      <h1>Actualizar Usuario</h1>
      <hr />
      <form
        noValidate
        className={`needs-validation ${validated ? "was-validated" : ""}`}
        onSubmit={onSubmit}
      >
        <div className="form-group mb-3">
          <label>RUT</label>
          <input
            type="text"
            className="form-control"
            value={id_usuario}
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
            Ingrese un número válido (8 a 12 dígitos).
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
            type="text"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="invalid-feedback">Contraseña requerida.</div>
        </div>

        <button type="submit" className="btn btn-warning">
          Actualizar Usuario
        </button>
      </form>
      <br />
    </div>
  );
}

export default ActualizarUsuario;
