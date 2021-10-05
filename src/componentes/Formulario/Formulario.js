import { useState, useEffect } from "react";
import Axios from "axios";
const Formulario = () => {
  const [actores, setActores] = useState([]);
  const [registro, setRegistro] = useState({
    nombre: "",
    apellido: "",
    pais: "",
    fechanacimiento: "2011-10-10",
    foto: "",
  });
  useEffect(() => {
    obtenerTodosLosActores();
  }, []);
  useEffect(() => {
    console.log(registro);
  }, [registro]);
  //Llamados a las APIS:
  // GET => Toma los registros
  const obtenerTodosLosActores = async () => {
    let url = "http://localhost:5000/actores";
    const respuesta = await Axios.get(url);
    setActores(respuesta.data);
  };
  // Las funciones propias del formulario
  const handleClickEliminar = async (id) => {
    const respuesta = await Axios.delete(`http://localhost:5000/actores/${id}`);
    console.log(respuesta);
    obtenerTodosLosActores();
  };
  const handleClickNuevo = async () => {
    const respuesta = await Axios.post(
      "http://localhost:5000/actores",
      registro
    );
    console.log(respuesta);
    obtenerTodosLosActores();
    limpiarCampos();
  };
  const limpiarCampos = () => {
    setRegistro({
      nombre: "",
      apellido: "",
      pais: "",
      fechanacimiento: "2011-10-10",
      foto: "",
    });
  };
  const handleChange = (e) => {
    setRegistro({ ...registro, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => e.preventDefault();
  return (
    <>
      <h1>Actores y actrices de TV Arg - ❤</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          name="nombre"
          placeholder="nombre"
          onChange={(e) => handleChange(e)}
          value={registro && registro.nombre}
        />{" "}
        <br />
        <input
          name="apellido"
          placeholder="apellido"
          onChange={(e) => handleChange(e)}
          value={registro && registro.apellido}
        />
        <br />
        <input
          name="pais"
          placeholder="pais"
          onChange={(e) => handleChange(e)}
          value={registro && registro.pais}
        />
        <br />
        <input
          name="foto"
          placeholder="foto"
          onChange={(e) => handleChange(e)}
          value={registro && registro.foto}
        />
        <br />
        <button onClick={() => handleClickNuevo()}>Agregar</button>
      </form>
      {actores &&
        actores.map((a) => {
          return (
            <>
              <h3>Nombre y apellido</h3>
              <p>
                {a.nombre} {a.apellido}
              </p>
              <h3>Nacionalidad</h3>
              <p>{a.pais} </p>
              <h3>Foto</h3>
              <img src={a.foto} alt={a.nombre} /> <br />
              <button
                onClick={() => handleClickEliminar(a.id)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Eliminar
              </button>
            </>
          );
        })}
    </>
  );
};
export default Formulario;