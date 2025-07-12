import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button} from  "react-bootstrap";
import {useState, useEffect} from "react";
function EliminarUsuario(){
    let {id} = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState([]);

    useEffect(()=> {
        cargarDatosUsuario();
    },[]);

    const cargarDatosUsuario = async() => {
        try {
            const response = await axios.get(`http://144.126.136.43/api/usuario/${id}`);
            setUsuario(response.data[0]);
        }catch (error){
            console.log(error);
        };
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://144.126.136.43/api/usuario/${id}`);
            navigate("/usuarios");
        }catch(error) {
            console.log(error);
        }
    };
    return (
        <div className="container">
            <h1>¿Desea eliminar al usuario?</h1>
            <h3>{usuario && usuario.nombres} {usuario.apellidos}</h3>
            <Button variant="danger" onClick={onSubmit}> Eliminar</Button>
        </div>
    );
}
export default EliminarUsuario;