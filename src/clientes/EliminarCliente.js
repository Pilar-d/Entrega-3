import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function EliminarCliente() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState([]);

    useEffect(() => {
        cargarDatosCliente();
    }, []);

    const cargarDatosCliente = async () => {
        try {
            const response = await axios.get(`http://144.126.136.43/api/cliente/${id}`);
            setCliente(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.136.43/api/cliente/${id}`);
            navigate("/clientes");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("⚠️ El cliente no puede ser eliminado porque está vinculado a otras entidades del sistema.");
                navigate("/clientes"); // Redirige después de cerrar el alert
            } else {
                console.error("Error al eliminar el cliente:", error);
                alert("❌ Ocurrió un error al intentar eliminar el cliente.");
            }
        }
    };

    return (
        <div className="container">
            <br />
            <h1>¿Desea eliminar al cliente?</h1>
            <br />
            <h3>{cliente && cliente.nombres} {cliente.apellidos}</h3>
            <br />
            <Button variant="danger" onClick={onSubmit}>Eliminar</Button>
            <br /><br />
        </div>
    );
}

export default EliminarCliente;
