import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getByID } from '../../redux/actions/actions';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driverId = useSelector(state => state.allDrivers);
  useEffect(() => {
    console.log('ID del conductor:', id);
    dispatch(getByID(id));
  }, [dispatch, id]);

  console.log('Datos del conductor en Detail:', driverId);

  // Verifica si driverId está definido y no es un objeto vacío antes de acceder a sus propiedades
  if (!driverId || Object.keys(driverId).length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <div></div>
      <h1>DRIVER DETAIL</h1>
      <p>ID: {driverId.id}</p>
      <p>Nombre: {driverId.name}</p>
      <p>Apellido: {driverId.lastName}</p>
      <p>Nacionalidad: {driverId.nationality}</p>
      <img src={driverId.image} alt={`Imagen de ${driverId.name} ${driverId.lastName}`} />
      <p>Descripción: {driverId.description}</p>
      <p>Fecha de Nacimiento: {driverId.birthDate}</p>
      <p>Escuderías: {driverId.teams.join(', ')}</p>
    </div>
  );
};

export default Detail;