import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function CrearUsuario(){
    const [id_usuario,setIdUsuario] = useState("");
    const [dv, setDv] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await axios.post('http://144.126.136.43/api/usuario',{
                id_usuario,
                dv,
                nombres, 
                apellidos,
                email,
                celular,
                username,
                password,
                fecha_registro
            });
            navigate("/usuarios");
        }catch(error){
            console.log(error)
        }
    };
    return (
        <div className="container">
            <br></br>
            <h1>Crear Usuario</h1>
            <hr></hr>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>RUT</label>
                    <input type="text" className="form-control" value={id_usuario} onChange={(e) => setIdUsuario(e.target.value)}></input>
                    <br></br>
                </div>
                 <div className="form-group">
                    <label>DV</label>
                    <input type="text" className="form-control" value={dv} onChange={(e) => setDv(e.target.value)}></input>
                     <br></br>
                </div>
                 <div className="form-group">
                    <label>NOMBRES</label>
                    <input type="text" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)}></input>
                     <br></br>
                </div>
                 <div className="form-group">
                    <label>APELLIDOS</label>
                    <input type="text" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)}></input>
                     <br></br>
                </div>
                 <div className="form-group">
                    <label>EMAIL</label>
                    <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                     <br></br>
                </div>
                 <div className="form-group">
                    <label>CELULAR</label>
                    <input type="text" className="form-control" value={celular} onChange={(e) => setCelular(e.target.value)}></input>
                     <br></br>
                </div>
                 <div className="form-group">
                    <label>USERNAME</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <br></br>
                </div>
                 <div className="form-group">
                    <label>PASSWORD</label>
                   <input type="text" className="form-control" value={password}onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                 <br></br>
                <button type="submit" className="btn btn-primary">Crear Usuario</button>
                </form>
                <br></br>
        </div>
    );
}

export default CrearUsuario;