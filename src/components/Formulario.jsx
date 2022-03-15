import { useEffect, useState } from "react";
import Paciente from "./Paciente";
import Error from "./Error";

const Formulario = ({ paciente, setPaciente, pacientes, setPacientes }) => {
  const [ nombre, setNombre ] = useState('');
  const [ propietario, setPropietario ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ fecha, setFecha ] = useState('');
  const [ sintomas, setSintomas ] = useState('');

  const [ error, setError ] = useState(false);

  useEffect(() => {
    if ( Object.keys(pacientes).length > 0 ) {
      setNombre(pacientes.nombre);
      setPropietario(pacientes.propietario);
      setEmail(pacientes.email);
      setFecha(pacientes.fecha);
      setSintomas(pacientes.sintomas);
    }
  }, [pacientes]);


  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now(). toString(36);

    return fecha + random;
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true);
      return;
    } 
      setError(false);

      // Objeto de paciente 
      const objetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas
      }

      if ( pacientes.id ) {
        // Editando el registro 
        objetoPaciente.id = pacientes.id
        const pacienteActualizado = paciente.map( pacienteState => pacienteState.id === pacientes.id ? objetoPaciente : pacienteState )
        
        setPacientes({})
        setPaciente(pacienteActualizado)

      } else {
        // Nuevo registro
        objetoPaciente.id = generarId()
        setPaciente([ ...paciente, objetoPaciente ]); 
      }


      setNombre('')
      setPropietario('')
      setEmail('')
      setFecha('')
      setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">
        Seguimientos Pacientes
      </h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
      onSubmit={handleSubmit}
      className="bg-white shadow-2xl raunded-lg py-10 px-5 mb-10">

        { error && <Error> <p> Todos los campos son obligatorios </p> </Error> }

        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los Sintomas"
            cols="25"
            rows="3"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full text-white uppercase font-bold p-3 hover:bg-indigo-700 cursor-pointer transition-all"
          value={ pacientes.id ? 'Editar Paciente' : 'Agregar Paciente' }
        />
      </form>
    </div>
  );
};

export default Formulario;
