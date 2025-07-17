import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function EliminarUsuario() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        cargarDatosUsuario();
    }, []);

    const cargarDatosUsuario = async () => {
        try {
            const response = await axios.get(`http://144.126.136.43/api/usuario/${id}`);
            setUsuario(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.136.43/api/usuario/${id}`);
            navigate("/usuarios");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("⚠️ El usuario no puede ser eliminado porque está vinculado a otras entidades del sistema.");
                navigate("/usuarios");
            } else {
                console.error("Error al eliminar el usuario:", error);
                alert("❌ Ocurrió un error al intentar eliminar el usuario.");
            }
        }
    };

    return (
        <div className="container">
            <br />
            <h1>¿Desea eliminar al usuario?</h1>
            <br />
            <h3>{usuario && usuario.nombres} {usuario.apellidos}</h3>
            <br />
            <Button variant="danger" onClick={onSubmit}>Eliminar</Button>
            <br /><br />
        </div>
    );
}

export default EliminarUsuario;
