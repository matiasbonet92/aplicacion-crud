import React, { useState } from 'react';
import uniqid from 'uniqid'

const ListadoDeNombres = () => {

    const [nombre,setNombre] = useState('')
    const [listaNombres, setListaNombres] = useState([])
    const [edicion, setEdicion] = useState(false)
    const [id,setId] = useState('')

    const addnombre = (e) =>{
        e.preventDefault()
        const nuevoNombre = {
          id: uniqid(),
          datoNombre:nombre
        }
        setListaNombres([...listaNombres,nuevoNombre])
        setNombre('')
    }

    const deleteNombre = (id) =>{
        const deleteArray = listaNombres.filter( item => item.id !== id)
        setListaNombres(deleteArray)
    }

    const editar = (item) =>{
        setEdicion(true)
        setNombre(item.datoNombre)
        setId(item.id)
    }

    const editarNombre = (e) =>{
        e.preventDefault()
        const editArray = listaNombres
            .map( item => item.id === id ? {id:id , datoNombre: nombre} : item)
        setListaNombres(editArray)
    }

    return (
      <div>
          <div className="row">
              <div className="col">
                  <h2 className="mb-4">Listado de nombres</h2>
                  <ul className="list-group mb-4">
                      {
                          listaNombres.map( item => 
                            <li className="list-group-item"> {item.datoNombre} 
                                <button className="btn btn-outline-danger float-end"
                                    onClick={ () => { deleteNombre(item.id) } }
                                >
                                    Eliminar
                                </button>
                                <button className="btn btn-outline-warning float-end me-4"
                                    onClick={ () => { editar(item) } }
                                >
                                    Editar
                                </button>
                            </li>
                        )
                      }
                  </ul>
              </div>
              <div className="col">
                  <h2 className="mb-4">Formulario para añadir</h2>
                  <form onSubmit={ edicion ? editarNombre : addnombre } className="form-group mb-3">
                      <input onChange={ (e) => (setNombre(e.target.value)) } 
                             className="form-control mb-4" 
                             type="text" 
                             placeholder="Introduzca un nombre"
                             value={nombre}
                             />
                      <input className="btn btn-outline-success btn-block mb-4" 
                             type="submit" 
                             value={ setEdicion ? 'Modificar registro' : 'Registrar Nombre'} />
                  </form>
              </div>    
          </div>
      </div>
    );
}

export default ListadoDeNombres