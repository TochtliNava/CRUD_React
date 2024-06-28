import "./Crud.css";
import axios from "axios";
import { useState, useEffect } from "react";


const Crud = () => {

    const [users, setUsers] = useState([]);
    const [nombre, setNombre] = useState();
    const [apellido, setApellido] = useState();
    const [edad, setEdad] = useState();
    const [editMode, setEditMode] = useState(false);
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/user/');
            setUsers(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const createUser = async (nombre, apellido, edad) => {
        try {
            await axios.post('http://127.0.0.1:8000/user/', {name: nombre, last: apellido, age: edad});
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (id, nombre, apellido, edad) => {
        try {
            await axios.put(`http://127.0.0.1:8000/user/${id}/`, {name:nombre, last: apellido, age: edad});
        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/user/${id}/`);
            fetchUsers();
        } catch (error) {
            console.log(error);
        }
    }

    const handleNombreChange = (event) => setNombre(event.target.value);
    const handleApellidoChange = (event) => setApellido(event.target.value);
    const handleEdadChange = (event) => setEdad(event.target.value);

    const handleEdit = (user) => {
        setNombre(user.name);
        setApellido(user.last);
        setEdad(user.age);
        setEditMode(true);
        setUserId(user.id);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(editMode) {
            await updateUser(userId, nombre, apellido, edad);
        } else {
            await createUser(nombre, apellido, edad);
        }

        setNombre("");
        setApellido("");
        setEdad("");
        setEditMode(false);
        setUserId(null);
        fetchUsers();
    }

    return (
        <div class="form-container">
            <div class="list">
                <div class="list-title">
                    <div class="title">Usuarios</div>
                </div>
            
                <table cellspacing="0">
                    <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Opciones</th>
                    </tr>
                    </thead>
                    <tbody>
                {
                    Array.isArray(users) && users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.last}</td>
                            <td>{user.age}</td>
                            <td>
                                <button id="delete" onClick={() => deleteUser(user.id)}>Eliminar</button>
                                <button id="edit" onClick={() => handleEdit(user)}>Editar</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
                </table>
            
            
            <div class="list-footer">
                <form onSubmit={handleSubmit}>
                        <input type='text' name='nombre' placeholder="Nombre" value={nombre} onChange={handleNombreChange} required/>
                        <input type='text' name='apellido' placeholder="Apellido" value={apellido} onChange={handleApellidoChange} required/>
                        <input type='text' name='edad' placeholder="Edad" value={edad} onChange={handleEdadChange} required/>
                        <button type="submit" id={editMode ? 'update' : 'add'}>{editMode ? 'Actualizar' : 'Crear'}</button>
                </form>
                <div class="before">
                    &lt;
                </div>
                <div class="actual">
                    1
                </div>
                <div class="after">
                    &gt;
                </div>
                <div class="filler"></div>
            </div>
            </div>
        </div>
    );
}
 
export default Crud;